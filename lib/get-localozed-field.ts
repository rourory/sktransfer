import { Locale } from "@/lib/i18n";

/**
 * Извлекает нужное поле из объекта БД на основе локали.
 * Если перевода нет, фоллбэком отдаем русскую версию.
 */
export function getLocalizedField(
  obj: any, 
  baseField: string, 
  locale: Locale
): string {
  const suffix = locale === "en" ? "En" : locale === "zh" ? "Zh" : "Ru";
  
  // Пытаемся получить, например, metaTitleEn
  const localizedValue = obj[`${baseField}${suffix}`];
  
  // Если пусто, берем русскую версию (например, metaTitleRu)
  return localizedValue || obj[`${baseField}Ru`] || "";
}