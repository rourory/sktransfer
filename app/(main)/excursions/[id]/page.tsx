import ExcursionDetailPageClient from "./excursion-client"
import { translations, type Locale } from "@/lib/i18n"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return [
    { id: "minsk-city-tour" },
    { id: "brest-fortress" },
    { id: "mir-nesvizh" },
    { id: "khatyn-memorial" },
    { id: "dudutki-museum" },
    { id: "belovezhskaya-pushcha" },
  ]
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const excursionTitles: Record<string, { ru: string; en: string }> = {
    "minsk-city-tour": {
      ru: "Обзорная экскурсия по Минску | SKTransfer",
      en: "Minsk City Tour | SKTransfer",
    },
    "brest-fortress": {
      ru: "Экскурсия в Брестскую крепость | SKTransfer",
      en: "Brest Fortress Excursion | SKTransfer",
    },
    "mir-nesvizh": {
      ru: "Мирский и Несвижский замки — Экскурсия | SKTransfer",
      en: "Mir and Nesvizh Castles — Excursion | SKTransfer",
    },
    "khatyn-memorial": {
      ru: "Мемориальный комплекс Хатынь — Экскурсия | SKTransfer",
      en: "Khatyn Memorial Complex — Excursion | SKTransfer",
    },
    "dudutki-museum": {
      ru: "Музей народных ремесел Дудутки — Экскурсия | SKTransfer",
      en: "Dudutki Folk Crafts Museum — Excursion | SKTransfer",
    },
    "belovezhskaya-pushcha": {
      ru: "Беловежская пуща — Экскурсия | SKTransfer",
      en: "Belovezhskaya Pushcha — Excursion | SKTransfer",
    },
  }

  const excursionDescriptions: Record<string, { ru: string; en: string }> = {
    "minsk-city-tour": {
      ru: "Обзорная экскурсия по Минску с профессиональным гидом. Проспект Независимости, Троицкое предместье, Верхний город. Продолжительность 3 часа.",
      en: "Minsk city tour with professional guide. Independence Avenue, Trinity Suburb, Upper Town. Duration 3 hours.",
    },
    "brest-fortress": {
      ru: "Экскурсия в легендарную Брестскую крепость. Мемориальный комплекс, музей обороны, монумент Мужество. Полный день с трансфером из Минска.",
      en: "Excursion to legendary Brest Fortress. Memorial complex, defense museum, Courage monument. Full day with transfer from Minsk.",
    },
    "mir-nesvizh": {
      ru: "Экскурсия в замки Мир и Несвиж — объекты ЮНЕСКО. История рода Радзивиллов, дворцово-парковые ансамбли. Полный день с обедом.",
      en: "Excursion to Mir and Nesvizh castles — UNESCO sites. Radziwill family history, palace complexes. Full day with lunch.",
    },
    "khatyn-memorial": {
      ru: "Экскурсия в мемориальный комплекс Хатынь. Память 149 белорусских деревень. Вечный огонь, кладбище деревень. 4-5 часов с трансфером.",
      en: "Excursion to Khatyn memorial complex. Memory of 149 Belarusian villages. Eternal flame, cemetery of villages. 4-5 hours with transfer.",
    },
    "dudutki-museum": {
      ru: "Экскурсия в музей народных ремесел Дудутки. Старинная белорусская деревня, ремесла, дегустация самогона и сыра. 4-5 часов.",
      en: "Excursion to Dudutki folk crafts museum. Old Belarusian village, crafts, moonshine and cheese tasting. 4-5 hours.",
    },
    "belovezhskaya-pushcha": {
      ru: "Экскурсия в Беловежскую пущу — древнейший лес Европы. Зубры, резиденция Деда Мороза, музей природы. Полный день с обедом.",
      en: "Excursion to Belovezhskaya Pushcha — Europe's oldest forest. Bison, Santa Claus residence, nature museum. Full day with lunch.",
    },
  }

  const title = excursionTitles[params.id]?.ru || "Экскурсия | SKTransfer"
  const description = excursionDescriptions[params.id]?.ru || "Экскурсии по Беларуси с профессиональным гидом"

  return {
    title,
    description,
    keywords: ["экскурсия", params.id, "Беларусь", "Минск", "гид", "трансфер", "SKTransfer", "экскурсионный тур"],
    openGraph: {
      title,
      description,
      url: `https://sktransfer.by/excursions/${params.id}`,
      siteName: "SKTransfer.by",
      images: [
        {
          url: `/og-excursion-${params.id}.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og-excursion-${params.id}.jpg`],
    },
    alternates: {
      canonical: `https://sktransfer.by/excursions/${params.id}`,
      languages: {
        ru: `https://sktransfer.by/excursions/${params.id}`,
        en: `https://sktransfer.by/excursions/${params.id}`,
      },
    },
  }
}

