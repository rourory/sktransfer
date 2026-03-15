"use client";
import Link from "next/link";
import { Calendar, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/lib/language-context"; // Ваш контекст локализации

type ArticleProps = {
  article: any; // Здесь придут данные из БД (все языки)
};

// 💥 Функция парсинга и замены {0}, {1} на картинки 💥
function renderContentWithImages(htmlStr: string, imagesJson: string | null) {
  if (!imagesJson || imagesJson === "[]" || !htmlStr) {
    return <div dangerouslySetInnerHTML={{ __html: htmlStr }} />;
  }

  try {
    const images: string[] = JSON.parse(imagesJson);
    let finalHtml = htmlStr;

    // Меняем только на тег img (остальные отступы заданы в стилях контейнера ниже)
    images.forEach((url, index) => {
      const imgTag = `<img src="${url}" alt="Фото ${index + 1}" />`;
      finalHtml = finalHtml.split(`{${index}}`).join(imgTag);
    });

    return <div dangerouslySetInnerHTML={{ __html: finalHtml }} />;
  } catch (error) {
    console.error("Ошибка парсинга картинок:", error);
    return <div dangerouslySetInnerHTML={{ __html: htmlStr }} />;
  }
}

function ArticleClient({ article }: ArticleProps) {
  const { locale } = useLanguage(); // 'ru', 'en' или 'zh'

  // Динамически достаем данные в зависимости от текущего языка сайта
  const title =
    article[`title${locale.charAt(0).toUpperCase() + locale.slice(1)}`];
  const content =
    article[`content${locale.charAt(0).toUpperCase() + locale.slice(1)}`];
  const categoryName =
    article.category[`name${locale.charAt(0).toUpperCase() + locale.slice(1)}`];

  return (
    <main className="min-h-screen bg-white">
      {/* Главная обложка */}
      <div className="relative pt-32 pb-24 overflow-hidden bg-zinc-900">
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `url(${article.coverImage || "/og-image.webp"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent z-10" />

        <div className="container relative z-20 mx-auto px-4 max-w-4xl text-center">
          <div className="flex justify-center items-center space-x-4 mb-6 text-white/80 text-sm">
            <Link
              href={`/blog/${article.category.slug}`}
              className="hover:text-[var(--gold)] transition-colors cursor-pointer uppercase tracking-wider font-semibold"
            >
              {categoryName}
            </Link>
            <span>•</span>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(article.createdAt).toLocaleDateString(
                locale === "ru" ? "ru-RU" : "en-US",
              )}
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-8 leading-tight font-bold">
            {title}
          </h1>
        </div>
      </div>

      {/* Контент статьи */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link
          href={`/blog/${article.category.slug}`}
          className="inline-flex items-center text-sm text-foreground/60 hover:text-[var(--gold)] mb-10 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад к категории
        </Link>

        {/* 🚀 Рендер текста с ЖЕЛЕЗОБЕТОННЫМИ стилями напрямую в HTML-теги 🚀 */}
        <div
          className="
          text-lg text-zinc-800 leading-relaxed font-sans
          
          [&_h2]:text-3xl[&_h2]:font-bold [&_h2]:text-black [&_h2]:mt-14[&_h2]:mb-6 [&_h2]:font-display [&_h2]:leading-tight[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-black[&_h3]:mt-10 [&_h3]:mb-4
          [&_p]:mb-6 [&_p]:text-justify
          [&_strong]:font-semibold [&_strong]:text-black
          
          [&_a]:text-[var(--gold)] [&_a]:underline [&_a:hover]:text-yellow-600 [&_a]:transition-colors
          
          [&_.article-image]:my-12 [&_.article-image]:flex [&_.article-image]:flex-col [&_.article-image]:items-center
          [&_img]:w-full [&_img]:rounded-2xl [&_img]:shadow-xl [&_img]:object-cover [&_img]:max-h-[600px]
          
          [&_.article-image_em]:block [&_.article-image_em]:text-center[&_.article-image_em]:text-sm [&_.article-image_em]:text-zinc-500 [&_.article-image_em]:mt-4 [&_.article-image_em]:not-italic
        "
        >
          {renderContentWithImages(content, article.images)}
        </div>
      </div>
    </main>
  );
}

export { ArticleClient };
