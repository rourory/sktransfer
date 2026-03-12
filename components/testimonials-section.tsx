"use client"

import type { Locale } from "@/lib/i18n"
import { Star, Quote } from "lucide-react"

interface TestimonialsSectionProps {
  locale: Locale
}

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const testimonials = [
    {
      ru: {
        name: "Александр Петров",
        position: "Бизнесмен",
        text: "Пользуюсь услугами SKTransfer уже 3 года. Всегда пунктуальны, вежливы, автомобили в идеальном состоянии. Особенно ценю возможность заказа в любое время суток.",
      },
      en: {
        name: "Alexander Petrov",
        position: "Businessman",
        text: "I have been using SKTransfer services for 3 years. Always punctual, polite, cars in perfect condition. I especially appreciate the ability to order at any time of the day.",
      },
      zh: {
        name: "亚历山大·彼得罗夫",
        position: "商人",
        text: "我使用SKTransfer服务已经3年了。总是准时、礼貌，汽车状况完美。我特别感谢可以在一天中的任何时间订购。",
      },
    },
    {
      ru: {
        name: "Елена Иванова",
        position: "Туристка",
        text: "Заказывала трансфер из аэропорта с экскурсией по Минску. Гид Андрей просто потрясающий! Узнала столько интересного о городе. Спасибо за прекрасный сервис!",
      },
      en: {
        name: "Elena Ivanova",
        position: "Tourist",
        text: "I ordered a transfer from the airport with a tour of Minsk. Guide Andrey is just amazing! I learned so much interesting about the city. Thanks for the excellent service!",
      },
      zh: {
        name: "叶莲娜·伊万诺娃",
        position: "游客",
        text: "我从机场订购了明斯克游览的接送服务。导游安德烈真是太棒了！我了解了很多关于这座城市的有趣信息。感谢您的出色服务！",
      },
    },
    {
      ru: {
        name: "Дмитрий Соколов",
        position: "Менеджер",
        text: "Организовывали корпоративное мероприятие, нужно было доставить 15 человек. Всё прошло отлично, микроавтобус комфортный, водитель профессионал. Рекомендую!",
      },
      en: {
        name: "Dmitry Sokolov",
        position: "Manager",
        text: "We organized a corporate event, we needed to deliver 15 people. Everything went perfectly, the minibus is comfortable, the driver is a professional. I recommend!",
      },
      zh: {
        name: "德米特里·索科洛夫",
        position: "经理",
        text: "我们组织了一次公司活动，需要运送15人。一切都很完美，小巴很舒适，司机很专业。我推荐！",
      },
    },
  ]

  const t = {
    ru: { title: "Отзывы наших клиентов", subtitle: "Что говорят о нас" },
    en: { title: "Customer Reviews", subtitle: "What they say about us" },
    zh: { title: "客户评价", subtitle: "他们对我们的评价" },
  }

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-amber-50/20 to-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--gold-dark)]/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 gold-gradient-text text-muted">{t[locale].title}</h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-muted">{t[locale].subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-effect-strong p-8 rounded-2xl hover-lift animate-fadeIn relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Quote className="absolute top-6 right-6 h-12 w-12 text-[var(--gold)]/20" />

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[var(--gold)] text-[var(--gold)] text-[rgba(192,171,14,1)]" />
                  ))}
                </div>

                <p className="text-foreground/80 mb-6 leading-relaxed relative z-10">{testimonial[locale].text}</p>

                <div className="border-t border-[var(--gold)]/20 pt-4">
                  <div className="font-bold text-foreground">{testimonial[locale].name}</div>
                  <div className="text-sm text-foreground/60">{testimonial[locale].position}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
