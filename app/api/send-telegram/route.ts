import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, message, type } = body

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    const chatId2 = "584831028" // Второй аккаунт

    if (!botToken || !chatId) {
      console.error("[v0] Telegram credentials not configured")
      return NextResponse.json({ error: "Telegram not configured" }, { status: 500 })
    }

    // Формируем сообщение для Telegram
    let telegramMessage = `🔔 <b>Новая заявка с сайта SKTransfer.by</b>\n\n`
    telegramMessage += `📋 <b>Тип:</b> ${type || "Контактная форма"}\n`
    telegramMessage += `👤 <b>Имя:</b> ${name}\n`
    telegramMessage += `📱 <b>Телефон:</b> ${phone}\n`

    if (email) {
      telegramMessage += `📧 <b>Email:</b> ${email}\n`
    }

    if (message) {
      telegramMessage += `💬 <b>Сообщение:</b>\n${message}\n`
    }

    telegramMessage += `\n⏰ <b>Время:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" })}`

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    const sendToChat1 = fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    })

    const sendToChat2 = fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId2,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    })

    // Ждем оба запроса
    const [response1, response2] = await Promise.all([sendToChat1, sendToChat2])

    const data1 = await response1.json()
    const data2 = await response2.json()

    // Проверяем успешность обоих запросов
    if (!response1.ok) {
      console.error("[v0] Telegram API error (chat 1):", data1)
    } else {
      console.log("[v0] Message sent to Telegram chat 1 successfully")
    }

    if (!response2.ok) {
      console.error("[v0] Telegram API error (chat 2):", data2)
    } else {
      console.log("[v0] Message sent to Telegram chat 2 successfully")
    }

    // Возвращаем успех если хотя бы один запрос прошел
    if (response1.ok || response2.ok) {
      return NextResponse.json({
        success: true,
        sent_to_chat1: response1.ok,
        sent_to_chat2: response2.ok,
      })
    } else {
      return NextResponse.json({ error: "Failed to send to both chats" }, { status: 500 })
    }
  } catch (error) {
    console.error("[v0] Error sending to Telegram:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
