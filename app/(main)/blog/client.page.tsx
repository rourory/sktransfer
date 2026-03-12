"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context"; // Подключаем ваш контекст

// Обновляем тип под новую схему Prisma
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

// Локальные переводы для статического текста на странице
const uiTranslations = {
  ru: {
    title: "Блог и путеводитель",
    subtitle:
      "Полезные статьи, обзоры маршрутов, санаториев и советы для комфортных путешествий по Беларуси и Европе.",
    articlesCount: "статей",
    readMore: "Смотреть статьи",
  },
  en: {
    title: "Blog & Guide",
    subtitle:
      "Useful articles, route reviews, sanatoriums, and tips for comfortable travel across Belarus and Europe.",
    articlesCount: "articles",
    readMore: "View articles",
  },
  zh: {
    title: "博客与指南",
    subtitle: "关于白俄罗斯和欧洲舒适旅行的有用文章、路线评论、疗养院和提示。",
    articlesCount: "篇文章",
    readMore: "查看文章",
  },
};

function BlogIndexClient({ categories }: { categories: CategoryWithCount[] }) {
  // Получаем текущую локаль ('ru', 'en' или 'zh')
  const { locale } = useLanguage();

  // Берем переводы интерфейса для текущего языка (фолбэк на 'ru')
  const t =
    uiTranslations[locale as keyof typeof uiTranslations] || uiTranslations.ru;

  // Вспомогательная функция для динамического получения нужного поля из БД
  // Если locale === 'en', она вернет category.nameEn
  const getLocalizedField = (
    category: CategoryWithCount,
    fieldBase: "name" | "description",
  ) => {
    const localeCapitalized = locale.charAt(0).toUpperCase() + locale.slice(1); // 'ru' -> 'Ru'
    const fieldName =
      `${fieldBase}${localeCapitalized}` as keyof CategoryWithCount;
    return category[fieldName] as string | null;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-6 gold-gradient-text">
              {t.title}
            </h1>
            <p className="text-lg text-foreground/70">{t.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {categories.map((category) => {
              // Достаем названия и описания на лету под текущий язык
              const categoryName = getLocalizedField(category, "name");
              const categoryDesc = getLocalizedField(category, "description");

              return (
                <Link
                  href={`/blog/${category.slug}`}
                  key={category.id}
                  className="cursor-pointer"
                >
                  <Card className="glass-effect overflow-hidden h-full flex flex-col group hover:shadow-lg transition-all duration-300 border-white/40 hover:border-[var(--gold)]/50">
                    <div
                      className="h-56 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${category.image || "/og-image.jpg"})`,
                      }}
                    />
                    <div className="p-6 flex flex-col flex-grow relative bg-white/60">
                      <div className="text-sm text-[var(--gold)] font-medium mb-2 uppercase tracking-wider">
                        {category._count.articles} {t.articlesCount}
                      </div>
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

export { BlogIndexClient };
