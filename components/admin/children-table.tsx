"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { Child } from "@/lib/blob-storage"
import { deleteChildAction } from "@/app/actions/children"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
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

interface ChildrenTableProps {
  children: Child[]
}

export function ChildrenTable({ children }: ChildrenTableProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      const result = await deleteChildAction(id)
      if (result.success) {
        setDeleteId(null)
        router.refresh()
      }
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "completed":
        return "secondary"
      case "archived":
        return "outline"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активен"
      case "completed":
        return "Завершен"
      case "archived":
        return "Архив"
      default:
        return status
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="pb-3 font-medium text-sm">Имя</th>
              <th className="pb-3 font-medium text-sm">Возраст</th>
              <th className="pb-3 font-medium text-sm">Диагноз</th>
              <th className="pb-3 font-medium text-sm">Прогресс</th>
              <th className="pb-3 font-medium text-sm">Статус</th>
              <th className="pb-3 font-medium text-sm text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {children.map((child) => {
              const progress = Math.round((child.currentAmount / child.targetAmount) * 100)
              return (
                <tr key={child.id} className="border-b last:border-0">
                  <td className="py-4 font-medium">{child.name}</td>
                  <td className="py-4 text-sm text-muted-foreground">{child.age} лет</td>
                  <td className="py-4 text-sm text-muted-foreground">{child.diagnosis}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[100px] h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${Math.min(progress, 100)}%` }} />
                      </div>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge variant={getStatusColor(child.status)}>{getStatusText(child.status)}</Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/children/${child.id}/edit`)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteId(child.id)} disabled={isPending}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {children.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">Нет добавленных подопечных</div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить подопечного?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Карточка будет удалена навсегда.
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
