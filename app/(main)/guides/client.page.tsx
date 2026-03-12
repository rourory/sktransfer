"use client"
import { GuidesSection } from "@/components/guides-section"
import { translations } from "@/lib/i18n"
import { useLanguage } from "@/lib/language-context"

function GuidesPageClient() {
  const { locale } = useLanguage()
  const t = translations[locale]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <div className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/luxury-sanatorium-spa-resort.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/92" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-center mb-16 gold-gradient-text text-muted">
            {t.guides.title}
          </h1>

          <GuidesSection locale={locale} />
        </div>
      </div>
    </main>
  )
}

export default GuidesPageClient
export { GuidesPageClient }
