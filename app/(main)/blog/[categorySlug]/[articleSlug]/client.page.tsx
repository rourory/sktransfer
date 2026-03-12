"use client"
import Link from "next/link"
import { Calendar, ChevronLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context" // Ваш контекст локализации

type ArticleProps = {
  article: any // Здесь придут данные из БД (все языки)
}

// 💥 Функция парсинга и замены {0}, {1} на картинки 💥
function renderContentWithImages(htmlStr: string, imagesJson: string | null) {
  if (!imagesJson || imagesJson === "[]" || !htmlStr) {
    // Если картинок нет, просто возвращаем чистый HTML
    return <div dangerouslySetInnerHTML={{ __html: htmlStr }} />
  }

  try {
    const images: string[] = JSON.parse(imagesJson)
    let finalHtml = htmlStr

    // Проходимся по массиву URL и заменяем плейсхолдеры на HTML-теги
    images.forEach((url, index) => {
      const imgTag = `
        <figure class="my-10">
          <img src="${url}" alt="Фото ${index + 1}" class="w-full rounded-2xl shadow-xl object-cover max-h-[600px]" />
        </figure>
      `
      // Заменяем все вхождения {0}, {1} на наш HTML img тег
      finalHtml = finalHtml.split(`{${index}}`).join(imgTag)
    })

    return <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
  } catch (error) {
    console.error("Ошибка парсинга картинок:", error)
    return <div dangerouslySetInnerHTML={{ __html: htmlStr }} />
  }
}

function ArticleClient({ article }: ArticleProps) {
  const { locale } = useLanguage() // 'ru', 'en' или 'zh'

  // Динамически достаем данные в зависимости от текущего языка сайта
  const title = article[`title${locale.charAt(0).toUpperCase() + locale.slice(1)}`]
  const content = article[`content${locale.charAt(0).toUpperCase() + locale.slice(1)}`]
  const categoryName = article.category[`name${locale.charAt(0).toUpperCase() + locale.slice(1)}`]

  return (
    <main className="min-h-screen bg-white">
      {/* Главная обложка */}
      <div className="relative pt-32 pb-24 overflow-hidden bg-zinc-900">
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{ backgroundImage: `url(${article.coverImage || '/og-image.jpg'})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent z-10" />

        <div className="container relative z-20 mx-auto px-4 max-w-4xl text-center">
          <div className="flex justify-center items-center space-x-4 mb-6 text-white/80 text-sm">
            <Link href={`/blog/${article.category.slug}`} className="hover:text-[var(--gold)] transition-colors cursor-pointer uppercase tracking-wider font-semibold">
              {categoryName}
            </Link>
            <span>•</span>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(article.createdAt).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US')}
            </div>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-8 leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Контент статьи */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href={`/blog/${article.category.slug}`} className="inline-flex items-center text-sm text-foreground/60 hover:text-[var(--gold)] mb-10 transition-colors cursor-pointer">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад к категории
        </Link>

        {/* 🚀 Рендер текста с автоматической подстановкой картинок 🚀 */}
        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-[var(--gold)]">
          {renderContentWithImages(content, article.images)}
        </div>
        
      </div>
    </main>
  )
}

export {ArticleClient}