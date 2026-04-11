import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BookButton } from "./book-button";
import { Locale, translations } from "@/lib/i18n";

interface AirportTariffCardProps {
    tariff: any,
    locale: Locale,
    name: string,
    features: string[]
}

export function AirportTariffCard({ tariff, locale, name, features }: AirportTariffCardProps) {
  const t = translations[locale];

  return (
    <Card className="p-5 border flex flex-col">
      <h4 className="font-bold text-lg mb-3">{name}</h4>

      <div className="space-y-2 mb-4 flex-grow">
        {features.map((f: string, i: number) => (
          <div key={i} className="flex gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm">{f}</span>
          </div>
        ))}
      </div>

      <div className="mb-4 border-b pb-4">
        <div className="flex justify-between">
          <span>{t.calculator.fromAirport}</span>
          <span className="font-bold">{tariff.price} BYN</span>
        </div>
        <div className="flex justify-between">
          <span>{t.calculator.toAirport}</span>
          <span className="font-bold">{tariff.price} BYN</span>
        </div>
      </div>

      <BookButton tariffName={name} locale={locale} />
    </Card>
  );
}
