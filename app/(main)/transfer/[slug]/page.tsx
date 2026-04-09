import TransferPageContent from "@/components/transfer-page-content";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getLocaleOnServer } from "@/lib/get-locale-on-server";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const locale = await getLocaleOnServer();
  const { slug } = await params;

  const route = await prisma.transferRoute.findUnique({
    where: { slug },
  });

  if (!route) {
    return { title: "Transfer not found | SKTransfer" };
  }

  // Динамические имена для SEO в зависимости от локали
  const fromName =
    locale === "en"
      ? route.fromNameEn || route.fromNameRu
      : locale === "zh"
        ? route.fromNameZh || route.fromNameRu
        : route.fromNameRu;
  const toName =
    locale === "en"
      ? route.toNameEn || route.toNameRu
      : locale === "zh"
        ? route.toNameZh || route.toNameRu
        : route.toNameRu;

  const titles = {
    ru: `Трансфер такси ${fromName} — ${toName} | Цена, Заказ`,
    en: `Taxi transfer ${fromName} — ${toName} | Price, Booking`,
    zh: `出租车接送 ${fromName} — ${toName} | 价格, 预订`,
  };

  const descriptions = {
    ru: `Заказать индивидуальный трансфер из ${fromName} в ${toName}. Расстояние: ${route.distanceKm} км. Фиксированная цена, встреча с табличкой, комфортные авто.`,
    en: `Book a private transfer from ${fromName} to ${toName}. Distance: ${route.distanceKm} km. Fixed price, meet & greet, comfortable cars.`,
    zh: `预订从 ${fromName} 到 ${toName} 的私人接送服务。 距离：${route.distanceKm} 公里。 固定价格，举牌迎接，舒适的汽车。`,
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: "website",
      locale: locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "zh_CN",
      siteName: "SKTransfer",
    },
    alternates: {
      canonical: `https://sktransfer.by/transfer/${slug}`,
    },
  };
}

export default async function TransferPage({ params }: { params: Params }) {
  const locale = await getLocaleOnServer();
  const { slug } = await params;

  const route = await prisma.transferRoute.findUnique({
    where: { slug },
  });

  if (!route) {
    notFound();
  }

  const tariffs = await prisma.tariff.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  // Забираем популярные маршруты (берем все переводы имен, чтобы клиентский компонент мог их переключать)
  const popularRoutes = await prisma.transferRoute.findMany({
    where: {
      isPopular: true,
      slug: { not: slug },
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

  const preCalculated: Record<string, number> = {};
  let minPrice = Infinity;
  tariffs.forEach((t) => {
    const price = Number((route.distanceKm * t.pricePerKm).toFixed(2));
    preCalculated[t.key] = price;
    if (price < minPrice) minPrice = price;
  });

  // Имена для JSON-LD
  const fromName =
    locale === "en"
      ? route.fromNameEn || route.fromNameRu
      : locale === "zh"
        ? route.fromNameZh || route.fromNameRu
        : route.fromNameRu;
  const toName =
    locale === "en"
      ? route.toNameEn || route.toNameRu
      : locale === "zh"
        ? route.toNameZh || route.toNameRu
        : route.toNameRu;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Transfer ${fromName} — ${toName}`,
    provider: {
      "@type": "LocalBusiness",
      name: "SKTransfer",
      image: "https://sktransfer.by/logo.png",
      telephone: "+375291228484",
      address: { "@type": "PostalAddress", addressCountry: "BY" },
    },
    areaServed: [
      { "@type": "City", name: fromName },
      { "@type": "City", name: toName },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "BYN",
      price: minPrice === Infinity ? "0" : minPrice.toString(),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <TransferPageContent
        locale={locale} // ПРОКИДЫВАЕМ ЛОКАЛЬ
        route={route}
        tariffs={tariffs}
        popularRoutes={popularRoutes}
        preCalculated={preCalculated}
        initialDistance={route.distanceKm.toFixed(1)}
        initialFromCoords={
          route.fromLat && route.fromLon
            ? { lat: route.fromLat, lon: route.fromLon }
            : null
        }
        initialToCoords={
          route.toLat && route.toLon
            ? { lat: route.toLat, lon: route.toLon }
            : null
        }
      />
    </>
  );
}
