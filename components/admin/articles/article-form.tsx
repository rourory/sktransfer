"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Globe, AlertTriangle, Info } from "lucide-react";
import type { Article, Category } from "@prisma/client";
import { saveArticle } from "@/app/(admin)/admin/actions";
import { ImageDropzone } from "../image-dropzone";
import { MultiImageUpload } from "../multi-image-upload";

type ArticleFormProps = {
  initialData?: Article;
  categories: Pick<Category, "id" | "nameRu">[];
};

export function ArticleFormClient({ initialData, categories }: ArticleFormProps) {
  const [lang, setLang] = useState<"Ru" | "En" | "Zh">("Ru");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const[coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const[imagesJson, setImagesJson] = useState(initialData?.images || "[]");
  const[isPending, setIsPending] = useState(false);

  const isEditing = !!initialData;
  const saveAction = saveArticle.bind(null, initialData?.id || null);

  const handleRuTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) {
      const val = e.target.value;
      const ruEn: Record<string, string> = { а:'a', б:'b', в:'v', г:'g', д:'d', е:'e', ё:'yo', ж:'zh', з:'z', и:'i', й:'y', к:'k', л:'l', м:'m', н:'n', о:'o', п:'p', р:'r', с:'s', т:'t', у:'u', ф:'f', х:'h', ц:'ts', ч:'ch', ш:'sh', щ:'sch', ъ:'', ы:'y', ь:'', э:'e', ю:'yu', я:'ya', ' ':'-' };
      setSlug(val.toLowerCase().split('').map(c => ruEn[c] || c).join('').replace(/[^a-z0-9\-]+/g, '').replace(/-+/g, '-').replace(/^-|-$/g, ''));
    }
  };

  return (
    <Card className="bg-white border-gray-200 rounded-xl shadow-sm p-6 max-w-5xl mx-auto">
      <div className="flex space-x-2 mb-6 border-b border-gray-100 pb-2">
        {(["Ru", "En", "Zh"] as const).map((l) => (
          <button
            key={l} type="button" onClick={() => setLang(l)}
            className={`cursor-pointer px-4 py-2 rounded-t-lg font-medium transition-colors flex items-center ${
              lang === l ? "bg-amber-50 text-[var(--gold)] border-b-2 border-[var(--gold)]" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Globe className="w-4 h-4 mr-2" />
            {l === "Ru" ? "Русский" : l === "En" ? "English" : "中文"}
          </button>
        ))}
      </div>

      <form action={async (fd) => { setIsPending(true); await saveAction(fd); }} className="space-y-8">
        
        {/* Базовые настройки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Категория *</label>
            <select name="categoryId" required defaultValue={initialData?.categoryId} className="cursor-pointer w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[var(--gold)] outline-none bg-white">
              <option value="">Выберите...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.nameRu}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Общий URL (slug) *</label>
            <input type="text" name="slug" required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
            {isEditing && slug !== initialData?.slug && (
              <p className="text-xs text-red-500 mt-1 flex items-center"><AlertTriangle className="w-3 h-3 mr-1" />Смена URL сломает старые ссылки</p>
            )}
          </div>
          <div className="flex items-center md:mt-8">
            <input type="checkbox" name="isPublished" value="true" defaultChecked={initialData ? initialData.isPublished : true} className="cursor-pointer w-5 h-5 text-[var(--gold)] border-gray-300 rounded focus:ring-[var(--gold)]" id="pub" />
            <label htmlFor="pub" className="cursor-pointer ml-2 text-sm font-medium text-gray-700">Опубликовать сразу</label>
          </div>
        </div>

        {/* Локализованные поля H1, Excerpt, Content, SEO */}
        {(["Ru", "En", "Zh"] as const).map((l) => (
          <div key={`content-${l}`} className={lang === l ? "space-y-6" : "hidden"}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Заголовок статьи (H1) ({l}) *</label>
                <input type="text" name={`title${l}`} required defaultValue={initialData?.[`title${l}`] || ""} onChange={l === "Ru" ? handleRuTitleChange : undefined} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[var(--gold)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title ({l})</label>
                <input type="text" name={`metaTitle${l}`} defaultValue={initialData?.[`metaTitle${l}`] || ""} placeholder="По умолчанию равен H1..." className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[var(--gold)] outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Превью карточки ({l}) *</label>
                <textarea name={`excerpt${l}`} required rows={3} defaultValue={initialData?.[`excerpt${l}`] || ""} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[var(--gold)] resize-none outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description ({l})</label>
                <textarea name={`metaDescription${l}`} rows={3} defaultValue={initialData?.[`metaDescription${l}`] || ""} placeholder="По умолчанию равен превью..." className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[var(--gold)] resize-none outline-none" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-medium text-gray-700">Текст статьи (HTML/Text) ({l}) *</label>
                <span className="text-xs text-blue-600 flex items-center bg-blue-50 px-2 py-1 rounded"><Info className="w-3 h-3 mr-1"/> Вставляйте фото из галереи как {'{0}'}, {'{1}'}</span>
              </div>
              <textarea name={`content${l}`} required rows={15} defaultValue={initialData?.[`content${l}`] || ""} placeholder="<p>Текст статьи...</p> {0} <p>Продолжение...</p>" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[var(--gold)] font-mono text-sm outline-none" />
            </div>
          </div>
        ))}

        {/* Секция Изображений */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-gray-100 pt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Главная обложка (Превью)</label>
            <input type="hidden" name="coverImage" value={coverImage} />
            <ImageDropzone value={coverImage} onChange={setCoverImage} />
          </div>
          <div>
            <input type="hidden" name="images" value={imagesJson} />
            {/* Наш компонент мульти-загрузки, который генерирует {0}, {1} */}
            <MultiImageUpload value={imagesJson} onChange={setImagesJson} label="Внутренние фото для текста ({0}, {1}...)" />
          </div>
        </div>

        {/* Кнопки */}
        <div className="pt-6 flex items-center gap-4 border-t border-gray-100">
          <button type="submit" disabled={isPending} className="cursor-pointer bg-[var(--gold)] text-white px-8 py-3 rounded-md hover:bg-yellow-600 transition-colors font-medium disabled:opacity-70 flex items-center">
            {isPending ? "Сохранение..." : isEditing ? "Сохранить изменения" : "Создать статью"}
          </button>
          <a href="/admin/articles" className="cursor-pointer text-gray-500 hover:text-gray-800 font-medium transition-colors">Отмена</a>
        </div>
      </form>
    </Card>
  );
}