import { requireAuth } from "@/lib/auth"
import { getNewsAction } from "@/app/actions/news"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { NewsTable } from "@/components/admin/news-table"

export default async function NewsManagementPage() {
  const session = await requireAuth()
  const news = await getNewsAction()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Управление новостями</h1>
            <p className="text-muted-foreground">Публикуйте новости и отчеты фонда</p>
          </div>
          <Button asChild>
            <Link href="/admin/news/new">
              <Plus className="h-4 w-4 mr-2" />
              Добавить новость
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Все новости</CardTitle>
            <CardDescription>Список всех опубликованных новостей</CardDescription>
          </CardHeader>
          <CardContent>
            <NewsTable news={news} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
