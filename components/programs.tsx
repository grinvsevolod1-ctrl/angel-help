import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Home, Building2, HandHeart, Baby, Briefcase, Stethoscope } from "lucide-react"
import Link from "next/link"

const programs = [
  { id: 1, title: "Ящики Добра", icon: Home, slug: "sbor-na-yacshiki-dobra" },
  { id: 2, title: "Помощь онкобольным", icon: Heart, slug: "programma-pomocshi-onkobolnym-zhencshinam" },
  { id: 3, title: "Помощь малоимущим", icon: Users, slug: "vmeste-menyaem-mir-programma-pomocshi-maloimucshim" },
  { id: 4, title: "Помощь пожилым", icon: HandHeart, slug: "programma-pomocshi-lyudyam-preklonnogo-vozrasta" },
  { id: 5, title: "Медицинским учреждениям", icon: Building2, slug: "programma-pomocshi-medicinskim-ucherezhdeniyam" },
  { id: 6, title: "Детям-сиротам", icon: Baby, slug: "programma-pomocshi-detyam-sirotam" },
  { id: 7, title: "Деятельность фонда", icon: Briefcase, slug: "pomocsh-v-organizacii-deyatelnosti-fonda" },
  { id: 8, title: "Больным детям", icon: Stethoscope, slug: "programma-pomocshi-bolnym-detyam" },
]

export function Programs() {
  return (
    <section id="programs" className="py-12 sm:py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Программы</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Наши программы помощи</h2>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {programs.map((program, index) => {
            const Icon = program.icon
            return (
              <Link key={program.id} href={`/programs/${program.slug}`}>
                <Card
                  className="h-full border-0 shadow-soft hover:shadow-elevated transition-all duration-300 rounded-xl sm:rounded-2xl press-effect animate-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-4 sm:p-5 flex flex-col items-center text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-foreground leading-tight">{program.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
