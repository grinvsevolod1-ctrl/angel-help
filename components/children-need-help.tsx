import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { getChildren } from "@/lib/db"
import { ChildCardDonateButton } from "@/components/child-card-donate-button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export async function ChildrenNeedHelp() {
  const allChildren = await getChildren()
  const children = allChildren.filter((child) => child.status === "active").slice(0, 6)

  return (
    <section id="children" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Кому помочь</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Им нужна ваша помощь</h2>
        </div>

        {/* Children Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {children.map((child, index) => {
            const progress = (child.currentAmount / child.targetAmount) * 100
            return (
              <Card
                key={child.id}
                className="overflow-hidden border-0 shadow-soft hover:shadow-elevated transition-all duration-300 rounded-2xl sm:rounded-3xl animate-in press-effect"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="aspect-square relative bg-muted">
                  <Image
                    src={child.image || "/placeholder.svg?height=400&width=400"}
                    alt={child.name}
                    fill
                    className="object-cover"
                  />
                  {/* Progress Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
                      <p className="text-xs font-semibold text-primary">{Math.round(progress)}%</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4 sm:p-5">
                  {/* Name & Diagnosis */}
                  <Link href={`/child/${child.id}`}>
                    <h3 className="text-lg font-semibold text-foreground mb-1 hover:text-primary transition-colors">
                      {child.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{child.diagnosis}</p>

                  {/* Progress */}
                  <div className="space-y-2 mb-4">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-primary">
                        {child.currentAmount.toLocaleString("ru-RU")} ₽
                      </span>
                      <span className="text-muted-foreground">из {child.targetAmount.toLocaleString("ru-RU")} ₽</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <ChildCardDonateButton child={child} />
                    <Button
                      variant="ghost"
                      className="w-full h-11 text-sm font-medium text-muted-foreground hover:text-primary rounded-xl touch-target"
                      asChild
                    >
                      <Link href={`/child/${child.id}`}>
                        Читать историю
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8 sm:mt-12">
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 rounded-full border-2 font-semibold press-effect touch-target bg-transparent"
            asChild
          >
            <Link href="/pomoshh">
              Смотреть всех
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
