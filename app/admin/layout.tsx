import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Админ-панель - Angel Help",
  description: "Панель управления благотворительным фондом",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
