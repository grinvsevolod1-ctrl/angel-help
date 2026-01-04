"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { AdminUser } from "@/lib/blob-storage"
import { createUserAction, updateUserAction } from "@/app/actions/users"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface UserFormProps {
  user?: AdminUser
}

const allPermissions = [
  { id: "children", label: "Подопечные" },
  { id: "news", label: "Новости" },
  { id: "programs", label: "Программы" },
  { id: "donations", label: "Пожертвования" },
  { id: "reports", label: "Отчеты" },
  { id: "users", label: "Пользователи" },
  { id: "settings", label: "Настройки" },
]

export function UserForm({ user }: UserFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    fullName: user?.fullName || "",
    role: (user?.role || "editor") as "admin" | "manager" | "editor",
    isActive: user?.isActive ?? true,
    permissions: user?.permissions || [],
  })

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, permissions: [...formData.permissions, permissionId] })
    } else {
      setFormData({ ...formData, permissions: formData.permissions.filter((p) => p !== permissionId) })
    }
  }

  const handleRoleChange = (role: "admin" | "manager" | "editor") => {
    let permissions = formData.permissions
    if (role === "admin") {
      permissions = ["all"]
    }
    setFormData({ ...formData, role, permissions })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!user && !formData.password) {
      setError("Пароль обязателен для нового пользователя")
      return
    }

    startTransition(async () => {
      try {
        const dataToSend = {
          ...formData,
          ...(formData.password ? { password: formData.password } : {}),
        }

        const result = user ? await updateUserAction(user.id, dataToSend) : await createUserAction(dataToSend as any)

        if (result.success) {
          setSuccess(true)
          setTimeout(() => {
            router.push("/admin/users")
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
          <Label htmlFor="fullName">Полное имя *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Логин *</Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            disabled={isPending}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{user ? "Новый пароль" : "Пароль *"}</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required={!user}
            placeholder={user ? "Оставьте пустым, чтобы не менять" : ""}
            disabled={isPending}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="role">Роль *</Label>
          <Select value={formData.role} onValueChange={(value) => handleRoleChange(value as any)}>
            <SelectTrigger disabled={isPending}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Администратор</SelectItem>
              <SelectItem value="manager">Менеджер</SelectItem>
              <SelectItem value="editor">Редактор</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Статус</Label>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked as boolean })}
              disabled={isPending}
            />
            <label htmlFor="isActive" className="text-sm font-medium leading-none">
              Активен
            </label>
          </div>
        </div>
      </div>

      {formData.role !== "admin" && (
        <div className="space-y-3">
          <Label>Разрешения</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {allPermissions.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-2">
                <Checkbox
                  id={permission.id}
                  checked={formData.permissions.includes(permission.id)}
                  onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                  disabled={isPending}
                />
                <label htmlFor={permission.id} className="text-sm font-medium leading-none">
                  {permission.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Сохранение..." : user ? "Обновить" : "Создать"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
