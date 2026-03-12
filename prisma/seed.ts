// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Начинаем очистку старых данных...");
  await prisma.article.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("Создаем автора...");
  const author = await prisma.user.create({
    data: {
      name: "SKTransfer Admin",
      email: "admin@sktransfer.by",
      bio: "Официальный представитель компании SKTransfer. Эксперт по туризму и пассажирским перевозкам.",
    },
  });

  console.log("Создаем мультиязычные категории...");
  const catSanatorium = await prisma.category.create({
    data: {
      slug: "sanatorii",
      image: "/uploads/category-sanatorii.jpg", // Заглушка, потом замените на реальную фотку
      nameRu: "Санатории и курорты",
      nameEn: "Sanatoriums and Resorts",
      nameZh: "疗养院和度假村",
      descriptionRu:
        "Полезные статьи о лучших санаториях Беларуси, правилах въезда и лечения. Узнайте, как добраться с комфортом.",
      descriptionEn:
        "Useful articles about the best sanatoriums in Belarus, entry rules, and treatments. Find out how to get there comfortably.",
      descriptionZh:
        "关于白俄罗斯最好的疗养院、入境规则和治疗的有用文章。了解如何舒适地到达那里。",
    },
  });

  const catExcursions = await prisma.category.create({
    data: {
      slug: "excursions",
      image: "/uploads/category-excursions.jpg",
      nameRu: "Экскурсии и туризм",
      nameEn: "Excursions and Tourism",
      nameZh: "游览和旅游",
      descriptionRu:
        "Гайды по замкам, историческим местам и достопримечательностям. Идеи для поездок на выходные.",
      descriptionEn:
        "Guides to castles, historical places, and attractions. Ideas for weekend trips.",
      descriptionZh: "城堡、历史名胜和景点的指南。周末旅行的想法。",
    },
  });

  const catTransfer = await prisma.category.create({
    data: {
      slug: "transfer",
      image: "/uploads/category-transfer.jpg",
      nameRu: "Трансфер и поездки",
      nameEn: "Transfers and Trips",
      nameZh: "接送和旅行",
      descriptionRu:
        "Советы пассажирам, особенности прохождения границы, аренда авто с водителем и VIP-обслуживание.",
      descriptionEn:
        "Tips for passengers, border crossing details, car rental with a driver, and VIP service.",
      descriptionZh: "给乘客的提示，过境细节，带司机的汽车租赁和VIP服务。",
    },
  });

  console.log("Создаем статьи с галереями {0}, {1}...");

  await prisma.article.create({
    data: {
      slug: "kak-dobratsya-v-sanatoriy-radon",
      categoryId: catSanatorium.id,
      authorId: author.id,
      coverImage: "/uploads/article-radon-cover.jpg",
      // Массив картинок для плейсхолдеров
      images: JSON.stringify([
        "/uploads/radon-building.jpg", // Для {0}
        "/uploads/radon-pool.jpg", // Для {1}
      ]),

      // РУССКИЙ
      titleRu: "Как добраться в санаторий «Радон»: все способы",
      excerptRu:
        "Подробный гайд по маршруту до одного из самых популярных санаториев. Расписание автобусов, поездов и преимущества трансфера.",
      contentRu: `
        <p>Санаторий «Радон» находится вдали от крупных трасс, но его популярность от этого только растет. Ежегодно сюда приезжают тысячи туристов для лечения радоновыми водами.</p>
        <h2>Главный корпус санатория</h2>
        <p>Архитектура здания впечатляет своими масштабами. Лечебная база находится прямо в главном здании, что очень удобно зимой.</p>
        {0}
        <h2>Почему стоит выбрать трансфер?</h2>
        <p>Общественный транспорт ходит редко. Заказав трансфер, вы доберетесь с комфортом прямо от дверей аэропорта.</p>
        <h2>Бассейны и СПА</h2>
        <p>После процедур гости могут расслабиться в шикарном бассейне с гидромассажем.</p>
        {1}
        <p>Заказывайте поездки заранее на нашем сайте!</p>
      `,

      // АНГЛИЙСКИЙ
      titleEn: "How to get to Radon Sanatorium: All Methods",
      excerptEn:
        "A detailed guide on the route to one of the most popular sanatoriums. Bus and train schedules, and the benefits of a transfer.",
      contentEn: `
        <p>The "Radon" sanatorium is located away from major highways, but its popularity only grows. Thousands of tourists come here every year for radon water treatments.</p>
        <h2>The Main Building</h2>
        <p>The architecture of the building is impressive in its scale. The medical facility is located right in the main building, which is very convenient in winter.</p>
        {0}
        <h2>Why choose a transfer?</h2>
        <p>Public transport runs infrequently. By booking a transfer, you will arrive comfortably right from the airport doors.</p>
        <h2>Pools and SPA</h2>
        <p>After treatments, guests can relax in a gorgeous pool with hydromassage.</p>
        {1}
        <p>Book your trips in advance on our website!</p>
      `,

      // КИТАЙСКИЙ
      titleZh: "如何前往氡疗养院：所有方法",
      excerptZh:
        "前往最受欢迎的疗养院之一的详细路线指南。巴士和火车时刻表，以及接送服务的优势。",
      contentZh: `
        <p>“氡”疗养院远离主要公路，但它的受欢迎程度却在不断提高。每年有成千上万的游客来这里接受氡水治疗。</p>
        <h2>主楼</h2>
        <p>这座建筑的建筑规模令人印象深刻。医疗设施就设在主楼内，冬天非常方便。</p>
        {0}
        <h2>为什么选择接送服务？</h2>
        <p>公共交通班次很少。通过预订接送服务，您可以直接从机场门口舒适地到达。</p>
        <h2>游泳池和水疗中心</h2>
        <p>治疗结束后，客人可以在带水力按摩的华丽游泳池中放松身心。</p>
        {1}
        <p>请在我们的网站上提前预订您的行程！</p>
      `,
    },
  });

  await prisma.article.create({
    data: {
      slug: "zamki-mir-i-nesvizh-za-odin-den",
      categoryId: catExcursions.id,
      authorId: author.id,
      coverImage: "/uploads/article-castles-cover.jpg",
      images: JSON.stringify([
        "/uploads/mir-castle.jpg", // Для {0}
        "/uploads/nesvizh-park.jpg", // Для {1}
      ]),

      // РУССКИЙ
      titleRu: "Замки Мир и Несвиж: что посмотреть за один день",
      excerptRu:
        "Идеальный маршрут для экскурсии выходного дня. Где остановиться, что обязательно сфотографировать и где пообедать.",
      contentRu: `
        <p>Мирский и Несвижский замки — визитная карточка Беларуси. Расстояние между ними всего около 30 км, поэтому их легко посетить за одну поездку.</p>
        <h2>Мирский замок</h2>
        <p>Этот готический шедевр впечатляет своими мощными башнями и красивым озером у подножия.</p>
        {0}
        <h2>Несвижский дворцово-парковый комплекс</h2>
        <p>Бывшая резиденция Радзивиллов поражает богатством интерьеров и огромным ландшафтным парком.</p>
        {1}
        <p>Наш водитель с радостью отвезет вас по этому маршруту, подождет во время экскурсий и доставит обратно в Минск.</p>
      `,

      // АНГЛИЙСКИЙ
      titleEn: "Mir and Nesvizh Castles: What to see in one day",
      excerptEn:
        "The perfect route for a weekend excursion. Where to stay, what to photograph, and where to have lunch.",
      contentEn: `
        <p>Mir and Nesvizh castles are the calling card of Belarus. The distance between them is only about 30 km, so they are easy to visit in one trip.</p>
        <h2>Mir Castle</h2>
        <p>This Gothic masterpiece impresses with its massive towers and a beautiful lake at the foot.</p>
        {0}
        <h2>Nesvizh Palace and Park Complex</h2>
        <p>The former residence of the Radziwills amazes with the richness of its interiors and a huge landscape park.</p>
        {1}
        <p>Our driver will happily take you along this route, wait during the excursions, and bring you back to Minsk.</p>
      `,

      // КИТАЙСКИЙ
      titleZh: "米尔和涅斯维日城堡：一日游指南",
      excerptZh:
        "周末短途旅行的完美路线。在哪里住宿，一定要拍什么照片，在哪里吃午餐。",
      contentZh: `
        <p>米尔和涅斯维日城堡是白俄罗斯的名片。它们之间的距离只有约30公里，因此很容易在一次旅行中参观。</p>
        <h2>米尔城堡</h2>
        <p>这座哥特式杰作以其巨大的塔楼和山脚下美丽的湖泊令人印象深刻。</p>
        {0}
        <h2>涅斯维日宫殿和公园建筑群</h2>
        <p>拉齐维乌家族的前住宅以其丰富的内饰和巨大的景观公园令人惊叹。</p>
        {1}
        <p>我们的司机很乐意带您沿着这条路线行驶，在游览期间等候，然后带您返回明斯克。</p>
      `,
    },
  });

  console.log("Сидирование успешно завершено! ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
