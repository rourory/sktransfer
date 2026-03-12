"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { translations } from "@/lib/i18n";
import { useLanguage } from "@/lib/language-context";
import { Menu, X, Sparkles, Phone } from "lucide-react";
import { ContactModal } from "./contact-modal";
import { MobileMenuModal } from "./mobile-menu-modal";

export function Header() {
  const { locale, setLocale } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const t = translations[locale] || translations.ru;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/calculator", label: t.nav.calculator },
    { href: "/services", label: t.nav.services },
    { href: "/fleet", label: t.nav.fleet },
    { href: "/guides", label: t.nav.guides },
    { href: "/excursions", label: t.nav.resorts },
    { href: "/blog", label: t.nav.blog },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-muted ${
          scrolled
            ? "bg-gradient-to-r from-black/80 via-gray-900/85 to-black/80 backdrop-blur-xl border-b border-white/20 shadow-xl shadow-black/20"
            : "bg-gradient-to-r from-black/60 via-gray-900/65 to-black/60 backdrop-blur-md border-b border-white/10"
        }`}
      >
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link
              href="/"
              className="group flex items-center gap-2 sm:gap-3 relative"
            >
              <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative h-12 sm:h-16 md:h-20 w-32 sm:w-40 md:w-48 flex items-center justify-center drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 70"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                >
                  <defs>
                    <linearGradient
                      id="whiteGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#ffffff", stopOpacity: 1 }}
                      />
                      <stop
                        offset="50%"
                        style={{ stopColor: "#f5f5f5", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#e8e8e8", stopOpacity: 1 }}
                      />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <text
                    x="100"
                    y="38"
                    fontFamily="'Times New Roman', serif"
                    fontSize="42"
                    fontWeight="bold"
                    fill="url(#whiteGradient)"
                    filter="url(#glow)"
                    textAnchor="middle"
                  >
                    SK
                  </text>
                  <text
                    x="100"
                    y="58"
                    fontFamily="'Times New Roman', serif"
                    fontSize="14"
                    fontWeight="normal"
                    fill="url(#whiteGradient)"
                    letterSpacing="3"
                    textAnchor="middle"
                  >
                    TRANSFER
                  </text>
                </svg>
              </div>
            </Link>

            <nav className="hidden xl:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all relative group px-1 ${
                    pathname === link.href
                      ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                      : "text-gray-300 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300 ${
                      pathname === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-4 ml-8">
              <Button
                onClick={() => setContactModalOpen(true)}
                size="sm"
                className="cursor-pointer md:hidden flex items-center gap-2 bg-white text-gray-900 font-semibold hover:bg-gray-100 border border-white/30 shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 h-9 px-3"
              >
                <Phone className="h-4 w-4" />
              </Button>

              <Button
                onClick={() => setContactModalOpen(true)}
                className="hidden lg:flex items-center gap-2 bg-white text-gray-900 font-semibold hover:bg-gray-100 border border-white/30 shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 h-10 px-4 lg:px-6"
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-sm lg:text-base">{t.nav.contacts}</span>
              </Button>
              <LanguageSwitcher
                // currentLocale={locale}
                // onLocaleChange={setLocale}
              />

              <Button
                variant="ghost"
                size="sm"
                className="xl:hidden text-white hover:bg-white/10 border border-white/10 hover:border-white/30 shadow-sm hover:shadow-lg transition-all h-9 w-9 p-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenuModal
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        locale={locale}
        onLocaleChange={setLocale}
        onContactClick={() => setContactModalOpen(true)}
      />

      <ContactModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        locale={locale}
      />
    </>
  );
}
