// app/blog/page.tsx
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { getLocaleOnServer } from "@/lib/get-locale-on-server";
import { translations } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const BASE_URL = "https://sktransfer.by";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleOnServer();
  const t = translations[locale].seo.blog;

  // Учитываем ?lang= для canonical и hreflang
  const canonicalUrl =
    locale === "ru" ? `${BASE_URL}/blog` : `${BASE_URL}/blog?lang=${locale}`;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      images: ["/og-image.webp"],
      type: "website",
    },
    alternates: {
      canonical: canonicalUrl,
      // Hreflang для связывания языковых версий блога в Google
      languages: {
        "ru-BY": `${BASE_URL}/blog`,
        "en-US": `${BASE_URL}/blog?lang=en`,
        "zh-CN": `${BASE_URL}/blog?lang=zh`,
        "x-default": `${BASE_URL}/blog`,
      },
    },
  };
}

// Типизация, которую вы использовали
type CategoryWithCount = {
  id: string;
  slug: string;
  image: string | null;
  nameRu: string;
  nameEn: string;
  nameZh: string;
  descriptionRu: string | null;
  descriptionEn: string | null;
  descriptionZh: string | null;
  _count: { articles: number };
};

export default async function BlogIndexPage() {
  const locale = await getLocaleOnServer();
  const t = translations[locale].blogIndex;

  // Получаем категории из базы
  const categories = (await prisma.category.findMany({
    include: {
      _count: {
        select: { articles: { where: { isPublished: true } } },
      },
    },
    orderBy: { createdAt: "asc" },
  })) as CategoryWithCount[];

  // Вспомогательная функция для динамического получения нужного поля из БД
  const getLocalizedField = (
    category: CategoryWithCount,
    fieldBase: "name" | "description",
  ) => {
    const localeCapitalized = locale.charAt(0).toUpperCase() + locale.slice(1);
    const fieldName =
      `${fieldBase}${localeCapitalized}` as keyof CategoryWithCount;
    return (category[fieldName] as string) || "";
  };

  // Микроразметка Blog (Коллекция статей)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: t.title,
    description: t.subtitle,
    url:
      locale === "ru" ? `${BASE_URL}/blog` : `${BASE_URL}/blog?lang=${locale}`,
    publisher: {
      "@type": "Organization",
      name: "SK Transfer",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.webp`,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* Внедряем JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4">
          {/* SEO Заголовки */}
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-6 gold-gradient-text">
              {t.title}
            </h1>
            <p className="text-lg text-foreground/70">{t.subtitle}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {categories.map((category) => {
              const categoryName = getLocalizedField(category, "name");
              const categoryDesc = getLocalizedField(category, "description");

              // КРИТИЧНО: Сохраняем языковой параметр при переходе в категорию!
              const categoryUrl =
                locale === "ru"
                  ? `/blog/${category.slug}`
                  : `/blog/${category.slug}?lang=${locale}`;

              return (
                <Link
                  href={categoryUrl}
                  key={category.id}
                  className="cursor-pointer group"
                >
                  <Card className="glass-effect overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 border-white/40 hover:border-[var(--gold)]/50">
                    {/* SEO-дружественное изображение вместо background-image */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={category.image || "/og-image.webp"}
                        alt={categoryName || t.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow relative bg-white/60">
                      <div className="text-sm text-[var(--gold)] font-medium mb-2 uppercase tracking-wider">
                        {category._count.articles} {t.articlesCount}
                      </div>

                      {/* Используем H2 для семантики */}
                      <h2 className="text-2xl font-display text-foreground mb-3 group-hover:text-[var(--gold)] transition-colors">
                        {categoryName}
                      </h2>

                      <p className="text-foreground/70 mb-6 flex-grow line-clamp-3">
                        {categoryDesc}
                      </p>

                      <div className="flex items-center text-sm font-medium text-foreground group-hover:text-[var(--gold)] transition-colors mt-auto">
                        {t.readMore}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
