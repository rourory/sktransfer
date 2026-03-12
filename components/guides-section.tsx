"use client"

import { type Locale, translations } from "@/lib/i18n"
import { Languages, Award, Star, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface GuidesSectionProps {
  locale: Locale
}

export function GuidesSection({ locale }: GuidesSectionProps) {
  const t = translations[locale]
  const router = useRouter()

  const guides = [
    {
      id: "andrey",
      name: t.guides.andrey.name,
      experience: t.guides.andrey.experience,
      description: t.guides.andrey.description,
      languages: ["Русский", "English"],
      image: "/andrey-guide-photo-1.jpg",
      rating: 5,
      tours: 1500,
    },
    {
      id: "maria",
      name: t.guides.maria.name,
      experience: t.guides.maria.experience,
      description: t.guides.maria.description,
      languages: ["Русский"],
      image: "/maria-guide-photo-1.jpg",
      rating: 5,
      tours: 1200,
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
      {guides.map((guide, index) => (
        <div
          key={index}
          onClick={() => router.push(`/guides/${guide.id}`)}
          className="group relative transition-transform duration-300 hover:scale-[1.02] cursor-pointer h-full"
        >
          <div className="relative bg-white rounded-2xl overflow-hidden border-2 border-[var(--gold)]/20 hover:border-[var(--gold)]/50 transition-colors shadow-xl hover:shadow-2xl flex flex-col h-full">
            <div className="p-6 sm:p-8 flex-1 flex flex-col">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                  <img
                    src={guide.image || "/placeholder.svg"}
                    alt={guide.name}
                    className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-contain bg-gray-50"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[var(--gold-dark)] transition-colors">
                    {guide.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--gold-dark)] font-medium mb-2 sm:mb-3">
                    {guide.experience}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-2 sm:mb-3">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {[...Array(guide.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-[var(--gold)] text-[var(--gold)]" />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">
                      {guide.tours}+ {locale === "ru" ? "экскурсий" : locale === "en" ? "tours" : "游览"}
                    </span>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <Languages className="h-3 w-3 sm:h-4 sm:w-4 text-[var(--gold-dark)] flex-shrink-0" />
                    {guide.languages.map((lang, i) => (
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

              <p className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-3 text-gray-700 flex-1">
                {guide.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 pt-4 sm:pt-6 border-t border-gray-200 mt-auto">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--gold-dark)] flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-center sm:text-left text-gray-700 font-medium">
                    {locale === "ru"
                      ? "Аккредитованный экскурсовод"
                      : locale === "en"
                        ? "Accredited tour guide"
                        : "认证导游"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[var(--gold-dark)] font-semibold group-hover:gap-3 transition-all">
                  <span className="text-xs sm:text-sm">
                    {locale === "ru" ? "Подробнее" : locale === "en" ? "View details" : "查看详情"}
                  </span>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
