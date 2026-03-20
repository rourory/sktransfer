// app/contacts/contact-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

// Типизация для пропсов перевода формы
interface ContactFormProps {
  formTranslations: {
    requestTitle: string;
    requestDesc: string;
    name: string;
    namePlaceholder: string;
    phone: string;
    email: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    successDesc: string;
    error: string;
    errorDesc: string;
    privacy: string;
  };
}

function ContactForm({ formTranslations: t }: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "contact_form",
        }),
      });

      if (response.ok) {
        toast({
          title: t.success,
          description: t.successDesc,
        });
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      toast({
        title: t.error,
        description: t.errorDesc,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {t.requestTitle}
        </h2>
        <p className="text-gray-600">{t.requestDesc}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t.name} <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder={t.namePlaceholder}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="h-12 bg-gray-50 border-gray-200 focus:border-[var(--gold)] focus:ring-[var(--gold)]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t.phone} <span className="text-red-500">*</span>
          </label>
          <Input
            type="tel"
            placeholder="+375 (__) ___-__-__"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
            className="h-12 bg-gray-50 border-gray-200 focus:border-[var(--gold)] focus:ring-[var(--gold)]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t.email} <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="h-12 bg-gray-50 border-gray-200 focus:border-[var(--gold)] focus:ring-[var(--gold)]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t.message} <span className="text-red-500">*</span>
          </label>
          <Textarea
            placeholder={t.messagePlaceholder}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
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
              {t.sending}
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="mr-2 group-hover:translate-x-1 transition-transform"
              />
              {t.submit}
            </>
          )}
        </Button>

        <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 mt-0.5 flex-shrink-0"
          />
          <p>{t.privacy}</p>
        </div>
      </form>
    </div>
  );
}

export { ContactForm };
