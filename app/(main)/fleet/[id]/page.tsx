import VehiclePageClient from "./vehicle-page-client"
import { translations, type Locale } from "@/lib/i18n"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return [
    { id: "volkswagen-polo" },
    { id: "skoda-superb" },
    { id: "mercedes-e-class" },
    { id: "mercedes-v-class" },
    { id: "mercedes-s-class" },
    { id: "mercedes-sprinter" },
  ]
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const vehicleTitles: Record<string, { ru: string; en: string }> = {
    "volkswagen-polo": {
      ru: "Volkswagen Polo — Аренда с водителем в Минске | SKTransfer",
      en: "Volkswagen Polo — Chauffeur Service in Minsk | SKTransfer",
    },
    "skoda-superb": {
      ru: "Skoda Superb — Премиум трансфер в Минске | SKTransfer",
      en: "Skoda Superb — Premium Transfer in Minsk | SKTransfer",
    },
    "mercedes-e-class": {
      ru: "Mercedes-Benz E-Class — VIP трансфер | SKTransfer",
      en: "Mercedes-Benz E-Class — VIP Transfer | SKTransfer",
    },
    "mercedes-v-class": {
      ru: "Mercedes-Benz V-Class — Минивэн до 8 мест | SKTransfer",
      en: "Mercedes-Benz V-Class — Minivan up to 8 seats | SKTransfer",
    },
    "mercedes-s-class": {
      ru: "Mercedes-Benz S-Class — VIP класс | SKTransfer",
      en: "Mercedes-Benz S-Class — VIP Class | SKTransfer",
    },
    "mercedes-sprinter": {
      ru: "Mercedes-Benz Sprinter — Микроавтобус до 19 мест | SKTransfer",
      en: "Mercedes-Benz Sprinter — Minibus up to 19 seats | SKTransfer",
    },
  }

  const vehicleDescriptions: Record<string, { ru: string; en: string }> = {
    "volkswagen-polo": {
      ru: "Аренда Volkswagen Polo с водителем в Минске. Комфортный седан для городских поездок и трансферов в аэропорт. Цена от 1.30 BYN/км.",
      en: "Rent Volkswagen Polo with driver in Minsk. Comfortable sedan for city trips and airport transfers. Price from 1.30 BYN/km.",
    },
    "skoda-superb": {
      ru: "Трансфер на Skoda Superb в Минске. Премиум-седан для комфортабельных поездок. Кожаные сиденья, климат-контроль. От 1.50 BYN/км.",
      en: "Skoda Superb transfer in Minsk. Premium sedan for comfortable trips. Leather seats, climate control. From 1.50 BYN/km.",
    },
    "mercedes-e-class": {
      ru: "VIP трансфер на Mercedes-Benz E-Class. Бизнес-класс для деловых поездок. Массаж сидений, премиум аудио. От 3.00 BYN/км.",
      en: "VIP transfer in Mercedes-Benz E-Class. Business class for business trips. Seat massage, premium audio. From 3.00 BYN/km.",
    },
    "mercedes-v-class": {
      ru: "Аренда Mercedes-Benz V-Class с водителем. Комфортный минивэн до 7 пассажиров. Идеален для семей и групп. От 2.20 BYN/км.",
      en: "Mercedes-Benz V-Class rental with driver. Comfortable minivan up to 7 passengers. Perfect for families and groups. From 2.20 BYN/km.",
    },
    "mercedes-s-class": {
      ru: "VIP трансфер Mercedes-Benz S-Class. Роскошный седан высшего класса. Массаж задних сидений, холодильник. От 3.00 BYN/км.",
      en: "VIP transfer Mercedes-Benz S-Class. Luxury sedan of the highest class. Rear seat massage, refrigerator. From 3.00 BYN/km.",
    },
    "mercedes-sprinter": {
      ru: "Аренда Mercedes-Benz Sprinter с водителем. Микроавтобус на 18 мест для корпоративных мероприятий. От 3.00 BYN/км.",
      en: "Mercedes-Benz Sprinter rental with driver. 18-seat minibus for corporate events. From 3.00 BYN/km.",
    },
  }

  const title = vehicleTitles[params.id]?.ru || "Автомобиль | SKTransfer"
  const description = vehicleDescriptions[params.id]?.ru || "Аренда автомобиля с водителем в Минске"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://sktransfer.by/fleet/${params.id}`,
      siteName: "SKTransfer.by",
      images: [
        {
          url: `/og-${params.id}.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og-${params.id}.jpg`],
    },
    alternates: {
      canonical: `https://sktransfer.by/fleet/${params.id}`,
      languages: {
        ru: `https://sktransfer.by/fleet/${params.id}`,
        en: `https://sktransfer.by/fleet/${params.id}`,
      },
    },
  }
}

