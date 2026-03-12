import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Условия использования | SK Transfer - Премиум трансфер по Беларуси",
  description:
    "Условия использования сайта SK Transfer. Правила бронирования, оплаты и предоставления услуг трансфера.",
  keywords: "условия использования, правила, бронирование, трансфер, SK Transfer, Беларусь",
  openGraph: {
    title: "Условия использования | SK Transfer",
    description: "Условия использования услуг и сайта SK Transfer",
    type: "website",
  },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 lg:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[var(--gold-dark)] mb-4 sm:mb-6">
            Условия использования
          </h1>

          <p className="text-sm text-muted-foreground mb-8 sm:mb-10">
            Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
          </p>

          <div className="prose prose-sm sm:prose-base max-w-none space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">
                1. Общие положения
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Настоящие Условия использования (далее — Условия) регулируют использование сайта sktransfer.by (далее —
                Сайт) и услуг, предоставляемых компанией SK Transfer (далее — Компания).
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Используя Сайт и заказывая услуги Компании, вы соглашаетесь с настоящими Условиями. Если вы не согласны
                с какими-либо положениями Условий, пожалуйста, не используйте Сайт и не заказывайте услуги.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">2. Услуги</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Компания предоставляет следующие услуги:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Трансфер по Беларуси, России, СНГ и Европе</li>
                <li>Встреча и провожание в аэропорт</li>
                <li>Экскурсионные туры с гидами</li>
                <li>Трансфер в санатории и курорты</li>
                <li>VIP-обслуживание</li>
                <li>Корпоративные и деловые поездки</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">
                3. Заказ услуг
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Для заказа услуг необходимо:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Заполнить форму заказа на Сайте или связаться с Компанией по указанным контактам</li>
                <li>Предоставить достоверную информацию о поездке (дата, время, маршрут, количество пассажиров)</li>
                <li>Получить подтверждение заказа от Компании</li>
                <li>Оплатить услуги согласно условиям оплаты</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Заказ считается подтвержденным после получения соответствующего уведомления от Компании по телефону,
                email или через мессенджеры.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">
                4. Оплата услуг
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Стоимость услуг рассчитывается на основании:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Расстояния маршрута</li>
                <li>Выбранного тарифа и класса автомобиля</li>
                <li>Времени ожидания</li>
                <li>Дополнительных услуг</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Оплата производится наличными водителю после выполнения заказа или безналичным способом по
                договоренности. Для корпоративных клиентов возможна постоплата по договору.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">
                5. Правила бронирования
              </h2>
              <div className="bg-amber-50/50 border border-[var(--gold)]/20 rounded-lg p-4 sm:p-6 space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Важно:</strong> Транспортная компания располагается в Минске и
                  выполняет перевозки только с отправлением или прибытием в Минск.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Срочные заказы менее чем за 2 часа днём и 8 часов ночью рассматриваются только по телефону.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Бесплатное время ожидания составляет 20 минут. Далее оплата производится согласно тарифам.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  При заказе из аэропорта ожидание более 1 часа оплачивается отдельно.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">
                6. Отмена и изменение заказа
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Клиент имеет право отменить или изменить заказ, уведомив Компанию:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong className="text-foreground">Более чем за 2 часа до начала поездки</strong> — бесплатно
                </li>
                <li>
                  <strong className="text-foreground">Менее чем за 2 часа</strong> — оплата подачи автомобиля (10 BYN из
                  Минска, 60% от стоимости поездки из других точек)
                </li>
                <li>
                  <strong className="text-foreground">После прибытия автомобиля</strong> — полная стоимость заказа
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">
                7. Обязанности Компании
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Компания обязуется:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Предоставить исправный и чистый автомобиль соответствующего класса</li>
                <li>Обеспечить профессионального водителя с опытом работы</li>
                <li>Прибыть в указанное место в согласованное время</li>
                <li>Обеспечить безопасную перевозку пассажиров и багажа</li>
                <li>Соблюдать конфиденциальность информации о клиенте</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">
                8. Обязанности Клиента
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Клиент обязуется:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Предоставить достоверную информацию при заказе</li>
                <li>Своевременно прибыть к месту подачи автомобиля</li>
                <li>Соблюдать правила поведения в автомобиле</li>
                <li>Не курить в автомобиле без разрешения</li>
                <li>Оплатить услуги согласно условиям</li>
                <li>Возместить ущерб при повреждении автомобиля или имущества</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">
                9. Ответственность
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Компания не несет ответственности за задержки, вызванные форс-мажорными обстоятельствами (погодные
                условия, дорожные происшествия, действия третьих лиц). В случае невозможности выполнения заказа по вине
                Компании, клиенту возвращается полная стоимость услуг.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Компания не несет ответственности за вещи и ценности, оставленные в автомобиле после завершения поездки.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">
                10. Интеллектуальная собственность
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Все материалы Сайта (тексты, изображения, логотипы, дизайн) являются собственностью Компании и защищены
                законодательством об авторском праве. Использование материалов без письменного согласия Компании
                запрещено.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">
                11. Изменение Условий
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Компания оставляет за собой право изменять настоящие Условия в любое время. Все изменения вступают в
                силу с момента их публикации на Сайте. Продолжая использовать Сайт после внесения изменений, вы
                соглашаетесь с новыми Условиями.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">
                12. Разрешение споров
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Все споры и разногласия решаются путем переговоров. В случае невозможности достижения согласия, споры
                подлежат рассмотрению в судебном порядке в соответствии с законодательством Республики Беларусь.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">
                13. Контактная информация
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                По всем вопросам, связанным с настоящими Условиями, обращайтесь:
              </p>
              <div className="bg-muted/30 border border-border rounded-lg p-4 sm:p-6 space-y-2">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Email:</strong> info@sktransfer.by
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Телефон:</strong> +375 (29) 122-84-84
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Telegram:</strong> @sktransfer
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">WhatsApp:</strong> +375 (29) 122-84-84
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Адрес:</strong> Республика Беларусь, г. Минск
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
