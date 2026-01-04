import { requireAuth } from "@/lib/auth"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChildForm } from "@/components/admin/child-form"

export default async function NewChildPage() {
  const session = await requireAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Добавить подопечного</CardTitle>
            <CardDescription>Заполните информацию о ребенке</CardDescription>
          </CardHeader>
          <CardContent>
            <ChildForm />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
