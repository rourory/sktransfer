import GuideDetailPageClient from "./client"
import type { Locale } from "@/lib/i18n"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return [{ id: "andrey" }, { id: "maria" }]
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const guideTitles: Record<string, { ru: string; en: string }> = {
    andrey: {
      ru: "Андрей — Профессиональный гид по Минску | SKTransfer",
      en: "Andrey — Professional Guide in Minsk | SKTransfer",
    },
    maria: {
      ru: "Мария — Искусствовед и гид по Минску | SKTransfer",
      en: "Maria — Art Historian and Guide in Minsk | SKTransfer",
    },
  }

  const guideDescriptions: Record<string, { ru: string; en: string }> = {
    andrey: {
      ru: "Андрей — профессиональный гид с 15-летним опытом. Экскурсии по Минску и Беларуси на русском и английском языках. 1500+ проведенных экскурсий.",
      en: "Andrey — professional guide with 15 years of experience. Tours in Minsk and Belarus in Russian and English. 1500+ tours conducted.",
    },
    maria: {
      ru: "Мария — искусствовед и педагог, аккредитованный экскурсовод. Экскурсии по искусству и культуре Минска. 1200+ экскурсий, рейтинг 5.0.",
      en: "Maria — art historian and teacher, accredited tour guide. Art and culture tours in Minsk. 1200+ tours, rating 5.0.",
    },
  }

  const title = guideTitles[params.id]?.ru || "Гид | SKTransfer"
  const description = guideDescriptions[params.id]?.ru || "Профессиональный гид по Минску и Беларуси"

  return {
    title,
    description,
    keywords: ["гид", params.id, "экскурсовод", "Минск", "Беларусь", "экскурсии", "SKTransfer"],
    openGraph: {
      title,
      description,
      url: `https://sktransfer.by/guides/${params.id}`,
      siteName: "SKTransfer.by",
      images: [
        {
          url: `/og-guide-${params.id}.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "ru_RU",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og-guide-${params.id}.jpg`],
    },
    alternates: {
      canonical: `https://sktransfer.by/guides/${params.id}`,
      languages: {
        ru: `https://sktransfer.by/guides/${params.id}`,
        en: `https://sktransfer.by/guides/${params.id}`,
      },
    },
  }
}

interface Guide {
  id: string
  name: string
  experience: string
  description: string
  languages: string[]
  rating: number
  tours: number
  images: string[]
  specializations: string[]
  popularRoutes: string[]
}

async function getGuides(locale: Locale): Promise<Guide[]> {
  return [
    {
      id: "andrey",
      name: locale === "ru" ? "Андрей" : locale === "en" ? "Andrey" : "安德烈",
      experience:
        locale === "ru" ? "Более 15 лет в туризме" : locale === "en" ? "Over 15 years in tourism" : "旅游业超过15年",
      description:
        locale === "ru"
          ? "Более 15 лет работаю в туризме. Более 15 лет рассказываю гостям нашей страны о истории, красотах и легендах Беларуси. Более 15 лет стараюсь передать посетителям нашей республики хоть частичку своей любви к моей Родине. Провожу экскурсии по Минску и минской области, на русском и английском языках."
          : locale === "en"
            ? "I have been working in tourism for over 15 years. For more than 15 years I have been telling guests of our country about the history, beauties and legends of Belarus. I conduct excursions in Minsk and the Minsk region in Russian and English."
            : "我在旅游业工作了15年以上。15年来，我一直向我们国家的客人讲述白俄罗斯的历史、美景和传说。我在明斯克和明斯克地区用俄语和英语进行游览。",
      languages: ["Русский", "English"],
      rating: 5,
      tours: 1500,
      images: ["/andrey-guide-photo-1.jpg", "/andrey-guide-photo-2.jpg", "/andrey-guide-photo-1.jpg"],
      specializations:
        locale === "ru"
          ? ["Историческая Беларусь", "Архитектура Минска", "Военная история", "Культурные традиции"]
          : locale === "en"
            ? ["Historical Belarus", "Minsk Architecture", "Military History", "Cultural Traditions"]
            : ["历史白俄罗斯", "明斯克建筑", "军事历史", "文化传统"],
      popularRoutes:
        locale === "ru"
          ? ["Обзорная экскурсия по Минску", "Брестская крепость", "Мир и Несвиж", "Хатынь мемориал"]
          : locale === "en"
            ? ["Minsk City Tour", "Brest Fortress", "Mir and Nesvizh", "Khatyn Memorial"]
            : ["明斯克城市游", "布列斯特要塞", "米尔和涅斯维日", "哈廷纪念馆"],
    },
    {
      id: "maria",
      name: locale === "ru" ? "Мария" : locale === "en" ? "Maria" : "玛丽亚",
      experience:
        locale === "ru" ? "Искусствовед и педагог" : locale === "en" ? "Art historian and teacher" : "艺术史学家和教师",
      description:
        locale === "ru"
          ? "Искусствовед по диплому, педагог по работе, экскурсовод по аккредитации и фанат Минска по большой любви. Бесконечно влюблена в Минск и Беларусь! Своей страстью хотела бы заразить и Вас, дорогие путешественники! Я не просто рассказываю факты, но и погружаю Вас в атмосферу нашего уникального края."
          : locale === "en"
            ? "Art historian by diploma, teacher by work, tour guide by accreditation and Minsk fan by great love. Endlessly in love with Minsk and Belarus! I don't just tell facts, but immerse you in the atmosphere of our unique land."
            : "文凭艺术史学家，职业教师，认证导游，热爱明斯克。无尽地爱着明斯克和白俄罗斯！我不仅讲述事实，还让您沉浸在我们独特土地的氛围中。",
      languages: ["Русский"],
      rating: 5,
      tours: 1200,
      images: ["/maria-guide-photo-1.jpg", "/maria-guide-photo-1.jpg", "/maria-guide-photo-1.jpg"],
      specializations:
        locale === "ru"
          ? ["Искусство и культура", "Музеи Минска", "Литературные маршруты", "Современный Минск"]
          : locale === "en"
            ? ["Art and Culture", "Minsk Museums", "Literary Routes", "Modern Minsk"]
            : ["艺术与文化", "明斯克博物馆", "文学路线", "现代明斯克"],
      popularRoutes:
        locale === "ru"
          ? ["Художественная галерея", "Литературный Минск", "Троицкое предместье", "Верхний город"]
          : locale === "en"
            ? ["Art Gallery", "Literary Minsk", "Trinity Suburb", "Upper Town"]
            : ["艺术画廊", "文学明斯克", "三一郊区", "上城"],
    },
  ]
}

export const dynamic = "force-dynamic"

export default async function GuidePage({
  searchParams,
  params,
}: {
  searchParams: { lang?: string }
  params: { id: string }
}) {
  const locale = (searchParams.lang as Locale) || "ru"
  const guides = await getGuides(locale)

  return <GuideDetailPageClient guides={guides} />
}
