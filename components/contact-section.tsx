"use client"

import type React from "react"
import { type Locale, translations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
  faPaperPlane,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons"
import { faTelegram, faWhatsapp, faViber, faWeixin } from "@fortawesome/free-brands-svg-icons"

interface ContactSectionProps {
  locale: Locale
}

export function ContactSection({ locale }: ContactSectionProps) {
  const t = translations[locale]
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          type: "contact_form",
        }),
      })

      if (response.ok) {
        toast({
          title: locale === "ru" ? "Успешно отправлено!" : locale === "en" ? "Successfully sent!" : "发送成功！",
          description:
            locale === "ru"
              ? "Мы свяжемся с вами в ближайшее время"
              : locale === "en"
                ? "We will contact you shortly"
                : "我们会尽快与您联系",
        })
        setFormData({ name: "", phone: "", email: "", message: "" })
      } else {
        throw new Error("Failed to send")
      }
    } catch (error) {
      toast({
        title: locale === "ru" ? "Ошибка" : locale === "en" ? "Error" : "错误",
        description:
          locale === "ru" ? "Не удалось отправить сообщение" : locale === "en" ? "Failed to send message" : "发送失败",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const messengers = [
    {
      name: "Telegram",
      url: "https://t.me/+375291228484",
      icon: faTelegram,
      color: "from-[#0088cc] to-[#0088cc]/80",
      hoverColor: "hover:shadow-[#0088cc]/50",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/375291228484",
      icon: faWhatsapp,
      color: "from-[#25D366] to-[#20b858]",
      hoverColor: "hover:shadow-[#25D366]/50",
    },
    {
      name: "Viber",
      url: "viber://chat?number=375291228484",
      icon: faViber,
      color: "from-[#7360f2] to-[#665ac8]",
      hoverColor: "hover:shadow-[#7360f2]/50",
    },
    {
      name: "WeChat",
      url: "weixin://",
      icon: faWeixin,
      color: "from-[#09B83E] to-[#07a037]",
      hoverColor: "hover:shadow-[#09B83E]/50",
    },
  ]

  return (
    <section className="relative min-h-screen py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--gold)]/10 to-[var(--platinum)]/10 rounded-full mb-4">
              <FontAwesomeIcon icon={faPhone} className="text-[var(--gold)] text-sm" />
              <span className="text-sm font-medium text-gray-700">
                {locale === "ru" ? "Свяжитесь с нами" : locale === "en" ? "Get in Touch" : "联系我们"}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-[var(--platinum)] bg-clip-text text-transparent">
                {t.contact.title}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {locale === "ru"
                ? "Мы работаем 24/7 для вашего комфорта. Свяжитесь с нами удобным способом"
                : locale === "en"
                  ? "We work 24/7 for your comfort. Contact us in a convenient way"
                  : "我们全天候为您服务。以方便的方式联系我们"}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
              {/* Phone */}
              <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold)]/80 flex items-center justify-center shadow-lg shadow-[var(--gold)]/20 group-hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={faPhone} className="text-white text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t.contact.phone}
                    </h3>
                    <a
                      href="tel:+375291228484"
                      className="text-xl font-bold text-gray-900 hover:text-[var(--gold)] transition-colors block"
                    >
                      +375 (29) 122-84-84
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      {locale === "ru" ? "Беларусь" : locale === "en" ? "Belarus" : "白俄罗斯"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={faEnvelope} className="text-white text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t.contact.email}
                    </h3>
                    <a
                      href="mailto:info@sktransfer.by"
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors break-all"
                    >
                      info@sktransfer.by
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t.contact.address}
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {locale === "ru" ? "Минск, Беларусь" : locale === "en" ? "Minsk, Belarus" : "明斯克，白俄罗斯"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="group bg-gradient-to-br from-[var(--gold)] to-[var(--gold)]/90 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={faClock} className="text-white text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2">
                      {locale === "ru" ? "Часы работы" : locale === "en" ? "Working Hours" : "工作时间"}
                    </h3>
                    <p className="text-2xl font-bold text-white">24/7</p>
                    <p className="text-sm text-white/90 mt-1">
                      {locale === "ru" ? "Без выходных" : locale === "en" ? "Every Day" : "每天"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faTelegram} className="text-[var(--gold)]" />
                  {t.contact.messengers}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {messengers.map((messenger) => (
                    <a
                      key={messenger.name}
                      href={messenger.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br ${messenger.color} text-white hover:shadow-lg ${messenger.hoverColor} transition-all duration-300`}
                    >
                      <FontAwesomeIcon
                        icon={messenger.icon}
                        className="text-2xl group-hover:scale-110 transition-transform"
                      />
                      <span className="text-sm font-semibold">{messenger.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    {locale === "ru" ? "Отправить запрос" : locale === "en" ? "Send Request" : "发送请求"}
                  </h2>
                  <p className="text-gray-600">
                    {locale === "ru"
                      ? "Заполните форму и мы свяжемся с вами в течение 15 минут"
                      : locale === "en"
                        ? "Fill out the form and we will contact you within 15 minutes"
                        : "填写表格，我们将在15分钟内与您联系"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t.contact.form.name} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder={
                        locale === "ru" ? "Введите ваше имя" : locale === "en" ? "Enter your name" : "输入您的姓名"
                      }
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12 bg-gray-50 border-gray-200 focus:border-[var(--gold)] focus:ring-[var(--gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t.contact.form.phone} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      placeholder="+375 (__) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-12 bg-gray-50 border-gray-200 focus:border-[var(--gold)] focus:ring-[var(--gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t.contact.form.email} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder={
                        locale === "ru" ? "example@mail.com" : locale === "en" ? "example@mail.com" : "example@mail.com"
                      }
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 bg-gray-50 border-gray-200 focus:border-[var(--gold)] focus:ring-[var(--gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t.contact.form.message} <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      placeholder={
                        locale === "ru"
                          ? "Расскажите о вашей поездке..."
                          : locale === "en"
                            ? "Tell us about your trip..."
                            : "告诉我们您的旅行..."
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="resize-none bg-gray-50 border-gray-200 focus:border-[var(--gold)] focus:ring-[var(--gold)]"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[var(--gold)] to-[var(--gold)]/90 text-white hover:shadow-xl hover:shadow-[var(--gold)]/30 transition-all duration-300 group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        {locale === "ru" ? "Отправка..." : locale === "en" ? "Sending..." : "发送中..."}
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          className="mr-2 group-hover:translate-x-1 transition-transform"
                        />
                        {t.contact.form.submit}
                      </>
                    )}
                  </Button>

                  <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <p>
                      {locale === "ru"
                        ? "Ваши данные защищены и не будут переданы третьим лицам"
                        : locale === "en"
                          ? "Your data is protected and will not be shared with third parties"
                          : "您的数据受到保护，不会与第三方共享"}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
