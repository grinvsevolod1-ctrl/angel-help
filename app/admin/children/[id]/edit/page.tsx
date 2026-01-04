import { requireAuth } from "@/lib/auth"
import { getChildByIdAction } from "@/app/actions/children"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChildForm } from "@/components/admin/child-form"
import { notFound } from "next/navigation"

export default async function EditChildPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth()
  const { id } = await params
  const child = await getChildByIdAction(id)

  if (!child) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Редактировать подопечного</CardTitle>
            <CardDescription>Обновите информацию о ребенке</CardDescription>
          </CardHeader>
          <CardContent>
            <ChildForm child={child} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
