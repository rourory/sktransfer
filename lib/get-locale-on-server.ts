import type { Locale } from "@/lib/i18n"
import { cookies } from "next/headers"
// Вспомогательная функция для определения языка на сервере

export async function getLocaleOnServer(): Promise<Locale> {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value
  
  if (localeCookie === "en" || localeCookie === "zh") {
    return localeCookie as Locale
  }

  // Если куки нет, можно попробовать прочитать язык браузера из заголовков (Accept-Language),
  // но для простоты по умолчанию возвращаем русский.
  return "ru"
}