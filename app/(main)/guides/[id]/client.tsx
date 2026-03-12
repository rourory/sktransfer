"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Star, Languages, Award, MapPin, Users, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

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

interface GuideDetailPageClientProps {
  guides: Guide[]
}

export default function GuideDetailPageClient({ guides }: GuideDetailPageClientProps) {
  const router = useRouter()
  const params = useParams()
  const guideId = params.id as string
  const { locale } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const guide = guides.find((g) => g.id === guideId)

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            {locale === "ru" ? "Гид не найден" : locale === "en" ? "Guide not found" : "未找到导游"}
          </h1>
          <Button onClick={() => router.push("/guides")}>
            {locale === "ru" ? "Вернуться к гидам" : locale === "en" ? "Back to guides" : "返回导游"}
          </Button>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % guide.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + guide.images.length) % guide.images.length)
  }

  const handleBookTour = () => {
    router.push("/contacts")
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(218,165,32,0.08),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(218,165,32,0.05),transparent_50%)] bg-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <button
          onClick={() => router.push("/guides")}
          className="inline-flex items-center gap-2 text-[var(--gold-dark)] hover:text-[var(--gold)] transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">
            {locale === "ru" ? "Назад к гидам" : locale === "en" ? "Back to guides" : "返回导游"}
          </span>
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4 sm:space-y-6">
            <div className="relative min-h-[300px] max-h-[400px] rounded-2xl overflow-hidden border-2 border-[var(--gold)]/30 shadow-2xl bg-gray-50">
              <div className="absolute top-4 right-4 z-20">
                <div className="backdrop-blur-md bg-white/90 border border-[var(--gold)]/30 rounded-full px-4 py-2 flex items-center gap-2">
                  <Star className="h-5 w-5 fill-[var(--gold)] text-[var(--gold)]" />
                  <span className="font-semibold text-gray-800">{guide.rating}.0</span>
                </div>
              </div>
              <img
                src={guide.images[currentImageIndex] || "/placeholder.svg"}
                alt={guide.name}
                className="w-full h-full object-cover"
              />
              {guide.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {guide.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {guide.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative h-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all bg-gray-50 ${
                      currentImageIndex === idx
                        ? "border-[var(--gold)] shadow-lg scale-105"
                        : "border-gray-200 hover:border-[var(--gold)]/50 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Guide Info */}
          <div className="space-y-6 sm:space-y-8 min-w-0">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 break-words">
                {guide.name}
              </h1>
              <p className="text-lg sm:text-xl text-[var(--gold)] font-medium mb-6">{guide.experience}</p>

              <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-[var(--gold)]/20">
                  <Users className="h-5 w-5 text-[var(--gold)]" />
                  <span className="text-sm font-medium text-foreground">
                    {guide.tours}+ {locale === "ru" ? "экскурсий" : locale === "en" ? "tours" : "游览"}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-[var(--gold)]/20">
                  <Award className="h-5 w-5 text-[var(--gold)]" />
                  <span className="text-sm font-medium text-foreground">
                    {locale === "ru" ? "Аккредитован" : locale === "en" ? "Accredited" : "认证"}
                  </span>
                </div>
              </div>

              <div className="glass-effect p-4 sm:p-6 rounded-xl border border-[var(--gold)]/20 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Languages className="h-5 w-5 text-[var(--gold)]" />
                  <span className="font-semibold text-foreground">
                    {locale === "ru" ? "Языки" : locale === "en" ? "Languages" : "语言"}:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {guide.languages.map((lang, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-[var(--gold)]/10 to-amber-100/50 border border-[var(--gold)]/20 rounded-full text-sm font-medium text-foreground"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-effect p-4 sm:p-6 rounded-xl border border-[var(--gold)]/20">
              <p className="text-base sm:text-lg leading-relaxed text-foreground break-words">{guide.description}</p>
            </div>

            <div className="glass-effect p-4 sm:p-6 rounded-xl border border-[var(--gold)]/20">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-[var(--gold)]" />
                {locale === "ru" ? "Специализация" : locale === "en" ? "Specialization" : "专业"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {guide.specializations.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] flex-shrink-0" />
                    <span className="break-words">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-effect p-4 sm:p-6 rounded-xl border border-[var(--gold)]/20">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[var(--gold)]" />
                {locale === "ru" ? "Популярные маршруты" : locale === "en" ? "Popular Routes" : "热门路线"}
              </h3>
              <ul className="space-y-2">
                {guide.popularRoutes.map((route, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] flex-shrink-0 mt-2" />
                    <span className="text-sm sm:text-base break-words">{route}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={handleBookTour}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {locale === "ru" ? "Заказать экскурсию" : locale === "en" ? "Book a tour" : "预订旅游"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
