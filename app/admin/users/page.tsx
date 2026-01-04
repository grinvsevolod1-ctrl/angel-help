import { requireAuth } from "@/lib/auth"
import { getUsersAction } from "@/app/actions/users"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { UsersTable } from "@/components/admin/users-table"

export default async function UsersManagementPage() {
  const session = await requireAuth()
  const users = await getUsersAction()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Управление пользователями</h1>
            <p className="text-muted-foreground">Администраторы и редакторы системы</p>
          </div>
          <Button asChild>
            <Link href="/admin/users/new">
              <Plus className="h-4 w-4 mr-2" />
              Добавить пользователя
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Все пользователи</CardTitle>
            <CardDescription>Список пользователей админ-панели</CardDescription>
          </CardHeader>
          <CardContent>
            <UsersTable users={users} currentUserId={session.userId} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
