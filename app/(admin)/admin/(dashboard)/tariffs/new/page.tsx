import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { TariffFormClient } from "@/components/admin/tariffs/tariff-form";

export const metadata = { title: "Добавить тариф | SKTransfer Admin" };

export default function NewTariffPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/tariffs"
          className="cursor-pointer inline-flex items-center text-sm text-gray-500 hover:text-[var(--gold)] transition-colors font-medium mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад к списку
        </Link>
        <h1 className="text-3xl font-display font-semibold text-zinc-900">
          Новый тариф
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Добавление нового класса автомобилей в калькулятор
        </p>
      </div>

      <TariffFormClient />
    </div>
  );
}