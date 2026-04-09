"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Globe, MapPin } from "lucide-react";
import { saveRoute } from "@/app/(admin)/admin/actions";
import { TransferRoute } from "@prisma/client";

export function RouteFormClient({
  initialData,
}: {
  initialData?: TransferRoute;
}) {
  const [lang, setLang] = useState<"Ru" | "En" | "Zh">("Ru");
  const [isPending, setIsPending] = useState(false);
  const saveAction = saveRoute.bind(null, initialData?.id || null);

  return (
    <Card className="bg-white border-gray-200 rounded-xl shadow-sm p-6 max-w-5xl mx-auto">
      <form
        action={async (fd) => {
          setIsPending(true);
          await saveAction(fd);
        }}
        className="space-y-8"
      >
        {/* ОСНОВНЫЕ ДАННЫЕ (Общие для всех языков) */}
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-[var(--gold)]" /> Базовые
            настройки
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ЧПУ URL (slug) *
              </label>
              <input
                type="text"
                name="slug"
                required
                defaultValue={initialData?.slug}
                placeholder="minsk-grodno"
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[var(--gold)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дистанция (км) *
              </label>
              <input
                type="number"
                step="0.1"
                name="distanceKm"
                required
                defaultValue={initialData?.distanceKm}
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[var(--gold)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Время в пути (Минут)
              </label>
              <input
                type="number"
                name="durationMin"
                defaultValue={initialData?.durationMin || ""}
                placeholder="Пример: 120"
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[var(--gold)]"
              />
            </div>

            {/* Системные slug'и */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Системный fromSlug *
              </label>
              <input
                type="text"
                name="fromSlug"
                required
                defaultValue={initialData?.fromSlug}
                placeholder="minsk"
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[var(--gold)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Системный toSlug *
              </label>
              <input
                type="text"
                name="toSlug"
                required
                defaultValue={initialData?.toSlug}
                placeholder="grodno"
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[var(--gold)]"
              />
            </div>

            {/* Флаги */}
            <div className="flex flex-col justify-center space-y-2 mt-4 md:mt-0">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isPopular"
                  value="true"
                  defaultChecked={initialData?.isPopular}
                  className="w-4 h-4 text-[var(--gold)]"
                />
                <span className="ml-2 text-sm">Популярный маршрут</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isAirport"
                  value="true"
                  defaultChecked={initialData?.isAirport}
                  className="w-4 h-4 text-[var(--gold)]"
                />
                <span className="ml-2 text-sm">Аэропорт</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isInternational"
                  value="true"
                  defaultChecked={initialData?.isInternational}
                  className="w-4 h-4 text-[var(--gold)]"
                />
                <span className="ml-2 text-sm">Международный</span>
              </label>
            </div>
          </div>
        </div>

        {/* КООРДИНАТЫ ДЛЯ КАРТЫ */}
        <div>
          <h3 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
            Координаты для авто-карты (опционально)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs mb-1">Откуда Широта (Lat)</label>
              <input
                type="number"
                step="any"
                name="fromLat"
                defaultValue={initialData?.fromLat || ""}
                className="w-full px-3 py-1.5 text-sm border rounded"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Откуда Долгота (Lon)</label>
              <input
                type="number"
                step="any"
                name="fromLon"
                defaultValue={initialData?.fromLon || ""}
                className="w-full px-3 py-1.5 text-sm border rounded"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Куда Широта (Lat)</label>
              <input
                type="number"
                step="any"
                name="toLat"
                defaultValue={initialData?.toLat || ""}
                className="w-full px-3 py-1.5 text-sm border rounded"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Куда Долгота (Lon)</label>
              <input
                type="number"
                step="any"
                name="toLon"
                defaultValue={initialData?.toLon || ""}
                className="w-full px-3 py-1.5 text-sm border rounded"
              />
            </div>
          </div>
        </div>

        {/* ЛОКАЛИЗАЦИЯ (Переключатель языков) */}
        <div>
          <div className="flex space-x-2 border-b border-gray-200 mb-6">
            {(["Ru", "En", "Zh"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-4 py-2 font-medium flex items-center border-b-2 ${lang === l ? "border-[var(--gold)] text-[var(--gold)]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              >
                <Globe className="w-4 h-4 mr-2" />
                {l === "Ru" ? "Русский" : l === "En" ? "English" : "中文"}
              </button>
            ))}
          </div>

          {(["Ru", "En", "Zh"] as const).map((l) => (
            <div key={l} className={lang === l ? "space-y-4" : "hidden"}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Название «Откуда» ({l})
                  </label>
                  <input
                    type="text"
                    name={`fromName${l}`}
                    required={l === "Ru" || l === "En"}
                    defaultValue={(initialData as any)?.[`fromName${l}`] || ""}
                    placeholder={l === "Ru" ? "Минск" : ""}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Название «Куда» ({l})
                  </label>
                  <input
                    type="text"
                    name={`toName${l}`}
                    required={l === "Ru" || l === "En"}
                    defaultValue={(initialData as any)?.[`toName${l}`] || ""}
                    placeholder={l === "Ru" ? "Гродно" : ""}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Дополнительный SEO-текст ({l})
                </label>
                <textarea
                  name={`additionalContent${l}`}
                  rows={4}
                  defaultValue={
                    (initialData as any)?.[`additionalContent${l}`] || ""
                  }
                  placeholder="Появляется под основным текстом маршрута..."
                  className="w-full px-3 py-2 border rounded-md resize-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100">
          <button
            type="submit"
            disabled={isPending}
            className="bg-[var(--gold)] text-white px-8 py-3 rounded-md hover:bg-yellow-600 font-medium"
          >
            {isPending ? "Сохранение..." : "Сохранить маршрут"}
          </button>
        </div>
      </form>
    </Card>
  );
}
