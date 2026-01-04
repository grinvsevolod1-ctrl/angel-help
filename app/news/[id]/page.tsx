import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getNews } from "@/lib/db"
import { notFound } from "next/navigation"
import { Calendar, ArrowLeft } from "lucide-react"

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const allNews = await getNews()
  const news = allNews.find((n) => n.id === id)

  if (!news) {
    return {
      title: "Новость не найдена",
    }
  }

  return {
    title: `${news.title} | Ваш Ангел Хранитель`,
    description: news.excerpt,
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params
  const allNews = await getNews()
  const news = allNews.find((n) => n.id === id)

  if (!news) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80" asChild>
              <Link href="/news">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к новостям
              </Link>
            </Button>

            {/* News Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
              <Image
                src={news.image || "/placeholder.svg?height=400&width=800"}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* News Header */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Calendar className="h-4 w-4" />
              {news.publishedAt
                ? new Date(news.publishedAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Дата не указана"}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{news.title}</h1>

            {/* News Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">{news.excerpt}</p>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">{news.content}</div>
            </div>

            {/* Share / Back Section */}
            <div className="mt-12 pt-8 border-t flex justify-between items-center">
              <Button variant="default" className="bg-gradient-to-r from-orange-500 to-red-500" asChild>
                <Link href="/news">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Все новости
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
