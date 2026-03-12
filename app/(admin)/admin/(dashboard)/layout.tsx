// app/admin/(dashboard)/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "../actions";
import { LogOut, Globe } from "lucide-react";
import { SidebarNav } from "@/components/admin/sidebar-nav";
// Импортируем наш новый клиентский компонент

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  // Защита роута (Если нет куки - отправляем на логин)
  if (session?.value !== "authenticated") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Боковая панель навигации (Sidebar) */}
      <aside className="w-full md:w-64 bg-zinc-900 text-white flex flex-col sticky top-0 md:h-screen z-20">
        <div className="p-6">
          <h2 className="font-display text-2xl text-[var(--gold)] tracking-wider">
            Панель управления
          </h2>
          <p className="text-xs text-white/50 mt-1">SEO Manager</p>
        </div>

        {/* Навигация (Клиентский компонент с подсветкой активного роута) */}
        <SidebarNav />

        <div className="p-4 mt-auto border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 transition-colors text-sm w-full"
          >
            <Globe className="w-4 h-4" />
            <span>На сайт</span>
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="cursor-pointer flex w-full items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Выйти</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Основной контент */}
      <main className="flex-1 p-4 md:p-8 md:max-h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
