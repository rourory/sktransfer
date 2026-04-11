"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "../booking-modal";
import { Locale } from "@/lib/i18n";

export function BookButton({
  tariffName,
  locale,
}: {
  tariffName: string;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="w-full bg-[var(--gold)] text-white"
      >
        {locale === "ru" ? "Заказать" : locale === "en" ? "Book" : "预订"}
      </Button>

      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        selectedTariff={tariffName}
        from={locale === "ru" ? "Аэропорт Минск-2" : "Minsk Airport"}
        to={locale === "ru" ? "Минск" : "Minsk"}
      />
    </>
  );
}
