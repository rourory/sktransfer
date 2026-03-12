import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { CategoryClient } from "./client.page";

const ITEMS_PER_PAGE = 6;

type Props = {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Распаковываем промис params с помощью await
  const resolvedParams = await params;

  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.categorySlug },
  });

  if (!category) return {};

  // По умолчанию для SEO мета-тегов используем русский язык
  return {
    title: `Статьи: ${category.nameRu} — SKTransfer.by`,
    description:
      category.descriptionRu || `Все статьи в категории ${category.nameRu}`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  // Распаковываем промисы перед использованием
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const currentPage = Number(resolvedSearchParams.page) || 1;

  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.categorySlug },
  });

  if (!category) return notFound();

  const [articles, totalArticles] = await Promise.all([
    prisma.article.findMany({
      where: { categoryId: category.id, isPublished: true },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.article.count({
      where: { categoryId: category.id, isPublished: true },
    }),
  ]);

  const totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE);

  return (
    <CategoryClient
      category={category}
      articles={articles}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}