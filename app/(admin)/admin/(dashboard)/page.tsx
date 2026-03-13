// app/admin/(dashboard)/page.tsx
import { Card } from "@/components/ui/card";
import { Users, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { DashboardChart } from "@/components/admin/dashboard-chart";

export const metadata = {
  title: "Админ-панель | SKTransfer",
};

export default async function AdminDashboardPage() {
  // 1. Получаем общее количество просмотров статей (для второй карточки)
  const totalArticlesViews = await prisma.article.count(); // Пока выводим общее кол-во статей как заглушку, позже можно добавить счетчик просмотров

  // 2. Получаем данные о посетителях за последние 14 дней (7 текущих + 7 предыдущих для сравнения)
  const today = new Date();
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(today.getDate() - 14);

  const rawVisits = await prisma.visitor.groupBy({
    by: ["dateStr"],
    _count: { hash: true },
    where: {
      createdAt: { gte: fourteenDaysAgo },
    },
    orderBy: { dateStr: "asc" },
  });

  // 3. Форматируем данные для графика (последние 7 дней)
  const chartData = [];
  const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  let currentWeekVisitors = 0;
  let previousWeekVisitors = 0;

  for (let i = 6; i >= 0; i--) {
    // Текущая неделя (для графика)
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    const dayData = rawVisits.find((v) => v.dateStr === dateStr);
    const count = dayData ? dayData._count.hash : 0;

    currentWeekVisitors += count;

    chartData.push({
      name: daysOfWeek[d.getDay()],
      visitors: count,
    });

    // Предыдущая неделя (для расчета процентов)
    const prevD = new Date();
    prevD.setDate(today.getDate() - (i + 7));
    const prevDateStr = prevD.toISOString().split("T")[0];
    const prevDayData = rawVisits.find((v) => v.dateStr === prevDateStr);
    previousWeekVisitors += prevDayData ? prevDayData._count.hash : 0;
  }

  // Расчет роста/падения в процентах
  let percentageChange = 0;
  if (previousWeekVisitors > 0) {
    percentageChange = Math.round(
      ((currentWeekVisitors - previousWeekVisitors) / previousWeekVisitors) *
        100,
    );
  } else if (currentWeekVisitors > 0) {
    percentageChange = 100; // Если на прошлой неделе было 0, а сейчас есть трафик
  }

  const isPositive = percentageChange >= 0;

  return (
    <div>
      <h1 className="text-3xl font-display font-semibold text-zinc-900 mb-8">
        Обзор статистики
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* РЕАЛЬНАЯ КАРТОЧКА ПОСЕТИТЕЛЕЙ */}
        <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Уникальные посетители (7 дней)
              </p>
              <h3 className="text-3xl font-bold text-zinc-900">
                {currentWeekVisitors}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div
            className={`flex items-center text-sm mt-4 font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-1" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {percentageChange}% с прошлой недели
            </span>
          </div>
        </Card>

        <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Всего статей в блоге
              </p>
              <h3 className="text-3xl font-bold text-zinc-900">
                {totalArticlesViews}
              </h3>
            </div>
            <div className="p-3 bg-amber-50 text-[var(--gold)] rounded-lg">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-400 mt-4 font-medium">
            <span>Обновляется в реальном времени</span>
          </div>
        </Card>
      </div>

      {/* РЕАЛЬНЫЙ ГРАФИК */}
      <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-xl">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-zinc-900">
            Активность трафика (Unique)
          </h3>
          <p className="text-sm text-gray-500">
            График уникальных посещений без использования Cookie
          </p>
        </div>

        <DashboardChart data={chartData} />
      </Card>
    </div>
  );
}
