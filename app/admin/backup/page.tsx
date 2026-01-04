import { requireAuth } from "@/lib/auth"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackupManager } from "@/components/admin/backup-manager"

export default async function BackupPage() {
  const session = await requireAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Резервное копирование</h1>
          <p className="text-muted-foreground">Создание и восстановление резервных копий данных</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Управление резервными копиями</CardTitle>
              <CardDescription>
                Создавайте резервные копии всех данных сайта и восстанавливайте их при необходимости
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BackupManager />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
