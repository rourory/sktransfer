// components/visitor-tracker.client.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackVisit } from "@/app/actions/tracking";

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Отправляем сигнал на сервер при каждой загрузке страницы
    // (на сервере дубликаты за один день отсеются базой данных)
    trackVisit();
  }, [pathname]);

  // Компонент не имеет визуальной части
  return null;
}