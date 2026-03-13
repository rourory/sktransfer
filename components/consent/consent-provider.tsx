"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Cookies from "js-cookie";

type ConsentShape = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

type ConsentContextShape = {
  consent: ConsentShape;
  setConsent: (c: ConsentShape) => void;
  acceptAll: () => void;
  declineAll: () => void;
};

const COOKIE_NAME = "site_consent_v2";
const COOKIE_OPTIONS = {
  expires: 365,
  path: "/",
  sameSite: "Lax",
} as const;

const defaultConsent: ConsentShape = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const ConsentContext = createContext<ConsentContextShape | null>(null);

export const useConsent = (): ConsentContextShape => {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
};

function readConsentFromCookie(): ConsentShape | null {
  try {
    const raw = Cookies.get(COOKIE_NAME);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentShape;
  } catch {
    return null;
  }
}

function writeConsentToCookie(c: ConsentShape) {
  Cookies.set(COOKIE_NAME, JSON.stringify(c), COOKIE_OPTIONS);
}

/* ----------------- analytics loaders ----------------- */
/* Обратите внимание: ниже — стандартные snippets, их можно адаптировать.
   Для Yandex: вставляется официальный snippet с ym(...).
   Для Google: стандартный gtag snippet. */

function injectScriptOnce(id: string, src?: string, inline?: string) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  if (src) {
    s.src = src;
    s.async = true;
  }
  if (inline) {
    s.text = inline;
  }
  document.head.appendChild(s);
}

function loadYandexMetrika(counterId: number) {
  if (typeof window === "undefined") return;
  if ((window as any).ym) return;

  const script = document.createElement("script");
  script.innerHTML = `
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      k=e.createElement(t),a=e.getElementsByTagName(t)[0];
      k.async=1;
      k.src=r;
      a.parentNode.insertBefore(k,a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(${counterId}, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
      webvisor:false
    });
  `;
  document.head.appendChild(script);
}

