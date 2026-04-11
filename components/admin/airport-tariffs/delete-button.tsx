"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteAirportTariff } from "@/app/(admin)/admin/actions";

export function DeleteAirportTariffButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (
      confirm(
        `Вы уверены, что хотите удалить тариф "${name}"? Это действие нельзя отменить.`,
      )
    ) {
      startTransition(() => {
        deleteAirportTariff(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="cursor-pointer p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
      title="Удалить"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
