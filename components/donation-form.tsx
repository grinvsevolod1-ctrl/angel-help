"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Loader2, CreditCard, Smartphone, FileText, Heart, QrCode, UserX, Building } from "lucide-react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"

const AMOUNTS = [500, 1500, 2500, 5000, 7000, 10000]
const FEE_PERCENTAGES = [10, 15, 20, 25, 30, 50, 100]

export function DonationForm() {
  const [amount, setAmount] = useState(1500)
  const [customAmount, setCustomAmount] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedQR, setSelectedQR] = useState<"sber" | "sbp">("sber")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [includeFee, setIncludeFee] = useState(true)
  const [feePercentage, setFeePercentage] = useState(10)
  const [customFeePercentage, setCustomFeePercentage] = useState("")

  const calculateDonationDetails = () => {
    const donationAmount = customAmount ? Number.parseFloat(customAmount) : amount
    const feePercent = customFeePercentage ? Number.parseFloat(customFeePercentage) : feePercentage

    if (includeFee && feePercent > 0) {
      const feeAmount = donationAmount * (feePercent / 100)
      const totalAmount = donationAmount + feeAmount
      return {
        donationAmount,
        feePercent,
        feeAmount: Math.round(feeAmount),
        totalAmount: Math.round(totalAmount),
        feeText: `+ ${feePercent}% фонду`,
      }
    }

    return {
      donationAmount,
      feePercent: 0,
      feeAmount: 0,
      totalAmount: donationAmount,
      feeText: "без комиссии",
    }
  }

  const donationDetails = calculateDonationDetails()

  const handleDonation = async () => {
    const { donationAmount, feeAmount, totalAmount } = donationDetails

    if (!donationAmount || donationAmount <= 0) {
      alert("Пожалуйста, укажите сумму")
      return
    }

    if (!isAnonymous && !email) {
      alert("Пожалуйста, укажите email")
      return
    }

    setIsProcessing(true)
    try {
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          donationAmount: donationAmount,
          feeAmount: feeAmount,
          feePercentage: includeFee
            ? customFeePercentage
              ? Number.parseFloat(customFeePercentage)
              : feePercentage
            : 0,
          email: isAnonymous ? "" : email,
          name: isAnonymous ? "Аноним" : name,
          isAnonymous,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      window.location.href = data.confirmationUrl
    } catch {
      alert("Ошибка при создании платежа")
      setIsProcessing(false)
    }
  }

  return (
    <section id="donate" className="py-12 sm:py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">Сделать пожертвование</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Каждый рубль помогает детям</p>
          </div>

          <Card className="border-0 shadow-elevated rounded-2xl sm:rounded-3xl overflow-hidden">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <Tabs defaultValue="online" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6 h-11 sm:h-12 p-1 rounded-xl bg-muted">
                  <TabsTrigger
                    value="online"
                    className="rounded-lg text-[10px] xs:text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-1"
                  >
                    <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Онлайн</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="sms"
                    className="rounded-lg text-[10px] xs:text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-1"
                  >
                    <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">SMS</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="qr"
                    className="rounded-lg text-[10px] xs:text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-1"
                  >
                    <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">QR</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="rounded-lg text-[10px] xs:text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline text-[9px] xs:text-[10px] sm:text-sm">Реквизиты</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="online" className="space-y-5 sm:space-y-6 mt-0">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Сумма пожертвования</Label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-3">
                      {AMOUNTS.map((amt) => (
                        <Button
                          key={amt}
                          variant={amount === amt && !customAmount ? "default" : "outline"}
                          onClick={() => {
                            setAmount(amt)
                            setCustomAmount("")
                          }}
                          className="h-11 sm:h-12 text-xs sm:text-sm font-semibold rounded-xl press-effect touch-target transition-all"
                          disabled={isProcessing}
                        >
                          {amt.toLocaleString()} ₽
                        </Button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder="Другая сумма"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setAmount(0)
                      }}
                      className="h-11 sm:h-12 rounded-xl text-sm sm:text-base"
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="bg-muted/50 rounded-xl p-3.5 sm:p-4 space-y-4">
                    <div className="flex items-start sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Building className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Label htmlFor="include-fee" className="text-xs sm:text-sm font-medium cursor-pointer block">
                            Помочь фонду +{feePercentage}%
                          </Label>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                            Добавить комиссию на работу фонда
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="include-fee"
                        checked={includeFee}
                        onCheckedChange={setIncludeFee}
                        disabled={isProcessing}
                        className="shrink-0"
                      />
                    </div>

                    {includeFee && (
                      <div className="animate-in fade-in duration-200 space-y-4 pl-0 sm:pl-2">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-medium">Процент помощи:</span>
                            <span className="text-primary font-bold text-sm sm:text-base">
                              {customFeePercentage || feePercentage}%
                            </span>
                          </div>

                          <div className="space-y-3 sm:space-y-4">
                            <div className="px-1">
                              <Slider
                                value={[customFeePercentage ? Number.parseFloat(customFeePercentage) : feePercentage]}
                                min={0}
                                max={100}
                                step={1}
                                onValueChange={(value) => {
                                  setFeePercentage(value[0])
                                  setCustomFeePercentage("")
                                }}
                                className="py-2 sm:py-3"
                                disabled={isProcessing}
                              />
                            </div>

                            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
                              {FEE_PERCENTAGES.map((percent) => (
                                <Button
                                  key={percent}
                                  type="button"
                                  variant={feePercentage === percent && !customFeePercentage ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => {
                                    setFeePercentage(percent)
                                    setCustomFeePercentage("")
                                  }}
                                  className="h-8 sm:h-9 text-xs rounded-lg font-medium"
                                  disabled={isProcessing}
                                >
                                  {percent}%
                                </Button>
                              ))}
                            </div>

                            <div className="relative">
                              <Input
                                type="number"
                                placeholder="Свой процент (0-100)"
                                value={customFeePercentage}
                                onChange={(e) => {
                                  const value = e.target.value
                                  const numValue = value === "" ? 0 : Number.parseFloat(value)
                                  if (numValue >= 0 && numValue <= 100) {
                                    setCustomFeePercentage(value)
                                    setFeePercentage(numValue)
                                  } else if (value === "") {
                                    setCustomFeePercentage("")
                                    setFeePercentage(10)
                                  }
                                }}
                                className="h-10 sm:h-11 text-sm pr-8"
                                min={0}
                                max={100}
                                disabled={isProcessing}
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                                %
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/50 rounded-lg p-3 space-y-2 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm text-muted-foreground">Помощь детям:</span>
                            <span className="font-medium">{donationDetails.donationAmount.toLocaleString()} ₽</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm text-muted-foreground">
                              Помощь фонду ({donationDetails.feePercent}%):
                            </span>
                            <span className="font-medium text-primary">
                              + {donationDetails.feeAmount.toLocaleString()} ₽
                            </span>
                          </div>
                          <div className="border-t pt-2 flex justify-between items-center">
                            <span className="text-xs sm:text-sm font-medium">Итого к оплате:</span>
                            <span className="text-base sm:text-lg font-bold text-primary">
                              {donationDetails.totalAmount.toLocaleString()} ₽
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start sm:items-center justify-between p-3.5 sm:p-4 bg-muted/50 rounded-xl gap-3">
                      <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <UserX className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Label htmlFor="anonymous" className="text-xs sm:text-sm font-medium cursor-pointer block">
                            Пожертвовать анонимно
                          </Label>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                            Ваши данные не будут сохранены
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={(checked) => {
                          setIsAnonymous(checked)
                          if (checked) {
                            setName("")
                            setEmail("")
                          }
                        }}
                        disabled={isProcessing}
                        className="shrink-0"
                      />
                    </div>

                    {!isAnonymous && (
                      <div className="space-y-4 animate-in fade-in duration-200">
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                            Ваше имя
                          </Label>
                          <Input
                            id="name"
                            placeholder="Иван Иванов"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-11 sm:h-12 rounded-xl text-sm sm:text-base"
                            disabled={isProcessing}
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-11 sm:h-12 rounded-xl text-sm sm:text-base"
                            required
                            disabled={isProcessing}
                          />
                        </div>
                      </div>
                    )}

                    {isAnonymous && (
                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-3.5 sm:p-4 animate-in fade-in duration-200">
                        <p className="text-xs sm:text-sm text-primary font-medium flex items-center gap-2">
                          <UserX className="w-4 h-4 shrink-0" />
                          Анонимное пожертвование
                        </p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5">
                          Ваши данные (имя и email) не будут сохранены. Вы получите только электронный чек от платежной
                          системы.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 sm:pt-5 border-t">
                    <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-muted-foreground">Помощь детям:</span>
                        <span className="font-medium text-sm sm:text-base">
                          {donationDetails.donationAmount.toLocaleString()} ₽
                        </span>
                      </div>
                      {includeFee && donationDetails.feeAmount > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            Помощь фонду ({donationDetails.feePercent}%):
                          </span>
                          <span className="font-medium text-primary text-sm sm:text-base">
                            + {donationDetails.feeAmount.toLocaleString()} ₽
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2 sm:pt-2.5 border-t">
                        <span className="text-sm sm:text-base font-semibold">Итого к оплате:</span>
                        <span className="text-xl sm:text-2xl font-bold text-primary">
                          {donationDetails.totalAmount.toLocaleString()} ₽
                        </span>
                      </div>
                    </div>
                    <Button
                      className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 press-effect touch-target transition-all"
                      onClick={handleDonation}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                          Обработка...
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          {isAnonymous ? "Пожертвовать анонимно" : "Пожертвовать"}
                          {donationDetails.feeAmount > 0 && ` (+${donationDetails.feePercent}% фонду)`}
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-[10px] sm:text-xs text-center text-muted-foreground leading-relaxed">
                    Нажимая кнопку, вы принимаете условия{" "}
                    <a href="/offer" className="text-primary hover:underline">
                      оферты
                    </a>
                  </p>
                </TabsContent>

                <TabsContent value="sms" className="mt-0">
                  <div className="bg-muted rounded-xl p-4 sm:p-6">
                    <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Как помочь через SMS:</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      Отправьте SMS на номер <strong className="text-primary">3434</strong> с текстом:
                    </p>
                    <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 text-center">
                      <code className="text-primary font-semibold text-sm sm:text-base">участие 500</code>
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      Где 500 — сумма пожертвования в рублях (от 10 до 15 000 ₽)
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="qr" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex gap-2 p-1 bg-muted rounded-xl">
                      <button
                        onClick={() => setSelectedQR("sber")}
                        className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                          selectedQR === "sber"
                            ? "bg-[#21A038] text-white shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                          </svg>
                          Сбербанк
                        </span>
                      </button>
                      <button
                        onClick={() => setSelectedQR("sbp")}
                        className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                          selectedQR === "sbp"
                            ? "bg-[#5C2D91] text-white shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                          </svg>
                          СБП
                        </span>
                      </button>
                    </div>

                    {selectedQR === "sber" && (
                      <div className="bg-[#21A038]/5 rounded-xl p-4 sm:p-6 text-center animate-in fade-in duration-300">
                        <div className="inline-flex items-center gap-2 bg-[#21A038] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                          Сбербанк
                        </div>
                        <div className="bg-white rounded-2xl p-3 sm:p-4 inline-block shadow-lg mb-3 sm:mb-4">
                          <Image
                            src="/qr-sberbank.jpg"
                            alt="QR код Сбербанк"
                            width={200}
                            height={200}
                            className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56"
                          />
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                          Отсканируйте QR-код в приложении Сбербанк Онлайн
                        </p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          Откройте приложение → Платежи → Оплата по QR
                        </p>
                      </div>
                    )}

                    {selectedQR === "sbp" && (
                      <div className="bg-[#5C2D91]/5 rounded-xl p-4 sm:p-6 text-center animate-in fade-in duration-300">
                        <div className="inline-flex items-center gap-2 bg-[#5C2D91] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                          </svg>
                          Система быстрых платежей
                        </div>
                        <div className="bg-white rounded-2xl p-3 sm:p-4 inline-block shadow-lg mb-3 sm:mb-4">
                          <Image
                            src="/qr-sbp.jpg"
                            alt="QR код СБП"
                            width={200}
                            height={200}
                            className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56"
                          />
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                          Отсканируйте QR-код в любом банковском приложении
                        </p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          Поддерживается более 100 банков России
                        </p>
                      </div>
                    )}

                    <div className="bg-muted/50 rounded-xl p-3 sm:p-4">
                      <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                        После сканирования QR-кода вы сможете указать любую сумму пожертвования
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="mt-0">
                  <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                    <div className="bg-muted rounded-xl p-3.5 sm:p-4">
                      <h4 className="font-semibold mb-2.5 sm:mb-3 text-sm sm:text-base">ПАО Сбербанк</h4>
                      <div className="space-y-1.5 sm:space-y-2 text-muted-foreground">
                        <p className="flex flex-wrap items-baseline gap-2">
                          <span className="text-foreground font-medium">ИНН:</span>
                          <span className="font-mono">7720910214</span>
                        </p>
                        <p className="flex flex-wrap items-baseline gap-2">
                          <span className="text-foreground font-medium">Р/с:</span>
                          <span className="font-mono">4070 3810 2380 0001 9021</span>
                        </p>
                        <p className="flex flex-wrap items-baseline gap-2">
                          <span className="text-foreground font-medium">БИК:</span>
                          <span className="font-mono">044525225</span>
                        </p>
                      </div>
                    </div>
                    <div className="bg-muted rounded-xl p-3.5 sm:p-4">
                      <h4 className="font-semibold mb-2.5 sm:mb-3 text-sm sm:text-base">АО "АЛЬФА-БАНК"</h4>
                      <div className="space-y-1.5 sm:space-y-2 text-muted-foreground">
                        <p className="flex flex-wrap items-baseline gap-2">
                          <span className="text-foreground font-medium">Р/с:</span>
                          <span className="font-mono">4070 3810 1011 0000 0489</span>
                        </p>
                        <p className="flex flex-wrap items-baseline gap-2">
                          <span className="text-foreground font-medium">БИК:</span>
                          <span className="font-mono">044525593</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
