"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Download, Upload, Loader2, Database, Clock } from "lucide-react"

export function BackupManager() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [restoreStats, setRestoreStats] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCreateBackup = async () => {
    setIsLoading(true)
    setMessage(null)
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

      setMessage({ type: "success", text: "Резервная копия успешно создана и скачана" })
    } catch (error) {
      console.error("Backup error:", error)
      setMessage({ type: "error", text: "Ошибка создания резервной копии" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestoreBackup = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setMessage(null)
    setRestoreStats(null)

    try {
      const content = await file.text()
      const backup = JSON.parse(content)

      const response = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backup),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Restore failed")
      }

      setMessage({ type: "success", text: result.message })
      setRestoreStats(result.stats)
    } catch (error: any) {
      console.error("Restore error:", error)
      setMessage({ type: "error", text: error.message || "Ошибка восстановления данных" })
    } finally {
      setIsLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`flex items-center gap-2 p-4 rounded-lg border ${
            message.type === "success"
              ? "text-green-600 bg-green-50 border-green-200"
              : "text-red-600 bg-red-50 border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {restoreStats && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium mb-2">Статистика восстановления:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Подопечных:</span>{" "}
              <span className="font-medium">{restoreStats.children}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Пожертвований:</span>{" "}
              <span className="font-medium">{restoreStats.donations}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Программ:</span>{" "}
              <span className="font-medium">{restoreStats.programs}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Новостей:</span>{" "}
              <span className="font-medium">{restoreStats.news}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Download className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Создать резервную копию</h3>
              <p className="text-sm text-muted-foreground">Скачать все данные в JSON формате</p>
            </div>
          </div>
          <Button onClick={handleCreateBackup} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Создание...
              </>
            ) : (
              <>
                <Database className="h-4 w-4 mr-2" />
                Создать резервную копию
              </>
            )}
          </Button>
        </div>

        <div className="p-6 border rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Upload className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Восстановить из копии</h3>
              <p className="text-sm text-muted-foreground">Загрузить данные из файла</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="backup-file" className="sr-only">
              Выберите файл резервной копии
            </Label>
            <Input
              id="backup-file"
              type="file"
              accept=".json"
              onChange={handleRestoreBackup}
              disabled={isLoading}
              ref={fileInputRef}
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Рекомендация</h4>
            <p className="text-sm text-yellow-700">
              Создавайте резервные копии регулярно, особенно перед важными изменениями. Рекомендуется делать копии не
              реже одного раза в неделю.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
