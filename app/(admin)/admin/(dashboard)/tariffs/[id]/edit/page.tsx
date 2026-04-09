import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import { TariffFormClient } from "@/components/admin/tariffs/tariff-form";

export const metadata = { title: "Редактировать тариф | SKTransfer Admin" };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTariffPage({ params }: Props) {
  const resolvedParams = await params;

  const tariff = await prisma.tariff.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!tariff) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/tariffs"
          className="cursor-pointer inline-flex items-center text-sm text-gray-500 hover:text-[var(--gold)] transition-colors font-medium mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад к списку
        </Link>
        <h1 className="text-3xl font-display font-semibold text-zinc-900 capitalize">
          Тариф: {tariff.key}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Внесение изменений в стоимость и параметры тарифа
        </p>
      </div>

      <TariffFormClient initialData={tariff} />
    </div>
  );
}