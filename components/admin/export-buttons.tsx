"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, FileSpreadsheet, Database, Loader2 } from "lucide-react"

export function ExportButtons() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (type: string) => {
    setIsExporting(true)
    try {
      const response = await fetch(`/api/reports/export?type=${type}`)
      if (!response.ok) throw new Error("Export failed")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${type}-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Export error:", error)
      alert("Ошибка экспорта данных")
    } finally {
      setIsExporting(false)
    }
  }

  const handleBackup = async () => {
    setIsExporting(true)
    try {
      const response = await fetch("/api/backup")
      if (!response.ok) throw new Error("Backup failed")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `backup-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Backup error:", error)
      alert("Ошибка создания резервной копии")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting}>
          {isExporting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
          Экспорт
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("donations")}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Пожертвования (CSV)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("children")}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Подопечные (CSV)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("programs")}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Программы (CSV)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleBackup}>
          <Database className="h-4 w-4 mr-2" />
          Полная резервная копия (JSON)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
