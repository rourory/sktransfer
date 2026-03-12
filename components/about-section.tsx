"use client"

import { type Locale, translations } from "@/lib/i18n"
import { ShieldCheck, Sparkles, Clock, Heart } from "lucide-react"

interface AboutSectionProps {
  locale: Locale
}

export function AboutSection({ locale }: AboutSectionProps) {
  const t = translations[locale]

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/mercedes-v-class-black-luxury-van-side-view-profes.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/95" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display mb-6 gold-gradient-text text-balance font-bold lg:text-5xl text-sidebar-accent border-[1 px]">
              {t.about.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-[rgba(18,18,25,1)] px-4 leading-7">
              {t.about.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12">
            {/* Feature 1 */}
            <div className="group glass-effect-strong p-6 sm:p-8 rounded-2xl hover-lift min-w-0 text-[rgba(254,254,254,1)] bg-[rgba(255,255,255,1)]">
              <div className="flex gap-4 sm:gap-6 min-w-0">
                <div className="flex-shrink-0">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-[var(--gold-light)]/20 to-[var(--gold)]/20 rounded-xl">
                    <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--gold-dark)]" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-foreground break-words">
                    {t.about.feature1}
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/60 leading-relaxed break-words">
                    {t.about.feature1Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group glass-effect-strong p-6 sm:p-8 rounded-2xl hover-lift min-w-0">
              <div className="flex gap-4 sm:gap-6 min-w-0">
                <div className="flex-shrink-0">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-[var(--gold-light)]/20 to-[var(--gold)]/20 rounded-xl">
                    <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--gold-dark)]" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-foreground break-words">
                    {t.about.feature2}
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/60 leading-relaxed break-words">
                    {t.about.feature2Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group glass-effect-strong p-6 sm:p-8 rounded-2xl hover-lift min-w-0">
              <div className="flex gap-4 sm:gap-6 min-w-0">
                <div className="flex-shrink-0">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-[var(--gold-light)]/20 to-[var(--gold)]/20 rounded-xl">
                    <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--gold-dark)]" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-foreground break-words">
                    {t.about.feature3}
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/60 leading-relaxed break-words">
                    {t.about.feature3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group glass-effect-strong p-6 sm:p-8 rounded-2xl hover-lift min-w-0">
              <div className="flex gap-4 sm:gap-6 min-w-0">
                <div className="flex-shrink-0">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-[var(--gold-light)]/20 to-[var(--gold)]/20 rounded-xl">
                    <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--gold-dark)]" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-foreground break-words">
                    {t.about.feature4}
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/60 leading-relaxed break-words">
                    {t.about.feature4Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 animate-fadeIn">
            <div className="text-center glass-effect p-4 sm:p-6 rounded-xl hover-scale">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold gold-gradient-text mb-2">15+</div>
              <div className="text-xs sm:text-sm text-foreground/60 uppercase tracking-wider font-medium">
                {t.about.years}
              </div>
            </div>
            <div className="text-center glass-effect p-4 sm:p-6 rounded-xl hover-scale">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold gold-gradient-text mb-2">50+</div>
              <div className="text-xs sm:text-sm text-foreground/60 uppercase tracking-wider font-medium">
                {t.about.vehicles}
              </div>
            </div>
            <div className="text-center glass-effect p-4 sm:p-6 rounded-xl hover-scale">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold gold-gradient-text mb-2">50K+</div>
              <div className="text-xs sm:text-sm text-foreground/60 uppercase tracking-wider font-medium">
                {t.about.clients}
              </div>
            </div>
            <div className="text-center glass-effect p-4 sm:p-6 rounded-xl hover-scale">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold gold-gradient-text mb-2">24/7</div>
              <div className="text-xs sm:text-sm text-foreground/60 uppercase tracking-wider font-medium">
                {t.about.support}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
