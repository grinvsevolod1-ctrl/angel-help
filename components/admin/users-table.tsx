"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { AdminUser } from "@/lib/blob-storage"
import { deleteUserAction, updateUserAction } from "@/app/actions/users"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, UserCheck, UserX } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface UsersTableProps {
  users: AdminUser[]
  currentUserId: string
}

export function UsersTable({ users, currentUserId }: UsersTableProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      const result = await deleteUserAction(id)
      if (result.success) {
        setDeleteId(null)
        router.refresh()
      }
    })
  }

  const handleToggleActive = async (id: string, isActive: boolean) => {
    startTransition(async () => {
      await updateUserAction(id, { isActive: !isActive })
      router.refresh()
    })
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "default"
      case "manager":
        return "secondary"
      case "editor":
        return "outline"
      default:
        return "default"
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "Администратор"
      case "manager":
        return "Менеджер"
      case "editor":
        return "Редактор"
      default:
        return role
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="pb-3 font-medium text-sm">Пользователь</th>
              <th className="pb-3 font-medium text-sm">Email</th>
              <th className="pb-3 font-medium text-sm">Роль</th>
              <th className="pb-3 font-medium text-sm">Статус</th>
              <th className="pb-3 font-medium text-sm">Последний вход</th>
              <th className="pb-3 font-medium text-sm text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="py-4">
                  <div className="font-medium">{user.fullName}</div>
                  <div className="text-xs text-muted-foreground">@{user.username}</div>
                </td>
                <td className="py-4 text-sm text-muted-foreground">{user.email}</td>
                <td className="py-4">
                  <Badge variant={getRoleColor(user.role)}>{getRoleText(user.role)}</Badge>
                </td>
                <td className="py-4">
                  <Badge variant={user.isActive ? "default" : "secondary"}>
                    {user.isActive ? "Активен" : "Неактивен"}
                  </Badge>
                </td>
                <td className="py-4 text-sm text-muted-foreground">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString("ru-RU") : "Никогда"}
                </td>
                <td className="py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(user.id, user.isActive)}
                      disabled={isPending || user.id === currentUserId}
                    >
                      {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/users/${user.id}/edit`)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(user.id)}
                      disabled={isPending || user.id === currentUserId}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && <div className="text-center py-12 text-muted-foreground">Нет пользователей</div>}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить пользователя?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Пользователь потеряет доступ к системе.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)} disabled={isPending}>
              {isPending ? "Удаление..." : "Удалить"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
