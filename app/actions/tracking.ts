// app/actions/tracking.ts
"use server";

import { headers } from "next/headers";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function trackVisit() {
  try {
    // В Next.js 15 headers() — это промис
    const headersList = await headers();
    
    // Получаем IP и браузер пользователя
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    // Получаем текущую дату в формате YYYY-MM-DD (UTC)
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];

    // Генерируем анонимный хэш
    // Важно: мы не храним IP, мы храним необратимый хэш
    const salt = process.env.TRACKING_SALT || "sktransfer-secret-salt-2024";
    const hash = crypto
      .createHash("sha256")
      .update(`${ip}-${userAgent}-${dateStr}-${salt}`)
      .digest("hex");

    // Записываем в БД (если такой хэш сегодня уже был, Prisma просто проигнорирует благодаря upsert)
    await prisma.visitor.upsert({
      where: {
        hash_dateStr: {
          hash,
          dateStr,
        },
      },
      update: {}, // Ничего не обновляем, если уже есть
      create: {
        hash,
        dateStr,
      },
    });
  } catch (error) {
    // Тихо игнорируем ошибки трекинга, чтобы не сломать сайт пользователю
    console.error("Ошибка трекинга посетителей:", error);
  }
}