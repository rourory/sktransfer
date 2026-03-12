"use client"

import { useState, useEffect } from "react"
import { ResortsSection } from "@/components/resorts-section"
import { type Locale, detectLocale, translations } from "@/lib/i18n"

export default function ResortsPage() {
  const [locale, setLocale] = useState<Locale>("ru")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const detectedLocale = detectLocale()
    setLocale(detectedLocale)
  }, [])

  if (!mounted) {
    return null
  }

  const t = translations[locale]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <div className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/ski-resort-snow-mountains-belarus.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/92" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-center mb-16 gold-gradient-text">
            {t.resorts?.title || ""}
          </h1>

          <ResortsSection locale={locale} />
        </div>
      </div>
    </main>
  )
}