interface Vehicle {
  id: string
  category: string
  model: string
  images: string[]
  passengers: number
  luggage: number
  price: string
  year: string
  details: {
    engine: string
    power: string
    transmission: string
    fuel: string
    comfort: string
    description: string
    features: string[]
  }
}

async function getVehicles(locale: Locale): Promise<Vehicle[]> {
  const t = translations[locale]

  return [
    {
      id: "volkswagen-polo",
      category: t.tariffs.standard,
      model: "Volkswagen Polo",
      images: [
        "/black-volkswagen-polo-sedan-premium2.jpg",
        "/black-volkswagen-polo-sedan-premium3.jpg",
        "/black-volkswagen-polo-sedan-premium4.jpg",
        "/black-volkswagen-polo-sedan-premium1.jpg",
      ],
      passengers: 3,
      luggage: 2,
      price: "1.30",
      year: "2021",
      details: {
        engine: "1.4 TSI",
        power: locale === "ru" ? "150 л.с." : locale === "en" ? "150 hp" : "150 马力",
        transmission: locale === "ru" ? "Автомат" : locale === "en" ? "Automatic" : "自动",
        fuel: locale === "ru" ? "Бензин" : locale === "en" ? "Petrol" : "汽油",
        comfort:
          locale === "ru"
            ? "Кондиционер, кожаные сиденья, мультимедиа система"
            : locale === "en"
              ? "Air conditioning, leather seats, multimedia system"
              : "空调，真皮座椅，多媒体系统",
        description:
          locale === "ru"
            ? "Идеален для городских поездок и коротких путешествий. Компактный и стильный седан."
            : locale === "en"
              ? "Perfect for city trips and short journeys. Compact and stylish sedan."
              : "适合城市旅行和短途旅行。紧凑且时尚的轿车。",
        features: [
          locale === "ru" ? "Климат-контроль" : locale === "en" ? "Climate control" : "气候控制",
          locale === "ru" ? "Подогрев сидений" : locale === "en" ? "Heated seats" : "座椅加热",
          locale === "ru" ? "Круиз-контроль" : locale === "en" ? "Cruise control" : "巡航控制",
          locale === "ru" ? "Bluetooth и USB" : locale === "en" ? "Bluetooth and USB" : "蓝牙和USB",
          locale === "ru" ? "Парковочные датчики" : locale === "en" ? "Parking sensors" : "停车传感器",
          locale === "ru" ? "Камера заднего вида" : locale === "en" ? "Rear camera" : "后置摄像头",
        ],
      },
    },
    {
      id: "skoda-superb",
      category: t.tariffs.comfort,
      model: "Skoda Superb",
      images: [
        "/black-skoda-superb-luxury-sedan4.jpg",
        "/black-skoda-superb-luxury-sedan1.jpg",
        "/black-skoda-superb-luxury-sedan2.jpg",
        "/black-skoda-superb-luxury-sedan3.jpg",
      ],
      passengers: 3,
      luggage: 3,
      price: "1.50",
      year: "2022",
      details: {
        engine: "2.0 TDI",
        power: locale === "ru" ? "200 л.с." : locale === "en" ? "200 hp" : "200 马力",
        transmission: locale === "ru" ? "Автомат DSG" : locale === "en" ? "DSG Automatic" : "DSG自动",
        fuel: locale === "ru" ? "Дизель" : locale === "en" ? "Diesel" : "柴油",
        comfort:
          locale === "ru"
            ? "Климат-контроль, подогрев сидений, панорамная крыша"
            : locale === "en"
              ? "Climate control, heated seats, panoramic roof"
              : "气候控制，座椅加热，全景天窗",
        description:
          locale === "ru"
            ? "Просторный и комфортабельный седан для длительных поездок. Отличная управляемость и высокий уровень комфорта."
            : locale === "en"
              ? "Spacious and comfortable sedan for long trips. Excellent handling and high comfort level."
              : "宽敞舒适的轿车，适合长途旅行。出色的操控性和高舒适度。",
        features: [
          locale === "ru" ? "Трёхзонный климат" : locale === "en" ? "Tri-zone climate" : "三区气候",
          locale === "ru" ? "Вентиляция сидений" : locale === "en" ? "Ventilated seats" : "通风座椅",
          locale === "ru" ? "Панорамная крыша" : locale === "en" ? "Panoramic roof" : "全景天窗",
          locale === "ru" ? "Адаптивный круиз" : locale === "en" ? "Adaptive cruise" : "自适应巡航",
          locale === "ru" ? "Помощь парковки" : locale === "en" ? "Parking assist" : "停车辅助",
          locale === "ru" ? "LED-освещение" : locale === "en" ? "LED lighting" : "LED照明",
        ],
      },
    },
    {
      id: "mercedes-e-class",
      category: t.tariffs.business,
      model: "Mercedes-Benz E-Class",
      images: [
        "/black-mercedes-e-class-luxury-sedan2.jpg",
        "/black-mercedes-e-class-luxury-sedan3.jpg",
        "/black-mercedes-e-class-luxury-sedan1.jpg",
        "/black-mercedes-e-class-luxury-sedan4.jpg",
      ],
      passengers: 3,
      luggage: 2,
      price: "3.00",
      year: "2023",
      details: {
        engine: "3.0 V6",
        power: locale === "ru" ? "367 л.с." : locale === "en" ? "367 hp" : "367 马力",
        transmission: locale === "ru" ? "9G-TRONIC" : locale === "en" ? "9G-TRONIC" : "9G-TRONIC",
        fuel: locale === "ru" ? "Бензин" : locale === "en" ? "Petrol" : "汽油",
        comfort:
          locale === "ru"
            ? "Премиум аудиосистема, массаж сидений, ambient освещение"
            : locale === "en"
              ? "Premium audio system, seat massage, ambient lighting"
              : "高级音响系统，座椅按摩，氛围照明",
        description:
          locale === "ru"
            ? "Бизнес-класс для самых взыскательных клиентов. Максимальный комфорт и престиж. Передовые технологии и роскошь."
            : locale === "en"
              ? "Business class for the most demanding clients. Maximum comfort and prestige. Advanced technology and luxury."
              : "商务级别，适合要求最高的客户。最大舒适度和声望。先进技术和奢华。",
        features: [
          locale === "ru" ? "Система Burmester" : locale === "en" ? "Burmester system" : "Burmester系统",
          locale === "ru" ? "Массаж сидений" : locale === "en" ? "Seat massage" : "座椅按摩",
          locale === "ru" ? "Ambient освещение" : locale === "en" ? "Ambient lighting" : "氛围照明",
          locale === "ru" ? "Пневмоподвеска" : locale === "en" ? "Air suspension" : "空气悬挂",
          locale === "ru" ? "Панорамная крыша" : locale === "en" ? "Panoramic roof" : "全景天窗",
          locale === "ru" ? "360° камеры" : locale === "en" ? "360° cameras" : "360°摄像头",
        ],
      },
    },
    {
      id: "mercedes-v-class",
      category: t.tariffs.minivan,
      model: "Mercedes-Benz V-Class",
      images: [
        "/black-mercedes-v-class-luxury-minivan.jpg",
        "/black-mercedes-v-class-luxury-minivan1.jpg",
        "/black-mercedes-v-class-luxury-minivan2.jpg",
        "/black-mercedes-v-class-luxury-minivan3.jpg",
      ],
      passengers: 7,
      luggage: 6,
      price: "2.20",
      year: "2022",
      details: {
        engine: "2.0 CDI",
        power: locale === "ru" ? "163 л.с." : locale === "en" ? "163 hp" : "163 马力",
        transmission: locale === "ru" ? "7G-TRONIC" : locale === "en" ? "7G-TRONIC" : "7G-TRONIC",
        fuel: locale === "ru" ? "Дизель" : locale === "en" ? "Diesel" : "柴油",
        comfort:
          locale === "ru"
            ? "7 комфортных мест, индивидуальный климат, мультимедиа для пассажиров"
            : locale === "en"
              ? "7 comfortable seats, individual climate, multimedia for passengers"
              : "7个舒适座位，独立气候控制，乘客多媒体",
        description:
          locale === "ru"
            ? "Идеален для семей и небольших групп. Просторный салон с индивидуальными креслами. Большой багажник."
            : locale === "en"
              ? "Perfect for families and small groups. Spacious interior with individual seats. Large trunk."
              : "适合家庭和小团体。宽敞的内饰配有独立座椅。大行李箱。",
        features: [
          locale === "ru" ? "7 комфортных мест" : locale === "en" ? "7 comfortable seats" : "7个舒适座位",
          locale === "ru" ? "Индивидуальный климат" : locale === "en" ? "Individual climate" : "独立气候",
          locale === "ru" ? "Раздвижные двери" : locale === "en" ? "Sliding doors" : "滑动门",
          locale === "ru" ? "Большой багажник" : locale === "en" ? "Large trunk" : "大行李箱",
          locale === "ru" ? "USB для каждого" : locale === "en" ? "USB for everyone" : "每人USB",
          locale === "ru" ? "Мультимедиа система" : locale === "en" ? "Multimedia system" : "多媒体系统",
        ],
      },
    },
    {
      id: "mercedes-s-class",
      category: t.tariffs.vip,
      model: "Mercedes-Benz S-Class",
      images: [
        "/black-mercedes-s-class-luxury-sedan-vip.jpg",
        "/black-mercedes-s-class-luxury-sedan-vip1.jpg",
        "/black-mercedes-s-class-luxury-sedan-vip2.jpg",
        "/black-mercedes-s-class-luxury-sedan-vip3.jpg",
      ],
      passengers: 3,
      luggage: 3,
      price: "3.00",
      year: "2023",
      details: {
        engine: "4.0 V8 Biturbo",
        power: locale === "ru" ? "469 л.с." : locale === "en" ? "469 hp" : "469 马力",
        transmission: locale === "ru" ? "9G-TRONIC" : locale === "en" ? "9G-TRONIC" : "9G-TRONIC",
        fuel: locale === "ru" ? "Бензин" : locale === "en" ? "Petrol" : "汽油",
        comfort:
          locale === "ru"
            ? "Эксклюзивная отделка салона, Burmester аудио, шампанское и вода"
            : locale === "en"
              ? "Exclusive interior, Burmester audio, champagne and water"
              : "独家内饰，Burmester音响，香槟和水",
        description:
          locale === "ru"
            ? "Максимальный уровень комфорта и престижа. VIP-класс для особых случаев. Роскошь в каждой детали."
            : locale === "en"
              ? "Maximum level of comfort and prestige. VIP class for special occasions. Luxury in every detail."
              : "最高级别的舒适和声望。特殊场合的VIP级别。每个细节都充满奢华。",
        features: [
          locale === "ru" ? "Кожа Nappa" : locale === "en" ? "Nappa leather" : "Nappa真皮",
          locale === "ru" ? "4D Burmester" : locale === "en" ? "4D Burmester" : "4D Burmester",
          locale === "ru" ? "Массаж задних сидений" : locale === "en" ? "Rear seat massage" : "后排座椅按摩",
          locale === "ru" ? "Холодильник" : locale === "en" ? "Refrigerator" : "冰箱",
          locale === "ru" ? "Шампанское" : locale === "en" ? "Champagne" : "香槟",
          locale === "ru" ? "Складные столики" : locale === "en" ? "Folding tables" : "折叠桌",
        ],
      },
    },
    {
      id: "mercedes-sprinter",
      category: t.tariffs.minibus,
      model: "Mercedes-Benz Sprinter",
      images: [
        "/black-mercedes-sprinter-luxury-minibus.jpg",
        "/black-mercedes-sprinter-luxury-minibus1.jpg",
        "/black-mercedes-sprinter-luxury-minibus2.jpg",
        "/black-mercedes-sprinter-luxury-minibus3.jpg",
      ],
      passengers: 18,
      luggage: 15,
      price: "3.00",
      year: "2022",
      details: {
        engine: "3.0 V6 CDI",
        power: locale === "ru" ? "190 л.с." : locale === "en" ? "190 hp" : "190 马力",
        transmission: locale === "ru" ? "7G-TRONIC" : locale === "en" ? "7G-TRONIC" : "7G-TRONIC",
        fuel: locale === "ru" ? "Дизель" : locale === "en" ? "Diesel" : "柴油",
        comfort:
          locale === "ru"
            ? "18 мест повышенной комфортности, кондиционер, USB-зарядки"
            : locale === "en"
              ? "18 enhanced comfort seats, air conditioning, USB charging"
              : "18个增强舒适座位，空调，USB充电",
        description:
          locale === "ru"
            ? "Для корпоративных мероприятий и больших групп. Комфортные кресла и большое багажное отделение."
            : locale === "en"
              ? "For corporate events and large groups. Comfortable seats and large luggage compartment."
              : "适合企业活动和大团体。舒适的座椅和大行李舱。",
        features: [
          locale === "ru" ? "18 комфортных мест" : locale === "en" ? "18 comfortable seats" : "18个舒适座位",
          locale === "ru" ? "Кондиционер" : locale === "en" ? "Air conditioning" : "空调",
          locale === "ru" ? "USB на каждом ряду" : locale === "en" ? "USB in each row" : "每排USB",
          locale === "ru" ? "Большой багажник" : locale === "en" ? "Large trunk" : "大行李箱",
          locale === "ru" ? "Микрофон" : locale === "en" ? "Microphone" : "麦克风",
          locale === "ru" ? "Панорамные окна" : locale === "en" ? "Panoramic windows" : "全景窗",
        ],
      },
    },
  ]
}

export const dynamic = "force-dynamic"

export default async function VehiclePage({
  searchParams,
  params,
}: { searchParams: { lang?: string }; params: { id: string } }) {
  const locale = (searchParams.lang as Locale) || "ru"
  const vehicles = await getVehicles(locale)

  return <VehiclePageClient vehicles={vehicles} />
}
