// app/page.tsx

import { cookies } from "next/headers";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import type { Locale } from "@/lib/i18n";

export default async function Home() {
  // Получаем текущий язык из куки (без использования useLanguage!)
  const cookieStore = await cookies();
  const localeValue = cookieStore.get("NEXT_LOCALE")?.value;
  const locale: Locale =
    localeValue === "en" || localeValue === "zh" ? localeValue : "ru";

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
      <ServicesSection locale={locale} />
      <TestimonialsSection locale={locale} />
      <CTASection locale={locale} />
    </main>
  );
}
