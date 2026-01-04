"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { Child } from "@/lib/blob-storage"
import { createChildAction, updateChildAction } from "@/app/actions/children"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "./image-upload"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface ChildFormProps {
  child?: Child
}

export function ChildForm({ child }: ChildFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: child?.name || "",
    age: child?.age || 0,
    diagnosis: child?.diagnosis || "",
    story: child?.story || "",
    image: child?.image || "",
    targetAmount: child?.targetAmount || 0,
    currentAmount: child?.currentAmount || 0,
    status: (child?.status || "active") as "active" | "completed" | "archived",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (formData.currentAmount > formData.targetAmount) {
      setError("Собранная сумма не может быть больше целевой")
      return
    }

    if (formData.age < 0 || formData.age > 18) {
      setError("Возраст должен быть от 0 до 18 лет")
      return
    }

    startTransition(async () => {
      try {
        const result = child ? await updateChildAction(child.id, formData) : await createChildAction(formData)

        if (result.success) {
          setSuccess(true)
          setTimeout(() => {
            router.push("/admin/children")
            router.refresh()
          }, 1000)
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 text-sm text-green-600 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          <span>Успешно сохранено! Перенаправление...</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Имя ребенка *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Возраст *</Label>
          <Input
            id="age"
            type="number"
            min="0"
            max="18"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: Number.parseInt(e.target.value) || 0 })}
            required
            disabled={isPending}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="diagnosis">Диагноз *</Label>
        <Input
          id="diagnosis"
          value={formData.diagnosis}
          onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
          required
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="story">История *</Label>
        <Textarea
          id="story"
          rows={4}
          value={formData.story}
          onChange={(e) => setFormData({ ...formData, story: e.target.value })}
          required
          disabled={isPending}
        />
      </div>

      <ImageUpload
        value={formData.image}
        onChange={(url) => setFormData({ ...formData, image: url })}
        label="Фото ребенка"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="targetAmount">Цель сбора (₽) *</Label>
          <Input
            id="targetAmount"
            type="number"
            min="0"
            step="1000"
            value={formData.targetAmount}
            onChange={(e) => setFormData({ ...formData, targetAmount: Number.parseInt(e.target.value) || 0 })}
            required
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentAmount">Собрано (₽) *</Label>
          <Input
            id="currentAmount"
            type="number"
            min="0"
            step="1000"
            value={formData.currentAmount}
            onChange={(e) => setFormData({ ...formData, currentAmount: Number.parseInt(e.target.value) || 0 })}
            required
            disabled={isPending}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Статус *</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "completed" | "archived" })}
        >
          <SelectTrigger disabled={isPending}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Активен</SelectItem>
            <SelectItem value="completed">Завершен</SelectItem>
            <SelectItem value="archived">Архив</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Сохранение..." : child ? "Обновить" : "Создать"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
