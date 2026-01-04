"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Показываем баннер через 1 секунду после загрузки
      setTimeout(() => setShow(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShow(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom-5 duration-500">
      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl border border-border/50 p-4 shadow-elevated sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-foreground sm:text-lg">Мы используем cookie-файлы</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Мы используем cookie для улучшения работы сайта и анализа трафика. Продолжая использовать сайт, вы
                  соглашаетесь с нашей{" "}
                  <a
                    href="/privacy"
                    className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                  >
                    политикой конфиденциальности
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="press-effect touch-target bg-transparent"
              >
                Отклонить
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="press-effect touch-target bg-primary hover:bg-primary/90"
              >
                Принять
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
