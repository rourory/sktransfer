"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderTree, FileText } from "lucide-react";

export function SidebarNav() {
  const pathname = usePathname();

  // Функция для проверки активного роута
  const isActive = (path: string) => {
    // Для главной страницы админки нужно точное совпадение
    if (path === "/admin") {
      return pathname === "/admin";
    }
    // Для остальных проверяем, начинается ли URL с этого пути
    // (чтобы подсвечивалось и на /admin/categories/new)
    return pathname.startsWith(path);
  };

  return (
    <nav className="flex-1 px-4 space-y-2 mt-4">
      <Link
        href="/admin"
        className={`cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
          isActive("/admin")
            ? "bg-[var(--gold)]/10 text-[var(--gold)]"
            : "hover:bg-white/5 text-white/70 hover:text-white"
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span>Дашборд</span>
      </Link>

      <Link
        href="/admin/categories"
        className={`cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
          isActive("/admin/categories")
            ? "bg-[var(--gold)]/10 text-[var(--gold)]"
            : "hover:bg-white/5 text-white/70 hover:text-white"
        }`}
      >
        <FolderTree className="w-5 h-5" />
        <span>Категории</span>
      </Link>

      <Link
        href="/admin/articles"
        className={`cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
          isActive("/admin/articles")
            ? "bg-[var(--gold)]/10 text-[var(--gold)]"
            : "hover:bg-white/5 text-white/70 hover:text-white"
        }`}
      >
        <FileText className="w-5 h-5" />
        <span>Статьи</span>
      </Link>
      <Link
        href="/admin/routes"
        className={`cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
          isActive("/admin/routes")
            ? "bg-[var(--gold)]/10 text-[var(--gold)]"
            : "hover:bg-white/5 text-white/70 hover:text-white"
        }`}
      >
        <FileText className="w-5 h-5" />
        <span>Маршруты</span>
      </Link>
      <Link
        href="/admin/tariffs"
        className={`cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
          isActive("/admin/tariffs")
            ? "bg-[var(--gold)]/10 text-[var(--gold)]"
            : "hover:bg-white/5 text-white/70 hover:text-white"
        }`}
      >
        <FileText className="w-5 h-5" />
        <span>Тарифы</span>
      </Link>
    </nav>
  );
}
