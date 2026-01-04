"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Menu, X, Heart } from "lucide-react"
import { useState, useEffect } from "react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const navItems = [
    { href: "/o-fonde", label: "О фонде" },
    { href: "/pomoshh", label: "Помочь" },
    { href: "/#children", label: "Кому помочь", primary: true },
    { href: "/contacts", label: "Контакты" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-soft" : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 press-effect">
              <Image
                src="/images/logo.svg"
                alt="Ваш Ангел Хранитель"
                width={160}
                height={44}
                className="h-9 sm:h-10 lg:h-11 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) =>
                item.primary ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors press-effect"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Desktop Contact */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+74951080841"
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                +7 495 108 08 41
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center rounded-full hover:bg-muted transition-colors press-effect touch-target"
              aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20 fade-in" onClick={() => setIsOpen(false)} />

          {/* Menu Panel */}
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-[2rem] slide-up max-h-[85vh] overflow-y-auto scrollbar-none">
            <div className="p-6 pb-8">
              {/* Handle */}
              <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-8" />

              {/* Navigation */}
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-4 px-5 rounded-2xl text-lg font-medium transition-all press-effect animate-in ${
                      item.primary ? "bg-primary text-white" : "text-foreground hover:bg-muted"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Divider */}
              <div className="h-px bg-border my-6" />

              {/* Contact */}
              <div className="space-y-4 animate-in" style={{ animationDelay: "200ms" }}>
                <a
                  href="tel:+74951080841"
                  className="flex items-center gap-4 py-4 px-5 rounded-2xl bg-muted press-effect touch-target"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">+7 495 108 08 41</p>
                    <p className="text-sm text-muted-foreground">Пн-Пт 10:00-18:00</p>
                  </div>
                </a>
              </div>

              {/* CTA Button */}
              <div className="mt-6 animate-in" style={{ animationDelay: "250ms" }}>
                <Link
                  href="/#donate"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white text-lg font-semibold rounded-2xl press-effect touch-target"
                >
                  <Heart className="h-5 w-5" />
                  Помочь сейчас
                </Link>
              </div>

              {/* Safe area padding for iOS */}
              <div className="h-6" />
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  )
}
