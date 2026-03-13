import type { Metadata } from "next"
import ExcursionsPageClient from "./client.page"
import { getLocaleOnServer } from "@/lib/get-locale-on-server"
import { translations } from "@/lib/i18n"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleOnServer()
  const t = translations[locale].seo.excursions

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.description,
      url: "https://sktransfer.by/excursions",
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: "https://sktransfer.by/excursions",
    },
  }
}

export default function ExcursionsPage() {
  return <ExcursionsPageClient />
}
