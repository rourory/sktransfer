"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

type LanguageSwitcherProps = {};

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Locale; name: string; nativeName: string }[] = [
    { code: "ru", name: "Russian", nativeName: "Русский" },
    { code: "en", name: "English", nativeName: "English" },
    { code: "zh", name: "Chinese", nativeName: "中文" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center gap-2 text-white hover:bg-white/10 border border-white/10 hover:border-white/30 shadow-sm hover:shadow-lg transition-all h-9 px-3"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline text-sm">
          {currentLanguage?.nativeName}
        </span>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 min-w-[160px] bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`cursor-pointer w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                  locale === lang.code ? "bg-gray-100 font-medium" : ""
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {lang.nativeName}
                  </span>
                  <span className="text-xs text-gray-600">{lang.name}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
