// app/admin/(dashboard)/categories/[id]/edit/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import { CategoryFormClient } from "@/components/admin/categories/category-form";
// Импортируем наш новый универсальный мультиязычный компонент формы

export const metadata = { title: "Редактировать категорию | SKTransfer Admin" };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCategoryPage({ params }: Props) {
  // Next.js 15+ требует await для params
  const resolvedParams = await params;

  const category = await prisma.category.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!category) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/categories"
          className="inline-flex items-center text-sm text-gray-500 hover:text-[var(--gold)] transition-colors cursor-pointer mb-4 font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад к списку
        </Link>
        <h1 className="text-3xl font-display font-semibold text-zinc-900">
          Редактирование категории
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {/* Используем nameRu, так как мы добавили локализацию */}
          Внесение изменений в раздел «{category.nameRu}»
        </p>
      </div>

      {/* Вызываем универсальную форму и передаем текущую категорию как initialData */}
      <CategoryFormClient initialData={category} />
    </div>
  );
}
