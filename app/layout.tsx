import type React from "react";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Bebas_Neue } from "next/font/google";
import { ScrollToTop } from "@/components/scroll-to-top";
import { LanguageProvider } from "@/lib/language-context";
import { getLocaleOnServer } from "@/lib/get-locale-on-server";
import ConsentProvider from "@/components/consent/consent-provider";
import { VisitorTracker } from "@/components/tracker/visitor-tracker";
import { translations } from "@/lib/i18n";

import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleOnServer();
  const t = translations[locale];

  // Динамическое определение локали для OpenGraph
  const ogLocale =
    locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "zh_CN";

  return {
    metadataBase: new URL("https://sktransfer.by"),
    title: {
      default: t.hero.titleWhite + " " + t.hero.titleGold + " | SKTransfer.by",
      template: "%s | SKTransfer.by",
    },
    description: t.about.subtitle,
    keywords: t.seo.layout.keywords,
    authors: [{ name: "SK Transfer", url: "https://sktransfer.by" }],
    alternates: {
      canonical: "https://sktransfer.by",
      languages: {
        ru: "https://sktransfer.by",
        en: "https://sktransfer.by",
        zh: "https://sktransfer.by",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: ["ru_RU", "en_US", "zh_CN"].filter(
        (l) => l !== ogLocale,
      ),
      url: "https://sktransfer.by",
      siteName: "SKTransfer.by",
      title: t.hero.titleWhite + " " + t.hero.titleGold,
      description: t.about.subtitle,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "SK Transfer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.hero.titleWhite + " " + t.hero.titleGold,
      description: t.about.subtitle,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.jpg", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.jpg", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/manifest.json",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#c9a961",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocaleOnServer();
  const t = translations[locale];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SK Transfer",
    alternateName: "SKTransfer.by",
    url: "https://sktransfer.by",
    logo: "https://sktransfer.by/logo.png",
    image: "https://sktransfer.by/og-image.jpg",
    description: t.footer.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "ru" ? "Минск" : "Minsk",
      addressRegion: locale === "ru" ? "Минская область" : "Minsk Region",
      addressCountry: "BY",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+375-29-122-84-84",
        contactType: "Customer Service",
        areaServed: ["BY", "RU", "EU"],
        availableLanguage: ["Russian", "English", "Chinese"],
        contactOption: "TollFree",
      },
    ],
    sameAs: ["https://t.me/+375291228484", "https://wa.me/375291228484"],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://sktransfer.by",
    name: "SK Transfer",
    legalName: "SK Transfer",
    image: "https://sktransfer.by/og-image.jpg",
    url: "https://sktransfer.by",
    telephone: "+375-29-122-84-84",
    email: "info@sktransfer.by",
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "ru" ? "Минск" : "Minsk",
      addressLocality: locale === "ru" ? "Минск" : "Minsk",
      addressRegion: "Минская область",
      postalCode: "220000",
      addressCountry: "BY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.9045,
      longitude: 27.5615,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$-$$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    currenciesAccepted: "BYN, USD, EUR, RUB",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Transfer and Excursion Service",
    name: "SK Transfer Services",
    description: t.services.transfersDesc,
    provider: {
      "@type": "Organization",
      name: "SK Transfer",
      url: "https://sktransfer.by",
    },
    areaServed: [
      {
        "@type": "Place",
        name: "Беларусь",
      },
      {
        "@type": "Place",
        name: "Россия",
      },
      {
        "@type": "Place",
        name: "Европа",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Transfer Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: t.services.airport,
            description: t.services.airportDesc,
          },
          price: "70",
          priceCurrency: "BYN",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: t.services.vip,
            description: t.services.vipDesc,
          },
          price: "140",
          priceCurrency: "BYN",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: t.services.excursions,
            description: t.services.excursionsDesc,
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "BYN",
            price: "100",
          },
        },
      ],
    },
  };

  return (
    <html className="" lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        <link rel="canonical" href="https://sktransfer.by" />

        <meta name="geo.region" content="BY-MI" />
        <meta name="geo.placename" content="Minsk" />
        <meta name="geo.position" content="53.9045;27.5615" />
        <meta name="ICBM" content="53.9045, 27.5615" />

        <meta httpEquiv="content-language" content="ru, en, zh" />
        <meta name="language" content="Russian" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body
        className={`${ibmPlexSans.variable} ${bebasNeue.variable} font-sans antialiased`}
      >
        <VisitorTracker />
        <ConsentProvider
          yandexId={Number(process.env.NEXT_PUBLIC_YM_COUNTER_ID)}
          gaId={process.env.NEXT_PUBLIC_GA_ID}
        >
          <LanguageProvider initialLocale={locale}>
            <ScrollToTop />
            {children}
          </LanguageProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
