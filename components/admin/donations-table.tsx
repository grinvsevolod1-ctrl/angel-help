"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { Donation } from "@/lib/blob-storage"
import { deleteDonationAction, updateDonationAction } from "@/app/actions/donations"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, MoreHorizontal, Check, X } from "lucide-react"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DonationsTableProps {
  donations: Donation[]
}

export function DonationsTable({ donations }: DonationsTableProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      const result = await deleteDonationAction(id)
      if (result.success) {
        setDeleteId(null)
        router.refresh()
      }
    })
  }

  const handleStatusChange = async (id: string, status: Donation["paymentStatus"]) => {
    startTransition(async () => {
      await updateDonationAction(id, { paymentStatus: status })
      router.refresh()
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      case "refunded":
        return "outline"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Завершен"
      case "pending":
        return "Ожидает"
      case "failed":
        return "Ошибка"
      case "refunded":
        return "Возврат"
      default:
        return status
    }
  }

  const getMethodText = (method: string) => {
    switch (method) {
      case "card":
        return "Карта"
      case "bank":
        return "Банк"
      case "sms":
        return "СМС"
      case "crypto":
        return "Крипто"
      default:
        return method
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="pb-3 font-medium text-sm">Донор</th>
              <th className="pb-3 font-medium text-sm">Назначение</th>
              <th className="pb-3 font-medium text-sm">Сумма</th>
              <th className="pb-3 font-medium text-sm">Способ</th>
              <th className="pb-3 font-medium text-sm">Статус</th>
              <th className="pb-3 font-medium text-sm">Дата</th>
              <th className="pb-3 font-medium text-sm text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id} className="border-b last:border-0">
                <td className="py-4">
                  <div className="font-medium">{donation.isAnonymous ? "Аноним" : donation.donorName}</div>
                  <div className="text-xs text-muted-foreground">{donation.donorEmail}</div>
                </td>
                <td className="py-4 text-sm text-muted-foreground">
                  {donation.childName || donation.programName || "Общее"}
                </td>
                <td className="py-4 font-medium text-green-600">
                  {donation.amount.toLocaleString()} ₽
                  {donation.isRecurring && (
                    <span className="text-xs text-muted-foreground block">
                      {donation.recurringPeriod === "monthly" && "ежемесячно"}
                      {donation.recurringPeriod === "quarterly" && "ежеквартально"}
                      {donation.recurringPeriod === "yearly" && "ежегодно"}
                    </span>
                  )}
                </td>
                <td className="py-4 text-sm">{getMethodText(donation.paymentMethod)}</td>
                <td className="py-4">
                  <Badge variant={getStatusColor(donation.paymentStatus)}>
                    {getStatusText(donation.paymentStatus)}
                  </Badge>
                </td>
                <td className="py-4 text-sm text-muted-foreground">
                  {new Date(donation.createdAt).toLocaleDateString("ru-RU")}
                </td>
                <td className="py-4">
                  <div className="flex justify-end gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(donation.id, "completed")}>
                          <Check className="h-4 w-4 mr-2" /> Завершить
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(donation.id, "refunded")}>
                          <X className="h-4 w-4 mr-2" /> Возврат
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteId(donation.id)} disabled={isPending}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {donations.length === 0 && <div className="text-center py-12 text-muted-foreground">Нет пожертвований</div>}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить запись?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Запись о пожертвовании будет удалена.
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
