import type { Metadata } from "next"
import FleetPageClient from "./client.page"

export const metadata: Metadata = {
  title: "Автопарк премиум класса — SKTransfer.by | Mercedes S-Class, E-Class, V-Class, Sprinter",
  description:
    "Современный автопарк премиум-класса для трансферов. Mercedes S-Class, E-Class, минивэны V-Class, микроавтобусы Sprinter. Комфортабельные автомобили бизнес и премиум сегмента с кондиционером, кожаным салоном, Wi-Fi. Профессиональные водители.",
  keywords: [
    "автопарк трансфер",
    "Mercedes S-Class аренда",
    "премиум автомобили Минск",
    "бизнес класс трансфер",
    "минивэн аренда Минск",
    "микроавтобус Sprinter",
    "VIP автомобили",
  ],
  openGraph: {
    title: "Автопарк премиум класса — SKTransfer.by",
    description: "Современный автопарк Mercedes для комфортных трансферов",
    url: "https://sktransfer.by/fleet",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://sktransfer.by/fleet",
  },
}

export default function FleetPage() {
  return <FleetPageClient />
}
