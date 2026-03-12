"use client";

import { type Locale, translations } from "@/lib/i18n";
import {
  Car,
  Briefcase,
  Crown,
  Plane,
  Compass,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface ServicesSectionProps {
  locale: Locale;
}

export function ServicesSection({ locale }: ServicesSectionProps) {
  const t = translations[locale];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const services = [
    {
      icon: Car,
      title: t.services.transfers,
      description: t.services.transfersDesc,
      details: t.services.transfersDetails,
    },
    {
      icon: Compass,
      title: t.services.excursions,
      description: t.services.excursionsDesc,
      details: t.services.excursionsDetails,
    },
    {
      icon: Crown,
      title: t.services.resorts,
      description: t.services.resortsDesc,
      details: t.services.resortsDetails,
    },
    {
      icon: Plane,
      title: t.services.airport,
      description: t.services.airportDesc,
      details: t.services.airportDetails,
    },
    {
      icon: Crown,
      title: t.services.vip,
      description: t.services.vipDesc,
      details: t.services.vipDetails,
    },
    {
      icon: Briefcase,
      title: t.services.business,
      description: t.services.businessDesc,
      details: t.services.businessDetails,
    },
  ];

  return (
    <div className="md:mr-10 md:ml-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
      {services.map((service, index) => {
        const Icon = service.icon;
        const isExpanded = expandedIndex === index;

        return (
          <div key={index} className="group relative">
            <div className="absolute -inset-[1px] bg-gradient-to-br from-[var(--gold)]/40 to-transparent rounded-2xl" />

            <div
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
              className="relative bg-white rounded-2xl p-4 sm:p-6 lg:p-8 h-full border-2 border-[var(--gold)]/20 cursor-pointer shadow-xl min-w-0 overflow-hidden hover:border-[var(--gold)]/50 transition-all hover:shadow-2xl"
            >
              <div className="relative mb-4 sm:mb-6 lg:mb-8">
                <div className="relative inline-flex p-3 sm:p-4 platinum-gradient rounded-2xl">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-900" />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 text-gray-900 break-words">
                {service.title}
              </h3>

              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4 lg:mb-6 line-clamp-3 break-words">
                {service.description}
              </p>

              {isExpanded && (
                <div className="mb-3 sm:mb-4 lg:mb-6">
                  <div className="pt-2 sm:pt-3 lg:pt-4 border-t border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
                      {service.details}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                <span className="text-[var(--gold-dark)]">
                  {isExpanded ? t.services.showLess : t.services.showMore}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-[var(--gold-dark)] transition-transform ${isExpanded ? "rotate-180" : "rotate-0"}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
