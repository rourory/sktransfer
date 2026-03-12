// app/admin/(dashboard)/categories/page.tsx
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  Plus,
  Pencil,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { DeleteCategoryButton } from "@/components/admin/categories/delete-button";
// Обратите внимание на путь импорта. Если кнопка лежит в другой папке, скорректируйте путь.

const ITEMS_PER_PAGE = 5;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export const metadata = { title: "Управление категориями | SKTransfer Admin" };

export default async function AdminCategoriesPage({ searchParams }: Props) {
  // Распаковываем Promise для Next.js 15+
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  // Получаем категории и считаем их общее количество
  const [categories, totalCount] = await Promise.all([
    prisma.category.findMany({
      include: { _count: { select: { articles: true } } },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.category.count(),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-semibold text-zinc-900">
            Категории блога
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Управление разделами вашего путеводителя
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="cursor-pointer bg-[var(--gold)] text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors flex items-center font-medium shadow-sm"
        >
          <Plus className="w-5 h-5 mr-1" />
          Добавить категорию
        </Link>
      </div>

      <Card className="bg-white border-gray-200 overflow-hidden rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-4 text-sm font-medium text-gray-500 w-24">
                  Фото
                </th>
                <th className="p-4 text-sm font-medium text-gray-500">
                  Название (Ru) и URL
                </th>
                <th className="p-4 text-sm font-medium text-gray-500">
                  Описание (Ru)
                </th>
                <th className="p-4 text-sm font-medium text-gray-500 text-center w-24">
                  Статьи
                </th>
                <th className="p-4 text-sm font-medium text-gray-500 text-right w-24">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Категорий пока нет
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4">
                      {cat.image ? (
                        <div
                          className="w-16 h-12 bg-cover bg-center rounded-md border border-gray-200"
                          style={{ backgroundImage: `url(${cat.image})` }}
                        />
                      ) : (
                        <div className="w-16 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 border border-gray-200">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {/* Заменили cat.name на cat.nameRu */}
                      <div className="font-medium text-zinc-900">
                        {cat.nameRu}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        /{cat.slug}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {/* Заменили cat.description на cat.descriptionRu */}
                      <div className="line-clamp-2">
                        {cat.descriptionRu || "—"}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center justify-center bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {cat._count.articles}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        {/* ЗАМЕНИЛИ <button> на <Link> с правильным роутом и cursor-pointer */}
                        <Link
                          href={`/admin/categories/${cat.id}/edit`}
                          className="cursor-pointer p-2 text-gray-400 hover:text-[var(--gold)] hover:bg-amber-50 rounded-md transition-colors"
                          title="Редактировать"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>

                        {/* Передаем nameRu в компонент удаления */}
                        <DeleteCategoryButton id={cat.id} name={cat.nameRu} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
            <span className="text-sm text-gray-500">
              Страница {currentPage} из {totalPages}
            </span>
            <div className="flex gap-2">
              {currentPage > 1 ? (
                <Link
                  href={`/admin/categories?page=${currentPage - 1}`}
                  className="cursor-pointer p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  disabled
                  className="p-2 rounded-md border border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {currentPage < totalPages ? (
                <Link
                  href={`/admin/categories?page=${currentPage + 1}`}
                  className="cursor-pointer p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  disabled
                  className="p-2 rounded-md border border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
