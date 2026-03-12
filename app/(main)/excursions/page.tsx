import type { Metadata } from "next"
import ExcursionsPageClient from "./client.page"

export const metadata: Metadata = {
  title: "Экскурсии по Беларуси — SKTransfer.by | Туры и экскурсии из Минска",
  description:
    "Увлекательные экскурсии по Беларуси с профессиональными гидами. Обзорные туры по Минску, Брестская крепость, замки Мир и Несвиж, Хатынь, Беловежская пуща. Групповые и индивидуальные экскурсии на комфортабельном транспорте. Бронирование онлайн.",
  keywords: [
    "экскурсии Минск",
    "экскурсии по Беларуси",
    "туры из Минска",
    "Брестская крепость экскурсия",
    "Несвижский замок",
    "Мирский замок",
    "экскурсия в Хатынь",
    "Беловежская пуща тур",
  ],
  openGraph: {
    title: "Экскурсии по Беларуси — SKTransfer.by",
    description: "Увлекательные экскурсии по достопримечательностям Беларуси с профессиональными гидами",
    url: "https://sktransfer.by/excursions",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://sktransfer.by/excursions",
  },
}

export default function ExcursionsPage() {
  return <ExcursionsPageClient />
}
