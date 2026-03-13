import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Получаем параметр lang из URL (например, ?lang=en)
  const { searchParams } = request.nextUrl;
  const langParam = searchParams.get("lang");

  // Если параметр найден и он валидный (ru, en, zh)
  if (langParam === "en" || langParam === "zh" || langParam === "ru") {
    // 1. Клонируем заголовки ВХОДЯЩЕГО запроса
    const requestHeaders = new Headers(request.headers);

    // 2. Устанавливаем наш кастомный заголовок для getLocaleOnServer
    requestHeaders.set("x-custom-locale", langParam);

    // 3. Создаем ответ, передавая ему модифицированные заголовки ЗАПРОСА
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // 4. Устанавливаем куку NEXT_LOCALE, чтобы браузер запомнил выбор на будущее
    response.cookies.set("NEXT_LOCALE", langParam, {
      path: "/",
      maxAge: 31536000,
    });

    return response;
  }

  // Если параметра нет, просто пропускаем запрос дальше без изменений
  return NextResponse.next();
}

// Указываем, для каких путей должен срабатывать middleware
export const config = {
  matcher: [
    /*
     * Матчим все пути запросов, КРОМЕ:
     * - api (API роуты)
     * - _next/static (статика)
     * - _next/image (картинки)
     * - favicon.ico, sitemap.xml, robots.txt и прочих файлов
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.jpg|.*\\.png|.*\\.webp).*)",
  ],
};
