import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Pencil, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DeleteAirportTariffButton } from "@/components/admin/airport-tariffs/delete-button";

export const metadata = { title: "Тарифы в Аэропорт | SKTransfer Admin" };

export default async function AdminAirportTariffsPage() {
  const tariffs = await prisma.airportTariff.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-display font-semibold text-zinc-900">
            Аэропорт: Тарифы
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Управление ценами на специальном блоке трансферов в аэропорт
          </p>
        </div>
        <Link
          href="/admin/airport-tariffs/new"
          className="cursor-pointer bg-[var(--gold)] text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors flex items-center font-medium shadow-sm"
        >
          <Plus className="w-5 h-5 mr-1" />
          Добавить тариф
        </Link>
      </div>

      <Card className="bg-white border-gray-200 overflow-hidden rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-4 text-sm font-medium text-gray-500">Ключ</th>
                <th className="p-4 text-sm font-medium text-gray-500 text-center">
                  Цена (BYN)
                </th>
                <th className="p-4 text-sm font-medium text-gray-500">
                  Особенности (RU)
                </th>
                <th className="p-4 text-sm font-medium text-gray-500 text-center">
                  Сортировка
                </th>
                <th className="p-4 text-sm font-medium text-gray-500 text-center">
                  Статус
                </th>
                <th className="p-4 text-sm font-medium text-gray-500 text-right w-24">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tariffs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Тарифов пока нет
                  </td>
                </tr>
              ) : (
                tariffs.map((tariff) => (
                  <tr
                    key={tariff.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 font-medium text-zinc-900 capitalize">
                      {tariff.tariffKey}
                    </td>
                    <td className="p-4 text-center font-bold text-[var(--gold)]">
                      {tariff.price} BYN
                    </td>
                    <td
                      className="p-4 text-gray-600 text-sm max-w-[200px] truncate"
                      title={tariff.featuresRu}
                    >
                      {tariff.featuresRu}
                    </td>
                    <td className="p-4 text-center text-gray-600">
                      {tariff.order}
                    </td>
                    <td className="p-4 text-center">
                      {tariff.isActive ? (
                        <span className="inline-flex items-center text-green-600 text-xs font-medium">
                          <CheckCircle2 className="w-4 h-4 mr-1" /> Активен
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-gray-400 text-xs font-medium">
                          <XCircle className="w-4 h-4 mr-1" /> Скрыт
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/airport-tariffs/${tariff.id}/edit`}
                          className="cursor-pointer p-2 text-gray-400 hover:text-[var(--gold)] hover:bg-amber-50 rounded-md transition-colors"
                          title="Редактировать"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteAirportTariffButton
                          id={tariff.id}
                          name={tariff.tariffKey}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
