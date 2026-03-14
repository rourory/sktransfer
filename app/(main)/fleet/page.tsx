import type { Metadata } from "next"
import FleetPageClient from "./client.page"
import { getLocaleOnServer } from "@/lib/get-locale-on-server"
import { translations } from "@/lib/i18n"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleOnServer()
  const t = translations[locale].seo.fleet

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.description,
      url: "https://sktransfer.by/fleet",
      images: ["/og-image.webp"],
    },
    alternates: {
      canonical: "https://sktransfer.by/fleet",
    },
  }
}

export default function FleetPage() {
  return <FleetPageClient />
}
