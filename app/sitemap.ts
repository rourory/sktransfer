// app/sitemap.ts
import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

const BASE_URL = "https://sktransfer.by";
const LOCALES = ["ru", "en", "zh"];

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // ====================== 1. Статические страницы ======================
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

  const addLocalizedEntries = (
    path: string,
    lastModified: Date = new Date(),
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never" = "weekly",
    priority: number = 0.8,
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
    addLocalizedEntries(route, new Date(), "weekly", route === "" ? 1.0 : 0.8);
  });

  // ====================== 2. Динамические страницы трансферов ======================
  try {
    const transferRoutes = await prisma.transferRoute.findMany({
      select: {
        slug: true,
        updatedAt: true,
        isPopular: true,
      },
      where: {
        // Можно добавить фильтр, если хочешь показывать только популярные
        // isPopular: true,
      },
    });

    transferRoutes.forEach((route) => {
      const priority = route.isPopular ? 0.85 : 0.75;
      addLocalizedEntries(
        `/transfer/${route.slug}`,
        route.updatedAt,
        "monthly", // трансферы меняются не очень часто
        priority,
      );
    });

    console.log(
      `✅ Добавлено ${transferRoutes.length} динамических страниц трансферов в sitemap`,
    );
  } catch (error) {
    console.error("Ошибка при получении TransferRoute для sitemap:", error);
  }

  // ====================== 3. Категории блога ======================
  try {
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
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
  }

  // ====================== 4. Статьи блога ======================
  try {
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
        "monthly",
        0.6,
      );
    });
  } catch (error) {
    console.error("Ошибка при получении статей:", error);
  }

  return sitemapEntries;
}
