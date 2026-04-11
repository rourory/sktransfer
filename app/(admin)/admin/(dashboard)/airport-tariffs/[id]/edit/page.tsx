import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import { AirportTariffFormClient } from "@/components/admin/airport-tariffs/airport-tariff-form";

export const metadata = {
  title: "Редактировать тариф в Аэропорт | SKTransfer Admin",
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditAirportTariffPage({ params }: Props) {
  const resolvedParams = await params;

  // Получаем данные тарифа из базы данных
  const tariff = await prisma.airportTariff.findUnique({
    where: { id: resolvedParams.id },
  });

  // Если тариф не найден, выдаем 404
  if (!tariff) {
    notFound();
  }

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
        <h1 className="text-3xl font-display font-semibold text-zinc-900 capitalize">
          Тариф: {tariff.nameRu || tariff.tariffKey}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Внесение изменений в стоимость, переводы и особенности тарифа
        </p>
      </div>

      {/* Передаем данные в клиентскую форму для заполнения полей */}
      <AirportTariffFormClient initialData={tariff} />
    </div>
  );
}
