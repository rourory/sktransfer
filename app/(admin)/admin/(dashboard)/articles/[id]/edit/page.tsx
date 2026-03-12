// app/admin/(dashboard)/articles/[id]/edit/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import { ArticleFormClient } from "@/components/admin/articles/article-form";

export const metadata = { title: "Редактировать статью | SKTransfer Admin" };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: Props) {
  // В Next.js 15+ params — это Promise
  const resolvedParams = await params;

  // Параллельно получаем саму статью и список категорий для выпадающего списка
  const [article, categories] = await Promise.all([
    prisma.article.findUnique({
      where: { id: resolvedParams.id },
    }),
    prisma.category.findMany({
      select: { id: true, nameRu: true },
      orderBy: { nameRu: "asc" },
    }),
  ]);

  // Если статья не найдена — отдаем 404
  if (!article) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/articles"
          className="cursor-pointer inline-flex items-center text-sm text-gray-500 hover:text-[var(--gold)] transition-colors font-medium mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад к списку
        </Link>
        <h1 className="text-3xl font-display font-semibold text-zinc-900">
          Редактирование статьи
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Внесение изменений в публикацию «{article.titleRu}»
        </p>
      </div>

      {/* 
        Передаем статью в initialData. 
        Компонент сам поймет, что это режим редактирования, 
        заполнит все поля на всех языках и предупредит при попытке сменить URL.
      */}
      <ArticleFormClient initialData={article} categories={categories} />
    </div>
  );
}
