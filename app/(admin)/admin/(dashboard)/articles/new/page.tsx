import Link from "next/link";
import prisma from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import { ArticleFormClient } from "@/components/admin/articles/article-form";

export const metadata = { title: "Новая статья | SKTransfer Admin" };

export default async function NewArticlePage() {
  // Получаем только необходимые поля категорий для селекта
  const categories = await prisma.category.findMany({
    select: { id: true, nameRu: true },
    orderBy: { nameRu: "asc" },
  });

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/articles"
          className="cursor-pointer inline-flex items-center text-sm text-gray-500 hover:text-[var(--gold)] transition-colors font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад к списку
        </Link>
        <h1 className="text-3xl font-display font-semibold text-zinc-900 mt-4">
          Написать новую статью
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Заполните информацию на трех языках. Вставляйте фото в текст используя
          плейсхолдеры.
        </p>
      </div>

      <ArticleFormClient categories={categories} />
    </div>
  );
}
