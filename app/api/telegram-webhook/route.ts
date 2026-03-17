// app/api/telegram-webhook/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Путь к вашему prisma клиенту

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Проверяем, что пришло именно сообщение с текстом
    if (!body.message || !body.message.text) {
      return NextResponse.json({ success: true });
    }

    const chatId = body.message.chat.id.toString(); // ID чата переводим в строку, как в схеме
    const text = body.message.text.trim();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!adminPassword || !botToken) {
      console.error("Missing ADMIN_PASSWORD or TELEGRAM_BOT_TOKEN");
      return NextResponse.json({ success: true }); // Возвращаем 200, чтобы TG не спамил ретраями
    }

    // Вспомогательная функция для отправки ответа пользователю
    const sendMessage = async (messageText: string) => {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "HTML",
        }),
      });
    };

    // Проверяем, авторизован ли уже этот пользователь (есть ли в БД)
    const existingUser = await prisma.telegramNotificationReceiver.findUnique({
      where: { telegramId: chatId },
    });

    // Обработка команд для УЖЕ АВТОРИЗОВАННЫХ пользователей
    if (existingUser) {
      switch (text) {
        case "/start":
          await sendMessage(
            "Вы уже авторизованы и получаете уведомления. 🔔\nДля отключения введите /logout.",
          );
          break;
        case "/help":
          await sendMessage(
            "<b>Доступные команды:</b>\n/help - Список команд\n/logout - Отписаться от уведомлений",
          );
          break;
        case "/logout":
          await prisma.telegramNotificationReceiver.delete({
            where: { telegramId: chatId },
          });
          await sendMessage(
            "Вы успешно отписались от уведомлений. 🔕\nЧтобы подписаться снова, введите /start",
          );
          break;
        default:
          await sendMessage(
            "Я бот для уведомлений. Чтобы отписаться, введите /logout.",
          );
          break;
      }
      return NextResponse.json({ success: true });
    }

    // Обработка команд для НЕАВТОРИЗОВАННЫХ пользователей
    switch (text) {
      case "/start":
        await sendMessage(
          "Привет! 👋\nПожалуйста, введите пароль администратора для получения уведомлений с сайта.",
        );
        break;
      case "/help":
        await sendMessage(
          "<b>Доступные команды:</b>\n/start - Авторизация (потребуется пароль)",
        );
        break;
      case "/logout":
        await sendMessage(
          "Вы не авторизованы, поэтому и так не получаете уведомления.",
        );
        break;
      default:
        // Если текст не является стандартной командой, предполагаем, что это попытка ввода пароля
        if (text === adminPassword) {
          // Пароль верный -> сохраняем в базу
          await prisma.telegramNotificationReceiver.create({
            data: { telegramId: chatId },
          });
          await sendMessage(
            "<b>Пароль принят! ✅</b>\nТеперь вы будете получать уведомления о новых заявках.\nДля отписки используйте команду /logout.",
          );
        } else {
          // Пароль неверный
          await sendMessage(
            "Неверный пароль. ❌\nПопробуйте еще раз или введите /help.",
          );
        }
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    // Всегда возвращаем 200 статус для Telegram, чтобы он не зацикливал отправку ошибки
    return NextResponse.json({ success: true });
  }
}
