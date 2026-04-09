"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { saveTariff } from "@/app/(admin)/admin/actions";
import { ImageDropzone } from "../image-dropzone"; // Ваш компонент загрузки картинок

export function TariffFormClient({ initialData }: { initialData?: any }) {
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [isPending, setIsPending] = useState(false);
  const saveAction = saveTariff.bind(null, initialData?.id || null);

  return (
    <Card className="bg-white border-gray-200 rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
      <form
        action={async (fd) => {
          setIsPending(true);
          await saveAction(fd);
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ключ тарифа (англ) *
            </label>
            <input
              type="text"
              name="key"
              required
              defaultValue={initialData?.key}
              placeholder="standard, comfort, vip..."
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[var(--gold)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Цена за 1 км (BYN) *
            </label>
            <input
              type="number"
              step="0.01"
              name="pricePerKm"
              required
              defaultValue={initialData?.pricePerKm}
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[var(--gold)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Порядок вывода (0, 1, 2...)
            </label>
            <input
              type="number"
              name="order"
              defaultValue={initialData?.order || 0}
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[var(--gold)]"
            />
          </div>
          <div className="flex items-center mt-8">
            <input
              type="checkbox"
              name="isActive"
              value="true"
              defaultChecked={initialData ? initialData.isActive : true}
              className="w-5 h-5 text-[var(--gold)] rounded focus:ring-[var(--gold)]"
              id="active"
            />
            <label
              htmlFor="active"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Тариф активен на сайте
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Фото автомобиля (.png / .webp прозрачный фон)
          </label>
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <ImageDropzone value={imageUrl} onChange={setImageUrl} />
        </div>

        <div className="pt-4 flex gap-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isPending}
            className="bg-[var(--gold)] text-white px-6 py-2 rounded-md hover:bg-yellow-600 disabled:opacity-70 font-medium"
          >
            {isPending ? "Сохранение..." : "Сохранить тариф"}
          </button>
        </div>
      </form>
    </Card>
  );
}
