"use client"
import { ServicesSection } from "@/components/services-section"
import { translations } from "@/lib/i18n"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

function ServicesPageClient() {
  const { locale } = useLanguage()
  const t = translations[locale]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <div className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/mercedes-e-class-black-luxury-sedan-side-view-prof.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/92" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-center mb-16 gold-gradient-text text-muted">
            {t.services.title}
          </h1>

          <ServicesSection locale={locale} />

          <div className="max-w-4xl mx-auto mt-20">
            <h2 className="font-display text-4xl text-center mb-12 gold-gradient-text">{t.rules.title}</h2>
            <Card className="glass-effect p-8">
              <ul className="space-y-4">
                {[t.rules.rule1, t.rules.rule2, t.rules.rule3, t.rules.rule4, t.rules.rule5].map((rule, index) => (
                  <li key={index} className="flex gap-4">
                    <Check className="w-6 h-6 text-[var(--gold)] flex-shrink-0 mt-1" />
                    <span className="text-foreground/80">{rule}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ServicesPageClient
export { ServicesPageClient }
