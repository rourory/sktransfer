"use client";

import Link from "next/link";
import { Navigation, ArrowRight } from "lucide-react";
import { type Locale, translations } from "@/lib/i18n";

interface RouteSnippet {
  slug: string;
  distanceKm: number;
  fromNameRu: string;
  toNameRu: string;
  fromNameEn?: string | null;
  toNameEn?: string | null;
  fromNameZh?: string | null;
  toNameZh?: string | null;
  additionalContentRu?: string | null;
  additionalContentEn?: string | null;
  additionalContentZh?: string | null;
}

interface PopularRoutesListProps {
  routes: RouteSnippet[];
  locale: Locale;
}

export function PopularRoutesList({ routes, locale }: PopularRoutesListProps) {
  if (!routes || routes.length === 0) return null;

  const t = translations[locale].transferPage.popular;

  return (
    <div className="mt-12 pt-10 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-amber-50 rounded-xl">
          <Navigation className="w-6 h-6 text-[var(--gold)]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {t.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {routes.map((r) => {
          // Динамический выбор названий
          const fromName =
            locale === "en"
              ? r.fromNameEn || r.fromNameRu
              : locale === "zh"
                ? r.fromNameZh || r.fromNameRu
                : r.fromNameRu;
          const toName =
            locale === "en"
              ? r.toNameEn || r.toNameRu
              : locale === "zh"
                ? r.toNameZh || r.toNameRu
                : r.toNameRu;

          // Динамический выбор контента
          let previewText = "";
          if (locale === "ru" && r.additionalContentRu)
            previewText = r.additionalContentRu;
          else if (locale === "en" && r.additionalContentEn)
            previewText = r.additionalContentEn;
          else if (locale === "zh" && r.additionalContentZh)
            previewText = r.additionalContentZh;
          else previewText = t.defaultPreview;

          return (
            <Link
              key={r.slug}
              href={`/transfer/${r.slug}`}
              className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-5 hover:border-[var(--gold)]/50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-[var(--gold)] transition-colors leading-tight">
                  {fromName} — {toName}
                </h3>
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap ml-3">
                  {r.distanceKm} км
                </span>
              </div>

              <div className="relative mb-4 flex-grow">
                <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                  {previewText}
                </p>
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent" />
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--gold)]">
                  {t.findOutPrice}
                </span>
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center group-hover:bg-[var(--gold)] transition-colors">
                  <ArrowRight className="w-4 h-4 text-[var(--gold)] group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
