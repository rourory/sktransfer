import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding Airport Tariffs...");

  // Очищаем старые данные, чтобы избежать конфликтов с новой схемой
  await prisma.airportTariff.deleteMany({});

  const airportTariffs = [
    {
      tariffKey: "standard",
      price: 70,
      nameRu: "Стандарт",
      nameEn: "Standard",
      nameZh: "标准",
      featuresRu: "1-3 пассажира, Sedan, Базовый сервис",
      featuresEn: "1-3 passengers, Sedan, Basic service",
      featuresZh: "1-3名乘客, 轿车, 基本服务",
      order: 1,
    },
    {
      tariffKey: "comfort",
      price: 80,
      nameRu: "Комфорт",
      nameEn: "Comfort",
      nameZh: "舒适",
      featuresRu: "1-3 пассажира, Comfort класс, WiFi в авто",
      featuresEn: "1-3 passengers, Comfort class, In-car WiFi",
      featuresZh: "1-3名乘客, 舒适型, 车内WiFi",
      order: 2,
    },
    {
      tariffKey: "business",
      price: 140,
      nameRu: "Бизнес",
      nameEn: "Business",
      nameZh: "商务",
      featuresRu: "1-3 пассажира, Mercedes S-класс, Детское кресло",
      featuresEn: "1-3 passengers, Mercedes S-Class, Child seat",
      featuresZh: "1-3名乘客, 奔驰 S 级, 儿童座椅",
      order: 3,
    },
    {
      tariffKey: "minivan",
      price: 130,
      nameRu: "Минивэн",
      nameEn: "Minivan",
      nameZh: "小型货车",
      featuresRu: "До 8 пассажиров, Volkswagen Caravella, Больше багажа",
      featuresEn: "Up to 8 passengers, VW Caravella, Extra luggage space",
      featuresZh: "最多8名乘客, 大众 Caravella, 更多行李空间",
      order: 4,
    },
    {
      tariffKey: "vip",
      price: 160,
      nameRu: "VIP",
      nameEn: "VIP",
      nameZh: "贵宾",
      featuresRu: "1-3 пассажира, Mercedes V-класс, Премиум сервис",
      featuresEn: "1-3 passengers, Mercedes V-Class, Premium service",
      featuresZh: "1-3名乘客, 奔驰 V 级, 尊贵服务",
      order: 5,
    },
    {
      tariffKey: "minibus",
      price: 220,
      nameRu: "Микроавтобус",
      nameEn: "Minibus",
      nameZh: "小巴",
      featuresRu: "До 19 пассажиров, Микроавтобус, Групповые поездки",
      featuresEn: "Up to 19 passengers, Minibus, Group trips",
      featuresZh: "最多19名乘客, 小巴, 团体出行",
      order: 6,
    },
  ];

  for (const tariff of airportTariffs) {
    await prisma.airportTariff.create({
      data: tariff,
    });
    console.log(`Created Airport Tariff: ${tariff.tariffKey}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
