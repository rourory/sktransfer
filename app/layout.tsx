import type React from "react";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Bebas_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ScrollToTop } from "@/components/scroll-to-top";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { getLocaleOnServer } from "@/lib/get-locale-on-server";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://sktransfer.by"),
  title: {
    default:
      "SKTransfer.by — Лучший трансфер по Беларуси, России и Европе | Заказ онлайн 24/7",
    template: "%s | SKTransfer.by",
  },
  description:
    "Профессиональные трансферы по Беларуси, России, СНГ и Европе. Индивидуальные поездки, VIP-обслуживание, комфортабельные автомобили Mercedes. Трансфер в аэропорт Минск от 45 BYN, экскурсии с опытными гидами, поездки в горнолыжные курорты и санатории. Онлайн калькулятор стоимости. Заказ онлайн 24/7.",
  keywords: [
    "трансфер Минск",
    "трансфер Беларусь",
    "трансфер аэропорт Минск",
    "SK Transfer",
    "SKTransfer.by",
    "трансфер Россия",
    "VIP трансфер",
    "экскурсии Минск",
    "горнолыжные курорты Беларусь",
    "гид Минск",
    "трансфер Европа",
    "индивидуальный трансфер",
    "лучший трансфер",
    "Mercedes трансфер",
    "трансфер Силичи",
    "трансфер Логойск",
    "трансфер санаторий",
    "калькулятор трансфера",
    "заказать трансфер онлайн",
  ],
  authors: [{ name: "SK Transfer", url: "https://sktransfer.by" }],
  creator: "SK Transfer",
  publisher: "SK Transfer",
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
    locale: "ru_RU",
    alternateLocale: ["en_US", "zh_CN"],
    url: "https://sktransfer.by",
    siteName: "SKTransfer.by",
    title: "SKTransfer.by — Лучшие трансферы по Беларуси, России и Европе",
    description:
      "Профессиональные трансферы. Индивидуальные поездки, VIP-обслуживание, комфортабельные автомобили Mercedes. Более 15 лет опыта, более 50 000 довольных клиентов. Заказ онлайн 24/7.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SK Transfer - Лучшие трансферы по Беларуси",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SKTransfer.by — Луший трансфер",
    description:
      "Профессиональные трансферы по Беларуси, России и Европе. Более 15 лет опыта.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.jpg", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.jpg", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon.ico",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: "google-site-verification-code-here",
    yandex: "yandex-verification-code-here",
  },
  applicationName: "SK Transfer",
  category: "travel",
  generator: "v0.app",
};

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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SK Transfer",
    alternateName: "SKTransfer.by",
    url: "https://sktransfer.by",
    logo: "https://sktransfer.by/logo.png",
    image: "https://sktransfer.by/og-image.jpg",
    description:
      "Профессиональные трансферы по Беларуси, России и Европе. Индивидуальные поездки, VIP-обслуживание.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Минск",
      addressRegion: "Минская область",
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
        hoursAvailable: {
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
      },
    ],
    sameAs: ["https://t.me/+375291228484", "https://wa.me/375291228484"],
    foundingDate: "2008",
    slogan: "Лучшие трансферы по Беларуси, России и Европе",
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
      streetAddress: "Минск",
      addressLocality: "Минск",
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
    description: "Лучшие трансферы и экскурсии по Беларуси, России и Европе",
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
            name: "Трансфер аэропорт Минск",
            description: "Комфортабельный трансфер из/в аэропорт Минск-2",
          },
          price: "70",
          priceCurrency: "BYN",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "VIP трансфер Mercedes S-Class",
            description:
              "Премиум трансфер на Mercedes S-Class с личным водителем",
          },
          price: "140",
          priceCurrency: "BYN",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Экскурсии по Минску",
            description: "Индивидуальные экскурсии с профессиональным гидом",
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://sktransfer.by",
      },
    ],
  };

  const locale = await getLocaleOnServer();

  return (
    <html className="" lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />

        <link rel="canonical" href="https://sktransfer.by" />

        <meta name="geo.region" content="BY-MI" />
        <meta name="geo.placename" content="Minsk" />
        <meta name="geo.position" content="53.9045;27.5615" />
        <meta name="ICBM" content="53.9045, 27.5615" />

        <meta httpEquiv="content-language" content="ru, en, zh" />
        <meta name="language" content="Russian" />

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105940841', 'ym');
              ym(105940841, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/105940841"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body
        className={`${ibmPlexSans.variable} ${bebasNeue.variable} font-sans antialiased`}
      >
        <LanguageProvider initialLocale={locale}>
          <ScrollToTop />
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
