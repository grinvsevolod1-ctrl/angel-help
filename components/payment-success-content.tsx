"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2, XCircle, Heart, Calendar, User, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

interface PaymentData {
  amount: string
  donorName: string
  childName?: string
  isAnonymous: boolean
  createdAt: string
}

export function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)

  useEffect(() => {
    const checkPayment = async () => {
      const paymentId = searchParams.get("paymentId") || searchParams.get("payment_id")
      const donationId = searchParams.get("donationId")

      if (!paymentId && !donationId) {
        setStatus("error")
        return
      }

      try {
        const params = new URLSearchParams()
        if (paymentId) params.set("paymentId", paymentId)
        if (donationId) params.set("donationId", donationId)

        const response = await fetch(`/api/payment/status?${params.toString()}`)
        const data = await response.json()

        if (data.paid || data.status === "completed") {
          setStatus("success")
          setPaymentData({
            amount: data.amount,
            donorName: data.donorName || "Аноним",
            childName: data.childName,
            isAnonymous: data.isAnonymous,
            createdAt: data.createdAt || new Date().toISOString(),
          })

          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#22c55e", "#16a34a", "#15803d"],
          })
        } else {
          setStatus("error")
        }
      } catch (error) {
        console.error("[v0] Error checking payment:", error)
        setStatus("error")
      }
    }

    checkPayment()
  }, [searchParams])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleShare = async () => {
    const shareText = `Я только что сделал пожертвование в фонд "Ваш Ангел Хранитель"! Присоединяйтесь: ${window.location.origin}`
    if (navigator.share) {
      try {
        await navigator.share({ title: "Пожертвование", text: shareText, url: window.location.origin })
      } catch {}
    } else {
      navigator.clipboard.writeText(shareText)
      alert("Ссылка скопирована в буфер обмена!")
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-green-50">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <Loader2 className="w-20 h-20 mx-auto mb-6 animate-spin text-primary" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Проверяем платеж...</h2>
          <p className="text-muted-foreground">Это займет несколько секунд</p>
        </motion.div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-background to-orange-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-elevated p-8 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Ошибка платежа</h1>
          <p className="text-muted-foreground mb-8">
            К сожалению, платеж не был завершен. Попробуйте снова или свяжитесь с нами для помощи.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full h-12 rounded-xl">
              <Link href="/#donate">
                <Heart className="w-5 h-5 mr-2" />
                Попробовать снова
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-12 rounded-xl bg-transparent">
              <Link href="/">
                <ArrowLeft className="w-5 h-5 mr-2" />
                На главную
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-primary/5 px-4 py-12">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-elevated overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-10 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-14 h-14 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Спасибо за пожертвование!</h1>
            <p className="text-green-100">Ваша помощь очень важна для нас</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Amount */}
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground mb-1">Сумма пожертвования</p>
              <p className="text-5xl font-bold text-primary">{Number(paymentData?.amount).toLocaleString("ru-RU")} ₽</p>
            </div>

            {/* Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">От кого</p>
                  <p className="font-medium">
                    {paymentData?.isAnonymous ? "Анонимный благотворитель" : paymentData?.donorName}
                  </p>
                </div>
              </div>

              {paymentData?.childName && (
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Помощь ребенку</p>
                    <p className="font-medium">{paymentData.childName}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Дата и время</p>
                  <p className="font-medium">{formatDate(paymentData?.createdAt || new Date().toISOString())}</p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-6 mb-8">
              <p className="text-sm text-green-800 leading-relaxed">
                Благодаря вашей помощи дети получают необходимое лечение и шанс на здоровую жизнь. Квитанция об оплате
                будет отправлена на вашу электронную почту.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button onClick={handleShare} variant="outline" className="w-full h-12 rounded-xl bg-transparent">
                <Share2 className="w-5 h-5 mr-2" />
                Поделиться
              </Button>
              <Button asChild className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90">
                <Link href="/">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Вернуться на главную
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Additional info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          Номер транзакции: {searchParams.get("paymentId") || searchParams.get("donationId") || "—"}
        </motion.p>
      </div>
    </div>
  )
}
