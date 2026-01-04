import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Благотворительный фонд «Ваш Ангел Хранитель» - Привычка Дарить Добро",
    template: "%s | Ваш Ангел Хранитель",
  },
  description:
    "Детский благотворительный фонд «Ваш Ангел Хранитель» помогает детям с тяжелыми заболеваниями получить необходимое лечение. Привычка дарить добро - вместе мы можем спасти жизни.",
  keywords: [
    "благотворительность",
    "помощь детям",
    "фонд",
    "ваш ангел хранитель",
    "лечение детей",
    "онкобольные дети",
    "пожертвования",
  ],
  authors: [{ name: "Благотворительный фонд «Ваш Ангел Хранитель»" }],
  openGraph: {
    title: "Благотворительный фонд «Ваш Ангел Хранитель»",
    description: "Помогаем детям с тяжелыми заболеваниями. Привычка дарить добро.",
    url: "https://angel-help.org",
    siteName: "Ваш Ангел Хранитель",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Благотворительный фонд «Ваш Ангел Хранитель»",
    description: "Помогаем детям с тяжелыми заболеваниями. Привычка дарить добро.",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
