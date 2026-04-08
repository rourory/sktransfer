"use client";

import { CalculatorForm, type DbTariff } from "@/components/calculator-form";
import {
  Clock,
  MapPin,
  ShieldCheck,
  Wifi,
  Coffee,
  Baby,
  CreditCard,
  CheckCircle2,
  HelpCircle,
  Plane,
  Car,
} from "lucide-react";
import Link from "next/link";

interface Props {
  route: any;
  tariffs: DbTariff[];
  preCalculated: Record<string, number>;
  initialDistance: string;
  initialFromCoords: { lat: number; lon: number } | null;
  initialToCoords: { lat: number; lon: number } | null;
}

export default function TransferPageContent({
  route,
  tariffs,
  preCalculated,
  initialDistance,
  initialFromCoords,
  initialToCoords,
}: Props) {
  const formatDuration = (minutes: number) => {
    if (!minutes) return "по запросу";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h} ч ${m > 0 ? `${m} мин` : ""}` : `${m} мин`;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* HERO СЕКЦИЯ */}
      {/* Увеличен pt (padding-top), чтобы контент не залезал под фиксированный Header */}
      <section className="bg-white border-b border-gray-200 pt-8 pb-8 md:pt-12 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
            <Link
              href="/"
              className="hover:text-[var(--gold)] transition-colors"
            >
              Главная
            </Link>
            <span>/</span>
            <Link
              href="/transfers"
              className="hover:text-[var(--gold)] transition-colors"
            >
              Направления
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{route.toNameRu}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Трансфер{" "}
            <span className="gold-gradient-text">
              {route.fromNameRu} — {route.toNameRu}
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm md:text-base text-gray-600">
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
              <MapPin className="w-4 h-4 mr-2 text-[var(--gold)]" />
              Расстояние:{" "}
              <strong className="ml-1">{route.distanceKm} км</strong>
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
              <Clock className="w-4 h-4 mr-2 text-[var(--gold)]" />В пути:{" "}
              <strong className="ml-1">
                ≈ {formatDuration(route.durationMin)}
              </strong>
            </div>
            <div className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200 font-medium">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Фиксированная цена
            </div>
          </div>
        </div>
      </section>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* ЛЕВАЯ КОЛОНКА (Добавлено больше контента для баланса высоты) */}
          <div className="w-full lg:w-7/12 xl:w-2/3 space-y-10 md:space-y-12">
            {/* Описание */}
            <div className="prose max-w-none text-gray-600 text-sm sm:text-base">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Информация о поездке
              </h2>
              <p>
                Планируете поездку? Индивидуальный трансфер{" "}
                <strong>
                  {route.fromNameRu} — {route.toNameRu}
                </strong>{" "}
                от нашей компании — это гарантия того, что вы доберетесь до
                места назначения с максимальным комфортом и точно в срок.
              </p>
              <p>
                Мы избавим вас от необходимости искать такси на месте,
                торговаться с водителями или подстраиваться под расписание
                общественного транспорта. Наш водитель встретит вас с табличкой,
                поможет с багажом и обеспечит спокойную поездку.
              </p>
            </div>

            {/* Включено в стоимость */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                В стоимость включено
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Clock,
                    title: "Ожидание",
                    desc: "До 60 мин бесплатно",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Безопасность",
                    desc: "Опытные водители",
                  },
                  { icon: Wifi, title: "Wi-Fi", desc: "Бесплатный интернет" },
                  {
                    icon: Coffee,
                    title: "Напитки",
                    desc: "Вода в салоне авто",
                  },
                  {
                    icon: Baby,
                    title: "Детское кресло",
                    desc: "Бесплатно по запросу",
                  },
                  {
                    icon: CreditCard,
                    title: "Оплата",
                    desc: "Наличные или карта",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-[var(--gold)]/30 transition-colors"
                  >
                    <div className="p-2.5 bg-amber-50 rounded-lg mr-4 flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[var(--gold)]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Как мы работаем */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Как проходит поездка?
              </h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--gold)] text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                  </div>
                  <div className="pb-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Оформление заявки
                    </h4>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      Выберите тариф справа и заполните данные. Оператор
                      подтвердит заказ в течение 5 минут.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 border-2 border-[var(--gold)] flex items-center justify-center font-bold">
                      2
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                  </div>
                  <div className="pb-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Встреча
                    </h4>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      Водитель приедет заранее. Если это аэропорт — встретит вас
                      в зоне прилета с табличкой.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 border-2 border-[var(--gold)] flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      Комфортная поездка
                    </h4>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      Поможем с багажом и с комфортом доставим точно по адресу.
                      Оплата по прибытию.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-6 h-6 text-[var(--gold)]" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Частые вопросы
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  {
                    q: "А если мой рейс задержат?",
                    a: "Не волнуйтесь! Мы бесплатно отслеживаем номера рейсов на онлайн-табло. Водитель приедет точно ко времени посадки самолета, даже если рейс сильно задержится.",
                  },
                  {
                    q: "Цена в калькуляторе окончательная?",
                    a: "Да. Вы платите ровно ту сумму, которая указана при бронировании. Никаких доплат за пробки, светофоры или ночное время.",
                  },
                  {
                    q: "У вас есть детские кресла?",
                    a: "Да, мы предоставляем детские кресла или бустеры абсолютно бесплатно. Просто укажите возраст ребенка при оформлении заказа.",
                  },
                ].map((faq, i) => (
                  <div
                    key={i}
                    className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm"
                  >
                    <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА (Калькулятор) */}
          {/* Убран sticky. Теперь форма ведет себя как обычный блок, не ломая верстку */}
          <div className="w-full lg:w-5/12 xl:w-1/3">
            <CalculatorForm
              locale="ru"
              dbTariffs={tariffs}
              initialFrom={route.fromNameRu}
              initialTo={route.toNameRu}
              initialDistance={initialDistance}
              initialFromCoords={initialFromCoords}
              initialToCoords={initialToCoords}
              preCalculatedResults={preCalculated}
              autoCalculateOnMount={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
