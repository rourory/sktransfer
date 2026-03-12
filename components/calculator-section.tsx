"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Locale, translations } from "@/lib/i18n"
import { Calculator, Car, DollarSign, Send, Loader2 } from "lucide-react"

interface CalculatorSectionProps {
  locale: Locale
}

const tariffs = {
  standard: { price: 1.3, name: "standard", icon: "🚗" },
  comfort: { price: 1.5, name: "comfort", icon: "🚙" },
  business: { price: 3.0, name: "business", icon: "🚘" },
  minivan: { price: 2.2, name: "minivan", icon: "🚐" },
  vip: { price: 3.0, name: "vip", icon: "✨" },
  minibus: { price: 3.0, name: "minibus", icon: "🚌" },
}

const airportPrices = {
  standard: { from: 50, to: 45 },
  comfort: { from: 60, to: 55 },
  business: { from: 90, to: 85 },
  minivan: { from: 75, to: 70 },
  vip: { from: 120, to: 110 },
  minibus: { from: 100, to: 95 },
}

export function CalculatorSection({ locale }: CalculatorSectionProps) {
  const t = translations[locale]
  const [distance, setDistance] = useState("")
  const [selectedTariff, setSelectedTariff] = useState<keyof typeof tariffs>("comfort")
  const [result, setResult] = useState<number | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingData, setBookingData] = useState({ name: "", phone: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const calculatePrice = () => {
    const dist = Number.parseFloat(distance)
    if (!isNaN(dist) && dist > 0) {
      const price = dist * tariffs[selectedTariff].price
      setResult(price)
      setShowBookingForm(true)
    }
  }

  const handleBooking = async () => {
    if (!bookingData.name || !bookingData.phone) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingData.name,
          phone: bookingData.phone,
          message: `Расстояние: ${distance} км\nТариф: ${t.tariffs[tariffs[selectedTariff].name as keyof typeof t.tariffs]}\nСтоимость: ${result?.toFixed(2)} BYN`,
          type: locale === "ru" ? "Заказ трансфера" : locale === "en" ? "Transfer Booking" : "预订接送",
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setTimeout(() => {
          setShowBookingForm(false)
          setBookingData({ name: "", phone: "" })
          setSubmitStatus("idle")
        }, 2000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("[v0] Booking error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="calculator"
      className="relative py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--gold)]/5 rounded-full" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--gold-dark)]/5 rounded-full"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 mb-6">
            <Calculator className="h-4 w-4 text-[var(--gold)]" />
            <span className="text-sm text-[var(--gold)] font-semibold uppercase tracking-wider">
              {locale === "ru" ? "Калькулятор" : locale === "en" ? "Calculator" : "计算器"}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold gold-gradient-text mb-4">{t.calculator.title}</h2>
          <p className="text-xl text-white/60">{t.calculator.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Distance Calculator - обновлены цвета */}
          <div className="glass-effect rounded-2xl p-8 border border-[var(--gold)]/20 transition-transform duration-300 hover:scale-[1.01]">
            <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <Car className="h-6 w-6 text-[var(--gold)]" />
              {locale === "ru" ? "По расстоянию" : locale === "en" ? "By Distance" : "按距离"}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">{t.calculator.distance}</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="bg-black/50 border-[var(--gold)]/30 focus:border-[var(--gold)] text-white text-lg h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-3">{t.calculator.selectTariff}</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(tariffs).map(([key, tariff]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedTariff(key as keyof typeof tariffs)}
                      className={`p-4 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                        selectedTariff === key
                          ? "border-[var(--gold)] bg-[var(--gold)]/10 shadow-lg shadow-[var(--gold)]/20"
                          : "border-white/10 bg-white/5 hover:border-[var(--gold)]/50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{tariff.icon}</div>
                      <div className="text-sm font-semibold text-white">
                        {t.tariffs[tariff.name as keyof typeof t.tariffs]}
                      </div>
                      <div className="text-xs text-[var(--gold)] mt-1">{tariff.price} BYN/км</div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={calculatePrice}
                className="w-full gold-gradient text-black font-semibold text-lg h-12 hover:shadow-lg hover:shadow-[var(--gold)]/50 transition-all hover:scale-[1.02]"
              >
                {t.calculator.calculate}
              </Button>

              {result !== null && (
                <div className="mt-6 space-y-4">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-[var(--gold)]/20 to-[var(--gold-dark)]/20 border border-[var(--gold)]/30">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">{t.calculator.result}:</span>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-6 w-6 text-[var(--gold)]" />
                        <span className="text-3xl font-bold gold-gradient-text">{result.toFixed(2)} BYN</span>
                      </div>
                    </div>
                  </div>

                  {showBookingForm && (
                    <div className="p-6 rounded-xl glass-effect border border-[var(--gold)]/20 space-y-4">
                      <h4 className="font-semibold text-white text-lg">
                        {locale === "ru" ? "Быстрый заказ" : locale === "en" ? "Quick Booking" : "快速预订"}
                      </h4>

                      {submitStatus === "success" && (
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center">
                          {locale === "ru"
                            ? "✅ Заказ отправлен!"
                            : locale === "en"
                              ? "✅ Booking sent!"
                              : "✅ 预订已发送！"}
                        </div>
                      )}

                      {submitStatus === "error" && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                          {locale === "ru"
                            ? "❌ Ошибка отправки"
                            : locale === "en"
                              ? "❌ Sending error"
                              : "❌ 发送错误"}
                        </div>
                      )}

                      <Input
                        placeholder={locale === "ru" ? "Ваше имя" : locale === "en" ? "Your name" : "您的姓名"}
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        disabled={isSubmitting}
                        className="bg-black/50 border-[var(--gold)]/30 text-white"
                      />
                      <Input
                        placeholder={locale === "ru" ? "Телефон" : locale === "en" ? "Phone" : "电话"}
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        disabled={isSubmitting}
                        className="bg-black/50 border-[var(--gold)]/30 text-white"
                      />
                      <Button
                        onClick={handleBooking}
                        disabled={isSubmitting || !bookingData.name || !bookingData.phone}
                        className="w-full gold-gradient text-black font-semibold disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            {locale === "ru" ? "Отправка..." : locale === "en" ? "Sending..." : "发送中..."}
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            {locale === "ru" ? "Заказать" : locale === "en" ? "Book Now" : "立即预订"}
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Airport Prices - обновлены цвета */}
          <div className="glass-effect rounded-2xl p-8 border border-[var(--gold)]/20 transition-transform duration-300 hover:scale-[1.01]">
            <h3 className="text-2xl font-display font-bold text-white mb-6">{t.calculator.airportTitle}</h3>
            <p className="text-white/60 mb-6">{t.calculator.airportSubtitle}</p>

            <div className="space-y-4">
              {Object.entries(airportPrices).map(([key, prices]) => (
                <div
                  key={key}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--gold)]/30 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">{t.tariffs[key as keyof typeof t.tariffs]}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">{t.calculator.fromAirport}:</span>
                      <span className="text-[var(--gold)] font-semibold">{prices.from} BYN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">{t.calculator.toAirport}:</span>
                      <span className="text-[var(--gold)] font-semibold">{prices.to} BYN</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[var(--gold)]/5 border border-[var(--gold)]/20">
              <p className="text-sm text-white/70 text-center">
                {locale === "ru"
                  ? "💡 Цены актуальны. Для уточнения деталей свяжитесь с нами"
                  : locale === "en"
                    ? "💡 Prices are current. Contact us for details"
                    : "💡 价格最新。详情请联系我们"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 mt-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm md:text-base text-white/70 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            ⓘ {t.calculator.priceDisclaimer}
          </p>
        </div>
      </div>
    </section>
  )
}
