import { requireAuth } from "@/lib/auth"
import { getNewsByIdAction } from "@/app/actions/news"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsForm } from "@/components/admin/news-form"
import { notFound } from "next/navigation"

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth()
  const { id } = await params
  const news = await getNewsByIdAction(id)

  if (!news) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Редактировать новость</CardTitle>
            <CardDescription>Обновите информацию о новости</CardDescription>
          </CardHeader>
          <CardContent>
            <NewsForm news={news} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