interface Excursion {
  id: string
  name: string
  description: string
  duration: string
  groupSize: string
  price: string
  images: string[]
  highlights: string[]
  included: string[]
}

async function getExcursions(locale: Locale): Promise<Excursion[]> {
  const t = translations[locale]

  return [
    {
      id: "minsk-city-tour",
      name: locale === "ru" ? "Обзорная экскурсия по Минску" : locale === "en" ? "Minsk City Tour" : "明斯克城市游",
      description:
        locale === "ru"
          ? "Познакомьтесь с главными достопримечательностями столицы Беларуси. Увидите проспект Независимости, Троицкое предместье, Верхний город и многое другое."
          : locale === "en"
            ? "Discover the main attractions of Belarus capital. See Independence Avenue, Trinity Suburb, Upper Town and much more."
            : "探索白俄罗斯首都的主要景点。参观独立大道、三一郊区、上城等。",
      duration: locale === "ru" ? "3 часа" : locale === "en" ? "3 hours" : "3小时",
      groupSize: locale === "ru" ? "до 15 человек" : locale === "en" ? "up to 15 people" : "最多15��",
      price: locale === "ru" ? "по согласованию" : locale === "en" ? "by agreement" : "价格协商",
      images: [
        "/minsk-city-tour-architecture.jpg",
        "/minsk-independence-avenue.jpg",
        "/minsk-trinity-suburb.jpg",
        "/minsk-upper-town-view.jpg",
      ],
      highlights:
        locale === "ru"
          ? [
              "Проспект Независимости",
              "Площадь Независимости",
              "Троицкое предместье",
              "Верхний город",
              "Остров слёз",
              "Национальная библиотека",
            ]
          : locale === "en"
            ? [
                "Independence Avenue",
                "Independence Square",
                "Trinity Suburb",
                "Upper Town",
                "Island of Tears",
                "National Library",
              ]
            : ["独立大道", "独立广场", "三一郊区", "上城", "泪之岛", "国家图书馆"],
      included:
        locale === "ru"
          ? ["Трансфер", "Профессиональный гид", "Входные билеты"]
          : locale === "en"
            ? ["Transfer", "Professional guide", "Entrance tickets"]
            : ["接送", "专业导游", "门票"],
    },
    {
      id: "brest-fortress",
      name: locale === "ru" ? "Брестская крепость" : locale === "en" ? "Brest Fortress" : "布列斯特要塞",
      description:
        locale === "ru"
          ? "Посетите легендарную Брестскую крепость - символ мужества и героизма защитников в первые дни Великой Отечественной войны."
          : locale === "en"
            ? "Visit the legendary Brest Fortress - a symbol of courage and heroism of defenders in the first days of WWII."
            : "参观传奇的布列斯特要塞 - 二战初期保卫者勇气和英雄主义的象征。",
      duration: locale === "ru" ? "Полный день" : locale === "en" ? "Full day" : "全天",
      groupSize: locale === "ru" ? "до 20 человек" : locale === "en" ? "up to 20 people" : "最多20人",
      price: locale === "ru" ? "по согласованию" : locale === "en" ? "by agreement" : "价格协商",
      images: [
        "/brest-fortress-memorial-belarus.jpg",
        "/brest-fortress-entrance.jpg",
        "/brest-fortress-monument.jpg",
        "/brest-fortress-museum.jpg",
      ],
      highlights:
        locale === "ru"
          ? [
              "Мемориальный комплекс",
              "Музей обороны",
              "Монумент 'Мужество'",
              "Холмские ворота",
              "Руины казарм",
              "Вечный огонь",
            ]
          : locale === "en"
            ? [
                "Memorial Complex",
                "Defense Museum",
                "Courage Monument",
                "Kholm Gate",
                "Barracks Ruins",
                "Eternal Flame",
              ]
            : ["纪念建筑群", "防御博物馆", "勇气纪念碑", "霍尔姆门", "兵营废墟", "永恒之火"],
      included:
        locale === "ru"
          ? ["Трансфер из Минска", "Профессиональный гид", "Входные билеты", "Обед"]
          : locale === "en"
            ? ["Transfer from Minsk", "Professional guide", "Entrance tickets", "Lunch"]
            : ["从明斯克接送", "专业导游", "门票", "午餐"],
    },
    {
      id: "mir-nesvizh",
      name:
        locale === "ru"
          ? "Мирский и Несвижский замки"
          : locale === "en"
            ? "Mir and Nesvizh Castles"
            : "米尔和涅斯维日城堡",
      description:
        locale === "ru"
          ? "Посетите два величественных замка, включенных в список Всемирного наследия ЮНЕСКО. Узнайте историю рода Радзивиллов."
          : locale === "en"
            ? "Visit two magnificent castles included in the UNESCO World Heritage List. Learn about the history of the Radziwill family."
            : "参观两座被列入联合国教科文组织世界遗产名录的宏伟城堡。了解拉济维乌家族的历史。",
      duration: locale === "ru" ? "Полный день" : locale === "en" ? "Full day" : "全天",
      groupSize: locale === "ru" ? "до 15 человек" : locale === "en" ? "up to 15 people" : "最多15人",
      price: locale === "ru" ? "по согласованию" : locale === "en" ? "by agreement" : "价格协商",
      images: [
        "/nesvizh-castle-belarus-unesco.jpg",
        "/mir-castle-belarus.jpg",
        "/nesvizh-castle-interior.jpg",
        "/mir-castle-towers.jpg",
      ],
      highlights:
        locale === "ru"
          ? [
              "Мирский замок XVI века",
              "Несвижский дворцово-парковый ансамбль",
              "Фарный костёл",
              "Парк и озеро",
              "Музейные экспозиции",
              "Дегустация местной кухни",
            ]
          : locale === "en"
            ? [
                "Mir Castle XVI century",
                "Nesvizh Palace Complex",
                "Farny Church",
                "Park and Lake",
                "Museum Exhibitions",
                "Local Cuisine Tasting",
              ]
            : ["16世纪米尔城堡", "涅斯维日宫殿建筑群", "法尔内教堂", "公园和湖泊", "博物馆展览", "当地美食品尝"],
      included:
        locale === "ru"
          ? ["Трансфер из Минска", "Профессиональный гид", "Входные билеты", "Обед"]
          : locale === "en"
            ? ["Transfer from Minsk", "Professional guide", "Entrance tickets", "Lunch"]
            : ["从明斯克接送", "专业导游", "门票", "午餐"],
    },
    {
      id: "khatyn-memorial",
      name:
        locale === "ru"
          ? "Мемориальный комплекс Хатынь"
          : locale === "en"
            ? "Khatyn Memorial Complex"
            : "哈廷纪念建筑群",
      description:
        locale === "ru"
          ? "Посетите трогательный мемориал памяти 149 белорусских деревень, сожженных вместе с жителями в годы войны."
          : locale === "en"
            ? "Visit the touching memorial dedicated to 149 Belarusian villages burned with their inhabitants during the war."
            : "参观纪念战争期间与居民一起被烧毁的149个白俄罗斯村庄的感人纪念馆。",
      duration: locale === "ru" ? "4-5 часов" : locale === "en" ? "4-5 hours" : "4-5小时",
      groupSize: locale === "ru" ? "до 20 человек" : locale === "en" ? "up to 20 people" : "最多20人",
      price: locale === "ru" ? "по согласованию" : locale === "en" ? "by agreement" : "价格协商",
      images: [
        "/khatyn-memorial-belarus.jpg",
        "/khatyn-eternal-flame.jpg",
        "/khatyn-cemetery-villages.jpg",
        "/khatyn-bells.jpg",
      ],
      highlights:
        locale === "ru"
          ? [
              "Скульптура 'Непокоренный человек'",
              "Символические трубы-колокола",
              "Кладбище деревень",
              "Вечный огонь",
              "Музей истории Хатыни",
              "Стена памяти",
            ]
          : locale === "en"
            ? [
                "Unconquered Man Sculpture",
                "Symbolic Bell-Chimneys",
                "Cemetery of Villages",
                "Eternal Flame",
                "Khatyn History Museum",
                "Memorial Wall",
              ]
            : ["不屈的人雕塑", "象征性的钟烟囱", "村庄公墓", "永恒之火", "哈廷历史博物馆", "纪念墙"],
      included:
        locale === "ru"
          ? ["Трансфер из Минска", "Профессиональный гид", "Входные билеты"]
          : locale === "en"
            ? ["Transfer from Minsk", "Professional guide", "Entrance tickets"]
            : ["从明斯克接送", "专业导游", "门票"],
    },
    {
      id: "dudutki-museum",
      name:
        locale === "ru"
          ? "Музей народных ремесел Дудутки"
          : locale === "en"
            ? "Dudutki Folk Crafts Museum"
            : "杜杜特基民间工艺博物馆",
      description:
        locale === "ru"
          ? "Окунитесь в атмосферу старинной белорусской деревни. Попробуйте национальные блюда и увидите работу мастеров."
          : locale === "en"
            ? "Immerse yourself in the atmosphere of an old Belarusian village. Try national dishes and see craftsmen at work."
            : "沉浸在古老的白俄罗斯村庄的氛围中。品尝民族美食，观看工匠工作。",
      duration: locale === "ru" ? "4-5 часов" : locale === "en" ? "4-5 hours" : "4-5小时",
      groupSize: locale === "ru" ? "до 15 человек" : locale === "en" ? "up to 15 people" : "最多15人",
      price: locale === "ru" ? "по согласованию" : locale === "en" ? "by agreement" : "价格协商",
      images: [
        "/dudutki-museum-belarus-crafts.jpg",
        "/dudutki-windmill.jpg",
        "/dudutki-pottery-workshop.jpg",
        "/dudutki-traditional-cuisine.jpg",
      ],
      highlights:
        locale === "ru"
          ? [
              "Ветряная мельница",
              "Кузница и гончарная мастерская",
              "Дегустация самогона и сыра",
              "Конная прогулка",
              "Мини-зоопарк",
              "Традиционная кухня",
            ]
          : locale === "en"
            ? [
                "Windmill",
                "Blacksmith and Pottery",
                "Moonshine and Cheese Tasting",
                "Horse Ride",
                "Mini Zoo",
                "Traditional Cuisine",
              ]
            : ["风车", "铁匠和陶器", "月光酒和奶酪品尝", "骑马", "迷你动物园", "传统美食"],
      included:
        locale === "ru"
          ? ["Трансфер из Минска", "Профессиональный гид", "Входные билеты", "Дегустация", "Обед"]
          : locale === "en"
            ? ["Transfer from Minsk", "Professional guide", "Entrance tickets", "Tasting", "Lunch"]
            : ["从明斯克接送", "专业导游", "门票", "品尝", "午餐"],
    },
    {
      id: "belovezhskaya-pushcha",
      name: locale === "ru" ? "Беловежская пуща" : locale === "en" ? "Belovezhskaya Pushcha" : "别洛韦日森林",
      description:
        locale === "ru"
          ? "Посетите древнейший лес Европы, объект Всемирного наследия ЮНЕСКО. Увидите зубров и резиденцию белорусского Деда Мороза."
          : locale === "en"
            ? "Visit Europe's oldest forest, a UNESCO World Heritage site. See bison and the Belarusian Santa Claus residence."
            : "参观欧洲最古老的森林，联合国教科文组织世界遗产。观看野牛和白俄罗斯圣诞老人的住所。",
      duration: locale === "ru" ? "Полный день" : locale === "en" ? "Full day" : "全天",
      groupSize: locale === "ru" ? "до 15 человек" : locale === "en" ? "up to 15 people" : "最多15人",
      price: locale === "ru" ? "по согласованию" : locale === "en" ? "by agreement" : "价格协商",
      images: [
        "/belovezhskaya-pushcha-forest.jpg",
        "/belovezhskaya-pushcha-bison.jpg",
        "/belovezhskaya-pushcha-ded-moroz.jpg",
        "/belovezhskaya-pushcha-nature.jpg",
      ],
      highlights:
        locale === "ru"
          ? [
              "Музей природы",
              "Вольеры с зубрами и другими животными",
              "Поместье Деда Мороза",
              "Экологические тропы",
              "Древние дубы",
              "Обед в ресторане",
            ]
          : locale === "en"
            ? [
                "Nature Museum",
                "Bison and Wildlife Enclosures",
                "Santa Claus Estate",
                "Ecological Trails",
                "Ancient Oaks",
                "Restaurant Lunch",
              ]
            : ["自然博物馆", "野牛和野生动物围栏", "圣诞老人庄园", "生态小径", "古橡树", "餐厅午餐"],
      included:
        locale === "ru"
          ? ["Трансфер из Минска", "Профессиональный гид", "Входные билеты", "Обед"]
          : locale === "en"
            ? ["Transfer from Minsk", "Professional guide", "Entrance tickets", "Lunch"]
            : ["从明斯克接送", "专业导游", "门票", "午餐"],
    },
  ]
}

export const dynamic = "force-dynamic"

export default async function ExcursionPage({
  searchParams,
  params,
}: {
  searchParams: { lang?: string }
  params: { id: string }
}) {
  const locale = (searchParams.lang as Locale) || "ru"
  const excursions = await getExcursions(locale)

  return <ExcursionDetailPageClient excursions={excursions} />
}
