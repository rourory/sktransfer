import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import { RouteFormClient } from "@/components/admin/routes/route-form";

export const metadata = { title: "Редактировать маршрут | SKTransfer Admin" };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditRoutePage({ params }: Props) {
  const resolvedParams = await params;

  const route = await prisma.transferRoute.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!route) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/routes"
          className="cursor-pointer inline-flex items-center text-sm text-gray-500 hover:text-[var(--gold)] transition-colors font-medium mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад к списку
        </Link>
        <h1 className="text-3xl font-display font-semibold text-zinc-900">
          Редактирование маршрута
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {route.fromNameRu} &rarr; {route.toNameRu} (/{route.slug})
        </p>
      </div>

      <RouteFormClient initialData={route} />
    </div>
  );
}
