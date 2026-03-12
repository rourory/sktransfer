"use client"

import type { Locale } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"

interface CTASectionProps {
  locale: Locale
}

export function CTASection({ locale }: CTASectionProps) {
  const t = {
    ru: {
      title: "Готовы заказать трансфер?",
      subtitle: "Рассчитайте стоимость поездки прямо сейчас или свяжитесь с нами для консультации",
      calculator: "Рассчитать стоимость",
      call: "Позвонить нам",
    },
    en: {
      title: "Ready to book a transfer?",
      subtitle: "Calculate the trip cost right now or contact us for consultation",
      calculator: "Calculate price",
      call: "Call us",
    },
    zh: {
      title: "准备预订接送服务？",
      subtitle: "立即计算行程费用或联系我们咨询",
      calculator: "计算价格",
      call: "致电我们",
    },
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/luxury-black-premium-car-night-cityscape.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white text-balance animate-fadeIn">
            {t[locale].title}
          </h2>
          <p
            className="text-xl text-white/80 mb-12 text-pretty leading-relaxed animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            {t[locale].subtitle}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
          >
            <Link href="/calculator">
              <Button
                size="lg"
                className="gold-gradient text-white hover:shadow-2xl hover:shadow-[var(--gold)]/40 text-lg px-12 py-7 h-auto group"
              >
                <span className="flex items-center justify-center text-popover">
                  {t[locale].calculator}
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
            </Link>

            <Link href="/contacts">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-12 py-7 h-auto border-white/50 text-white hover:bg-white/10 hover:border-white transition-all duration-300 bg-transparent"
              >
                <Phone className="mr-3 h-5 w-5" />
                {t[locale].call}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
