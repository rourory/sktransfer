import type React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import prisma from "@/lib/prisma";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerCategories = await prisma.category.findMany({
    where: { showInFooter: true },
    select: { slug: true, nameRu: true, nameEn: true, nameZh: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <Header />
      {children}
      <Footer/>
    </>
  );
}
