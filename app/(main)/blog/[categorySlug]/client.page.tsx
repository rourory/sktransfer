"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

// Обновленные типы в соответствии с schema.prisma
type Article = {
  id: string;
  slug: string;
  coverImage: string | null;
  createdAt: Date;
  titleRu: string;
  titleEn: string;
  titleZh: string;
  excerptRu: string;
  excerptEn: string;
  excerptZh: string;
};

type Category = {
  slug: string;
  image: string | null;
  nameRu: string;
  nameEn: string;
  nameZh: string;
  descriptionRu: string | null;
  descriptionEn: string | null;
  descriptionZh: string | null;
};

// Локализация статического интерфейса
const uiTranslations = {
  ru: {
    home: "Главная",
    blog: "Блог",
    readMore: "Читать далее →",
    page: "Страница",
    of: "из",
  },
  en: {
    home: "Home",
    blog: "Blog",
    readMore: "Read more →",
    page: "Page",
    of: "of",
  },
  zh: {
    home: "主页",
    blog: "博客",
    readMore: "阅读更多 →",
    page: "第", // Используется для "第 1 页，共 5 页"
    of: "页，共",
  },
};

export function CategoryClient({
  category,
  articles,
  currentPage,
  totalPages,
}: {
  category: Category;
  articles: Article[];
  currentPage: number;
  totalPages: number;
}) {
  const { locale } = useLanguage();
  const t = uiTranslations[locale as keyof typeof uiTranslations] || uiTranslations.ru;
  
  // Капитализируем текущую локаль ('ru' -> 'Ru')
  const localeCapitalized = locale.charAt(0).toUpperCase() + locale.slice(1);

  // Динамически получаем имя и описание категории
  const categoryName = category[`name${localeCapitalized}` as keyof Category] as string;
  const categoryDesc = category[`description${localeCapitalized}` as keyof Category] as string | null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* Хлебные крошки */}
      <div className="pt-28 pb-4 container mx-auto px-4 text-sm text-foreground/60">
        <Link href="/" className="hover:text-[var(--gold)] transition-colors cursor-pointer">
          {t.home}
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/blog"
          className="hover:text-[var(--gold)] transition-colors cursor-pointer"
        >
          {t.blog}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{categoryName}</span>
      </div>

      <div className="container relative mx-auto px-4 pb-20">
        <h1 className="font-display text-4xl md:text-5xl mb-6 gold-gradient-text text-center mt-8">
          {categoryName}
        </h1>
        {categoryDesc && (
          <p className="text-center max-w-2xl mx-auto text-foreground/70 mb-16 text-lg">
            {categoryDesc}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {articles.map((article) => {
            // Динамически получаем заголовок и описание статьи
            const title = article[`title${localeCapitalized}` as keyof Article] as string;
            const excerpt = article[`excerpt${localeCapitalized}` as keyof Article] as string;

            return (
              <Link
                href={`/blog/${category.slug}/${article.slug}`}
                key={article.id}
                className="cursor-pointer"
              >
                <Card className="glass-effect overflow-hidden h-full flex flex-col group hover:shadow-lg transition-all border-white/40 hover:border-[var(--gold)]/50">
                  <div
                    className="h-48 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${article.coverImage || "/og-image.webp"})`,
                    }}
                  />
                  <div className="p-6 flex flex-col flex-grow bg-white/60">
                    <div className="flex items-center text-xs text-foreground/50 mb-3">
                      <Calendar className="w-3 h-3 mr-1" />
                      {/* Форматируем дату в зависимости от локали */}
                      {new Date(article.createdAt).toLocaleDateString(
                        locale === "ru" ? "ru-RU" : locale === "zh" ? "zh-CN" : "en-US"
                      )}
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-[var(--gold)] transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-foreground/70 text-sm line-clamp-3 mb-4 flex-grow">
                      {excerpt}
                    </p>
                    <span className="text-[var(--gold)] text-sm font-medium mt-auto">
                      {t.readMore}
                    </span>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            {currentPage > 1 ? (
              <Link
                href={`/blog/${category.slug}?page=${currentPage - 1}`}
                className="cursor-pointer p-2 border border-[var(--gold)] rounded-full text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
            ) : (
              <div className="p-2 border border-gray-200 rounded-full text-gray-300">
                <ChevronLeft className="w-5 h-5" />
              </div>
            )}

            <span className="text-foreground font-medium">
              {/* Особая структура для китайского языка */}
              {locale === "zh"
                ? `${t.page} ${currentPage} ${t.of} ${totalPages} 页`
                : `${t.page} ${currentPage} ${t.of} ${totalPages}`}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={`/blog/${category.slug}?page=${currentPage + 1}`}
                className="cursor-pointer p-2 border border-[var(--gold)] rounded-full text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <div className="p-2 border border-gray-200 rounded-full text-gray-300">
                <ChevronRight className="w-5 h-5" />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}