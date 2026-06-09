import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Путь к вашему prisma клиенту

// Вспомогательная функция для отправки сообщения с логикой повторных попыток
async function sendTelegramMessageWithRetry(
  url: string,
  chatId: string | number,
  message: string,
  maxRetries = 3,
  baseDelayMs = 1000,
  attempt = 1,
): Promise<any> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      return data;
    }

    // Проверяем тип ошибки Telegram
    const isRateLimited = res.status === 429 || data.error_code === 429;
    const isServerError = res.status >= 500;

    // Если лимиты или ошибка сервера — пробуем еще раз (если остались попытки)
    if (attempt < maxRetries && (isRateLimited || isServerError)) {
      let delay = baseDelayMs * Math.pow(2, attempt); // Экспоненциальное увеличение задержки

      // Если Telegram прислал точное время ожидания при 429 ошибке, используем его
      if (isRateLimited && data.parameters?.retry_after) {
        delay = data.parameters.retry_after * 1000;
        console.warn(
          `[Telegram] Rate limited for chat ${chatId}. Waiting for ${data.parameters.retry_after}s before retry.`,
        );
      } else {
        console.warn(
          `[Telegram] Server error (${res.status}) for chat ${chatId}. Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`,
        );
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
      return sendTelegramMessageWithRetry(
        url,
        chatId,
        message,
        maxRetries,
        baseDelayMs,
        attempt + 1,
      );
    }

    // Если попытки исчерпаны или ошибка не подлежит повтору (например, 403 Forbidden - бот заблокирован)
    throw new Error(
      `Chat ${chatId} failed: ${data.description || "Unknown Telegram Error"}`,
    );
  } catch (error: any) {
    // Обработка сетевых ошибок (если fetch выбросил исключение)
    if (attempt < maxRetries) {
      const delay = baseDelayMs * Math.pow(2, attempt);
      console.warn(
        `[Telegram] Network error for chat ${chatId}: ${error.message}. Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return sendTelegramMessageWithRetry(
        url,
        chatId,
        message,
        maxRetries,
        baseDelayMs,
        attempt + 1,
      );
    }
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message, date, time, type } = body;

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
      return NextResponse.json({
        success: true,
        warning: "No admins registered",
      });
    }

    // 2. Формируем сообщение для Telegram
    let telegramMessage = `🔔 <b>Новая заявка с сайта SKTransfer.by</b>\n\n`;
    telegramMessage += `📋 <b>Тип:</b> ${type === "booking" ? "Бронирование трансфера" : type || "Контактная форма"}\n`;
    telegramMessage += `👤 <b>Имя:</b> ${name}\n`;
    telegramMessage += `📱 <b>Телефон:</b> ${phone}\n`;

    if (email) {
      telegramMessage += `📧 <b>Email:</b> ${email}\n`;
    }

    // Добавляем дату и время отправления, если они переданы
    if (date) {
      // Преобразуем дату из формата YYYY-MM-DD в DD.MM.YYYY для более привычного вида
      const formattedDate = date.split("-").reverse().join(".");
      telegramMessage += `📅 <b>Дата поездки:</b> ${formattedDate}\n`;
    }
    if (time) {
      telegramMessage += `🕒 <b>Время отправления:</b> ${time}\n`;
    }

    if (message) {
      telegramMessage += `💬 <b>Сообщение / Детали:</b>\n${message}\n`;
    }

    telegramMessage += `\n⏰ <b>Время заявки:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" })}`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // 3. Создаем массив промисов с ретрай-логикой
    const sendPromises = receivers.map((receiver) =>
      sendTelegramMessageWithRetry(
        telegramUrl,
        receiver.telegramId,
        telegramMessage,
        3,
        1000,
      ),
    );

    // 4. Ждем выполнения всех запросов (allSettled гарантирует, что падение одного не прервет остальные)
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
          `[Telegram] Failed to send to chat ${tgId} after all retries:`,
          result.reason,
        );
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
        { error: "Failed to send to any admin chat after retries" },
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

// import { type NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma"; // Путь к вашему prisma клиенту

// // Вспомогательная функция для отправки сообщения с логикой повторных попыток
// async function sendTelegramMessageWithRetry(
//   url: string,
//   chatId: string | number,
//   message: string,
//   maxRetries = 3,
//   baseDelayMs = 1000,
//   attempt = 1,
// ): Promise<any> {
//   try {
//     const res = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         chat_id: chatId,
//         text: message,
//         parse_mode: "HTML",
//       }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       return data;
//     }

//     // Проверяем тип ошибки Telegram
//     const isRateLimited = res.status === 429 || data.error_code === 429;
//     const isServerError = res.status >= 500;

//     // Если лимиты или ошибка сервера — пробуем еще раз (если остались попытки)
//     if (attempt < maxRetries && (isRateLimited || isServerError)) {
//       let delay = baseDelayMs * Math.pow(2, attempt); // Экспоненциальное увеличение задержки

//       // Если Telegram прислал точное время ожидания при 429 ошибке, используем его
//       if (isRateLimited && data.parameters?.retry_after) {
//         delay = data.parameters.retry_after * 1000;
//         console.warn(
//           `[Telegram] Rate limited for chat ${chatId}. Waiting for ${data.parameters.retry_after}s before retry.`,
//         );
//       } else {
//         console.warn(
//           `[Telegram] Server error (${res.status}) for chat ${chatId}. Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`,
//         );
//       }

//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return sendTelegramMessageWithRetry(
//         url,
//         chatId,
//         message,
//         maxRetries,
//         baseDelayMs,
//         attempt + 1,
//       );
//     }

//     // Если попытки исчерпаны или ошибка не подлежит повтору (например, 403 Forbidden - бот заблокирован)
//     throw new Error(
//       `Chat ${chatId} failed: ${data.description || "Unknown Telegram Error"}`,
//     );
//   } catch (error: any) {
//     // Обработка сетевых ошибок (если fetch выбросил исключение)
//     if (attempt < maxRetries) {
//       const delay = baseDelayMs * Math.pow(2, attempt);
//       console.warn(
//         `[Telegram] Network error for chat ${chatId}: ${error.message}. Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`,
//       );
//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return sendTelegramMessageWithRetry(
//         url,
//         chatId,
//         message,
//         maxRetries,
//         baseDelayMs,
//         attempt + 1,
//       );
//     }
//     throw error;
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { name, phone, email, message, type } = body;

//     const botToken = process.env.TELEGRAM_BOT_TOKEN;

//     if (!botToken) {
//       console.error("[Telegram] Bot token not configured");
//       return NextResponse.json(
//         { error: "Telegram not configured" },
//         { status: 500 },
//       );
//     }

//     // 1. Получаем всех активных получателей из базы данных
//     const receivers = await prisma.telegramNotificationReceiver.findMany();

//     if (receivers.length === 0) {
//       console.warn("[Telegram] No admin receivers found in database.");
//       return NextResponse.json({
//         success: true,
//         warning: "No admins registered",
//       });
//     }

//     // 2. Формируем сообщение для Telegram
//     let telegramMessage = `🔔 <b>Новая заявка с сайта SKTransfer.by</b>\n\n`;
//     telegramMessage += `📋 <b>Тип:</b> ${type || "Контактная форма"}\n`;
//     telegramMessage += `👤 <b>Имя:</b> ${name}\n`;
//     telegramMessage += `📱 <b>Телефон:</b> ${phone}\n`;

//     if (email) {
//       telegramMessage += `📧 <b>Email:</b> ${email}\n`;
//     }

//     if (message) {
//       telegramMessage += `💬 <b>Сообщение:</b>\n${message}\n`;
//     }

//     telegramMessage += `\n⏰ <b>Время:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" })}`;

//     const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

//     // 3. Создаем массив промисов с ретрай-логикой
//     const sendPromises = receivers.map((receiver) =>
//       sendTelegramMessageWithRetry(
//         telegramUrl,
//         receiver.telegramId,
//         telegramMessage,
//         3,
//         1000,
//       ),
//     );

//     // 4. Ждем выполнения всех запросов (allSettled гарантирует, что падение одного не прервет остальные)
//     const results = await Promise.allSettled(sendPromises);

//     // 5. Анализируем результаты для логирования
//     let successCount = 0;
//     results.forEach((result, index) => {
//       const tgId = receivers[index].telegramId;
//       if (result.status === "fulfilled") {
//         successCount++;
//         console.log(`[Telegram] Message sent to chat ${tgId}`);
//       } else {
//         console.error(
//           `[Telegram] Failed to send to chat ${tgId} after all retries:`,
//           result.reason,
//         );
//         // Тут можно добавить логику удаления/деактивации чата из БД,
//         // если в ошибке указано, что бот заблокирован пользователем:
//         // if (result.reason.message.includes("bot was blocked by the user")) { ... }
//       }
//     });

//     // Если хотя бы одному админу доставили — считаем успехом
//     if (successCount > 0) {
//       return NextResponse.json({
//         success: true,
//         deliveredTo: successCount,
//         totalAdmins: receivers.length,
//       });
//     } else {
//       return NextResponse.json(
//         { error: "Failed to send to any admin chat after retries" },
//         { status: 500 },
//       );
//     }
//   } catch (error) {
//     console.error("[Telegram] Critical error sending to Telegram:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }
