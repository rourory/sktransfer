import type { Metadata } from "next"
import ServicesPageClient from "./client.page"

export const metadata: Metadata = {
  title: "Услуги трансфера — SKTransfer.by | Аэропорт, Вокзал, Межгород, VIP-обслуживание",
  description:
    "Полный спектр услуг трансфера: встреча в аэропорту Минск-2, трансфер на вокзал, междугородние поездки по Беларуси и Европе, свадебный кортеж, корпоративный транспорт, VIP-сопровождение. Профессиональные водители, комфортабельные автомобили 24/7.",
  keywords: [
    "трансфер аэропорт Минск",
    "трансфер на вокзал",
    "междугородний трансфер",
    "VIP трансфер",
    "свадебный кортеж",
    "корпоративный транспорт",
    "трансфер санаторий",
  ],
  openGraph: {
    title: "Услуги трансфера — SKTransfer.by",
    description: "Полный спектр услуг трансфера по Беларуси, России и Европе",
    url: "https://sktransfer.by/services",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://sktransfer.by/services",
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
