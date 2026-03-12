"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Users, CheckCircle, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

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

interface ExcursionDetailPageClientProps {
  excursions: Excursion[]
}

export default function ExcursionDetailPageClient({ excursions }: ExcursionDetailPageClientProps) {
  const router = useRouter()
  const params = useParams()
  const excursionId = params.id as string
  const { locale } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const excursion = excursions.find((e) => e.id === excursionId)

  if (!excursion) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            {locale === "ru" ? "Экскурсия не найдена" : locale === "en" ? "Excursion not found" : "未找到游览"}
          </h1>
          <Button onClick={() => router.push("/excursions")}>
            {locale === "ru" ? "Вернуться к экскурсиям" : locale === "en" ? "Back to excursions" : "返回游览"}
          </Button>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % excursion.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + excursion.images.length) % excursion.images.length)
  }

  const handleBookExcursion = () => {
    router.push(`/calculator?excursion=${excursionId}`)
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(218,165,32,0.08),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(218,165,32,0.05),transparent_50%)] bg-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <Button
          variant="ghost"
          onClick={() => router.push("/excursions")}
          className="mb-8 text-[var(--gold-dark)] hover:text-[var(--gold)] transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="font-medium">
            {locale === "ru" ? "Назад к экскурсиям" : locale === "en" ? "Back to excursions" : "返回游览"}
          </span>
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4 sm:space-y-6">
            <div className="relative min-h-[300px] max-h-[400px] rounded-2xl overflow-hidden border-2 border-[var(--gold)]/30 shadow-2xl bg-gray-50">
              <img
                src={excursion.images[currentImageIndex] || "/placeholder.svg"}
                alt={excursion.name}
                className="w-full h-full object-cover"
              />

              {excursion.images.length > 1 && (
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

            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {excursion.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative h-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all bg-gray-50 ${
                    currentImageIndex === idx
                      ? "border-[var(--gold)] shadow-lg scale-105"
                      : "border-gray-200 hover:border-[var(--gold)]/50 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${excursion.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Excursion Details */}
          <div className="space-y-6 sm:space-y-8 min-w-0">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 break-words">
                {excursion.name}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words">
                {excursion.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="glass-effect rounded-xl p-4 sm:p-6 border border-[var(--gold)]/20 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[var(--gold)]/10 rounded-lg">
                    <Clock className="h-5 w-5 text-[var(--gold)]" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {locale === "ru" ? "Длительность" : locale === "en" ? "Duration" : "持续时间"}
                  </span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-foreground break-words">{excursion.duration}</p>
              </div>

              <div className="glass-effect rounded-xl p-4 sm:p-6 border border-[var(--gold)]/20 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[var(--gold)]/10 rounded-lg">
                    <Users className="h-5 w-5 text-[var(--gold)]" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {locale === "ru" ? "Группа" : locale === "en" ? "Group" : "团队"}
                  </span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-foreground break-words">{excursion.groupSize}</p>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-4 sm:p-6 border border-[var(--gold)]/20">
              <div className="flex items-center justify-between">
                <span className="text-base sm:text-lg font-semibold text-foreground">
                  {locale === "ru" ? "Стоимость" : locale === "en" ? "Price" : "价格"}
                </span>
                <span className="text-xl sm:text-2xl font-bold gold-gradient-text">{excursion.price}</span>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-4 sm:p-6 border border-[var(--gold)]/20">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-[var(--gold)]" />
                {locale === "ru" ? "Основные точки маршрута" : locale === "en" ? "Highlights" : "亮点"}
              </h3>
              <div className="space-y-3">
                {excursion.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 min-w-0">
                    <CheckCircle className="h-5 w-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-muted-foreground break-words">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-effect rounded-xl p-4 sm:p-6 border border-[var(--gold)]/20">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                {locale === "ru" ? "Включено в стоимость" : locale === "en" ? "Included" : "包括"}
              </h3>
              <div className="space-y-3">
                {excursion.included.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 min-w-0">
                    <CheckCircle className="h-5 w-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-muted-foreground break-words">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleBookExcursion}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {locale === "ru" ? "Заказать экскурсию" : locale === "en" ? "Book Excursion" : "预订游览"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
