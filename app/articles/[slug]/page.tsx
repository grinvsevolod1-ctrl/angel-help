import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

const articles = [
  {
    id: 1,
    title: "Против катастрофы: Джефф Безос софинансирует благотворительный фонд на миллиард долларов",
    content: `
      <p>Неправительственная организация «World Central Kitchen» помогает после стихийных бедствий накормить пострадавших, создавая полевые кухни, снабжая их продуктами и предоставляя поваров.</p>
      
      <p>Организация оказала помощь более чем 60 миллионам людей в 62 странах мира. Джефф Безос выделил на её развитие 100 млн долларов – для помощи пострадавшим от урагана «Отис» в Мексике.</p>
      
      <h2>История организации</h2>
      <p>World Central Kitchen была основана испанским шеф-поваром Хосе Андресом в 2010 году после землетрясения на Гаити. С тех пор организация выросла в глобальную сеть помощи при чрезвычайных ситуациях.</p>
      
      <h2>Результаты работы</h2>
      <p>За годы своей деятельности организация помогла миллионам людей по всему миру, предоставляя горячее питание в самых сложных условиях. Их команды работают в зонах военных конфликтов, после природных катастроф и в условиях гуманитарных кризисов.</p>
      
      <p>Благодаря поддержке таких филантропов как Джефф Безос, организация может масштабировать свою деятельность и помогать еще большему количеству людей.</p>
    `,
    image: "https://angel-help.org/_thumbs/article/1/6778-1.jpg",
    date: "2024-01-08",
    slug: "protiv-katastrofy-dzheff-bezos-sofinansiruet-blagotvoritelnyj-fond-na-milliard-dollarov",
  },
  {
    id: 2,
    title: "Благотворительность в России: Меняем мир к лучшему вместе",
    content: `
      <p>Благотворительность – это неотъемлемая часть общественной жизни, способствующая поддержке нуждающихся и созданию благоприятной социальной среды. В России эта традиция прочно укоренилась и продолжает развиваться.</p>
      
      <h2>История благотворительности в России</h2>
      <p>Благотворительность в России имеет глубокие исторические корни. Еще в древней Руси существовала традиция помощи нуждающимся, которая была тесно связана с православной верой и идеей милосердия.</p>
      
      <h2>Современное состояние</h2>
      <p>Сегодня в России действуют тысячи благотворительных организаций, помогающих детям, пожилым людям, людям с ограниченными возможностями и другим социально уязвимым группам населения.</p>
      
      <h2>Как помочь?</h2>
      <p>Каждый может внести свой вклад в благотворительность - будь то финансовая помощь, волонтерство или просто распространение информации о нуждающихся людях. Вместе мы можем изменить мир к лучшему.</p>
    `,
    image: "https://angel-help.org/_thumbs/article/1/1708296784_0496823b16eb0db314655dd182ffd580-scaled-min.webp",
    date: "2023-11-20",
    slug: "blagotvoritelnost-v-rossii-menyaem-mir-k-luchshemu-vmeste",
  },
  {
    id: 3,
    title: "Зачем обществу нужна благотворительность?",
    content: `
      <p>Благотворительность не решает всех проблем общества. Но она помогает ему стать лучше, добрее и мудрее. Помощь другим – это путь к развитию человечества.</p>
      
      <h2>6 причин, почему благотворительность важна:</h2>
      
      <h3>1. Помощь нуждающимся</h3>
      <p>Самая очевидная причина - благотворительность помогает людям, которые оказались в трудной жизненной ситуации. Это может быть финансовая помощь, медицинская поддержка или просто моральная поддержка.</p>
      
      <h3>2. Развитие эмпатии</h3>
      <p>Участие в благотворительности развивает способность сопереживать другим людям. Это делает общество более человечным и сплоченным.</p>
      
      <h3>3. Социальная справедливость</h3>
      <p>Благотворительность помогает сократить социальное неравенство, предоставляя возможности тем, у кого их меньше.</p>
      
      <h3>4. Личностный рост</h3>
      <p>Помогая другим, люди развиваются как личности, становятся более ответственными и осознанными.</p>
      
      <h3>5. Создание сообщества</h3>
      <p>Благотворительные проекты объединяют людей с общими ценностями и целями.</p>
      
      <h3>6. Пример для будущих поколений</h3>
      <p>Участвуя в благотворительности, мы показываем детям важность помощи другим и заботы об обществе.</p>
    `,
    image: "/charity-hands-together.jpg",
    date: "2023-11-20",
    slug: "zachem-obcshestvu-nuzhna-blagotvoritelnost",
  },
]

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return {
      title: "Статья не найдена",
    }
  }

  return {
    title: `${article.title} | Ваш Ангел Хранитель`,
    description: article.content.substring(0, 160).replace(/<[^>]*>/g, ""),
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6" asChild>
              <Link href="/articles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к статьям
              </Link>
            </Button>

            <div className="flex items-center gap-2 text-white/90 mb-4">
              <Calendar className="h-5 w-5" />
              {new Date(article.date).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">{article.title}</h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="relative w-full h-96 mb-12 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Body */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Back Button */}
            <div className="mt-16 pt-8 border-t">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                asChild
              >
                <Link href="/articles">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Вернуться к списку статей
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
