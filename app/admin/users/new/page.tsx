import { requireAuth } from "@/lib/auth"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserForm } from "@/components/admin/user-form"

export default async function NewUserPage() {
  const session = await requireAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Добавить пользователя</h1>
          <p className="text-muted-foreground">Создайте нового администратора или редактора</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Информация о пользователе</CardTitle>
            <CardDescription>Заполните все необходимые поля</CardDescription>
          </CardHeader>
          <CardContent>
            <UserForm />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
