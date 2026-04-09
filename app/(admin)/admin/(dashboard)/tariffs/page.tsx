import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Pencil, ImageIcon, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Управление тарифами | SKTransfer Admin" };

export default async function AdminTariffsPage() {
  const tariffs = await prisma.tariff.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-display font-semibold text-zinc-900">Тарифы такси</h1>
          <p className="text-sm text-gray-500 mt-1">Управление ценами и автопарком в калькуляторе</p>
        </div>
        <Link
          href="/admin/tariffs/new"
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
                <th className="p-4 text-sm font-medium text-gray-500 w-24">Изображение</th>
                <th className="p-4 text-sm font-medium text-gray-500">Ключ / Название</th>
                <th className="p-4 text-sm font-medium text-gray-500 text-center">Цена за км</th>
                <th className="p-4 text-sm font-medium text-gray-500 text-center">Сортировка</th>
                <th className="p-4 text-sm font-medium text-gray-500 text-center">Статус</th>
                <th className="p-4 text-sm font-medium text-gray-500 text-right w-24">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tariffs.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500">Тарифов пока нет</td></tr>
              ) : tariffs.map((tariff) => (
                <tr key={tariff.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    {tariff.imageUrl ? (
                      <div className="w-16 h-10 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${tariff.imageUrl})` }} />
                    ) : (
                      <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400"><ImageIcon className="w-4 h-4" /></div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-zinc-900 capitalize">{tariff.key}</td>
                  <td className="p-4 text-center font-bold text-[var(--gold)]">{tariff.pricePerKm} BYN</td>
                  <td className="p-4 text-center text-gray-600">{tariff.order}</td>
                  <td className="p-4 text-center">
                    {tariff.isActive ? (
                      <span className="inline-flex items-center text-green-600 text-xs font-medium"><CheckCircle2 className="w-4 h-4 mr-1"/> Активен</span>
                    ) : (
                      <span className="inline-flex items-center text-gray-400 text-xs font-medium"><XCircle className="w-4 h-4 mr-1"/> Скрыт</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/tariffs/${tariff.id}/edit`} className="inline-block p-2 text-gray-400 hover:text-[var(--gold)] hover:bg-amber-50 rounded-md transition-colors">
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}