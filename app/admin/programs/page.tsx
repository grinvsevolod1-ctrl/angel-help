import { requireAuth } from "@/lib/auth"
import { getProgramsAction } from "@/app/actions/programs"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ProgramsTable } from "@/components/admin/programs-table"

export default async function ProgramsManagementPage() {
  const session = await requireAuth()
  const programs = await getProgramsAction()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Управление программами</h1>
            <p className="text-muted-foreground">Создавайте и редактируйте благотворительные программы</p>
          </div>
          <Button asChild>
            <Link href="/admin/programs/new">
              <Plus className="h-4 w-4 mr-2" />
              Добавить программу
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Все программы</CardTitle>
            <CardDescription>Список всех программ фонда</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgramsTable programs={programs} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
