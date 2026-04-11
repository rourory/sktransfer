// app/page.tsx

import { cookies } from "next/headers";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import type { Locale } from "@/lib/i18n";
import prisma from "@/lib/prisma";
import { PopularRoutesList } from "@/components/popular-routes-list";

export default async function Home() {
  // Получаем текущий язык из куки (без использования useLanguage!)
  const cookieStore = await cookies();
  const localeValue = cookieStore.get("NEXT_LOCALE")?.value;
  const locale: Locale =
    localeValue === "en" || localeValue === "zh" ? localeValue : "ru";

  const popularRoutes = await prisma.transferRoute.findMany({
    where: {
      isPopular: true,
    },
    select: {
      slug: true,
      distanceKm: true,
      fromNameRu: true,
      toNameRu: true,
      fromNameEn: true,
      toNameEn: true,
      fromNameZh: true,
      toNameZh: true,
      additionalContentRu: locale === "ru",
      additionalContentEn: locale === "en",
      additionalContentZh: locale === "zh",
    },
    orderBy: { distanceKm: "asc" },
    take: 6,
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ServicesSection locale={locale} />
      </div>
      <TestimonialsSection locale={locale} />
      {popularRoutes && popularRoutes.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <PopularRoutesList locale={locale} routes={popularRoutes} />
        </div>
      )}
      <CTASection locale={locale} />
    </main>
  );
}
