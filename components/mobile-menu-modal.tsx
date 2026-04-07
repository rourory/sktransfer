"use client";

import { type Locale, translations } from "@/lib/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Phone,
  Mail,
  MapPin,
  Calculator,
  Car,
  Users,
  Mountain,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { PhoneMobileMenuLink } from "./phone-links/phone-mobile-menu-link";
import { PhoneLink } from "./phone-links/phone-link";

interface MobileMenuModalProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onContactClick: () => void;
}

export function MobileMenuModal({
  open,
  onClose,
  locale,
  onLocaleChange,
  onContactClick,
}: MobileMenuModalProps) {
  const t = translations[locale] || translations.ru;
  const pathname = usePathname();

  if (!open) return null;

  const navLinks = [
    { href: "/", label: t.nav.home, icon: Sparkles },
    { href: "/calculator", label: t.nav.calculator, icon: Calculator },
    { href: "/services", label: t.nav.services, icon: Car },
    { href: "/fleet", label: t.nav.fleet, icon: Car },
    { href: "/guides", label: t.nav.guides, icon: Users },
    { href: "/excursions", label: t.nav.resorts, icon: Mountain },
  ];

  const handleLinkClick = () => {
    onClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactClick = () => {
    onClose();
    onContactClick();
  };

  return (
    <div className="fixed inset-0 z-[100] xl:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="absolute inset-0 dark-gradient overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-right-4 justify-center mb-8">
            {/* Updated logo without PREMIUM SERVICE */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 70"
              className="w-auto drop-shadow-[0_0_15px_rgba(244,229,176,0.3)] mx-6 px-0 h-14"
            >
              <defs>
                <linearGradient
                  id="goldGradientMenu"
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
                <filter id="glowMenu">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <text
                className=""
                x="100"
                y="38"
                fontFamily="'Times New Roman', serif"
                fontSize="42"
                fontWeight="bold"
                fill="url(#whiteGradient)"
                textAnchor="middle"
                filter="url(#glowMenu)"
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

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-10 w-10 p-0 hover:bg-white/10 rounded-full text-white border border-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Updated Navigation Links */}
          <nav className="space-y-2 mb-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    isActive
                      ? "border-[var(--gold)] bg-gradient-to-r from-[var(--gold)]/20 to-[var(--gold)]/10 box-shadow-gold"
                      : "border-white/10 hover:border-[var(--gold)]/50 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-all ${
                        isActive
                          ? "gold-gradient text-white shadow-lg shadow-[var(--gold)]/30"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`font-medium ${isActive ? "text-[var(--gold-light)]" : "text-white"}`}
                    >
                      {link.label}
                    </span>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 ${isActive ? "text-[var(--gold)]" : "text-white/50"}`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Updated Quick Actions */}
          <div className="space-y-3 mb-8">
            <Button
              onClick={handleContactClick}
              className="cursor-pointer w-full gold-gradient font-semibold h-12 text-base shadow-lg shadow-[var(--gold)]/30 hover:shadow-xl hover:shadow-[var(--gold)]/40 transition-all text-muted"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              {t.nav.contacts}
            </Button>

            <PhoneMobileMenuLink
              className="block"
              phoneNumber="+375291228484"
              displayPhoneNumber="+375 (29) 122-84-84"
            />
          </div>

          {/* Updated Contact Info */}
          <div className="glass-effect-dark rounded-xl p-5 mb-6 border border-[var(--gold)]/20 box-shadow-gold">
            <h3 className="font-semibold mb-4 text-sm text-[var(--gold-light)] uppercase tracking-wider">
              {t.contact.title}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-white/90">
                  <PhoneLink
                    phoneNumber="+375291228484"
                    displayPhoneNumber="+375 (29) 122-84-84"
                    className="hover:text-(--gold-light) transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-white/90">
                  <a
                    href="mailto:info@sktransfer.by"
                    className="hover:text-[var(--gold-light)] transition-colors break-all"
                  >
                    info@sktransfer.by
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-white/90">
                  {locale === "ru" && "Минск, Беларусь"}
                  {locale === "en" && "Minsk, Belarus"}
                  {locale === "zh" && "明斯克，白俄罗斯"}
                </div>
              </div>
            </div>
          </div>

          {/* Updated Language Switcher */}
          <div className="flex items-center justify-between p-4 glass-effect-dark rounded-xl border border-white/10">
            <span className="text-sm font-medium text-white/80">
              {locale === "ru" && "Язык"}
              {locale === "en" && "Language"}
              {locale === "zh" && "语言"}
            </span>
            <LanguageSwitcher />
          </div>

          {/* Updated Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/60">
              © 2008-2025 SK Transfer. {t.footer.rights}
            </p>
            <p className="text-xs text-white/60 mt-1">
              Designed And Developed by{" "}
              <a
                href="https://netnext.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--gold-light)] hover:text-[var(--gold)] transition-colors"
              >
                NetNext Studio
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
