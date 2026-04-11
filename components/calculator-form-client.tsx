"use client";

import { CalculatorForm, type DbTariff } from "@/components/calculator-form";
import { type Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dbTariffs: DbTariff[];
  initialFrom: string;
  initialTo: string;
  initialDistance: string;
  initialFromCoords: { lat: number; lon: number } | null;
  initialToCoords: { lat: number; lon: number } | null;
  preCalculatedResults: Record<string, number>;
  autoCalculateOnMount: boolean;
}

export function CalculatorFormClient(props: Props) {
  return <CalculatorForm {...props} />;
}
