"use client"

import { translations } from "@/lib/i18n"
import { ArrowLeft, Users, Briefcase, Sparkles, ShieldCheck, Gauge, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

interface Vehicle {
  id: string
  category: string
  model: string
  images: string[]
  passengers: number
  luggage: number
  price: string
  year: string
  details: {
    engine: string
    power: string
    transmission: string
    fuel: string
    comfort: string
    description: string
    features: string[]
  }
}

interface VehiclePageProps {
  vehicles: Vehicle[]
}

export default function VehiclePageClient({ vehicles }: VehiclePageProps) {
  const router = useRouter()
  const params = useParams()
  const vehicleId = params.id as string
  const { locale } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const t = translations[locale]

  const vehicle = vehicles.find((v) => v.id === vehicleId)

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            {t.fleet.vehicleNotFound ||
              (locale === "ru" ? "Автомобиль не найден" : locale === "en" ? "Vehicle not found" : "未找到车辆")}
          </h1>
          <Link href="/fleet">
            <Button>
              {t.fleet.backToFleet ||
                (locale === "ru" ? "Вернуться к автопарку" : locale === "en" ? "Back to fleet" : "返回车队")}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleBook = () => {
    const tariffMap: Record<string, string> = {
      [t.tariffs.standard]: "standard",
      [t.tariffs.comfort]: "comfort",
      [t.tariffs.business]: "business",
      [t.tariffs.minivan]: "minivan",
      [t.tariffs.vip]: "vip",
      [t.tariffs.minibus]: "minibus",
    }
    const tariff = tariffMap[vehicle.category]
    router.push(`/calculator?tariff=${tariff}`)
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(218,165,32,0.08),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(218,165,32,0.05),transparent_50%)] bg-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <Link
          href="/fleet"
          className="inline-flex items-center gap-2 text-[var(--gold-dark)] hover:text-[var(--gold)] transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">
            {t.fleet.backToFleet ||
              (locale === "ru" ? "Назад к автопарку" : locale === "en" ? "Back to fleet" : "返回车队")}
          </span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          <div className="space-y-4 sm:space-y-6">
            <div className="relative min-h-[300px] max-h-[400px] rounded-2xl overflow-hidden border-2 border-[var(--gold)]/30 shadow-2xl bg-gray-50">
              <div className="absolute top-4 left-4 z-20">
                <div className="backdrop-blur-md bg-[var(--gold)]/20 border border-[var(--gold)]/30 rounded-full px-5 py-2">
                  <span className="text-sm tracking-wider text-[var(--gold-dark)] uppercase font-bold">
                    {vehicle.category}
                  </span>
                </div>
              </div>
              <div className="absolute top-4 right-4 z-20">
                <div className="backdrop-blur-md bg-white/90 border border-[var(--gold)]/30 rounded-full px-5 py-2 text-muted">
                  <span className="text-2xl font-bold gold-gradient-text">{vehicle.price} BYN/км</span>
                </div>
              </div>
              <img
                src={vehicle.images[currentImageIndex] || "/placeholder.svg"}
                alt={vehicle.model}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {vehicle.images.map((img, idx) => (
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
                    alt={`${vehicle.model} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 min-w-0">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 break-words">
                {vehicle.model}
              </h1>
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="h-5 w-5 fill-[var(--gold)] text-[var(--gold)]" />
                ))}
              </div>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words">
                {vehicle.details.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="glass-effect rounded-xl p-4 sm:p-6 border border-[var(--gold)]/20 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[var(--gold)]/10 rounded-lg">
                    <Gauge className="h-5 w-5 text-[var(--gold)]" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t.fleet.engine || (locale === "ru" ? "Двигатель" : locale === "en" ? "Engine" : "发动机")}
                  </span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-foreground break-words">{vehicle.details.engine}</p>
                <p className="text-xs sm:text-sm text-[var(--gold-dark)] mt-1 break-words">{vehicle.details.power}</p>
              </div>

              <div className="glass-effect rounded-xl p-4 sm:p-6 border border-[var(--gold)]/20 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[var(--gold)]/10 rounded-lg">
                    <Users className="h-5 w-5 text-[var(--gold)]" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t.fleet.passengers || (locale === "ru" ? "Пассажиры" : locale === "en" ? "Passengers" : "乘客")}
                  </span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-foreground">{vehicle.passengers}</p>
                <p className="text-xs sm:text-sm text-[var(--gold-dark)] mt-1">
                  {t.fleet.people || (locale === "ru" ? "человек" : locale === "en" ? "people" : "人")}
                </p>
              </div>

              <div className="glass-effect rounded-xl p-4 sm:p-6 border border-[var(--gold)]/20 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[var(--gold)]/10 rounded-lg">
                    <Briefcase className="h-5 w-5 text-[var(--gold)]" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t.fleet.luggage || (locale === "ru" ? "Багаж" : locale === "en" ? "Luggage" : "行李")}
                  </span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-foreground">{vehicle.luggage}</p>
                <p className="text-xs sm:text-sm text-[var(--gold-dark)] mt-1">
                  {t.fleet.pieces || (locale === "ru" ? "мест" : locale === "en" ? "pieces" : "件")}
                </p>
              </div>

              <div className="glass-effect rounded-xl p-4 sm:p-6 border border-[var(--gold)]/20 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[var(--gold)]/10 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-[var(--gold)]" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t.fleet.year || (locale === "ru" ? "Год" : locale === "en" ? "Year" : "年份")}
                  </span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-foreground">{vehicle.year}</p>
                <p className="text-xs sm:text-sm text-[var(--gold-dark)] mt-1">
                  {t.fleet.model || (locale === "ru" ? "выпуска" : locale === "en" ? "model" : "型号")}
                </p>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-4 sm:p-6 border border-[var(--gold)]/20">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[var(--gold)]" />
                {t.fleet.features || (locale === "ru" ? "Особенности" : locale === "en" ? "Features" : "特点")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.details.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 min-w-0">
                    <CheckCircle2 className="h-5 w-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-muted-foreground break-words">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleBook}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {t.fleet.book}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
