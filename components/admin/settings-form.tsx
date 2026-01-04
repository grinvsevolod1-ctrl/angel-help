"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { SiteSettings } from "@/lib/blob-storage"
import { updateSettingsAction } from "@/app/actions/settings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Save } from "lucide-react"

interface SettingsFormProps {
  settings: SiteSettings
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<SiteSettings>(settings)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    startTransition(async () => {
      try {
        const result = await updateSettingsAction(formData)

        if (result.success) {
          setSuccess(true)
          router.refresh()
          setTimeout(() => setSuccess(false), 3000)
        } else {
          setError(result.error || "Ошибка при сохранении")
        }
      } catch (err) {
        console.error("Form submission error:", err)
        setError("Произошла ошибка при сохранении")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200 mb-6">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 text-sm text-green-600 bg-green-50 rounded-lg border border-green-200 mb-6">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          <span>Настройки успешно сохранены!</span>
        </div>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Общие</TabsTrigger>
          <TabsTrigger value="contacts">Контакты</TabsTrigger>
          <TabsTrigger value="bank">Реквизиты</TabsTrigger>
          <TabsTrigger value="integration">Интеграции</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки</CardTitle>
              <CardDescription>Основная информация о сайте</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Название сайта</Label>
                <Input
                  id="siteName"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  disabled={isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Описание сайта</Label>
                <Textarea
                  id="siteDescription"
                  value={formData.siteDescription}
                  onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                  disabled={isPending}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Режим обслуживания</Label>
                  <p className="text-sm text-muted-foreground">Временно отключить сайт для посетителей</p>
                </div>
                <Switch
                  checked={formData.maintenanceMode}
                  onCheckedChange={(checked) => setFormData({ ...formData, maintenanceMode: checked })}
                  disabled={isPending}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
              <CardDescription>Контакты фонда для связи</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Телефон</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactAddress">Адрес</Label>
                <Textarea
                  id="contactAddress"
                  value={formData.contactAddress}
                  onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
                  disabled={isPending}
                />
              </div>

              <div className="space-y-4">
                <Label>Социальные сети</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vk" className="text-sm">
                      ВКонтакте
                    </Label>
                    <Input
                      id="vk"
                      value={formData.socialLinks.vk || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, socialLinks: { ...formData.socialLinks, vk: e.target.value } })
                      }
                      placeholder="https://vk.com/..."
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telegram" className="text-sm">
                      Telegram
                    </Label>
                    <Input
                      id="telegram"
                      value={formData.socialLinks.telegram || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, socialLinks: { ...formData.socialLinks, telegram: e.target.value } })
                      }
                      placeholder="https://t.me/..."
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube" className="text-sm">
                      YouTube
                    </Label>
                    <Input
                      id="youtube"
                      value={formData.socialLinks.youtube || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, socialLinks: { ...formData.socialLinks, youtube: e.target.value } })
                      }
                      placeholder="https://youtube.com/..."
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-sm">
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      value={formData.socialLinks.instagram || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                        })
                      }
                      placeholder="https://instagram.com/..."
                      disabled={isPending}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <CardTitle>Банковские реквизиты</CardTitle>
              <CardDescription>Реквизиты для пожертвований</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Название банка</Label>
                  <Input
                    id="bankName"
                    value={formData.bankDetails.bankName}
                    onChange={(e) =>
                      setFormData({ ...formData, bankDetails: { ...formData.bankDetails, bankName: e.target.value } })
                    }
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bik">БИК</Label>
                  <Input
                    id="bik"
                    value={formData.bankDetails.bik}
                    onChange={(e) =>
                      setFormData({ ...formData, bankDetails: { ...formData.bankDetails, bik: e.target.value } })
                    }
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inn">ИНН</Label>
                  <Input
                    id="inn"
                    value={formData.bankDetails.inn}
                    onChange={(e) =>
                      setFormData({ ...formData, bankDetails: { ...formData.bankDetails, inn: e.target.value } })
                    }
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kpp">КПП</Label>
                  <Input
                    id="kpp"
                    value={formData.bankDetails.kpp}
                    onChange={(e) =>
                      setFormData({ ...formData, bankDetails: { ...formData.bankDetails, kpp: e.target.value } })
                    }
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Расчётный счёт</Label>
                  <Input
                    id="accountNumber"
                    value={formData.bankDetails.accountNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankDetails: { ...formData.bankDetails, accountNumber: e.target.value },
                      })
                    }
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="corrAccount">Корр. счёт</Label>
                  <Input
                    id="corrAccount"
                    value={formData.bankDetails.corrAccount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankDetails: { ...formData.bankDetails, corrAccount: e.target.value },
                      })
                    }
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="smsNumber">СМС номер</Label>
                  <Input
                    id="smsNumber"
                    value={formData.smsNumber}
                    onChange={(e) => setFormData({ ...formData, smsNumber: e.target.value })}
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smsKeyword">СМС ключевое слово</Label>
                  <Input
                    id="smsKeyword"
                    type="password"
                    value={formData.smsKeyword}
                    onChange={(e) => setFormData({ ...formData, smsKeyword: e.target.value })}
                    placeholder="••••••••"
                    disabled={isPending}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration">
          <Card>
            <CardHeader>
              <CardTitle>Интеграции</CardTitle>
              <CardDescription>Настройки платежных систем и аналитики</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="yookassaShopId">ЮKassa Shop ID</Label>
                  <Input
                    id="yookassaShopId"
                    value={formData.yookassaShopId || ""}
                    onChange={(e) => setFormData({ ...formData, yookassaShopId: e.target.value })}
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yookassaSecretKey">ЮKassa Secret Key</Label>
                  <Input
                    id="yookassaSecretKey"
                    type="password"
                    value={formData.yookassaSecretKey || ""}
                    onChange={(e) => setFormData({ ...formData, yookassaSecretKey: e.target.value })}
                    placeholder="••••••••"
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="analyticsId">Google Analytics ID</Label>
                <Input
                  id="analyticsId"
                  value={formData.analyticsId || ""}
                  onChange={(e) => setFormData({ ...formData, analyticsId: e.target.value })}
                  placeholder="G-XXXXXXXXXX"
                  disabled={isPending}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button type="submit" disabled={isPending}>
          <Save className="h-4 w-4 mr-2" />
          {isPending ? "Сохранение..." : "Сохранить настройки"}
        </Button>
      </div>
    </form>
  )
}
