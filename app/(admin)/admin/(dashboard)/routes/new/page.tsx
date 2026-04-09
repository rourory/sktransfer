import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { RouteFormClient } from "@/components/admin/routes/route-form";

export const metadata = { title: "Добавить маршрут | SKTransfer Admin" };

export default function NewRoutePage() {
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
          Новый маршрут
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Создание новой посадочной SEO-страницы для трансфера
        </p>
      </div>

      <RouteFormClient />
    </div>
  );
}
