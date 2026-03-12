"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { CalculatorForm } from "@/components/calculator-form"
import { AirportTariffs } from "@/components/airport-tariffs"

function CalculatorPageClient() {
  const { locale } = useLanguage()
  const t = translations[locale]

  return (
    <main className="pt-20 sm:pt-24 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/luxury-black-premium-car-night-cityscape.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/98 via-white/95 to-white/98" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 sm:mb-4 gold-gradient-text">
                {t.calculator.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
                {t.calculator.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <CalculatorForm locale={locale} />
              <AirportTariffs locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CalculatorPageClient
export { CalculatorPageClient }
