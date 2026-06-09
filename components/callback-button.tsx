"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { BookingModal } from "./booking-modal";

interface CallbackButtonProps {
  locale: Locale;
}

export function CallbackButton({ locale }: CallbackButtonProps) {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsCallbackOpen(true);
        }}
        size="lg"
        variant="outline"
        className="w-full sm:w-auto cursor-pointer group px-8 py-6 bg-white/5 backdrop-blur-sm border-2 border-[var(--gold)]/40 text-white font-semibold text-lg rounded-full hover:bg-[var(--gold)]/10 hover:border-[var(--gold)]/60 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(201,168,106,0.1)] hover:shadow-[0_0_30px_rgba(201,168,106,0.2)]"
      >
        <PhoneCall className="mr-2 h-5 w-5 text-[var(--gold)] group-hover:animate-pulse" />
        <span>
          {locale === "ru"
            ? "Перезвоните мне"
            : locale === "en"
              ? "Call me back"
              : "给我回电"}
        </span>
      </Button>

      {/* Сама модалка рендерится на клиенте внутри этого компонента */}
      <BookingModal
        open={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        locale={locale}
        mode="callback"
      />
    </>
  );
}
