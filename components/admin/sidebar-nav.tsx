// components/admin/sidebar-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderTree,
  FileText,
  Car,
  Map,
  Plane,
} from "lucide-react"; // Добавили Plane

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  const links = [
    { href: "/admin", icon: LayoutDashboard, label: "Дашборд" },
    { href: "/admin/tariffs", icon: Car, label: "Тарифы (Автопарк)" },
    { href: "/admin/airport-tariffs", icon: Plane, label: "Аэропорт (Тарифы)" }, // <--- НОВАЯ ССЫЛКА
    { href: "/admin/routes", icon: Map, label: "Маршруты (SEO)" },
    { href: "/admin/categories", icon: FolderTree, label: "Категории" },
    { href: "/admin/articles", icon: FileText, label: "Статьи" },
  ];

  return (
    <nav className="flex-1 px-4 space-y-2 mt-4">
      {links.map((link) => {
        const Icon = link.icon;
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              active
                ? "bg-[var(--gold)]/10 text-[var(--gold)]"
                : "hover:bg-white/5 text-white/70 hover:text-white"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
