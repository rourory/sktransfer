import type { Metadata } from "next";
import { getLocaleOnServer } from "@/lib/get-locale-on-server";
import { translations } from "@/lib/i18n";
import { ServicesSection } from "@/components/services-section";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleOnServer();
  const t = translations[locale].seo.services;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.description,
      url: "https://sktransfer.by/services",
      images: ["/og-image.webp"],
    },
    alternates: {
      canonical: "https://sktransfer.by/services",
    },
  };
}

export default async function ServicesPage() {
  const locale = await getLocaleOnServer();
  const t = translations[locale];

  // Хлебные крошки
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t.nav.home,
        item: "https://sktransfer.by",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t.nav.services,
        item: "https://sktransfer.by/services",
      },
    ],
  };

  // SEO Микроразметка для КАЖДОЙ услуги
  const servicesListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: t.services.items.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.details,
        provider: {
          "@type": "LocalBusiness",
          name: "SKTransfer",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesListSchema) }}
      />

      <main className="min-h-screen bg-gray-50 pb-20">
        {/* НОВЫЙ СТРОГИЙ HERO-БЛОК */}
        <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-zinc-950">
          <div
            className="absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage:
                "url('/mercedes-e-class-black-luxury-sedan-side-view-prof.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950" />

          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 gold-gradient-text tracking-tight">
              {t.services.title}
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg sm:text-xl">
              {t.seo.services.description}{" "}
              {/* Берем дескрипшн из SEO настроек */}
            </p>
          </div>
        </div>

        {/* ОСНОВНОЙ КОНТЕНТ (Услуги) */}
        <div className="container mx-auto px-4 relative z-20 mt-10">
          <ServicesSection locale={locale} />
        </div>

        {/* ПРАВИЛА (Стилизованные под премиум) */}
        <div className="max-w-4xl mx-auto mt-24 px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.rules.title}
            </h2>
            <div className="w-24 h-1 bg-[var(--gold)] mx-auto rounded-full" />
          </div>

          <Card className="p-8 sm:p-10 border border-gray-200 shadow-xl rounded-3xl bg-white">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                t.rules.rule1,
                t.rules.rule2,
                t.rules.rule3,
                t.rules.rule4,
                t.rules.rule5,
              ].map((rule, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <div className="p-2 bg-amber-50 rounded-lg flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[var(--gold)]" />
                  </div>
                  <span className="text-gray-700 leading-relaxed pt-1">
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </main>
    </>
  );
}
// import type { Metadata } from "next";
// import { getLocaleOnServer } from "@/lib/get-locale-on-server";
// import { translations } from "@/lib/i18n";
// import { ServicesSection } from "@/components/services-section";
// import { Card } from "@/components/ui/card";
// import { Check } from "lucide-react";

// export async function generateMetadata(): Promise<Metadata> {
//   const locale = await getLocaleOnServer();
//   const t = translations[locale].seo.services;

//   return {
//     title: t.title,
//     description: t.description,
//     keywords: t.keywords,
//     openGraph: {
//       title: t.title,
//       description: t.description,
//       url: "https://sktransfer.by/services",
//       images: ["/og-image.webp"],
//     },
//     alternates: {
//       canonical: "https://sktransfer.by/services",
//     },
//   };
// }

// export default async function ServicesPage() {
//   const locale = await getLocaleOnServer();
//   const t = translations[locale];

//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     itemListElement: [
//       {
//         "@type": "ListItem",
//         position: 1,
//         name: t.nav.home,
//         item: "https://sktransfer.by",
//       },
//       {
//         "@type": "ListItem",
//         position: 2,
//         name: t.pages.terms.title,
//         item: "https://sktransfer.by/terms",
//       },
//     ],
//   };

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
//       />
//       <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
//         <div className="relative py-32 overflow-hidden">
//           <div
//             className="absolute inset-0 z-0"
//             style={{
//               backgroundImage:
//                 "url('/mercedes-e-class-black-luxury-sedan-side-view-prof.webp')",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           >
//             <div className="absolute inset-0 bg-white/92" />
//           </div>

//           <div className="container relative z-10 mx-auto px-4">
//             <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-center mb-16 gold-gradient-text text-muted">
//               {t.services.title}
//             </h1>

//             <ServicesSection locale={locale} />

//             <div className="max-w-4xl mx-auto mt-20">
//               <h2 className="font-display text-4xl text-center mb-12 gold-gradient-text">
//                 {t.rules.title}
//               </h2>
//               <Card className="glass-effect p-8">
//                 <ul className="space-y-4">
//                   {[
//                     t.rules.rule1,
//                     t.rules.rule2,
//                     t.rules.rule3,
//                     t.rules.rule4,
//                     t.rules.rule5,
//                   ].map((rule, index) => (
//                     <li key={index} className="flex gap-4">
//                       <Check className="w-6 h-6 text-[var(--gold)] flex-shrink-0 mt-1" />
//                       <span className="text-foreground/80">{rule}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }
