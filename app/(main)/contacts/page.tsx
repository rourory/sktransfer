import type { Metadata } from "next"
import ContactsPageClient from "./client.page"

export const metadata: Metadata = {
  title: "Контакты — SKTransfer.by | Заказать трансфер +375 (29) 122-84-84",
  description:
    "Связаться с SK Transfer: телефон +375 (29) 122-84-84, email info@sktransfer.by. Работаем 24/7 без выходных. Telegram, WhatsApp, Viber, WeChat. Офис в Минске, Беларусь. Быстрый ответ в течение нескольких минут.",
  keywords: [
    "контакты SK Transfer",
    "телефон трансфер Минск",
    "заказать трансфер",
    "трансфер круглосуточно",
    "офис SK Transfer",
  ],
  openGraph: {
    title: "Контакты — SKTransfer.by",
    description: "Связаться с нами: +375 (29) 122-84-84, работаем 24/7",
    url: "https://sktransfer.by/contacts",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://sktransfer.by/contacts",
  },
}

export default function ContactsPage() {
  return <ContactsPageClient />
}
