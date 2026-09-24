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
  Zap,
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
    { icon: any; image: string; link: string; showBookButton: boolean }
  > = {
    transfers: {
      icon: Car,
      image: "/services/transfer.webp",
      link: "/calculator",
      showBookButton: true,
    },
    airport: {
      icon: Plane,
      image: "/services/airport.webp",
      link: "/calculator",
      showBookButton: true,
    },
    vip: {
      icon: Crown,
      image: "/services/vip.webp",
      link: "/calculator",
      showBookButton: true,
    },
    business: {
      icon: Briefcase,
      image: "/services/business.webp",
      link: "/calculator",
      showBookButton: true,
    },
    resorts: {
      icon: Building2,
      image: "/services/resorts.webp",
      link: "/resorts",
      showBookButton: true,
    },
    excursions: {
      icon: Compass,
      image: "/services/excursions.webp",
      link: "/excursions",
      showBookButton: true,
    },
    jumpStart: {
      icon: Zap,
      image: "/services/jump-start.jpg",
      link: "/calculator",
      showBookButton: false,
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

              <div className="pt-2 space-y-3">
                {assets.showBookButton !== false ? (
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
                ) : (
                  <Button
                    asChild
                    size="lg"
                    className="gold-gradient hover:opacity-90 hover:shadow-lg hover:shadow-[var(--gold)]/20 transition-all rounded-xl text-base px-8 py-6 text-white"
                  >
                    <a href="tel:+375291228484">
                      {t.services.callNow || "Позвонить сейчас"}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
