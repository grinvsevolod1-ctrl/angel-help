"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { News } from "@/lib/blob-storage"
import { createNewsAction, updateNewsAction } from "@/app/actions/news"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "./image-upload"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface NewsFormProps {
  news?: News
}

export function NewsForm({ news }: NewsFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: news?.title || "",
    excerpt: news?.excerpt || "",
    content: news?.content || "",
    image: news?.image || "",
    category: news?.category || "Новости фонда",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    startTransition(async () => {
      try {
        const result = news ? await updateNewsAction(news.id, formData) : await createNewsAction(formData)

        if (result.success) {
          setSuccess(true)
          setTimeout(() => {
            router.push("/admin/news")
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

      <div className="space-y-2">
        <Label htmlFor="title">Заголовок *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Краткое описание *</Label>
        <Textarea
          id="excerpt"
          rows={2}
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          required
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Содержание *</Label>
        <Textarea
          id="content"
          rows={8}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          disabled={isPending}
        />
      </div>

      <ImageUpload
        value={formData.image}
        onChange={(url) => setFormData({ ...formData, image: url })}
        label="Изображение новости"
      />

      <div className="space-y-2">
        <Label htmlFor="category">Категория *</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger disabled={isPending}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Новости фонда">Новости фонда</SelectItem>
            <SelectItem value="Успехи">Успехи</SelectItem>
            <SelectItem value="Отчеты">Отчеты</SelectItem>
            <SelectItem value="Мероприятия">Мероприятия</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Сохранение..." : news ? "Обновить" : "Опубликовать"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