function loadGtag(gaId?: string) {
  if (!gaId) return;
  // Подключаем библиотеку
  injectScriptOnce(
    `gtag-lib-${gaId}`,
    `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
  );
  // Инициализация
  const inline = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}', { anonymize_ip: true });`;
  injectScriptOnce(`gtag-init-${gaId}`, undefined, inline);
}

/* ----------------- component ----------------- */

export default function ConsentProvider({
  children,
  yandexId,
  gaId,
}: {
  children: ReactNode;
  yandexId?: number | string; // optional, можно передать из env
  gaId?: string;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [consent, setConsentState] = useState<ConsentShape>(defaultConsent);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = readConsentFromCookie();
    if (stored) {
      setConsentState({ ...defaultConsent, ...stored });
      // Если analytics разрешены — загружаем
      if (stored.analytics) {
        if (yandexId) loadYandexMetrika(Number(yandexId));
        if (gaId) loadGtag(gaId);
      }
    } else {
      // нет cookie — показываем баннер
      setShowBanner(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Сниппет — безопасная запись
  const setConsent = (c: ConsentShape) => {
    setConsentState(c);
    writeConsentToCookie(c);
  };

  const acceptAll = () => {
    const c: ConsentShape = {
      ...defaultConsent,
      analytics: true,
      marketing: true,
    };
    setConsent(c);
    // Защита от submit: временно перехватываем submit в capture фазе
    preventSubmitTemporarily();
    // Загружаем аналитики
    if (yandexId) loadYandexMetrika(Number(yandexId));
    if (gaId) loadGtag(gaId);
    setShowBanner(false);
    setShowModal(false);
  };

  const declineAll = () => {
    const c: ConsentShape = {
      ...defaultConsent,
      analytics: false,
      marketing: false,
    };
    setConsent(c);
    preventSubmitTemporarily();
    // не грузим ничего
    setShowBanner(false);
    setShowModal(false);
  };

  /* Если пользователь открывает настройки и подтверждает частично */
  const saveSettings = (partial: {
    analytics: boolean;
    marketing: boolean;
  }) => {
    const c: ConsentShape = { ...defaultConsent, ...partial };
    setConsent(c);
    preventSubmitTemporarily();
    if (c.analytics) {
      if (yandexId) loadYandexMetrika(Number(yandexId));
      if (gaId) loadGtag(gaId);
    }
    setShowBanner(false);
    setShowModal(false);
  };

  const value: ConsentContextShape = {
    consent,
    setConsent,
    acceptAll,
    declineAll,
  };

  if (!isMounted) return <>{children}</>;

  /* ------------------ banner (portal) ------------------ */
  const banner = showBanner ? (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-50 transform transition-all duration-500 ease-out animate-[fadeInUp_.5s_ease]"
    >
      <div className="bg-white/95 backdrop-blur-xl border border-gray-200/80 rounded-2xl shadow-2xl p-5 sm:p-6 md:p-7">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-8">
          <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-100 to-yellow-200 flex items-center justify-center shadow-inner">
              {/* icon */}
              <svg
                className="w-6 h-6 text-amber-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Мы используем cookies для аналитики и персонализации.{" "}
              <span className="block mt-1.5 text-sm text-gray-500">
                Вы можете принять все или настроить выборочно.
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0 mt-4 sm:mt-0">
            <button
              type="button"
              onClick={(e) => {
                stopEventSafe(e);
                acceptAll();
              }}
              className="cursor-pointer px-7 py-3.5 rounded-full font-medium text-white bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:brightness-110 hover:shadow-xl active:scale-95 transition-all duration-300 shadow-md whitespace-nowrap"
            >
              Принять всё
            </button>

            <button
              type="button"
              onClick={(e) => {
                stopEventSafe(e);
                setShowModal(true);
              }}
              className="cursor-pointer px-6 py-3 rounded-full font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-300"
            >
              Настроить
            </button>

            <button
              type="button"
              onClick={(e) => {
                stopEventSafe(e);
                declineAll();
              }}
              className="cursor-pointer px-5 py-3 rounded-full font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 active:scale-95 transition-all duration-300"
            >
              Отказаться
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  /* ------------------ modal (simple) ------------------ */
  const modal = showModal ? (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setShowModal(false)}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl z-70">
        <h3 className="text-lg font-semibold mb-3">Настройки cookie</h3>
        <p className="text-sm text-gray-600 mb-4">
          Выберите, какие категории вы разрешаете:
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Необходимые</div>
              <div className="text-sm text-gray-500">
                Обязательно для работы сайта
              </div>
            </div>
            <div className="text-sm text-gray-500">Включено</div>
          </div>

          <ToggleRow
            title="Аналитика"
            description="Помогает улучшать сайт"
            checked={consent.analytics}
            onChange={(checked) =>
              setConsentState({ ...consent, analytics: checked })
            }
          />

          <ToggleRow
            title="Маркетинг"
            description="Персонализация и реклама"
            checked={consent.marketing}
            onChange={(checked) =>
              setConsentState({ ...consent, marketing: checked })
            }
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setShowModal(false);
              setConsentState(readConsentFromCookie() ?? defaultConsent);
            }}
            className="px-4 py-2 rounded-md border"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={() => {
              saveSettings({
                analytics: consent.analytics,
                marketing: consent.marketing,
              });
            }}
            className="px-5 py-2 rounded-md bg-amber-500 text-white"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  ) : null;

  // portal render for both banner and modal
  const portal =
    typeof document !== "undefined"
      ? createPortal(
          <>
            {banner}
            {modal}
          </>,
          document.body,
        )
      : null;

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {portal}
    </ConsentContext.Provider>
  );
}

/* ----------------- helpers ----------------- */

function stopEventSafe(e: React.MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  // @ts-ignore
  if (
    e.nativeEvent &&
    typeof e.nativeEvent.stopImmediatePropagation === "function"
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    e.nativeEvent.stopImmediatePropagation();
  }
  // дополнительно: временно перехватим submit в capture, если вдруг кнопка внутри формы
  preventSubmitTemporarily();
}

function preventSubmitTemporarily(timeout = 500) {
  if (typeof document === "undefined") return;
  const onSubmit = (ev: Event) => {
    try {
      ev.preventDefault();
      ev.stopImmediatePropagation();
    } catch {}
  };
  document.addEventListener("submit", onSubmit, true); // capture = true
  setTimeout(
    () => document.removeEventListener("submit", onSubmit, true),
    timeout,
  );
}

/* ----------------- small ToggleRow component ----------------- */

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span
          className={`w-11 h-6 rounded-full ${checked ? "bg-amber-500" : "bg-gray-300"} block`}
        />
      </label>
    </div>
  );
}
