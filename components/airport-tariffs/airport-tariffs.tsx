import { Card } from "@/components/ui/card";
import {
  Plane,
  ArrowRight,
  CheckCircle2,
  UserCheck,
  Briefcase,
  PlaneLanding,
  Info,
} from "lucide-react";
import { type Locale, translations } from "@/lib/i18n";
import { AirportTariffCard } from "./airport-tariff-card";
import { AirportTariff } from "@prisma/client";

interface Props {
  locale: Locale;
  dbTariffs: AirportTariff[];
}

export function AirportTariffs({ locale, dbTariffs }: Props) {
  const t = translations[locale];

  const getTariffName = (tariff: AirportTariff) => {
    if (locale === "en") return tariff.nameEn || tariff.nameRu;
    if (locale === "zh") return tariff.nameZh || tariff.nameRu;
    return tariff.nameRu;
  };

  const getFeaturesArray = (tariff: AirportTariff) => {
    const raw =
      locale === "en"
        ? tariff.featuresEn
        : locale === "zh" && tariff.featuresZh
          ? tariff.featuresZh
          : tariff.featuresRu;

    return raw
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
  };

  if (!dbTariffs.length) return null;

  return (
    <Card className="p-6 border-2 border-[var(--gold)]/20 bg-white shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--gold)] to-amber-600 flex items-center justify-center">
          <Plane className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold gold-gradient-text">
            {t.calculator.airportTitle}
          </h3>
          <p className="text-sm text-gray-600">
            {t.calculator.airportSubtitle}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {dbTariffs.map((tariff) => (
          <AirportTariffCard
            key={tariff.id}
            tariff={tariff}
            locale={locale}
            name={getTariffName(tariff)}
            features={getFeaturesArray(tariff)}
          />
        ))}
      </div>
    </Card>
  );
}
