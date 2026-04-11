"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Globe, Plane } from "lucide-react";
import { saveAirportTariff } from "@/app/(admin)/admin/actions";
import type { AirportTariff } from "@prisma/client";

export function AirportTariffFormClient({
  initialData,
}: {
  initialData?: AirportTariff;
}) {
  const [lang, setLang] = useState<"Ru" | "En" | "Zh">("Ru");
  const [isPending, setIsPending] = useState(false);
  const saveAction = saveAirportTariff.bind(null, initialData?.id || null);

  return (
    <Card className="bg-white border-gray-200 rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
      <form
        action={async (fd) => {
          setIsPending(true);
          await saveAction(fd);
        }}
        className="space-y-8"
      >
        {/* Базовые настройки */}
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Plane className="w-5 h-5 mr-2 text-[var(--gold)]" /> Базовые
            настройки
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Системный ключ *
              </label>
              <input
                type="text"
                name="tariffKey"
                required
                defaultValue={initialData?.tariffKey}
                placeholder="business"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[var(--gold)] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Цена (BYN) *
              </label>
              <input
                type="number"
                step="0.1"
                name="price"
                required
                defaultValue={initialData?.price}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[var(--gold)] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Порядок сортировки
              </label>
              <input
                type="number"
                name="order"
                defaultValue={initialData?.order || 0}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[var(--gold)] outline-none"
              />
            </div>
            <div className="md:col-span-3 flex items-center">
              <input
                type="checkbox"
                name="isActive"
                value="true"
                defaultChecked={initialData ? initialData.isActive : true}
                className="w-4 h-4 text-[var(--gold)]"
                id="active"
              />
              <label
                htmlFor="active"
                className="ml-2 font-medium text-sm text-gray-700"
              >
                Тариф отображается на сайте
              </label>
            </div>
          </div>
        </div>

        {/* ЛОКАЛИЗАЦИЯ */}
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
              <div>
                <label className="block text-sm font-medium mb-1">
                  Название тарифа ({l}) {l !== "Zh" && "*"}
                </label>
                <input
                  type="text"
                  name={`name${l}`}
                  required={l === "Ru" || l === "En"}
                  defaultValue={(initialData as any)?.[`name${l}`] || ""}
                  placeholder={
                    l === "Ru" ? "Комфорт" : l === "En" ? "Comfort" : ""
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[var(--gold)] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Особенности ({l}) — через запятую {l !== "Zh" && "*"}
                </label>
                <input
                  type="text"
                  name={`features${l}`}
                  required={l === "Ru" || l === "En"}
                  defaultValue={(initialData as any)?.[`features${l}`] || ""}
                  placeholder={l === "Ru" ? "1-3 пассажира, Sedan, Wi-Fi" : ""}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[var(--gold)] outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Используйте запятую для разделения (например: "Пункт 1, Пункт
                  2, Пункт 3")
                </p>
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
            {isPending ? "Сохранение..." : "Сохранить тариф"}
          </button>
        </div>
      </form>
    </Card>
  );
}
