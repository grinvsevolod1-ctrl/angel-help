import { requireAuth } from "@/lib/auth"
import { getProgramByIdAction } from "@/app/actions/programs"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgramForm } from "@/components/admin/program-form"
import { notFound } from "next/navigation"

export default async function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth()
  const { id } = await params
  const program = await getProgramByIdAction(id)

  if (!program) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Редактировать программу</h1>
          <p className="text-muted-foreground">Измените информацию о программе</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Информация о программе</CardTitle>
            <CardDescription>Внесите необходимые изменения</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgramForm program={program} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
