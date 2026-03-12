"use client"

import type React from "react"
import type { Locale } from "@/lib/i18n"
import { Compass, Star, ArrowRight, Languages } from "lucide-react"
import { useRouter } from "next/navigation"

interface ExcursionsSectionProps {
  locale: Locale
}

export function ExcursionsSection({ locale }: ExcursionsSectionProps) {
  const router = useRouter()

  const excursions = [
    {
      id: "minsk-city-tour",
      name: {
        ru: "Обзорная экскурсия по Минску",
        en: "Minsk City Tour",
        zh: "明斯克城市游",
      },
      description: {
        ru: "Познакомьтесь с главными достопримечательностями столицы Беларуси: площадь Независимости, проспект Победителей, Троицкое предместье. Узнайте историю города от его основания до современности.",
        en: "Discover the main attractions of Belarus capital: Independence Square, Victory Avenue, Trinity Suburb. Learn the history from its foundation to modern times.",
        zh: "探索白俄罗斯首都的主要景点：独立广场、胜利大道、三一郊区。了解从建国到现代的历史。",
      },
      duration: {
        ru: "3 часа",
        en: "3 hours",
        zh: "3小时",
      },
      languages: ["Русский", "English"],
      image: "/minsk-independence-avenue.jpg",
      rating: 5,
      tours: 850,
    },
    {
      id: "brest-fortress",
      name: {
        ru: "Брестская крепость",
        en: "Brest Fortress",
        zh: "布列斯特要塞",
      },
      description: {
        ru: "Посетите героическую крепость, первой принявшую удар в 1941 году. Мемориальный комплекс, музей обороны, Холмские ворота. История подвига защитников крепости.",
        en: "Visit the heroic fortress that first took the blow in 1941. Memorial complex, defense museum, Kholm Gate. Story of fortress defenders' feat.",
        zh: "参观1941年第一个承受打击的英雄要塞。纪念建筑群、国防博物馆、霍尔姆门。要塞保卫者的英雄事迹。",
      },
      duration: {
        ru: "Полный день",
        en: "Full day",
        zh: "全天",
      },
      languages: ["Русский", "English"],
      image: "/brest-fortress-entrance.jpg",
      rating: 5,
      tours: 620,
    },
    {
      id: "mir-nesvizh",
      name: {
        ru: "Мирский и Несвижский замки",
        en: "Mir and Nesvizh Castles",
        zh: "米尔和涅斯维日城堡",
      },
      description: {
        ru: "Два объекта всемирного наследия ЮНЕСКО в одной поездке. Познакомьтесь с архитектурой средневековых замков, прогуляйтесь по паркам и узнайте историю княжеского рода Радзивиллов.",
        en: "Two UNESCO World Heritage sites in one trip. Explore medieval castle architecture, walk through parks and learn the history of the Radziwill princely family.",
        zh: "一次旅行中的两个联合国教科文组织世界遗产。探索中世纪城堡建筑，漫步公园，了解拉济维尔王室家族的历史。",
      },
      duration: {
        ru: "Полный день",
        en: "Full day",
        zh: "全天",
      },
      languages: ["Русский", "English"],
      image: "/nesvizh-castle-belarus-unesco.jpg",
      rating: 5,
      tours: 1200,
    },
    {
      id: "khatyn-memorial",
      name: {
        ru: "Мемориальный комплекс Хатынь",
        en: "Khatyn Memorial Complex",
        zh: "哈廷纪念建筑群",
      },
      description: {
        ru: "Посетите мемориал памяти жертв Великой Отечественной войны. Узнайте трагическую историю сожженной деревни и почтите память погибших в одном из самых трогательных мест Беларуси.",
        en: "Visit the memorial to the victims of World War II. Learn the tragic story of the burned village and honor the memory of the victims in one of Belarus's most touching places.",
        zh: "参观二战受害者纪念碑。了解被烧毁村庄的悲惨历史，在白俄罗斯最感人的地方之一纪念遇难者。",
      },
      duration: {
        ru: "4-5 часов",
        en: "4-5 hours",
        zh: "4-5小时",
      },
      languages: ["Русский", "English"],
      image: "/khatyn-memorial-belarus.jpg",
      rating: 5,
      tours: 950,
    },
    {
      id: "dudutki-museum",
      name: {
        ru: "Музей народных ремесел Дудутки",
        en: "Dudutki Folk Crafts Museum",
        zh: "杜杜特基民间工艺博物馆",
      },
      description: {
        ru: "Окунитесь в атмосферу старинной белорусской деревни. Увидьте работу мастеров традиционных ремесел, попробуйте национальные блюда и напитки. Интерактивная экскурсия для всей семьи.",
        en: "Immerse yourself in the atmosphere of an old Belarusian village. See traditional craftsmen at work, try national dishes and drinks. Interactive tour for the whole family.",
        zh: "沉浸在古老白俄罗斯村庄的氛围中。观看传统工匠的工作，品尝民族菜肴和饮料。适合全家的互动游览。",
      },
      duration: {
        ru: "4-5 часов",
        en: "4-5 hours",
        zh: "4-5小时",
      },
      languages: ["Русский", "English"],
      image: "/dudutki-museum-belarus-crafts.jpg",
      rating: 5,
      tours: 700,
    },
    {
      id: "belovezhskaya-pushcha",
      name: {
        ru: "Беловежская пуща",
        en: "Belovezhskaya Pushcha",
        zh: "别洛韦日森林",
      },
      description: {
        ru: "Посетите древнейший лес Европы и резиденцию белорусского Деда Мороза. Увидьте зубров в естественной среде обитания, прогуляйтесь по экологическим тропам заповедника.",
        en: "Visit Europe's oldest forest and the residence of the Belarusian Santa Claus. See bison in their natural habitat, walk along ecological trails of the reserve.",
        zh: "参观欧洲最古老的森林和白俄罗斯圣诞老人的住所。在自然栖息地观看野牛，沿着保护区的生态步道漫步。",
      },
      duration: {
        ru: "Полный день",
        en: "Full day",
        zh: "全天",
      },
      languages: ["Русский", "English"],
      image: "/belovezhskaya-pushcha-forest.jpg",
      rating: 5,
      tours: 500,
    },
  ]

  const handleExcursionClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/excursions/${id}`)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
      {excursions.map((excursion) => (
        <div key={excursion.id} onClick={(e) => handleExcursionClick(e, excursion.id)} className="group cursor-pointer">
          <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 h-full flex flex-col transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 hover:border-[var(--gold)]/40">
            <div className="p-6 sm:p-8 flex flex-col flex-1">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <img
                    src={excursion.image || "/placeholder.svg"}
                    alt={excursion.name[locale]}
                    className="w-full sm:w-32 h-48 sm:h-32 rounded-2xl object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-[var(--gold-dark)]">
                    {excursion.name[locale]}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--gold-dark)] font-medium mb-2 sm:mb-3">
                    {excursion.duration[locale]}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-2 sm:mb-3">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {[...Array(excursion.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-[var(--gold)] text-[var(--gold)]" />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">
                      {excursion.tours}+ {locale === "ru" ? "туров" : locale === "en" ? "tours" : "游览"}
                    </span>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <Languages className="h-3 w-3 sm:h-4 sm:w-4 text-[var(--gold-dark)] flex-shrink-0" />
                    {excursion.languages.map((lang, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 sm:py-1 bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-full text-[var(--gold-dark)] font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                {excursion.description[locale]}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 pt-4 sm:pt-6 border-t border-gray-200 mt-auto">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--gold-dark)] flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-700 text-center sm:text-left font-medium">
                    {locale === "ru" ? "Профессиональный гид" : locale === "en" ? "Professional guide" : "专业导游"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[var(--gold-dark)] font-semibold">
                  <span className="text-xs sm:text-sm">
                    {locale === "ru" ? "Подробнее" : locale === "en" ? "View details" : "查看详情"}
                  </span>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
