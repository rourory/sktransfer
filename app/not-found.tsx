"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Animated background lines */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent animate-fade-in" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent animate-fade-in animation-delay-200" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent animate-fade-in animation-delay-400" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* 404 Number with gradient */}
          <div className="relative mb-8">
            <h1 className="text-[10rem] font-bold leading-none tracking-tighter text-gold md:text-[16rem] lg:text-[20rem]">
              404
            </h1>
            <div className="absolute inset-0 bg-gradient-to-b from-gold-light to-gold opacity-50 blur-3xl" />
          </div>

          {/* Car icon animation */}
          <div
            className={`mb-8 transform transition-all duration-1000 delay-300 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          >
            <svg
              className="mx-auto h-20 w-20 text-gold"
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

          {/* Text content */}
          <div
            className={`transform transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl">Маршрут не найден</h2>
            <p className="mb-8 text-lg text-gray-400 md:text-xl">
              Похоже, вы свернули не туда. Давайте вернемся на правильный путь.
            </p>
          </div>

          {/* Action buttons */}
          <div
            className={`flex flex-col gap-4 sm:flex-row sm:justify-center transform transition-all duration-1000 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gold px-8 py-6 text-lg font-semibold text-black transition-all hover:bg-gold-light hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            >
              <Link href="/">
                <span className="relative z-10">Вернуться на главную</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="gold-gradient font-semibold shadow-lg shadow-[var(--gold)]/30 hover:shadow-xl hover:shadow-[var(--gold)]/40 transition-all"
            >
              <Link href="/contacts">
                <Sparkles className="h-5 w-5 mr-2" />
                Контакты
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative road line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent transform transition-all duration-1000 delay-1000 ${
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
  )
}
