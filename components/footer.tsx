import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/logo.svg"
              alt="Ваш Ангел Хранитель"
              width={140}
              height={40}
              className="h-9 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm text-white/60 mb-4">Детский благотворительный фонд "Ваш Ангел Хранитель"</p>
            <div className="text-xs text-white/40 space-y-1">
              <p>ИНН: 7720910214</p>
              <p>ОГРН: 1237700721675</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/80">Навигация</h3>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/#children", label: "Кому помочь" },
                { href: "/#programs", label: "Программы" },
                { href: "/o-fonde", label: "О фонде" },
                { href: "/contacts", label: "Контакты" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/80">Документы</h3>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/offer", label: "Публичная оферта" },
                { href: "/privacy", label: "Политика конфиденциальности" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/80">Контакты</h3>
            <div className="space-y-3">
              <a
                href="tel:+74951080841"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                +7 495 108 08 41
              </a>
              <a
                href="mailto:info@angel-help.org"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                info@angel-help.org
              </a>
              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                Москва, Россия
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 text-center sm:text-left">
            © 2025 Благотворительный фонд "Ваш Ангел Хранитель"
          </p>
          <div className="flex items-center gap-1 text-xs text-white/40">
            <span>Сделано с</span>
            <Heart className="h-3 w-3 text-primary fill-primary" />
          </div>
        </div>
      </div>
    </footer>
  )
}
