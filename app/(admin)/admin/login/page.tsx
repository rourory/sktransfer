// app/admin/login/page.tsx
"use client";

import { useState, useTransition } from "react";
import { login } from "../actions";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError("");
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-amber-50/30 to-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl gold-gradient-text">
            SKTransfer
          </h1>
          <p className="text-foreground/60 mt-2">Панель управления</p>
        </div>

        <Card className="glass-effect p-8 border-white/40">
          <form action={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Пароль администратора
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-all"
                  placeholder="Введите пароль..."
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[var(--gold)] text-white py-3 rounded-md hover:bg-yellow-600 transition-colors font-medium disabled:opacity-70"
            >
              {isPending ? "Вход..." : "Войти"}
            </button>
          </form>
        </Card>
      </div>
    </main>
  );
}
