"use client"
import { FleetSection } from "@/components/fleet-section"
import { translations } from "@/lib/i18n"
import { useLanguage } from "@/lib/language-context"

function FleetPageClient() {
  const { locale } = useLanguage()
  const t = translations[locale]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <div className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/mercedes-s-class-black-luxury-sedan-front-three-qu.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/75" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center mb-12 md:mb-16 gold-gradient-text text-muted">
            {t.fleet.title}
          </h1>

          <FleetSection locale={locale} />
        </div>
      </div>
    </main>
  )
}

export default FleetPageClient
export { FleetPageClient }
