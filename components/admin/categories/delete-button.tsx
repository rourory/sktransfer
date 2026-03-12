// app/admin/(dashboard)/categories/delete-button.client.tsx
"use client";

import { useTransition } from "react";

import { Trash2 } from "lucide-react";
import { deleteCategory } from "@/app/(admin)/admin/actions";

export function DeleteCategoryButton({
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
        `Вы уверены, что хотите удалить категорию "${name}"? Все статьи в ней также могут быть удалены (если настроено Cascade).`,
      )
    ) {
      startTransition(() => {
        deleteCategory(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
      title="Удалить"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
