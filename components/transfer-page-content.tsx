import { type DbTariff } from "@/components/calculator-form";
import { CalculatorFormClient } from "./calculator-form-client";
import { PopularRoutesList } from "@/components/popular-routes-list";
import { type Locale, translations } from "@/lib/i18n";
import {
  Clock,
  MapPin,
  ShieldCheck,
  Wifi,
  Coffee,
  Baby,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

interface Props {
  locale: Locale;
  route: any;
  tariffs: DbTariff[];
  popularRoutes: any[];
  preCalculated: Record<string, number>;
  initialDistance: string;
  initialFromCoords: { lat: number; lon: number } | null;
  initialToCoords: { lat: number; lon: number } | null;
}

export default function TransferPageContent({
  locale,
  route,
  tariffs,
  popularRoutes,
  preCalculated,
  initialDistance,
  initialFromCoords,
  initialToCoords,
}: Props) {
  const t = translations[locale].transferPage;

  const fromName =
    locale === "en"
      ? route.fromNameEn || route.fromNameRu
      : locale === "zh"
        ? route.fromNameZh || route.fromNameRu
        : route.fromNameRu;
  const toName =
    locale === "en"
      ? route.toNameEn || route.toNameRu
      : locale === "zh"
        ? route.toNameZh || route.toNameRu
        : route.toNameRu;

  const additionalContent =
    locale === "en"
      ? route.additionalContentEn
      : locale === "zh"
        ? route.additionalContentZh
        : route.additionalContentRu;

  const formatDuration = (minutes: number) => {
    if (!minutes) return t.onDemand;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0
      ? `${h} ${t.h} ${m > 0 ? `${m} ${t.min}` : ""}`
      : `${m} ${t.min}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <section className="bg-white border-b border-gray-200 pt-8 pb-8 md:pt-12 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
            <Link
              href={`/${locale}`}
              className="hover:text-[var(--gold)] transition-colors"
            >
              {t.breadcrumbs.home}
            </Link>
            <span>/</span>
            <Link
              href={`/${locale}/transfers`}
              className="hover:text-[var(--gold)] transition-colors"
            >
              {t.breadcrumbs.transfers}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{toName}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {t.title}{" "}
            <span className="gold-gradient-text">
              {fromName} — {toName}
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm md:text-base text-gray-600">
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
              <MapPin className="w-4 h-4 mr-2 text-[var(--gold)]" />
              {t.distance}{" "}
              <strong className="ml-1">{route.distanceKm} км</strong>
            </div>
            {route.durationMin && (
              <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
                <Clock className="w-4 h-4 mr-2 text-[var(--gold)]" />
                {t.inRoute}{" "}
                <strong className="ml-1">
                  ≈ {formatDuration(route.durationMin)}
                </strong>
              </div>
            )}
            <div className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200 font-medium">
              <ShieldCheck className="w-4 h-4 mr-2" />
              {t.flexible}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-10">
        {/* Вернули классический items-start: колонки независимы друг от друга по высоте */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* ЛЕВАЯ КОЛОНКА */}
          <div className="w-full lg:w-7/12 xl:w-2/3 space-y-10 md:space-y-12">
            <div className="prose max-w-none text-gray-600 text-sm sm:text-base">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t.tripInfo}
              </h2>
              <p>
                {locale === "ru" &&
                  `Планируете поездку? Индивидуальный трансфер по маршруту `}
                {locale === "en" &&
                  `Planning a trip? A private transfer on the route `}
                {locale === "zh" && `计划旅行吗？在路线上进行私人接送 `}
                <strong>
                  {fromName} — {toName}
                </strong>
                {locale === "ru" &&
                  ` от нашей компании — это гарантия того, что вы доберетесь до места назначения с максимальным комфортом и точно в срок.`}
                {locale === "en" &&
                  ` from our company is a guarantee that you will reach your destination with maximum comfort and exactly on time.`}
                {locale === "zh" &&
                  ` 我们公司保证您将以最舒适的方式准时到达目的地。`}
              </p>
              {additionalContent && <p>{additionalContent}</p>}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t.featuresTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Clock,
                    title: t.features.wait.title,
                    desc: t.features.wait.desc,
                  },
                  {
                    icon: ShieldCheck,
                    title: t.features.safety.title,
                    desc: t.features.safety.desc,
                  },
                  {
                    icon: Wifi,
                    title: t.features.wifi.title,
                    desc: t.features.wifi.desc,
                  },
                  {
                    icon: Coffee,
                    title: t.features.water.title,
                    desc: t.features.water.desc,
                  },
                  {
                    icon: Baby,
                    title: t.features.baby.title,
                    desc: t.features.baby.desc,
                  },
                  {
                    icon: CreditCard,
                    title: t.features.payment.title,
                    desc: t.features.payment.desc,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-[var(--gold)]/30 transition-colors"
                  >
                    <div className="p-2.5 bg-amber-50 rounded-lg mr-4 flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[var(--gold)]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t.howItWorks.title}
              </h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--gold)] text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                  </div>
                  <div className="pb-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {t.howItWorks.step1.title}
                    </h4>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      {t.howItWorks.step1.desc}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 border-2 border-[var(--gold)] flex items-center justify-center font-bold">
                      2
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                  </div>
                  <div className="pb-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {t.howItWorks.step2.title}
                    </h4>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      {t.howItWorks.step2.desc}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 border-2 border-[var(--gold)] flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {t.howItWorks.step3.title}
                    </h4>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      {t.howItWorks.step3.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-6 h-6 text-[var(--gold)]" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {t.faq.title}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">{t.faq.q1.q}</h4>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t.faq.q1.a}
                  </p>
                </div>
                <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">{t.faq.q2.q}</h4>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t.faq.q2.a}
                  </p>
                </div>
              </div>
            </div>

            {/* Блок популярных маршрутов (Сетка карточек) */}
            {popularRoutes && popularRoutes.length > 0 && (
              <PopularRoutesList locale={locale} routes={popularRoutes} />
            )}
          </div>

          {/* ПРАВАЯ КОЛОНКА (Калькулятор) */}
          {/* Вернули чистый, классический блок. Никаких sticky, никаких overflow. Прокручивается вместе со страницей */}
          <div className="w-full lg:w-5/12 xl:w-1/3">
            <CalculatorFormClient
              locale={locale}
              dbTariffs={tariffs}
              initialFrom={fromName}
              initialTo={toName}
              initialDistance={initialDistance}
              initialFromCoords={initialFromCoords}
              initialToCoords={initialToCoords}
              preCalculatedResults={preCalculated}
              autoCalculateOnMount={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
