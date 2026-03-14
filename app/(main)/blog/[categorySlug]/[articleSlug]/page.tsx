import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ArticleClient } from "./client.page";
import { getLocaleOnServer } from "@/lib/get-locale-on-server";
import { translations } from "@/lib/i18n";
import { getLocalizedField } from "@/lib/get-localozed-field";

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
  const locale = await getLocaleOnServer();
  const t = translations[locale];

  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.articleSlug },
    include: { category: true, author: true },
  });

  // Проверка: существует ли статья и принадлежит ли она правильной категории из URL
  if (!article || article.category.slug !== resolvedParams.categorySlug) {
    return notFound();
  }
  const title = getLocalizedField(article, "title", locale);
  const description = getLocalizedField(article, "excerpt", locale);
  const categoryName = getLocalizedField(article.category, "name", locale);
  const articleUrl = `https://sktransfer.by/blog/${resolvedParams.categorySlug}/${resolvedParams.articleSlug}`;

  // 3. Формируем Schema.org для Статьи (Article / BlogPosting)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    headline: title,
    description: description,
    image: article.coverImage
      ? [article.coverImage]
      : ["https://sktransfer.by/og-image.webp"],
    datePublished: article.publishedAt
      ? article.publishedAt.toISOString()
      : article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      "@type": article.author ? "Person" : "Organization",
      name: article.author?.name || "SK Transfer",
    },
    publisher: {
      "@type": "Organization",
      name: "SK Transfer",
      logo: {
        "@type": "ImageObject",
        url: "https://sktransfer.by/logo.png",
      },
    },
  };

  // 4. Формируем Schema.org для Хлебных крошек (BreadcrumbList)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t.nav.home, // "Главная"
        item: "https://sktransfer.by",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t.nav.blog, // "Блог"
        item: "https://sktransfer.by/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName, // Динамическое название категории ("Советы", "Tips")
        item: `https://sktransfer.by/blog/${resolvedParams.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: title, // Название самой статьи
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArticleClient article={article} />;
    </>
  );
}
