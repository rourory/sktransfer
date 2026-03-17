// app/api/send-telegram/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Путь к вашему prisma клиенту

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message, type } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      console.error("[Telegram] Bot token not configured");
      return NextResponse.json(
        { error: "Telegram not configured" },
        { status: 500 },
      );
    }

    // 1. Получаем всех активных получателей из базы данных
    const receivers = await prisma.telegramNotificationReceiver.findMany();

    if (receivers.length === 0) {
      console.warn("[Telegram] No admin receivers found in database.");
      // Возвращаем успех сайта, даже если админов нет, чтобы не ломать форму клиенту
      return NextResponse.json({
        success: true,
        warning: "No admins registered",
      });
    }

    // 2. Формируем сообщение для Telegram
    let telegramMessage = `🔔 <b>Новая заявка с сайта SKTransfer.by</b>\n\n`;
    telegramMessage += `📋 <b>Тип:</b> ${type || "Контактная форма"}\n`;
    telegramMessage += `👤 <b>Имя:</b> ${name}\n`;
    telegramMessage += `📱 <b>Телефон:</b> ${phone}\n`;

    if (email) {
      telegramMessage += `📧 <b>Email:</b> ${email}\n`;
    }

    if (message) {
      telegramMessage += `💬 <b>Сообщение:</b>\n${message}\n`;
    }

    telegramMessage += `\n⏰ <b>Время:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" })}`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // 3. Создаем массив промисов для отправки каждому администратору
    const sendPromises = receivers.map((receiver) =>
      fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: receiver.telegramId,
          text: telegramMessage,
          parse_mode: "HTML",
        }),
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          // Если ошибка (например, админ заблокировал бота), пробрасываем её, чтобы отловить в allSettled
          throw new Error(`Chat ${receiver.telegramId}: ${data.description}`);
        }
        return data;
      }),
    );

    // 4. Ждем выполнения всех запросов (allSettled не падает, если один из запросов завершился ошибкой)
    const results = await Promise.allSettled(sendPromises);

    // 5. Анализируем результаты для логирования
    let successCount = 0;
    results.forEach((result, index) => {
      const tgId = receivers[index].telegramId;
      if (result.status === "fulfilled") {
        successCount++;
        console.log(`[Telegram] Message sent to chat ${tgId}`);
      } else {
        console.error(
          `[Telegram] Failed to send to chat ${tgId}:`,
          result.reason,
        );
        // Опционально: здесь можно удалять пользователя из БД, если ошибка означает блокировку бота
        // например, если текст ошибки содержит "bot was blocked by the user"
      }
    });

    // Если хотя бы одному админу доставили — считаем успехом
    if (successCount > 0) {
      return NextResponse.json({
        success: true,
        deliveredTo: successCount,
        totalAdmins: receivers.length,
      });
    } else {
      return NextResponse.json(
        { error: "Failed to send to any admin chat" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("[Telegram] Critical error sending to Telegram:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
