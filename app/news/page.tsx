import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getNews } from "@/lib/db"
import { Calendar } from "lucide-react"

export const metadata = {
  title: "Новости фонда | Ваш Ангел Хранитель",
  description: "Последние новости благотворительного фонда Ваш Ангел Хранитель",
}

export default async function NewsPage() {
  const allNews = await getNews()

  // Sort news by date (newest first) — безопасно
  const sortedNews = allNews.sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return dateB - dateA
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Новости фонда</h1>
            <p className="text-xl text-white/90">Следите за последними событиями и успехами наших подопечных</p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {sortedNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Пока нет новостей</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedNews.map((news) => (
                <Card
                  key={news.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={news.image || "/placeholder.svg?height=300&width=400"}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4" />
                      {news.publishedAt
                        ? new Date(news.publishedAt).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Дата не указана"}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{news.excerpt}</p>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0" asChild>
                      <Link href={`/news/${news.id}`}>Читать далее →</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
