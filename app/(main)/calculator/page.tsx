import type { Metadata } from "next"
import CalculatorPageClient from "./client.page"
import { getLocaleOnServer } from "@/lib/get-locale-on-server"
import { translations } from "@/lib/i18n"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleOnServer()
  const t = translations[locale].seo.calculator

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.description,
      url: "https://sktransfer.by/calculator",
      images: ["/og-image.webp"],
    },
    alternates: {
      canonical: "https://sktransfer.by/calculator",
    },
  }
}

export default function CalculatorPage() {
  return <CalculatorPageClient />
}
