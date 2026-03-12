import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { BlogIndexClient } from "./client.page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Блог о путешествиях, санаториях и трансферах — SKTransfer.by",
  description:
    "Полезные статьи для туристов: обзоры санаториев Беларуси, экскурсионные маршруты, советы по заказу трансфера и прохождению границы.",
  alternates: {
    canonical: "https://sktransfer.by/blog",
  },
};

export default async function BlogIndexPage() {
  // Получаем все категории вместе с количеством статей в них
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { articles: { where: { isPublished: true } } },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return <BlogIndexClient categories={categories} />;
}
