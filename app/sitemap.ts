import { MetadataRoute } from "next";
import prisma from "@/lib/prisma"; // Проверь правильность пути к твоему prisma клиенту

const BASE_URL = "https://sktransfer.by";
const LOCALES = ["ru", "en", "zh"];

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Массив статических роутов
  const staticRoutes = [
    "",
    "/services",
    "/fleet",
    "/calculator",
    "/contacts",
    "/excursions",
    "/guides",
    "/resorts",
    "/privacy",
    "/terms",
    "/blog",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Функция-помощник для добавления локализованных версий ссылок
  // Для ru отдаем чистый URL, для en/zh добавляем параметр ?lang=
  const addLocalizedEntries = (
    path: string,
    lastModified: Date,
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never",
    priority: number,
  ) => {
    LOCALES.forEach((locale) => {
      const url =
        locale === "ru"
          ? `${BASE_URL}${path}`
          : `${BASE_URL}${path}?lang=${locale}`;

      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency,
        priority,
      });
    });
  };

  // Добавляем статические страницы
  staticRoutes.forEach((route) => {
    addLocalizedEntries(
      route,
      new Date(), // В идеале здесь должна быть дата последнего деплоя/обновления
      "weekly",
      route === "" ? 1.0 : 0.8, // Главной странице даем максимальный приоритет
    );
  });

  try {
    // 2. Достаем категории из БД
    const categories = await prisma.category.findMany({
      select: { slug: true, updatedAt: true },
    });

    categories.forEach((category) => {
      addLocalizedEntries(
        `/blog/${category.slug}`,
        category.updatedAt,
        "weekly",
        0.7,
      );
    });

    // 3. Достаем опубликованные статьи из БД
    const articles = await prisma.article.findMany({
      where: { isPublished: true },
      select: {
        slug: true,
        updatedAt: true,
        category: {
          select: { slug: true },
        },
      },
    });

    articles.forEach((article) => {
      addLocalizedEntries(
        `/blog/${article.category.slug}/${article.slug}`,
        article.updatedAt,
        "monthly", // Статьи обычно меняются реже
        0.6,
      );
    });
  } catch (error) {
    console.error("Ошибка при генерации sitemap:", error);
    // Даже если БД упала, мы всё равно вернем хотя бы статические страницы
  }

  return sitemapEntries;
}
