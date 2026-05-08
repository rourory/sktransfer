// components/partners-section.tsx
import { type Locale, translations } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Car, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PartnersSectionProps {
  locale: Locale;
}

export function PartnersSection({ locale }: PartnersSectionProps) {
  const t = translations[locale].partners;

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Сетка партнеров (пока одна карточка, но готова для добавления новых) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {/* Карточка партнера: Вилейские просторы */}
          <div className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
            {/* Изображение усадьбы */}
            <div className="relative h-64 w-full overflow-hidden bg-gray-100">
              <Image
                src="/partners/agrousadba-vileiske-prostory.jpg" // Замените на реальное фото!
                alt="Агроусадьба Вилейские просторы"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Бейдж рекомендации */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <CheckCircle className="w-4 h-4 text-[#c9a86a]" />
                <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide">
                  Recommend
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-grow p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t.vprostore.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                {t.vprostore.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
                {/* Кнопка перехода на сайт партнера */}
                <Link
                  href="https://vprostore.by/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    className="cursor-pointer w-full rounded-full border-gray-200 hover:border-[#c9a86a] transition-colors text-black"
                  >
                    {t.vprostore.btn}
                    <ExternalLink className="ml-2 h-4 w-4  transition-colors" />
                  </Button>
                </Link>

                {/* Быстрая ссылка на заказ трансфера (опционально) */}
                <Link href="/calculator" className="w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    className="cursor-pointer w-full rounded-full text-[#c9a86a] hover:text-[#b3955e] hover:bg-[#c9a86a]/10"
                  >
                    <Car className="mr-2 h-4 w-4" />
                    Трансфер
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Сюда в будущем можно добавить еще карточки */}
        </div>
      </div>
    </section>
  );
}
