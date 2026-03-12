import type { Metadata } from "next"
import { cookies } from "next/headers"
import { type Locale, translations } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Политика конфиденциальности | SK Transfer - Премиум трансфер по Беларуси",
  description:
    "Политика конфиденциальности SK Transfer. Информация о сборе, использовании и защите персональных данных клиентов.",
  keywords: "политика конфиденциальности, защита данных, персональные данные, SK Transfer, трансфер Беларусь",
  openGraph: {
    title: "Политика конфиденциальности | SK Transfer",
    description: "Политика конфиденциальности и защиты персональных данных SK Transfer",
    type: "website",
  },
}

export default async function PrivacyPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get("locale")?.value as Locale) || "ru"
  const t = translations[locale]

  const content = {
    ru: {
      title: "Политика конфиденциальности",
      updated: "Последнее обновление",
      sections: [
        {
          title: "1. Общие положения",
          content: [
            "Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта sktransfer.by (далее — Сайт) компанией SK Transfer (далее — Компания).",
            "Используя Сайт, вы соглашаетесь с условиями настоящей Политики конфиденциальности. Если вы не согласны с условиями, пожалуйста, не используйте Сайт.",
          ],
        },
        {
          title: "2. Сбор персональных данных",
          content: [
            "Мы собираем следующие категории персональных данных:",
            "- Имя и фамилия",
            "- Контактный телефон",
            "- Адрес электронной почты",
            "- Адреса отправления и назначения",
            "- Дата и время поездки",
            "- Технические данные (IP-адрес, тип браузера, операционная система)",
          ],
        },
        {
          title: "3. Цели обработки данных",
          content: [
            "Мы используем ваши персональные данные для следующих целей:",
            "- Предоставление услуг трансфера",
            "- Обработка заказов и бронирований",
            "- Связь с клиентами по вопросам заказов",
            "- Улучшение качества услуг",
            "- Выполнение договорных обязательств",
            "- Соблюдение требований законодательства",
          ],
        },
        {
          title: "4. Защита персональных данных",
          content: [
            "Мы применяем технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения. К таким мерам относятся:",
            "- Шифрование данных при передаче (SSL/TLS)",
            "- Ограниченный доступ к персональным данным",
            "- Регулярное резервное копирование",
            "- Обучение сотрудников правилам обработки данных",
          ],
        },
        {
          title: "5. Передача данных третьим лицам",
          content: [
            "Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением случаев, необходимых для оказания услуг (например, передача данных водителям для выполнения заказа) или требуемых законодательством.",
          ],
        },
        {
          title: "6. Файлы cookie",
          content: [
            "Наш Сайт использует файлы cookie для улучшения пользовательского опыта, анализа посещаемости и функционирования сервисов. Вы можете настроить свой браузер для отклонения файлов cookie, но это может ограничить функциональность Сайта.",
          ],
        },
        {
          title: "7. Ваши права",
          content: [
            "Вы имеете право:",
            "- Получать информацию о ваших персональных данных, которые мы обрабатываем",
            "- Требовать исправления неточных данных",
            "- Требовать удаления ваших персональных данных",
            "- Отозвать согласие на обработку данных",
            "- Подать жалобу в контролирующий орган",
          ],
        },
        {
          title: "8. Срок хранения данных",
          content: [
            "Мы храним ваши персональные данные только в течение срока, необходимого для достижения целей обработки или в соответствии с требованиями законодательства. После истечения этого срока данные удаляются или обезличиваются.",
          ],
        },
        {
          title: "9. Изменения в Политике конфиденциальности",
          content: [
            "Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Все изменения публикуются на данной странице. Рекомендуем периодически проверять эту страницу для ознакомления с актуальной версией Политики.",
          ],
        },
        {
          title: "10. Контактная информация",
          content: [
            "Если у вас есть вопросы относительно настоящей Политики конфиденциальности или обработки ваших персональных данных, пожалуйста, свяжитесь с нами:",
            "- Email: info@sktransfer.by",
            "- Телефон: +375 (29) 122-84-84",
            "- Адрес: Республика Беларусь, г. Минск",
          ],
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      updated: "Last updated",
      sections: [
        {
          title: "1. General Provisions",
          content: [
            "This Privacy Policy defines the procedure for processing and protecting personal data of users of the sktransfer.by website (hereinafter referred to as the Site) by SK Transfer company (hereinafter referred to as the Company).",
            "By using the Site, you agree to the terms of this Privacy Policy. If you do not agree with the terms, please do not use the Site.",
          ],
        },
        {
          title: "2. Collection of Personal Data",
          content: [
            "We collect the following categories of personal data:",
            "- Name and surname",
            "- Contact phone number",
            "- Email address",
            "- Pickup and drop-off addresses",
            "- Travel date and time",
            "- Technical data (IP address, browser type, operating system)",
          ],
        },
        {
          title: "3. Purposes of Data Processing",
          content: [
            "We use your personal data for the following purposes:",
            "- Providing transfer services",
            "- Processing orders and reservations",
            "- Contacting clients regarding order questions",
            "- Improving the quality of services",
            "- Fulfilling contractual obligations",
            "- Adhering to legal requirements",
          ],
        },
        {
          title: "4. Protection of Personal Data",
          content: [
            "We apply technical and organizational measures to protect your personal data from unauthorized access, modification, disclosure, or destruction. Such measures include:",
            "- Data encryption during transmission (SSL/TLS)",
            "- Limited access to personal data",
            "- Regular data backups",
            "- Training employees on data processing rules",
          ],
        },
        {
          title: "5. Transfer of Data to Third Parties",
          content: [
            "We do not sell or transfer your personal data to third parties except in cases necessary for providing services (e.g., transferring data to drivers to fulfill an order) or required by law.",
          ],
        },
        {
          title: "6. Cookies",
          content: [
            "Our Site uses cookies to enhance user experience, analyze website traffic, and improve service functionality. You can configure your browser to reject cookies, but this may limit the functionality of the Site.",
          ],
        },
        {
          title: "7. Your Rights",
          content: [
            "You have the right to:",
            "- Request information about your personal data that we process",
            "- Demand correction of inaccurate data",
            "- Demand deletion of your personal data",
            "- Withdraw consent to data processing",
            "- Submit a complaint to the supervisory authority",
          ],
        },
        {
          title: "8. Data Storage Period",
          content: [
            "We retain your personal data only for the duration necessary to achieve processing purposes or in accordance with legal requirements. After this period expires, the data is deleted or anonymized.",
          ],
        },
        {
          title: "9. Changes to the Privacy Policy",
          content: [
            "We reserve the right to make changes to this Privacy Policy. All changes are published on this page. We recommend periodically checking this page to familiarize yourself with the current version of the Policy.",
          ],
        },
        {
          title: "10. Contact Information",
          content: [
            "If you have any questions regarding this Privacy Policy or the processing of your personal data, please contact us:",
            "- Email: info@sktransfer.by",
            "- Phone: +375 (29) 122-84-84",
            "- Address: Republic of Belarus, Minsk",
          ],
        },
      ],
    },
    zh: {
      title: "隐私政策",
      updated: "最后更新",
      sections: [
        {
          title: "1. 一般规定",
          content: [
            "本隐私政策规定了SK Transfer公司处理和保护sktransfer.by网站用户个人数据的程序。",
            "使用本网站即表示您同意本隐私政策的条款。如果您不同意这些条款，请不要使用本网站。",
          ],
        },
        {
          title: "2. 收集个人信息",
          content: [
            "我们收集以下类别的个人信息：",
            "- 名字和姓氏",
            "- 联系电话号码",
            "- 电子邮件地址",
            "- 接送和下送地址",
            "- 旅行日期和时间",
            "- 技术数据（IP地址，浏览器类型，操作系统）",
          ],
        },
        {
          title: "3. 数据处理目的",
          content: [
            "我们使用您的个人信息用于以下目的：",
            "- 提供运输服务",
            "- 处理订单和预订",
            "- 关于订单问题联系客户",
            "- 提高服务质量",
            "- 履行合同义务",
            "- 遵守法律规定",
          ],
        },
        {
          title: "4. 个人信息保护",
          content: [
            "我们采取技术措施和组织措施来保护您的个人信息免受未经授权的访问，修改，披露或销毁。这些措施包括：",
            "- 传输期间的数据加密（SSL/TLS）",
            "- 个人信息的有限访问",
            "- 定期数据备份",
            "- 员工培训数据处理规则",
          ],
        },
        {
          title: "5. 向第三方传输数据",
          content: [
            "我们不向第三方出售或传输您的个人信息，除非出于提供服务的必要（例如，将数据传输给司机以完成订单）或法律规定。",
          ],
        },
        {
          title: "6. Cookie",
          content: [
            "我们的网站使用Cookie来增强用户体验，分析网站流量，并提高服务功能。您可以配置浏览器以拒绝Cookie，但这可能会限制网站的功能。",
          ],
        },
        {
          title: "7. 您的权利",
          content: [
            "您有权利：",
            "- 请求有关我们处理的个人信息的信息",
            "- 要求纠正不准确的数据",
            "- 要求删除您的个人信息",
            "- 撤回对数据处理的同意",
            "- 向监督机构提交投诉",
          ],
        },
        {
          title: "8. 数据存储期限",
          content: [
            "我们仅保留您的个人信息，直到达到处理目的所需的期限或根据法律规定。在此期限结束后，数据将被删除或匿名化。",
          ],
        },
        {
          title: "9. 隐私政策的更改",
          content: [
            "我们保留对本隐私政策进行更改的权利。所有更改都发布在此页面上。我们建议定期检查此页面，以熟悉隐私政策的当前版本。",
          ],
        },
        {
          title: "10. 联系信息",
          content: [
            "如果您对本隐私政策或个人信息处理有任何问题，请联系：",
            "- 电子邮件：info@sktransfer.by",
            "- 电话：+375 (29) 122-84-84",
            "- 地址：白俄罗斯共和国，明斯克",
          ],
        },
      ],
    },
  }

  const pageContent = content[locale]

  return (
    <main className="min-h-screen bg-background py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 lg:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[var(--gold-dark)] mb-4 sm:mb-6">
            {pageContent.title}
          </h1>

          <p className="text-sm text-muted-foreground mb-8 sm:mb-10">
            {pageContent.updated}:{" "}
            {new Date().toLocaleDateString(locale === "zh" ? "zh-CN" : locale === "en" ? "en-US" : "ru-RU")}
          </p>

          <div className="prose prose-sm sm:prose-base max-w-none space-y-6 sm:space-y-8">
            {pageContent.sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3 sm:mb-4">
                  {section.title}
                </h2>
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
