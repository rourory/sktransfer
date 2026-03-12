import type { Metadata } from "next"
import CalculatorPageClient from "./client.page"

export const metadata: Metadata = {
  title: "Калькулятор стоимости трансфера — SKTransfer.by | Рассчитайте цену онлайн",
  description:
    "Онлайн калькулятор стоимости трансфера по Беларуси, России и Европе. Узнайте точную цену поездки за 1 минуту. Тарифы аэропорт Минск от 45 BYN. Прозрачное ценообразование, без скрытых платежей.",
  keywords: [
    "калькулятор трансфера",
    "расчет стоимости трансфера",
    "цена трансфера Минск",
    "тариф аэропорт Минск",
    "рассчитать трансфер онлайн",
    "стоимость такси Минск",
  ],
  openGraph: {
    title: "Калькулятор стоимости трансфера — SKTransfer.by",
    description: "Рассчитайте стоимость трансфера онлайн за 1 минуту. Прозрачные тарифы без скрытых платежей.",
    url: "https://sktransfer.by/calculator",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://sktransfer.by/calculator",
  },
}

export default function CalculatorPage() {
  return <CalculatorPageClient />
}
