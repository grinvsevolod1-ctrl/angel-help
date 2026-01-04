"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

const DONATION_AMOUNTS = [500, 1500, 5000, 10000]

interface Child {
  id: string
  name: string
  age: number
  diagnosis: string
  story: string
  image: string
  targetAmount: number
  currentAmount: number
  status: string
}

interface DonateToChildFormProps {
  child: Child
}

export function DonateToChildForm({ child }: DonateToChildFormProps) {
  const [amount, setAmount] = useState(1500)
  const [customAmount, setCustomAmount] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDonate = async () => {
    const finalAmount = customAmount ? Number.parseFloat(customAmount) : amount

    if (!finalAmount || finalAmount <= 0) {
      alert("Пожалуйста, укажите сумму пожертвования")
      return
    }

    if (!email) {
      alert("Пожалуйста, укажите email для отправки чека")
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalAmount,
          email,
          name,
          childId: child.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment")
      }

      window.location.href = data.confirmationUrl
    } catch (error) {
      console.error("Payment error:", error)
      alert("Ошибка при создании платежа. Попробуйте снова.")
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full h-12 text-base" size="lg">
          Помочь {child.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Пожертвование для {child.name}</DialogTitle>
          <DialogDescription>Выберите сумму и способ оплаты</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="online" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="online">Онлайн-перевод</TabsTrigger>
            <TabsTrigger value="details">Реквизиты</TabsTrigger>
          </TabsList>

          <TabsContent value="online" className="space-y-6 mt-6">
            <div>
              <Label className="text-base font-semibold mb-3 block">Выберите сумму пожертвования</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DONATION_AMOUNTS.map((amt) => (
                  <Button
                    key={amt}
                    variant={amount === amt ? "default" : "outline"}
                    onClick={() => {
                      setAmount(amt)
                      setCustomAmount("")
                    }}
                    className="h-12"
                    disabled={isProcessing}
                  >
                    {amt} ₽
                  </Button>
                ))}
              </div>
              <div className="mt-3">
                <Input
                  type="number"
                  placeholder="Другая сумма"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setAmount(0)
                  }}
                  className="h-12"
                  disabled={isProcessing}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5"
                  disabled={isProcessing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5"
                  required
                  disabled={isProcessing}
                />
              </div>
            </div>

            <Button
              className="w-full h-12 text-base"
              size="lg"
              onClick={handleDonate}
              disabled={isProcessing || !email}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Обработка...
                </>
              ) : (
                `Пожертвовать ${customAmount || amount} ₽`
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Нажимая кнопку "Пожертвовать", вы принимаете условия публичной оферты и даете согласие на обработку
              персональных данных
            </p>
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Целевое назначение:</p>
                <p className="text-gray-700">
                  Пожертвование на лечение {child.name} (диагноз: {child.diagnosis})
                </p>
              </div>

              <div>
                <div className="font-semibold text-gray-900 mb-1">Полное наименование:</div>
                <div className="text-gray-600">БЛАГОТВОРИТЕЛЬНЫЙ ФОНД "Ваш Ангел Хранитель"</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">ИНН</div>
                  <div className="text-gray-600">7720910214</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">КПП</div>
                  <div className="text-gray-600">772001001</div>
                </div>
              </div>

              <div>
                <div className="font-semibold text-gray-900 mb-1">Расчетный счет:</div>
                <div className="text-gray-600 font-mono">40703 810 2380 0001 9021</div>
              </div>

              <div>
                <div className="font-semibold text-gray-900 mb-1">Наименование банка:</div>
                <div className="text-gray-600">ПАО Сбербанк</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">БИК</div>
                  <div className="text-gray-600">044525225</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Корр. счет</div>
                  <div className="text-gray-600 font-mono text-xs">30101 810 4000 0000 0225</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
