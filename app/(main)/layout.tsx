import type React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
