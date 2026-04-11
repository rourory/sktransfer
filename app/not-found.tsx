"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Home } from "lucide-react";

// Тип для наших частиц
interface Particle {
  left: string;
  top: string;
  duration: string;
  delay: string;
}

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Генерируем рандомные частицы ТОЛЬКО на клиенте,
    // чтобы избежать ошибки Hydration Mismatch
    const generatedParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 10}s`,
      delay: `${Math.random() * 5}s`,
    }));

    setParticles(generatedParticles);
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950">
      {/* Анимированные фоновые линии */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-[var(--gold)]/20 to-transparent animate-fade-in" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-[var(--gold)]/30 to-transparent animate-fade-in animation-delay-200" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-[var(--gold)]/20 to-transparent animate-fade-in animation-delay-400" />
      </div>

      {/* Летающие частицы (теперь рендерятся без ошибок) */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[var(--gold)]/40 shadow-[0_0_10px_var(--gold)]"
            style={{
              left: p.left,
              top: p.top,
              animation: `float ${p.duration} ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Основной контент */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Цифры 404 */}
          <div className="relative mb-4 sm:mb-8">
            <h1 className="text-[8rem] sm:text-[10rem] font-bold leading-none tracking-tighter gold-gradient-text md:text-[16rem] lg:text-[20rem]">
              404
            </h1>
            <div className="absolute inset-0 bg-gradient-to-b from-amber-400 to-[var(--gold)] opacity-20 blur-3xl" />
          </div>

          {/* Иконка машинки */}
          <div
            className={`mb-8 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <svg
              className="mx-auto h-16 w-16 sm:h-20 sm:w-20 text-[var(--gold)] drop-shadow-[0_0_15px_rgba(217,119,6,0.3)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </div>

          {/* Текст */}
          <div
            className={`transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl">
              Маршрут не найден
            </h2>
            <p className="mb-10 text-base sm:text-lg text-gray-400 md:text-xl max-w-xl mx-auto">
              Похоже, вы свернули не туда. Данной страницы не существует, но мы
              с радостью отвезем вас по любому другому маршруту.
            </p>
          </div>

          {/* КНОПКИ */}
          <div
            className={`flex flex-col gap-4 sm:flex-row sm:justify-center transform transition-all duration-1000 delay-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {/* Кнопка 1: Главная (Залитая золотая) */}
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden gold-gradient px-8 py-6 text-base sm:text-lg font-semibold text-white transition-all hover:opacity-90 hover:shadow-[0_0_30px_rgba(217,119,6,0.4)]"
            >
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                <span className="relative z-10">На главную</span>
              </Link>
            </Button>

            {/* Кнопка 2: Контакты (Прозрачная с золотой рамкой) */}
            <Button
              asChild
              size="lg"
              className="group border-2 border-[var(--gold)] bg-transparent px-8 py-6 text-base sm:text-lg font-semibold text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all"
            >
              <Link href="/contacts">
                <Sparkles className="h-5 w-5 mr-2" />
                Контакты
              </Link>
            </Button>
          </div>
        </div>

        {/* Декоративная линия дороги */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent transform transition-all duration-1000 delay-1000 ${
            isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-100vh) translateX(50px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 2s ease-in-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
