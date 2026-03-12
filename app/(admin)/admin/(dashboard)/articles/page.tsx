import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Pencil, ImageIcon, ChevronLeft, ChevronRight, Search, Filter, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { DeleteArticleButton } from "@/components/admin/articles/delete-button";

const ITEMS_PER_PAGE = 10;

type Props = {
  searchParams: Promise<{ page?: string; search?: string; categoryId?: string }>;
};

export const metadata = { title: "Управление статьями | SKTransfer Admin" };

export default async function AdminArticlesPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const search = resolvedParams.search || "";
  const categoryId = resolvedParams.categoryId || "";

  // Формируем условия фильтрации Prisma
  const whereClause: Prisma.ArticleWhereInput = {};
  if (search) {
    whereClause.titleRu = { contains: search, mode: "insensitive" };
  }
  if (categoryId) {
    whereClause.categoryId = categoryId;
  }

  // Параллельно получаем статьи, общее количество (для пагинации) и все категории (для селекта)
  const [articles, totalCount, categories] = await Promise.all([
    prisma.article.findMany({
      where: whereClause,
      include: { category: { select: { nameRu: true } } },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.article.count({ where: whereClause }),
    prisma.category.findMany({ select: { id: true, nameRu: true }, orderBy: { createdAt: "desc" } }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-display font-semibold text-zinc-900">Статьи и Новости</h1>
          <p className="text-sm text-gray-500 mt-1">Все публикации вашего блога ({totalCount})</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="cursor-pointer bg-[var(--gold)] text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors flex items-center font-medium shadow-sm"
        >
          <Plus className="w-5 h-5 mr-1" />
          Написать статью
        </Link>
      </div>

      {/* Панель фильтров */}
      <Card className="p-4 mb-6 bg-white border-gray-200 shadow-sm rounded-xl">
        <form className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Поиск по названию (Ru)..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--gold)] outline-none"
            />
          </div>
          <div className="relative w-full sm:w-64">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              name="categoryId"
              defaultValue={categoryId}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--gold)] outline-none appearance-none cursor-pointer bg-white"
            >
              <option value="">Все категории</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.nameRu}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="cursor-pointer bg-zinc-900 text-white px-6 py-2 rounded-md hover:bg-zinc-800 transition-colors font-medium">
            Найти
          </button>
          {(search || categoryId) && (
            <Link href="/admin/articles" className="cursor-pointer px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors flex items-center font-medium">
              Сбросить
            </Link>
          )}
        </form>
      </Card>

      {/* Таблица статей */}
      <Card className="bg-white border-gray-200 overflow-hidden rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-4 text-sm font-medium text-gray-500 w-24">Обложка</th>
                <th className="p-4 text-sm font-medium text-gray-500">Заголовок (Ru)</th>
                <th className="p-4 text-sm font-medium text-gray-500">Категория</th>
                <th className="p-4 text-sm font-medium text-gray-500 text-center">Статус</th>
                <th className="p-4 text-sm font-medium text-gray-500 text-right w-24">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Статей не найдено</td></tr>
              ) : articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    {article.coverImage ? (
                      <div className="w-16 h-12 bg-cover bg-center rounded-md border border-gray-200" style={{ backgroundImage: `url(${article.coverImage})` }} />
                    ) : (
                      <div className="w-16 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 border border-gray-200">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-zinc-900 line-clamp-1">{article.titleRu}</div>
                    <div className="text-xs text-gray-400 mt-1">{new Date(article.createdAt).toLocaleDateString("ru-RU")} • /{article.slug}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {article.category.nameRu}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {article.isPublished ? (
                      <span className="inline-flex items-center text-green-600 text-xs font-medium"><CheckCircle2 className="w-4 h-4 mr-1"/> Публичная</span>
                    ) : (
                      <span className="inline-flex items-center text-amber-600 text-xs font-medium"><XCircle className="w-4 h-4 mr-1"/> Черновик</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/articles/${article.id}/edit`} className="cursor-pointer p-2 text-gray-400 hover:text-[var(--gold)] hover:bg-amber-50 rounded-md transition-colors" title="Редактировать">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteArticleButton id={article.id} title={article.titleRu} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Пагинация (сохраняем фильтры в URL) */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
            <span className="text-sm text-gray-500">Страница {currentPage} из {totalPages}</span>
            <div className="flex gap-2">
              {currentPage > 1 ? (
                <Link href={`/admin/articles?page=${currentPage - 1}${search ? `&search=${search}` : ''}${categoryId ? `&categoryId=${categoryId}` : ''}`} className="cursor-pointer p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              ) : (
                <button disabled className="p-2 rounded-md border border-gray-100 bg-gray-50 text-gray-300"><ChevronLeft className="w-4 h-4" /></button>
              )}
              
              {currentPage < totalPages ? (
                <Link href={`/admin/articles?page=${currentPage + 1}${search ? `&search=${search}` : ''}${categoryId ? `&categoryId=${categoryId}` : ''}`} className="cursor-pointer p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <button disabled className="p-2 rounded-md border border-gray-100 bg-gray-50 text-gray-300"><ChevronRight className="w-4 h-4" /></button>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}