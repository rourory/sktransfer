"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { type Locale, translations } from "@/lib/i18n"
import { User, Phone, Mail, MessageSquare, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BookingModalProps {
  open: boolean
  onClose: () => void
  locale: Locale
  selectedTariff?: string
  distance?: string
  from?: string
  to?: string
}

export function BookingModal({ open, onClose, locale, selectedTariff, distance, from, to }: BookingModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const t = translations[locale]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let message = `${t.contact.form.name}: ${name}\n${t.contact.form.phone}: ${phone}`

      if (email) {
        message += `\n${t.contact.form.email}: ${email}`
      }

      if (selectedTariff) {
        message += `\n\n${locale === "ru" ? "Т��риф" : locale === "en" ? "Tariff" : "关税"}: ${selectedTariff}`
      }

      if (distance) {
        message += `\n${locale === "ru" ? "Расстояние" : locale === "en" ? "Distance" : "距离"}: ${distance} км`
      }

      if (from && to) {
        message += `\n${locale === "ru" ? "Маршрут" : locale === "en" ? "Route" : "路线"}: ${from} → ${to}`
      }

      if (comment) {
        message += `\n\n${t.contact.form.message}: ${comment}`
      }

      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          type: "booking",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send")
      }

      setIsSuccess(true)

      toast({
        title: locale === "ru" ? "Заказ оформлен!" : locale === "en" ? "Booking confirmed!" : "预订已确认！",
        description:
          locale === "ru"
            ? "Мы свяжемся с вами в ближайшее время"
            : locale === "en"
              ? "We will contact you soon"
              : "我们会尽快与您联系",
      })

      setTimeout(() => {
        setIsSuccess(false)
        onClose()
        setName("")
        setPhone("")
        setEmail("")
        setComment("")
      }, 2500)
    } catch (error) {
      console.error("[v0] Booking error:", error)
      toast({
        title: locale === "ru" ? "Ошибка" : locale === "en" ? "Error" : "错误",
        description:
          locale === "ru" ? "Не удалось отправить заказ" : locale === "en" ? "Failed to send booking" : "发送失败",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-[90vw] sm:max-w-[500px] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold gold-gradient-text text-left">
            {locale === "ru" ? "Оформление заказа" : locale === "en" ? "Book Transfer" : "预订转账"}
          </DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6 sm:py-8 text-center">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">
              {locale === "ru" ? "Заказ оформлен!" : locale === "en" ? "Booking confirmed!" : "预订已确认！"}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground px-2 sm:px-4">
              {locale === "ru"
                ? "Мы свяжемся с вами в ближайшее время"
                : locale === "en"
                  ? "We will contact you soon"
                  : "我们会尽快与您联系"}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {selectedTariff && (
              <div className="p-2.5 sm:p-3 md:p-4 bg-[var(--gold)]/10 rounded-lg border border-[var(--gold)]/20">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                  {locale === "ru" ? "Выбранный тариф:" : locale === "en" ? "Selected tariff:" : "选定关税："}
                </p>
                <p className="font-semibold text-sm sm:text-base md:text-lg break-words">{selectedTariff}</p>
                {distance && (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {locale === "ru" ? "Расстояние:" : locale === "en" ? "Distance:" : "距离："} {distance} км
                  </p>
                )}
                {from && to && (
                  <p className="text-xs sm:text-sm text-muted-foreground break-words mt-0.5">
                    {from} → {to}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-1.5 sm:space-y-2">
              <Label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--gold)] flex-shrink-0" />
                <span>{locale === "ru" ? "Ваше имя" : locale === "en" ? "Your name" : "您的姓名"}</span>
              </Label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={locale === "ru" ? "Иван Иванов" : locale === "en" ? "John Doe" : "张三"}
                className="w-full h-9 sm:h-10 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--gold)] flex-shrink-0" />
                <span>{locale === "ru" ? "Телефон" : locale === "en" ? "Phone" : "电话"}</span>
              </Label>
              <Input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+375 (29) 122-84-84"
                className="w-full h-9 sm:h-10 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--gold)] flex-shrink-0" />
                <span>{locale === "ru" ? "Email" : locale === "en" ? "Email" : "电子邮件"}</span>
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full h-9 sm:h-10 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--gold)] flex-shrink-0" />
                <span>{locale === "ru" ? "Комментарий" : locale === "en" ? "Comment" : "评论"}</span>
              </Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={
                  locale === "ru"
                    ? "Дополнительные пожелания..."
                    : locale === "en"
                      ? "Additional requests..."
                      : "其他要求..."
                }
                rows={3}
                className="w-full resize-none text-sm sm:text-base min-h-[70px] sm:min-h-[80px]"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full sm:flex-1 h-9 sm:h-10 text-sm sm:text-base bg-transparent order-2 sm:order-1"
              >
                {locale === "ru" ? "Отмена" : locale === "en" ? "Cancel" : "取消"}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 h-9 sm:h-10 text-sm sm:text-base gold-gradient order-1 sm:order-2 text-muted"
              >
                {isSubmitting
                  ? locale === "ru"
                    ? "Отправка..."
                    : locale === "en"
                      ? "Sending..."
                      : "发送中..."
                  : locale === "ru"
                    ? "Отправить заказ"
                    : locale === "en"
                      ? "Submit booking"
                      : "提交预订"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
