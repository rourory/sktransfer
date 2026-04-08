import TransferPageContent from "@/components/transfer-page-content";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  const route = await prisma.transferRoute.findUnique({
    where: { slug },
  });

  if (!route) {
    return { title: "Трансфер не найден | SKTransfer.by" };
  }

  const title = `Трансфер такси ${route.fromNameRu} — ${route.toNameRu} | Цена, Заказ`;
  const description = `Заказать индивидуальный трансфер из ${route.fromNameRu} в ${route.toNameRu}. Расстояние: ${route.distanceKm} км. Фиксированная цена, встреча с табличкой, комфортные авто и минивэны.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ru_RU",
      siteName: "SKTransfer",
    },
    alternates: {
      canonical: `https://sktransfer.by/transfer/${slug}`, // Замените на ваш реальный домен
    },
  };
}

export default async function TransferPage({ params }: { params: Params }) {
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

  // Предварительный расчёт цен для передачи в клиент и для SEO
  const preCalculated: Record<string, number> = {};
  let minPrice = Infinity;

  tariffs.forEach((t) => {
    const price = Number((route.distanceKm * t.pricePerKm).toFixed(2));
    preCalculated[t.key] = price;
    if (price < minPrice) minPrice = price;
  });

  // Генерация JSON-LD микроразметки для Google (Service/Product)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Трансфер ${route.fromNameRu} — ${route.toNameRu}`,
    description: `Индивидуальный пассажирский трансфер по маршруту ${route.fromNameRu} - ${route.toNameRu} на автомобилях комфорт и бизнес класса.`,
    provider: {
      "@type": "LocalBusiness",
      name: "SKTransfer",
      image: "https://sktransfer.by/logo.png",
      telephone: "+375291228484",
      address: {
        "@type": "PostalAddress",
        addressCountry: "BY",
      },
    },
    areaServed: [
      { "@type": "City", name: route.fromNameRu },
      { "@type": "City", name: route.toNameRu },
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
        route={route}
        tariffs={tariffs}
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
