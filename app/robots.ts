import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/", // Закрываем админку от индексации
        "/api/", // Закрываем служебные API роуты
        "/actions/", // На всякий случай закрываем серверные экшены
        "/*?*sort=", // Запрещаем индексировать страницы с сортировками (если будут)
      ],
    },
    sitemap: "https://sktransfer.by/sitemap.xml",
  };
}
