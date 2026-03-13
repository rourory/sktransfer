import type { Locale } from "@/lib/i18n";
import { cookies, headers } from "next/headers";

export async function getLocaleOnServer(): Promise<Locale> {
  // 1. Сначала проверяем заголовок (его установит middleware, если в URL есть ?lang=)
  const headersList = await headers();
  const headerLocale = headersList.get("x-custom-locale");

  if (headerLocale === "en" || headerLocale === "zh" || headerLocale === "ru") {
    return headerLocale as Locale;
  }

  // 2. Если в URL параметра не было, стандартно читаем куки пользователя
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;

  if (localeCookie === "en" || localeCookie === "zh") {
    return localeCookie as Locale;
  }

  // 3. Фолбэк на русский
  return "ru";
}