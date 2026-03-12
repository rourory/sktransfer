// app/admin/(dashboard)/page.tsx
import { DashboardChart } from "@/components/admin/dashboard-chart";
import { Card } from "@/components/ui/card";
import { Users, Eye, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Админ-панель | SKTransfer",
};

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-display font-semibold text-zinc-900 mb-8">
        Обзор статистики
      </h1>

      {/* Карточки метрик (Пока заглушки) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Посетители за неделю
              </p>
              <h3 className="text-3xl font-bold text-zinc-900">1,600</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 mt-4 font-medium">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+12.5% с прошлой недели</span>
          </div>
        </Card>

        <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Просмотры статей
              </p>
              <h3 className="text-3xl font-bold text-zinc-900">3,420</h3>
            </div>
            <div className="p-3 bg-amber-50 text-[var(--gold)] rounded-lg">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 mt-4 font-medium">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+8.2% с прошлой недели</span>
          </div>
        </Card>
      </div>

      {/* Блок с графиком */}
      <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-xl">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-zinc-900">
            Активность трафика (SEO)
          </h3>
          <p className="text-sm text-gray-500">
            График посещений страниц блога по дням
          </p>
        </div>

        <DashboardChart />
      </Card>
    </div>
  );
}
