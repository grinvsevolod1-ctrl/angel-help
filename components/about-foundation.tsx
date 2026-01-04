import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart } from "lucide-react"

export function AboutFoundation() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Heart className="w-6 h-6 md:w-7 md:h-7 text-primary" />
          </div>
          <span className="text-xs md:text-sm font-medium text-primary uppercase tracking-widest mb-3">О нас</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">О нашем фонде</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 text-center">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Благотворительный фонд «Ваш Ангел Хранитель» призван помогать нуждающимся людям справиться с жизненными
              трудностями и социальными проблемами.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Сегодня миллионы людей нуждаются в поддержке, и мы выступаем эффективным инструментом для оказания
              социальной защиты.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 my-10 md:my-14">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-primary mb-1">500+</div>
              <div className="text-xs md:text-sm text-gray-500">Детей получили помощь</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-primary mb-1">7</div>
              <div className="text-xs md:text-sm text-gray-500">Программ помощи</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-primary mb-1">2023</div>
              <div className="text-xs md:text-sm text-gray-500">Год основания</div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="h-12 md:h-14 px-8 md:px-10 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              asChild
            >
              <Link href="/o-fonde">Узнать больше</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
