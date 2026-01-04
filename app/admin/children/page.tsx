import { requireAuth } from "@/lib/auth"
import { getChildrenAction } from "@/app/actions/children"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ChildrenTable } from "@/components/admin/children-table"

export default async function ChildrenManagementPage() {
  const session = await requireAuth()
  const children = await getChildrenAction()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Управление подопечными</h1>
            <p className="text-muted-foreground">Добавляйте и редактируйте карточки детей</p>
          </div>
          <Button asChild>
            <Link href="/admin/children/new">
              <Plus className="h-4 w-4 mr-2" />
              Добавить ребенка
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Все подопечные</CardTitle>
            <CardDescription>Список всех детей в системе</CardDescription>
          </CardHeader>
          <CardContent>
            <ChildrenTable children={children} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
