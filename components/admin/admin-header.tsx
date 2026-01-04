"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, LogOut, Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { logout } from "@/lib/auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AdminHeaderProps {
  username: string
}

const navItems = [
  { href: "/admin", label: "Главная" },
  { href: "/admin/children", label: "Подопечные" },
  { href: "/admin/news", label: "Новости" },
  { href: "/admin/programs", label: "Программы" },
  { href: "/admin/donations", label: "Пожертвования" },
  { href: "/admin/reports", label: "Отчеты" },
  { href: "/admin/users", label: "Пользователи" },
  { href: "/admin/settings", label: "Настройки" },
  { href: "/admin/backup", label: "Бэкапы" },
]

export function AdminHeader({ username }: AdminHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/admin/login")
    router.refresh()
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <span className="hidden sm:inline">Angel Help Admin</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  Еще <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {navItems.slice(5).map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm text-muted-foreground hover:text-foreground">
              Сайт
            </Link>
            <span className="text-sm text-muted-foreground">{username}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t mt-2">
                <Link href="/" target="_blank" className="px-3 py-2 text-sm text-muted-foreground">
                  Перейти на сайт
                </Link>
                <span className="px-3 text-sm text-muted-foreground">{username}</span>
                <Button variant="outline" size="sm" onClick={handleLogout} className="mx-3 bg-transparent">
                  <LogOut className="h-4 w-4 mr-2" />
                  Выйти
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
