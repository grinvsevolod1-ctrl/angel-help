import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Программы фонда | Ваш Ангел Хранитель",
  description: "Программы благотворительного фонда Ваш Ангел Хранитель",
}

const programs = [
  {
    title: "Программа помощи больным детям",
    description:
      "Оказываем помощь детям с тяжелыми заболеваниями, оплачиваем лечение, реабилитацию и необходимые медикаменты.",
    icon: "https://angel-help.org/site/images/1/1-1.svg",
    slug: "programma-pomocshi-bolnym-detyam",
  },
  {
    title: "Сбор на Ящики Добра",
    description:
      "Устанавливаем ящики для сбора благотворительных пожертвований в различных локациях города для помощи нуждающимся.",
    icon: "https://angel-help.org/site/images/1/eifwf1xj3ooyyplbhkj5wd1jcvx5q1yhmbsjgntv.svg",
    slug: "sbor-na-yacshiki-dobra",
  },
  {
    title: "Программа помощи онкобольным женщинам",
    description:
      "Поддерживаем женщин, борющихся с онкологическими заболеваниями, оплачиваем лечение и предоставляем психологическую помощь.",
    icon: "https://angel-help.org/site/images/1/ioxukqshsai31sp5klduei8ertogimsntft6fpof.svg",
    slug: "programma-pomocshi-onkobolnym-zhencshinam",
  },
  {
    title: "Вместе меняем мир: Программа помощи малоимущим",
    description:
      "Оказываем материальную и продуктовую помощь малоимущим семьям, помогаем с одеждой и предметами первой необходимости.",
    icon: "https://angel-help.org/site/images/1/i2zoozrwshhsnimdynmjfrhqsbr9slq9facoirhd.svg",
    slug: "vmeste-menyaem-mir-programma-pomocshi-maloimucshim",
  },
  {
    title: "Программа помощи людям преклонного возраста",
    description:
      "Помогаем пожилым людям с продуктами, лекарствами и предметами первой необходимости, организуем социальную поддержку.",
    icon: "https://angel-help.org/site/images/1/iuje4ecpft3djhwy81mbu6z2ipjiauw7frcqqjfr.svg",
    slug: "programma-pomocshi-lyudyam-preklonnogo-vozrasta",
  },
  {
    title: "Программа помощи медицинским учреждениям",
    description: "Закупаем необходимое оборудование и расходные материалы для больниц и медицинских центров.",
    icon: "https://angel-help.org/site/images/1/dggfoaaul9xd9uezjtqwk0wg5zmyhpxkcji8d9wu.svg",
    slug: "programma-pomocshi-medicinskim-ucherezhdeniyam",
  },
  {
    title: "Программа помощи детям-сиротам",
    description:
      "Поддерживаем детские дома и интернаты, организуем праздники для детей, помогаем с одеждой и учебными материалами.",
    icon: "https://angel-help.org/site/images/1/v5yprl8soxazkrgtyn5jkihdfhnaa3gcc7krxn7e.svg",
    slug: "programma-pomocshi-detyam-sirotam",
  },
  {
    title: "Помощь в Организации Деятельности Фонда",
    description:
      "Волонтерская программа для тех, кто хочет помочь в организации работы фонда, участвовать в акциях и мероприятиях.",
    icon: "https://angel-help.org/site/images/1/2.svg",
    slug: "pomocsh-v-organizacii-deyatelnosti-fonda",
  },
]

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Программы фонда</h1>
            <p className="text-xl text-white/90">
              Мы реализуем различные благотворительные программы для помощи нуждающимся
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card
                key={program.slug}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary"
              >
                <CardContent className="p-6">
                  <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Image
                        src={program.icon || "/placeholder.svg"}
                        alt={program.title}
                        width={48}
                        height={48}
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                      Волонтерство
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" asChild>
                      <Link href={`/programs/${program.slug}`}>Подробнее →</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Хотите стать волонтером?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к нашей команде и помогайте менять мир к лучшему
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
            <Link href="/#donate">Связаться с нами</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
