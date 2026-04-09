import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Pencil, Search, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";

const ITEMS_PER_PAGE = 15;

export const metadata = { title: "Управление маршрутами | SKTransfer Admin" };

export default async function AdminRoutesPage({ searchParams }: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const search = resolvedParams.search || "";

  const whereClause: Prisma.TransferRouteWhereInput = search ? {
    OR: [
      { fromNameRu: { contains: search, mode: "insensitive" } },
      { toNameRu: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
    ]
  } : {};

  const [routes, totalCount] = await Promise.all([
    prisma.transferRoute.findMany({
      where: whereClause,
      orderBy: { distanceKm: "asc" },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.transferRoute.count({ where: whereClause }),
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-display font-semibold text-zinc-900">Маршруты</h1>
          <p className="text-sm text-gray-500 mt-1">SEO-посадочные страницы трансферов ({totalCount})</p>
        </div>
        <Link href="/admin/routes/new" className="bg-[var(--gold)] text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors flex items-center font-medium shadow-sm">
          <Plus className="w-5 h-5 mr-1" />
          Добавить маршрут
        </Link>
      </div>

      <Card className="p-4 mb-6 bg-white border-gray-200 shadow-sm rounded-xl">
        <form className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" name="search" defaultValue={search} placeholder="Поиск по городу или URL..." className="w-full pl-10 pr-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[var(--gold)]" />
          </div>
          <button type="submit" className="bg-zinc-900 text-white px-6 py-2 rounded-md hover:bg-zinc-800 font-medium">Найти</button>
        </form>
      </Card>

      <Card className="bg-white border-gray-200 overflow-hidden rounded-xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-4 text-sm font-medium text-gray-500">Маршрут (Откуда → Куда)</th>
              <th className="p-4 text-sm font-medium text-gray-500">URL (slug)</th>
              <th className="p-4 text-sm font-medium text-gray-500">Дистанция</th>
              <th className="p-4 text-sm font-medium text-gray-500">Метки</th>
              <th className="p-4 text-sm font-medium text-gray-500 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {routes.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50/50">
                <td className="p-4 font-medium text-zinc-900">
                  <div className="flex items-center">
                    <Navigation className="w-4 h-4 text-[var(--gold)] mr-2" />
                    {r.fromNameRu} &rarr; {r.toNameRu}
                  </div>
                </td>
                <td className="p-4 text-gray-500 text-sm">/{r.slug}</td>
                <td className="p-4 text-gray-900">{r.distanceKm} км</td>
                <td className="p-4 flex gap-2">
                  {r.isPopular && <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Популярный</span>}
                  {r.isAirport && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Аэропорт</span>}
                </td>
                <td className="p-4 text-right">
                  <Link href={`/admin/routes/${r.id}/edit`} className="inline-block p-2 text-gray-400 hover:text-[var(--gold)] hover:bg-amber-50 rounded-md">
                    <Pencil className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}