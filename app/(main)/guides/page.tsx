import type { Metadata } from "next"
import GuidesPageClient from "./client.page"

export const metadata: Metadata = {
  title: "Профессиональные гиды Минска — SKTransfer.by | Экскурсии с лучшими гидами Беларуси",
  description:
    "Опытные профессиональные гиды в Минске и по Беларуси. Индивидуальные и групповые экскурсии на русском, английском, китайском языках. Авторские маршруты по историческим местам, музеям, достопримечательностям. Бронирование онлайн 24/7.",
  keywords: [
    "гид Минск",
    "экскурсовод Минск",
    "гид по Беларуси",
    "экскурсии с гидом Минск",
    "профессиональный гид",
    "частный гид Минск",
    "индивидуальные экскурсии Минск",
  ],
  openGraph: {
    title: "Профессиональные гиды Минска — SKTransfer.by",
    description: "Опытные гиды для индивидуальных и групповых экскурсий по Минску и Беларуси",
    url: "https://sktransfer.by/guides",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://sktransfer.by/guides",
  },
}

export default function GuidesPage() {
  return <GuidesPageClient />
}
