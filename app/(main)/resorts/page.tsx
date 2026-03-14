import { cookies } from "next/headers";
import { ResortsSection } from "@/components/resorts-section";
import { type Locale, translations } from "@/lib/i18n";
import type { Metadata } from "next";
import { getLocaleOnServer } from "@/lib/get-locale-on-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleOnServer()
  const t = translations[locale].seo.resorts

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.description,
      url: "https://sktransfer.by/resorts",
      images:["/ski-resort-snow-mountains-belarus.webp"],
    },
    alternates: {
      canonical: "https://sktransfer.by/resorts",
    },
  }
}

export default async function ResortsPage() {
  // 1. Получаем куки (В Next.js 15 это Promise, поэтому используем await)
  const cookieStore = await cookies();
  const localeValue = cookieStore.get("NEXT_LOCALE")?.value;

  // 2. Строго типизируем и задаем фолбэк на русский
  const locale: Locale =
    localeValue === "en" || localeValue === "zh" ? localeValue : "ru";

  // 3. Получаем переводы для текущего языка
  const t = translations[locale];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <div className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/ski-resort-snow-mountains-belarus.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/92" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-center mb-16 gold-gradient-text">
            {t.resorts?.title || "Санатории Беларуси"}
          </h1>

          {/* 
            Если ResortsSection не имеет интерактивности (кнопок, стейтов), 
            вы тоже можете убрать из него "use client", и он станет серверным!
          */}
          <ResortsSection locale={locale} />
        </div>
      </div>
    </main>
  );
}
