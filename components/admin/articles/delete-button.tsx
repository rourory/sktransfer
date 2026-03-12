"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteArticle } from "@/app/(admin)/admin/actions";

export function DeleteArticleButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Вы уверены, что хотите удалить статью "${title}"? Это действие необратимо.`)) {
      startTransition(async () => {
        await deleteArticle(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="cursor-pointer p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
      title="Удалить"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}