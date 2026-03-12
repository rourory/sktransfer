// app/admin/(dashboard)/categories/components/category-form.client.tsx
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Globe } from "lucide-react";
import { saveCategory } from "@/app/(admin)/admin/actions";
import { ImageDropzone } from "../image-dropzone";

type CategoryFormProps = {
  initialData?: any;
};

export function CategoryFormClient({ initialData }: CategoryFormProps) {
  const [lang, setLang] = useState<"Ru" | "En" | "Zh">("Ru");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [isPending, setIsPending] = useState(false);

  const isEditing = !!initialData;
  const saveAction = saveCategory.bind(null, initialData?.id || null);

  const handleRuNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) {
      const val = e.target.value;
      const ruEn: Record<string, string> = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "yo",
        ж: "zh",
        з: "z",
        и: "i",
        й: "y",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "ts",
        ч: "ch",
        ш: "sh",
        щ: "sch",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",
        " ": "-",
      };
      const newSlug = val
        .toLowerCase()
        .split("")
        .map((c) => ruEn[c] || c)
        .join("")
        .replace(/[^a-z0-9\-]+/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(newSlug);
    }
  };

  return (
    <Card className="bg-white border-gray-200 rounded-xl shadow-sm p-6 max-w-3xl">
      <div className="flex space-x-2 mb-6 border-b border-gray-100 pb-2">
        {(["Ru", "En", "Zh"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={`px-4 py-2 rounded-t-lg font-medium cursor-pointer transition-colors flex items-center ${
              lang === l
                ? "bg-amber-50 text-[var(--gold)] border-b-2 border-[var(--gold)]"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Globe className="w-4 h-4 mr-2" />
            {l === "Ru" ? "Русский" : l === "En" ? "English" : "中文"}
          </button>
        ))}
      </div>

      <form
        action={async (fd) => {
          setIsPending(true);
          await saveAction(fd);
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(["Ru", "En", "Zh"] as const).map((l) => (
            <div key={`name-${l}`} className={lang === l ? "block" : "hidden"}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название ({l}) *
              </label>
              <input
                type="text"
                name={`name${l}`}
                required
                defaultValue={initialData?.[`name${l}`] || ""}
                onChange={l === "Ru" ? handleRuNameChange : undefined}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[var(--gold)] outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Общий URL (slug) *
            </label>
            <input
              type="text"
              name="slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 bg-gray-50 outline-none"
            />
            {isEditing && slug !== initialData?.slug && (
              <p className="text-xs text-red-500 mt-1 flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Осторожно: смена URL сломает старые SEO ссылки.
              </p>
            )}
          </div>
        </div>

        {(["Ru", "En", "Zh"] as const).map((l) => (
          <div key={`desc-${l}`} className={lang === l ? "block" : "hidden"}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SEO Описание ({l})
            </label>
            <textarea
              name={`description${l}`}
              rows={4}
              defaultValue={initialData?.[`description${l}`] || ""}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[var(--gold)] resize-none outline-none"
            />
          </div>
        ))}

        {/* --- НОВЫЙ БЛОК: Чекбокс для футера --- */}
        <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
          <input
            type="checkbox"
            name="showInFooter"
            value="true"
            defaultChecked={initialData?.showInFooter || false}
            className="w-5 h-5 text-[var(--gold)] border-gray-300 rounded focus:ring-[var(--gold)] cursor-pointer"
            id="footerToggle"
          />
          <label
            htmlFor="footerToggle"
            className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
          >
            Выводить ссылку на эту категорию в Футере (подвале) сайта
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Обложка категории (Общая)
          </label>
          <input type="hidden" name="image" value={image} />
          <ImageDropzone value={image} onChange={setImage} />
        </div>

        <div className="pt-4 flex items-center gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="bg-[var(--gold)] text-white px-6 py-2.5 rounded-md hover:bg-yellow-600 transition-colors cursor-pointer font-medium disabled:opacity-70 flex items-center"
          >
            {isPending ? "Сохранение..." : "Сохранить"}
          </button>
          <a
            href="/admin/categories"
            className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors cursor-pointer"
          >
            Отмена
          </a>
        </div>
      </form>
    </Card>
  );
}
