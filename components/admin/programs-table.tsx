"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { Program } from "@/lib/blob-storage"
import { deleteProgramAction } from "@/app/actions/programs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, ExternalLink } from "lucide-react"
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
import Link from "next/link"

interface ProgramsTableProps {
  programs: Program[]
}

export function ProgramsTable({ programs }: ProgramsTableProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      const result = await deleteProgramAction(id)
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
      case "paused":
        return "secondary"
      case "completed":
        return "outline"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активна"
      case "paused":
        return "Приостановлена"
      case "completed":
        return "Завершена"
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
              <th className="pb-3 font-medium text-sm">Название</th>
              <th className="pb-3 font-medium text-sm">Описание</th>
              <th className="pb-3 font-medium text-sm">Статус</th>
              <th className="pb-3 font-medium text-sm text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => (
              <tr key={program.id} className="border-b last:border-0">
                <td className="py-4">
                  <div className="font-medium">{program.title}</div>
                  <div className="text-xs text-muted-foreground">{program.slug}</div>
                </td>
                <td className="py-4 text-sm text-muted-foreground max-w-xs truncate">{program.description}</td>
                <td className="py-4">
                  <Badge variant={getStatusColor(program.status)}>{getStatusText(program.status)}</Badge>
                </td>
                <td className="py-4">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/programs/${program.slug}`} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/programs/${program.id}/edit`)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteId(program.id)} disabled={isPending}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {programs.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">Нет добавленных программ</div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить программу?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Программа будет удалена навсегда.
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
