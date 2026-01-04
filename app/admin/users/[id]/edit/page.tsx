import { requireAuth } from "@/lib/auth"
import { getUserByIdAction } from "@/app/actions/users"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserForm } from "@/components/admin/user-form"
import { notFound } from "next/navigation"

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth()
  const { id } = await params
  const user = await getUserByIdAction(id)

  if (!user) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Редактировать пользователя</h1>
          <p className="text-muted-foreground">Измените информацию о пользователе</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Информация о пользователе</CardTitle>
            <CardDescription>Внесите необходимые изменения</CardDescription>
          </CardHeader>
          <CardContent>
            <UserForm user={user} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
