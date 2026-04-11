import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { AirportTariffFormClient } from "@/components/admin/airport-tariffs/airport-tariff-form";

export const metadata = {
  title: "Добавить тариф в Аэропорт | SKTransfer Admin",
};

export default function NewAirportTariffPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/airport-tariffs"
          className="cursor-pointer inline-flex items-center text-sm text-gray-500 hover:text-[var(--gold)] transition-colors font-medium mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад к списку
        </Link>
        <h1 className="text-3xl font-display font-semibold text-zinc-900">
          Новый тариф в Аэропорт
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Добавление новой карточки с фиксированной ценой на страницу
          калькулятора
        </p>
      </div>

      <AirportTariffFormClient />
    </div>
  );
}
