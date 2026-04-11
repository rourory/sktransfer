"use client";

import { type Locale, translations } from "@/lib/i18n";
import {
  Car,
  Briefcase,
  Crown,
  Plane,
  Compass,
  Building2,
  ArrowRight,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface ServicesSectionProps {
  locale: Locale;
}

export function ServicesSection({ locale }: ServicesSectionProps) {
  const t = translations[locale];

  // Привязываем иконки и картинки к ID услуг из локализации
  const serviceAssets: Record<
    string,
    { icon: any; image: string; link: string }
  > = {
    transfers: {
      icon: Car,
      image: "/services/transfer.webp",
      link: "/calculator",
    },
    airport: {
      icon: Plane,
      image: "/services/airport.webp",
      link: "/calculator",
    },
    vip: { icon: Crown, image: "/services/vip.webp", link: "/calculator" },
    business: {
      icon: Briefcase,
      image: "/services/business.webp",
      link: "/calculator",
    },
    resorts: {
      icon: Building2,
      image: "/services/resorts.webp",
      link: "/resorts",
    },
    excursions: {
      icon: Compass,
      image: "/services/excursions.webp",
      link: "/excursions",
    },
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {t.services.items.map((service, index) => {
        const assets = serviceAssets[service.id];
        const Icon = assets.icon;
        // Четные блоки - картинка слева, нечетные - картинка справа
        const isEven = index % 2 === 0;

        return (
          <div
            key={service.id}
            className={`flex flex-col gap-8 lg:gap-16 items-center ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
          >
            {/* БЛОК КАРТИНКИ */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src={assets.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Градиент поверх фото для премиальности */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-white font-medium tracking-wide text-lg drop-shadow-md">
                    SKTransfer
                  </span>
                </div>
              </div>
            </div>

            {/* БЛОК ТЕКСТА (SEO-контент) */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <p className="text-[var(--gold)] font-semibold tracking-wider text-sm uppercase mb-2">
                  {service.description}
                </p>
                {/* H2 - это отлично для SEO */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {service.title}
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {service.details}
              </p>

              {/* Маркированный список (Features) */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[var(--gold)]" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Кнопка */}
              <div className="pt-2">
                <Button
                  asChild
                  size="lg"
                  className="gold-gradient hover:opacity-90 hover:shadow-lg hover:shadow-[var(--gold)]/20 transition-all rounded-xl text-base px-8 py-6 text-white"
                >
                  <Link href={assets.link}>
                    {t.services.bookNow}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
// import { type Locale, translations } from "@/lib/i18n";
// import {
//   Car,
//   Briefcase,
//   Crown,
//   Plane,
//   Compass,
//   ChevronDown,
// } from "lucide-react";

// interface ServicesSectionProps {
//   locale: Locale;
// }

// export function ServicesSection({ locale }: ServicesSectionProps) {
//   const t = translations[locale];

//   const services =[
//     {
//       icon: Car,
//       title: t.services.transfers,
//       description: t.services.transfersDesc,
//       details: t.services.transfersDetails,
//     },
//     {
//       icon: Compass,
//       title: t.services.excursions,
//       description: t.services.excursionsDesc,
//       details: t.services.excursionsDetails,
//     },
//     {
//       icon: Crown,
//       title: t.services.resorts,
//       description: t.services.resortsDesc,
//       details: t.services.resortsDetails,
//     },
//     {
//       icon: Plane,
//       title: t.services.airport,
//       description: t.services.airportDesc,
//       details: t.services.airportDetails,
//     },
//     {
//       icon: Crown,
//       title: t.services.vip,
//       description: t.services.vipDesc,
//       details: t.services.vipDetails,
//     },
//     {
//       icon: Briefcase,
//       title: t.services.business,
//       description: t.services.businessDesc,
//       details: t.services.businessDetails,
//     },
//   ];

//   return (
//     <div className="md:mr-10 md:ml-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
//       {services.map((service, index) => {
//         const Icon = service.icon;

//         return (
//           <div key={index} className="group relative">
//             <div className="absolute -inset-[1px] bg-gradient-to-br from-[var(--gold)]/40 to-transparent rounded-2xl" />

//             {/* Используем <details> вместо <div> для CSS-аккордеона */}
//             <details className="group/details relative bg-white rounded-2xl p-4 sm:p-6 lg:p-8 h-full border-2 border-[var(--gold)]/20 shadow-xl min-w-0 overflow-hidden hover:border-[var(--gold)]/50 transition-all hover:shadow-2xl[&::-webkit-details-marker]:hidden">
//               <summary className="list-none outline-none cursor-pointer">
//                 <div className="relative mb-4 sm:mb-6 lg:mb-8">
//                   <div className="relative inline-flex p-3 sm:p-4 platinum-gradient rounded-2xl">
//                     <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-900" />
//                   </div>
//                 </div>

//                 <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 text-gray-900 break-words">
//                   {service.title}
//                 </h3>

//                 <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4 lg:mb-6 line-clamp-3 break-words">
//                   {service.description}
//                 </p>

//                 {/* Блок с кнопкой (меняется через CSS в зависимости от того, открыт ли details) */}
//                 <div className="flex items-center gap-2 text-xs sm:text-sm font-medium mt-auto">
//                   <span className="text-[var(--gold-dark)] group-open/details:hidden">
//                     {t.services.showMore}
//                   </span>
//                   <span className="text-[var(--gold-dark)] hidden group-open/details:inline">
//                     {t.services.showLess}
//                   </span>
//                   <ChevronDown className="h-4 w-4 text-[var(--gold-dark)] transition-transform duration-300 group-open/details:rotate-180" />
//                 </div>
//               </summary>

//               {/* Раскрывающийся контент */}
//               <div className="mt-3 sm:mt-4 lg:mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
//                 <div className="pt-2 sm:pt-3 lg:pt-4 border-t border-gray-200">
//                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
//                     {service.details}
//                   </p>
//                 </div>
//               </div>
//             </details>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
