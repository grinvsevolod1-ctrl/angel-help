import { requireAuth } from "@/lib/auth"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsForm } from "@/components/admin/news-form"

export default async function NewNewsPage() {
  const session = await requireAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Добавить новость</CardTitle>
            <CardDescription>Опубликуйте новость или отчет фонда</CardDescription>
          </CardHeader>
          <CardContent>
            <NewsForm />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
