import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"

export const metadata = {
  title: "Статьи | Ваш Ангел Хранитель",
  description: "Статьи и публикации благотворительного фонда Ваш Ангел Хранитель",
}

const articles = [
  {
    id: 1,
    title: "Против катастрофы: Джефф Безос софинансирует благотворительный фонд на миллиард долларов",
    excerpt:
      "Неправительственная организация «World Central Kitchen» помогает после стихийных бедствий накормить пострадавших, создавая полевые кухни, снабжая их продуктами и предоставляя поваров.",
    image: "https://angel-help.org/_thumbs/article/1/6778-1.jpg",
    date: "2024-01-08",
    slug: "protiv-katastrofy-dzheff-bezos-sofinansiruet-blagotvoritelnyj-fond-na-milliard-dollarov",
  },
  {
    id: 2,
    title: "Благотворительность в России: Меняем мир к лучшему вместе",
    excerpt:
      "Благотворительность – это неотъемлемая часть общественной жизни, способствующая поддержке нуждающихся и созданию благоприятной социальной среды. В России эта традиция прочно укоренилась",
    image: "https://angel-help.org/_thumbs/article/1/1708296784_0496823b16eb0db314655dd182ffd580-scaled-min.webp",
    date: "2023-11-20",
    slug: "blagotvoritelnost-v-rossii-menyaem-mir-k-luchshemu-vmeste",
  },
  {
    id: 3,
    title: "Зачем обществу нужна благотворительность?",
    excerpt:
      "Благотворительность не решает всех проблем общества. Но она помогает ему стать лучше, добрее и мудрее. Помощь другим – это путь к развитию человечества. В этой статье приведены 6 достоинств",
    image: "/charity-hands-together.jpg",
    date: "2023-11-20",
    slug: "zachem-obcshestvu-nuzhna-blagotvoritelnost",
  },
]

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Статьи нашего фонда</h1>
            <p className="text-xl text-white/90">Обсуждаем важные темы благотворительности и помощи людям</p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="md:w-2/3 p-6 md:p-8">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.date).toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>
                      <Button variant="default" className="bg-gradient-to-r from-orange-500 to-red-500" asChild>
                        <Link href={`/articles/${article.slug}`}>Читать далее →</Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
