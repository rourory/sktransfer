// app/contacts/page.tsx
import type { Metadata } from "next";
import { getLocaleOnServer } from "@/lib/get-locale-on-server";
import { translations } from "@/lib/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTelegram,
  faWhatsapp,
  faViber,
  faWeixin,
} from "@fortawesome/free-brands-svg-icons";
import { ContactForm } from "@/components/contact-form";

const BASE_URL = "https://sktransfer.by";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleOnServer();
  const t = translations[locale].seo.contacts;

  // Формируем URL с учетом GET-параметра ?lang=
  const canonicalUrl =
    locale === "ru"
      ? `${BASE_URL}/contacts`
      : `${BASE_URL}/contacts?lang=${locale}`;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      images: ["/og-image.webp"],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ru-BY": `${BASE_URL}/contacts`,
        "en-US": `${BASE_URL}/contacts?lang=en`,
        "zh-CN": `${BASE_URL}/contacts?lang=zh`,
        "x-default": `${BASE_URL}/contacts`,
      },
    },
  };
}

export default async function ContactsPage() {
  const locale = await getLocaleOnServer();
  const t = translations[locale];
  const tContact = t.contact;

  const pageUrl =
    locale === "ru"
      ? `${BASE_URL}/contacts`
      : `${BASE_URL}/contacts?lang=${locale}`;

  // Микроразметка LocalBusiness. Гугл обожает это для страниц контактов!
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness", // Или "Organization"
    name: "SK Transfer",
    image: `${BASE_URL}/og-image.webp`,
    url: pageUrl,
    telephone: "+375291228484",
    email: "info@sktransfer.by",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Minsk",
      addressCountry: "BY",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+375291228484",
      contactType: "customer service",
      availableLanguage: ["Russian", "English", "Chinese"],
    },
  };

  const messengers = [
    {
      name: "Telegram",
      url: "https://t.me/+375291228484",
      icon: faTelegram,
      color: "from-[#0088cc] to-[#0088cc]/80",
      hoverColor: "hover:shadow-[#0088cc]/50",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/375291228484",
      icon: faWhatsapp,
      color: "from-[#25D366] to-[#20b858]",
      hoverColor: "hover:shadow-[#25D366]/50",
    },
    {
      name: "Viber",
      url: "viber://chat?number=375291228484",
      icon: faViber,
      color: "from-[#7360f2] to-[#665ac8]",
      hoverColor: "hover:shadow-[#7360f2]/50",
    },
    {
      name: "WeChat",
      url: "weixin://",
      icon: faWeixin,
      color: "from-[#09B83E] to-[#07a037]",
      hoverColor: "hover:shadow-[#09B83E]/50",
    },
  ];

  return (
    <main className="relative min-h-screen py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(156 163 175) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* SEO Заголовок */}
          <header className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--gold)]/10 to-[var(--platinum)]/10 rounded-full mb-4">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-[var(--gold)] text-sm"
              />
              <span className="text-sm font-medium text-gray-700">
                {tContact.getInTouch}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-[var(--platinum)] bg-clip-text text-transparent">
                {tContact.title}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {tContact.subtitle}
            </p>
          </header>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Левая часть (Контакты) - рендерится на сервере мгновенно */}
            <div className="lg:col-span-2 space-y-6">
              <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold)]/80 flex items-center justify-center shadow-lg shadow-[var(--gold)]/20">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-white text-xl"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {tContact.phone}
                    </h2>
                    <a
                      href="tel:+375291228484"
                      className="text-xl font-bold text-gray-900 hover:text-[var(--gold)] transition-colors block"
                    >
                      +375 (29) 122-84-84
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      {tContact.country}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-white text-xl"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {tContact.email}
                    </h2>
                    <a
                      href="mailto:info@sktransfer.by"
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors break-all"
                    >
                      info@sktransfer.by
                    </a>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-white text-xl"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {tContact.address}
                    </h2>
                    <p className="text-lg font-semibold text-gray-900">
                      {tContact.city}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-[var(--gold)] to-[var(--gold)]/90 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-white text-xl"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2">
                      {tContact.workingHours}
                    </h2>
                    <p className="text-2xl font-bold text-white">24/7</p>
                    <p className="text-sm text-white/90 mt-1">
                      {tContact.everyDay}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faTelegram}
                    className="text-[var(--gold)]"
                  />
                  {tContact.messengers}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {messengers.map((messenger) => (
                    <a
                      key={messenger.name}
                      href={messenger.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br ${messenger.color} text-white hover:shadow-lg ${messenger.hoverColor} transition-all duration-300`}
                    >
                      <FontAwesomeIcon
                        icon={messenger.icon}
                        className="text-2xl group-hover:scale-110 transition-transform"
                      />
                      <span className="text-sm font-semibold">
                        {messenger.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Правая часть - Клиентская форма */}
            <div className="lg:col-span-3">
              <ContactForm formTranslations={tContact.form} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
