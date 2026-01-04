"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { Program } from "@/lib/blob-storage"
import { createProgramAction, updateProgramAction } from "@/app/actions/programs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "./image-upload"
import { AlertCircle, CheckCircle2, Plus, X } from "lucide-react"

interface ProgramFormProps {
  program?: Program
}

export function ProgramForm({ program }: ProgramFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: program?.title || "",
    slug: program?.slug || "",
    description: program?.description || "",
    fullDescription: program?.fullDescription || "",
    image: program?.image || "",
    icon: program?.icon || "Heart",
    goals: program?.goals || [""],
    results: program?.results || [""],
    status: (program?.status || "active") as "active" | "paused" | "completed",
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[а-яё]/g, (char) => {
        const map: { [key: string]: string } = {
          а: "a",
          б: "b",
          в: "v",
          г: "g",
          д: "d",
          е: "e",
          ё: "yo",
          ж: "zh",
          з: "z",
          и: "i",
          й: "j",
          к: "k",
          л: "l",
          м: "m",
          н: "n",
          о: "o",
          п: "p",
          р: "r",
          с: "s",
          т: "t",
          у: "u",
          ф: "f",
          х: "h",
          ц: "c",
          ч: "ch",
          ш: "sh",
          щ: "sch",
          ъ: "",
          ы: "y",
          ь: "",
          э: "e",
          ю: "yu",
          я: "ya",
        }
        return map[char] || char
      })
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: program ? formData.slug : generateSlug(title),
    })
  }

  const addGoal = () => {
    setFormData({ ...formData, goals: [...formData.goals, ""] })
  }

  const removeGoal = (index: number) => {
    setFormData({ ...formData, goals: formData.goals.filter((_, i) => i !== index) })
  }

  const updateGoal = (index: number, value: string) => {
    const newGoals = [...formData.goals]
    newGoals[index] = value
    setFormData({ ...formData, goals: newGoals })
  }

  const addResult = () => {
    setFormData({ ...formData, results: [...formData.results, ""] })
  }

  const removeResult = (index: number) => {
    setFormData({ ...formData, results: formData.results.filter((_, i) => i !== index) })
  }

  const updateResult = (index: number, value: string) => {
    const newResults = [...formData.results]
    newResults[index] = value
    setFormData({ ...formData, results: newResults })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    const cleanedData = {
      ...formData,
      goals: formData.goals.filter((g) => g.trim() !== ""),
      results: formData.results.filter((r) => r.trim() !== ""),
    }

    startTransition(async () => {
      try {
        const result = program
          ? await updateProgramAction(program.id, cleanedData)
          : await createProgramAction(cleanedData)

        if (result.success) {
          setSuccess(true)
          setTimeout(() => {
            router.push("/admin/programs")
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
          <Label htmlFor="title">Название *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">URL-адрес *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            disabled={isPending}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Краткое описание *</Label>
        <Textarea
          id="description"
          rows={2}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullDescription">Полное описание *</Label>
        <Textarea
          id="fullDescription"
          rows={4}
          value={formData.fullDescription}
          onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
          required
          disabled={isPending}
        />
      </div>

      <ImageUpload
        value={formData.image}
        onChange={(url) => setFormData({ ...formData, image: url })}
        label="Изображение программы"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="icon">Иконка</Label>
          <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
            <SelectTrigger disabled={isPending}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Heart">Сердце</SelectItem>
              <SelectItem value="Users">Люди</SelectItem>
              <SelectItem value="Brain">Мозг</SelectItem>
              <SelectItem value="Home">Дом</SelectItem>
              <SelectItem value="Gift">Подарок</SelectItem>
              <SelectItem value="Star">Звезда</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Статус *</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "paused" | "completed" })}
          >
            <SelectTrigger disabled={isPending}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Активна</SelectItem>
              <SelectItem value="paused">Приостановлена</SelectItem>
              <SelectItem value="completed">Завершена</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Цели программы</Label>
          <Button type="button" variant="outline" size="sm" onClick={addGoal}>
            <Plus className="h-4 w-4 mr-1" /> Добавить
          </Button>
        </div>
        {formData.goals.map((goal, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={goal}
              onChange={(e) => updateGoal(index, e.target.value)}
              placeholder="Цель программы"
              disabled={isPending}
            />
            {formData.goals.length > 1 && (
              <Button type="button" variant="ghost" size="icon" onClick={() => removeGoal(index)}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Результаты</Label>
          <Button type="button" variant="outline" size="sm" onClick={addResult}>
            <Plus className="h-4 w-4 mr-1" /> Добавить
          </Button>
        </div>
        {formData.results.map((result, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={result}
              onChange={(e) => updateResult(index, e.target.value)}
              placeholder="Результат программы"
              disabled={isPending}
            />
            {formData.results.length > 1 && (
              <Button type="button" variant="ghost" size="icon" onClick={() => removeResult(index)}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Сохранение..." : program ? "Обновить" : "Создать"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
