import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { translations } from "@/lib/i18n";
import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTelegram,
  faWhatsapp,
  faViber,
} from "@fortawesome/free-brands-svg-icons";
import { PhoneFooterLink } from "./phone-links/phone-footer-link";

export async function Footer() {
  const currentYear = new Date().getFullYear();

  const cookieStore = await cookies();
  const localeValue =
    cookieStore.get("NEXT_LOCALE")?.value ||
    cookieStore.get("locale")?.value ||
    "ru";

  const locale =
    localeValue === "en" || localeValue === "zh" ? localeValue : "ru";
  const t = translations[locale];

  const categories = await prisma.category.findMany({
    where: { showInFooter: true },
    select: { slug: true, nameRu: true, nameEn: true, nameZh: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <footer className="relative bg-gradient-to-b from-black/70 via-gray-900/80 to-black/90 border-t border-white/10 overflow-hidden backdrop-blur-sm">
      <div className="absolute top-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-white/5 rounded-full blur-[80px] sm:blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-white/3 rounded-full blur-[80px] sm:blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4 sm:mb-6 group relative">
              <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 240 100"
                className="h-24 sm:h-28 w-auto relative drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                width="240"
                height="100"
              >
                <defs>
                  <linearGradient
                    id="whiteGradientFooter"
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
                  <filter id="glowFooter">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <text
                  x="120"
                  y="50"
                  fontFamily="'Times New Roman', serif"
                  fontSize="52"
                  fontWeight="bold"
                  fill="url(#whiteGradientFooter)"
                  filter="url(#glowFooter)"
                  textAnchor="middle"
                >
                  SK
                </text>
                <text
                  x="120"
                  y="75"
                  fontFamily="'Times New Roman', serif"
                  fontSize="16"
                  fontWeight="normal"
                  fill="url(#whiteGradientFooter)"
                  letterSpacing="4"
                  textAnchor="middle"
                >
                  TRANSFER
                </text>
              </svg>
            </Link>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6 max-w-md">
              {locale === "ru"
                ? "Премиум трансфер по Беларуси, России и Европе. Профессиональные водители, комфортабельные автомобили, индивидуальный подход к каждому клиенту."
                : locale === "en"
                  ? "Premium transfer in Belarus, Russia and Europe. Professional drivers, comfortable cars, individual approach to each client."
                  : "白俄罗斯、俄罗斯和欧洲的高级接送服务。专业司机，舒适汽车，为每位客户提供个性化服务。"}
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="https://t.me/+375291228484"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg transition-all shadow-lg shadow-white/5 hover:shadow-xl hover:shadow-white/10 hover:scale-110"
              >
                <FontAwesomeIcon
                  icon={faTelegram}
                  className="text-white text-lg sm:text-xl drop-shadow-md"
                />
              </a>
              <a
                href="https://wa.me/375291228484"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg transition-all shadow-lg shadow-white/5 hover:shadow-xl hover:shadow-white/10 hover:scale-110"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="text-white text-lg sm:text-xl drop-shadow-md"
                />
              </a>
              <a
                href="viber://chat?number=375291228484"
                className="p-2 sm:p-2.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg transition-all shadow-lg shadow-white/5 hover:shadow-xl hover:shadow-white/10 hover:scale-110"
              >
                <FontAwesomeIcon
                  icon={faViber}
                  className="text-white text-lg sm:text-xl drop-shadow-md"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 drop-shadow-md">
              {locale === "ru"
                ? "Навигация"
                : locale === "en"
                  ? "Navigation"
                  : "导航"}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: "/", label: t.nav.home },
                { href: "/calculator", label: t.nav.calculator },
                { href: "/services", label: t.nav.services },
                { href: "/fleet", label: t.nav.fleet },
                { href: "/guides", label: t.nav.guides },
                { href: "/excursions", label: t.nav.resorts },
                { href: "/contacts", label: t.nav.contacts },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-all flex items-center gap-2 group hover:translate-x-1"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-white shadow-[0_0_4px_rgba(255,255,255,0.5)] transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Блог Категории (Из Базы Данных) */}
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 drop-shadow-md">
              {locale === "ru" ? "Блог" : locale === "en" ? "Blog" : "博客"}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {categories.map((cat) => {
                const name =
                  locale === "ru"
                    ? cat.nameRu
                    : locale === "en"
                      ? cat.nameEn
                      : cat.nameZh;

                return (
                  <li key={cat.slug}>
                    <Link
                      href={`/blog/${cat.slug}`}
                      className="text-gray-300 hover:text-white transition-all flex items-center gap-2 group hover:translate-x-1"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[var(--gold)] shadow-[0_0_4px_rgba(212,175,55,0.5)] transition-all" />
                      {name}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Link
                  href="/blog"
                  className="text-[var(--gold)] font-medium hover:text-yellow-400 transition-all flex items-center gap-2 group hover:translate-x-1"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[var(--gold)] transition-all" />
                  {locale === "ru"
                    ? "Все статьи →"
                    : locale === "en"
                      ? "All articles →"
                      : "所有文章 →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 drop-shadow-md">
              {locale === "ru"
                ? "Контакты"
                : locale === "en"
                  ? "Contacts"
                  : "联系方式"}
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <PhoneFooterLink
                  className="flex items-start gap-3 text-gray-300 hover:text-white transition-all group"
                  label={
                    locale === "ru"
                      ? "Беларусь"
                      : locale === "en"
                        ? "Belarus"
                        : "白俄罗斯"
                  }
                  phoneNumber="+375291228484"
                  displayPhoneNumber="+375 (29) 122-84-84"
                />
              </li>
              <li>
                <a
                  href="mailto:info@sktransfer.by"
                  className="flex items-start gap-3 text-gray-300 hover:text-white transition-all group"
                >
                  <div className="p-2 bg-white/10 border border-white/20 rounded-lg group-hover:bg-white/20 group-hover:border-white/40 transition-all shadow-lg shadow-white/5">
                    <Mail className="h-4 w-4 text-white drop-shadow-md" />
                  </div>
                  <span className="text-sm font-medium">
                    info@sktransfer.by
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 sm:pt-8 mt-6 sm:mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-300">
            <div className="text-center md:text-left">
              © {currentYear} SKTransfer.by.{" "}
              {locale === "ru"
                ? "Все права защищены"
                : locale === "en"
                  ? "All rights reserved"
                  : "版权所有"}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 items-center">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center text-center">
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  {locale === "ru"
                    ? "Политика конфиденциальности"
                    : locale === "en"
                      ? "Privacy Policy"
                      : "隐私政策"}
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  {locale === "ru"
                    ? "Условия использования"
                    : locale === "en"
                      ? "Terms of Use"
                      : "使用条款"}
                </Link>
              </div>
              <a
                href="https://netnext.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:text-white transition-colors text-center"
              >
                Designed And Developed by{" "}
                <span className="font-semibold">NetNext Studio</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
