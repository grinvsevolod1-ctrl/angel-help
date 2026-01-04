import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getNews } from "@/lib/db"
import Image from "next/image"
import { ArrowRight, Calendar } from "lucide-react"

export async function LatestNews() {
  const allNews = await getNews()
  const news = allNews.slice(0, 3)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    })
  }

  return (
    <section id="news" className="py-16 md:py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <span className="text-xs md:text-sm font-medium text-primary uppercase tracking-widest mb-3 block">
              Новости
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">Последние события</h2>
          </div>
          <Button
            variant="ghost"
            className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 hover:bg-primary/5 h-12 px-6 rounded-full"
            asChild
          >
            <Link href="/news">
              Все новости
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:gap-8">
          {news.map((item, index) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row"
            >
              {/* Изображение */}
              <div className="relative w-full md:w-80 lg:w-96 aspect-[16/10] md:aspect-auto md:h-auto flex-shrink-0 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg?height=300&width=500&query=charity news"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Контент */}
              <div className="flex-1 p-5 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-gray-400 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs md:text-sm">{formatDate(item.publishedAt || item.date)}</span>
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed line-clamp-2 mb-4">{item.excerpt}</p>
                <div className="flex items-center gap-2 text-primary font-medium text-sm md:text-base">
                  <span>Читать</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 rounded-full border-2 border-primary/20 hover:bg-primary hover:text-white hover:border-primary bg-transparent"
            asChild
          >
            <Link href="/news">Все новости</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
