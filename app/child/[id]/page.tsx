import { getChildren } from "@/lib/db"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"
import { notFound } from "next/navigation"
import { DonateToChildForm } from "@/components/donate-to-child-form"

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const children = await getChildren()
  const child = children.find((c) => c.id === id)

  if (!child) {
    return {
      title: "Ребенок не найден",
    }
  }

  return {
    title: `${child.name} | Ваш Ангел Хранитель`,
    description: child.story.substring(0, 160),
  }
}

export default async function ChildPage({ params }: PageProps) {
  // Await params for Next.js 15
  const { id } = await params
  const children = await getChildren()
  const child = children.find((c) => c.id === id)

  if (!child) {
    notFound()
  }

  const progress = (child.currentAmount / child.targetAmount) * 100

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/#children">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к списку
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 mb-6">
                  <img
                    src={child.image || "/placeholder.svg"}
                    alt={child.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">{child.name}</h1>
                <p className="text-lg text-gray-600 mb-6">
                  {child.age} {child.age === 1 ? "год" : child.age < 5 ? "года" : "лет"} • {child.diagnosis}
                </p>

                <div className="prose max-w-none">
                  <h2 className="text-xl font-bold mb-4">История</h2>
                  <p className="text-gray-700 whitespace-pre-line">{child.story}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-2xl font-bold text-green-600">
                      {child.currentAmount.toLocaleString("ru-RU")} ₽
                    </span>
                    <span className="text-lg text-gray-500">{child.targetAmount.toLocaleString("ru-RU")} ₽</span>
                  </div>
                  <Progress value={progress} className="h-3 mb-2" />
                  <p className="text-sm text-gray-500">уже собрано / необходимо</p>
                </div>

                <DonateToChildForm child={child} />

                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold mb-1">Каждый рубль важен</p>
                      <p className="text-gray-600">
                        Ваше пожертвование поможет {child.name} получить необходимое лечение
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
