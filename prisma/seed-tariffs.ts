// prisma/seed-tariffs.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Начало сидирования тарифов...");

  await prisma.tariff.deleteMany(); // очищаем перед заполнением

  const tariffs = [
    {
      key: "standard",
      pricePerKm: 1.35,
      imageUrl: "/tariffs/standard.webp",
      isActive: true,
      order: 1,
    },
    {
      key: "comfort",
      pricePerKm: 1.65,
      imageUrl: "/tariffs/comfort.webp",
      isActive: true,
      order: 2,
    },
    {
      key: "business",
      pricePerKm: 2.8,
      imageUrl: "/tariffs/business.webp",
      isActive: true,
      order: 3,
    },
    {
      key: "minivan",
      pricePerKm: 2.25,
      imageUrl: "/tariffs/minivan.webp",
      isActive: true,
      order: 4,
    },
    {
      key: "vip",
      pricePerKm: 3.5,
      imageUrl: "/tariffs/vip.webp",
      isActive: true,
      order: 5,
    },
    {
      key: "minibus",
      pricePerKm: 3.2,
      imageUrl: "/tariffs/minibus.webp",
      isActive: true,
      order: 6,
    },
  ];

  for (const tariff of tariffs) {
    await prisma.tariff.upsert({
      where: { key: tariff.key },
      update: {
        pricePerKm: tariff.pricePerKm,
        imageUrl: tariff.imageUrl,
        isActive: tariff.isActive,
        order: tariff.order,
      },
      create: tariff,
    });
  }

  console.log(`✅ Успешно добавлено ${tariffs.length} тарифов!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
