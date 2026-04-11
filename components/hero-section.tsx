import { Button } from "@/components/ui/button";
import { type Locale, translations } from "@/lib/i18n";
import Link from "next/link";
import { Calculator, Car, Compass } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  locale: Locale;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = translations[locale].hero;

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0D] pt-24 sm:pt-28">
      {/* Background Image & Overlay */}
      <Image
        src="/mercedes-s-class-black-luxury-sedan-front-three-qu.webp"
        alt="Mercedes-Benz S-Class"
        fill
        priority
        fetchPriority="high"
        quality={85}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-[#0B0B0D]/85 via-[#0B0B0D]/75 to-[#0B0B0D]/90" />

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
        {/* Dynamic Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] will-change-transform transform-gpu">
          <span className="bg-linear-to-r from-white via-[#E8EAED] to-white bg-clip-text text-transparent">
            {t.titleWhite}
          </span>
          <br />
          <span className="bg-linear-to-r from-[#c9a86a] via-[#d4b068] to-[#c9a86a] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(201,168,106,0.3)]">
            {t.titleGold}
          </span>
        </h1>

        {/* Dynamic Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#BFC5D2] mb-12 max-w-3xl mx-auto">
          {t.subtitle}
        </p>

        {/* Dynamic Navigation/CTA */}
        <nav
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          aria-label="Main actions"
        >
          <Link href="/calculator">
            <Button
              size="lg"
              className="cursor-pointer group relative px-8 py-6 bg-gradient-to-r from-[#c9a86a] to-[#d4b068] text-black font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(201,168,106,0.4)] hover:shadow-[0_0_50px_rgba(201,168,106,0.6)]"
            >
              <Calculator className="mr-2 h-5 w-5" aria-hidden="true" />
              {t.cta}
            </Button>
          </Link>

          <Link href="/fleet">
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer group px-8 py-6 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-semibold text-lg rounded-full hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all duration-300"
            >
              <Car className="mr-2 h-5 w-5" aria-hidden="true" />
              {t.fleetBtn}
            </Button>
          </Link>

          <Link href="/excursions">
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer group px-8 py-6 bg-white/5 backdrop-blur-sm border-2 border-teal-400/30 text-white font-semibold text-lg rounded-full hover:bg-teal-400/10 hover:border-teal-400/50 hover:scale-105 transition-all duration-300"
            >
              <Compass
                className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-500"
                aria-hidden="true"
              />
              {t.excursionsBtn}
            </Button>
          </Link>
        </nav>

        {/* Dynamic Statistics */}
        <aside
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-white"
          aria-label="Company statistics"
        >
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-[#c9a86a] to-[#d4b068] bg-clip-text text-transparent mb-2">
              15+
            </div>
            <div className="text-sm sm:text-base text-[#BFC5D2] uppercase tracking-wider">
              {t.stats.experience}
            </div>
          </div>

          <div
            className="hidden sm:block w-px h-16 bg-white/20"
            aria-hidden="true"
          />

          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-[#c9a86a] to-[#d4b068] bg-clip-text text-transparent mb-2">
              500+
            </div>
            <div className="text-sm sm:text-base text-[#BFC5D2] uppercase tracking-wider">
              {t.stats.transfers}
            </div>
          </div>

          <div
            className="hidden sm:block w-px h-16 bg-white/20"
            aria-hidden="true"
          />

          <div className="mb-6 text-center">
            <div className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-[#c9a86a] to-[#d4b068] bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-sm sm:text-base text-[#BFC5D2] uppercase tracking-wider">
              {t.stats.support}
            </div>
          </div>
        </aside>
      </div>

      {/* Bouncing Mouse indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-[#c9a86a]/50 rounded-full p-1">
          <div className="w-1.5 h-3 bg-[#c9a86a] rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </header>
  );
}
