import type { Metadata } from "next";
import { getLocaleOnServer } from "@/lib/get-locale-on-server";
import { translations } from "@/lib/i18n";
import { CalculatorForm } from "@/components/calculator-form";
import { AirportTariffs } from "@/components/airport-tariffs";
import prisma from "@/lib/prisma";

const BASE_URL = "https://sktransfer.by";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleOnServer();
  const t = translations[locale].seo.calculator;

  const canonicalUrl =
    locale === "ru"
      ? `${BASE_URL}/calculator`
      : `${BASE_URL}/calculator?lang=${locale}`;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      siteName: "SK Transfer",
      images: [
        {
          url: "/og-image.webp",
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ru-BY": `${BASE_URL}/calculator`,
        "en-US": `${BASE_URL}/calculator?lang=en`,
        "zh-CN": `${BASE_URL}/calculator?lang=zh`,
        "x-default": `${BASE_URL}/calculator`,
      },
    },
  };
}

export default async function CalculatorPage() {
  const locale = await getLocaleOnServer();
  const t = translations[locale];

  const dbTariffs = await prisma.tariff.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  const pageUrl =
    locale === "ru"
      ? `${BASE_URL}/calculator`
      : `${BASE_URL}/calculator?lang=${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["TaxiService", "WebApplication"],
    name: t.seo.calculator.title,
    description: t.seo.calculator.description,
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    provider: {
      "@type": "Organization",
      name: "SK Transfer",
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.jpg`,
    },
    areaServed: {
      "@type": "Country",
      name: "Belarus",
    },
  };

  return (
    <main className="pt-20 sm:pt-24 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Внедряем JSON-LD микроразметку */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Фоновое изображение */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('/luxury-black-premium-car-night-cityscape.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/98 via-white/95 to-white/98" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-8 sm:mb-12">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 sm:mb-4 gold-gradient-text">
                {t.calculator.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
                {t.calculator.subtitle}
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-16">
              <CalculatorForm locale={locale} dbTariffs={dbTariffs}/>
              <AirportTariffs locale={locale} />
            </div>

            <section className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm mt-12">
              <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
                <h2 className="text-2xl sm:text-3xl font-display text-gray-900 mb-4">
                  {t.calculator.seo_h2_1}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  {t.calculator.seo_text_1}
                </p>

                <h2 className="text-2xl sm:text-3xl font-display text-gray-900 mb-4">
                  {t.calculator.seo_h2_2}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t.calculator.seo_text_2}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
