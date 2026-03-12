import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ArticleClient } from "./client.page";

type Props = {
  params: Promise<{ categorySlug: string; articleSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Распаковываем промис params
  const resolvedParams = await params;

  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.articleSlug },
  });

  if (!article) return {};

  return {
    title: article.metaTitleRu || `${article.titleRu} — SKTransfer.by`,
    description: article.metaDescriptionRu || article.excerptRu,
    openGraph: {
      title: article.metaTitleRu || article.titleRu,
      description: article.excerptRu,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  // Распаковываем промис params
  const resolvedParams = await params;

  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.articleSlug },
    include: { category: true },
  });

  // Проверка: существует ли статья и принадлежит ли она правильной категории из URL
  if (!article || article.category.slug !== resolvedParams.categorySlug) {
    return notFound();
  }

  return <ArticleClient article={article} />;
}
