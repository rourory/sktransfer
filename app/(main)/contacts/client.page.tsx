"use client"

import { useState, useEffect } from "react"
import { ContactSection } from "@/components/contact-section"
import { type Locale, detectLocale } from "@/lib/i18n"

export default function ContactsPageClient() {
  const [locale, setLocale] = useState<Locale>("ru")

  useEffect(() => {
    const detectedLocale = detectLocale()
    setLocale(detectedLocale)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <ContactSection locale={locale} />
    </main>
  )
}

export { ContactsPageClient }
