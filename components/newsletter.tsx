"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle2 } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail("")
      setTimeout(() => setIsSuccess(false), 3000)
    }, 1000)
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 md:w-8 md:h-8 text-primary" />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Будьте в курсе событий</h2>
          <p className="text-base md:text-lg text-gray-500 mb-8 max-w-lg mx-auto">
            Подпишитесь на рассылку и узнавайте о новостях фонда первыми
          </p>

          {isSuccess ? (
            <div className="flex items-center justify-center gap-3 text-green-600 py-4">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-medium">Вы успешно подписались!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 md:h-14 px-5 rounded-full border-2 border-gray-200 focus:border-primary bg-white text-base"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 md:h-14 px-8 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 disabled:opacity-50 whitespace-nowrap"
              >
                {isSubmitting ? "..." : "Подписаться"}
              </Button>
            </form>
          )}

          <p className="text-xs text-gray-400 mt-6">
            Нажимая «Подписаться», вы соглашаетесь с{" "}
            <a href="/privacy" className="text-primary hover:underline">
              политикой конфиденциальности
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
