import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, Users, Target } from "lucide-react"
import { notFound } from "next/navigation"

const programs = [
  {
    id: 1,
    title: "Программа помощи больным детям",
    description:
      "Оказываем помощь детям с тяжелыми заболеваниями, оплачиваем лечение, реабилитацию и необходимые медикаменты.",
    fullDescription: `
      Программа помощи больным детям - одна из наших ключевых программ. Мы помогаем семьям, столкнувшимся с тяжелыми заболеваниями детей.
      
      **Что мы делаем:**
      - Оплачиваем дорогостоящее лечение и операции
      - Закупаем необходимые медикаменты
      - Организуем реабилитацию после лечения
      - Обеспечиваем психологическую поддержку семей
      - Помогаем с транспортировкой в медицинские учреждения
      
      За время работы программы мы помогли более 500 детям получить необходимое лечение и вернуться к полноценной жизни.
    `,
    icon: "https://angel-help.org/site/images/1/1-1.svg",
    slug: "programma-pomocshi-bolnym-detyam",
    stats: {
      helped: "500+ детей",
      volunteers: "50+ волонтеров",
      budget: "15 млн ₽",
    },
  },
  {
    id: 2,
    title: "Сбор на Ящики Добра",
    description:
      "Устанавливаем ящики для сбора благотворительных пожертвований в различных локациях города для помощи нуждающимся.",
    fullDescription: `
      Проект "Ящики Добра" позволяет каждому человеку легко внести свой вклад в благотворительность.
      
      **Как это работает:**
      - Мы устанавливаем специальные ящики в торговых центрах, офисных зданиях и других общественных местах
      - Люди могут опустить деньги или вещи в эти ящики
      - Все собранные средства идут на помощь нуждающимся
      - Мы регулярно публикуем отчеты о собранных средствах
      
      На сегодняшний день установлено более 100 ящиков по всему городу.
    `,
    icon: "https://angel-help.org/site/images/1/eifwf1xj3ooyyplbhkj5wd1jcvx5q1yhmbsjgntv.svg",
    slug: "sbor-na-yacshiki-dobra",
    stats: {
      helped: "100+ ящиков",
      volunteers: "30+ волонтеров",
      budget: "5 млн ₽",
    },
  },
  {
    id: 3,
    title: "Программа помощи онкобольным женщинам",
    description:
      "Поддерживаем женщин, борющихся с онкологическими заболеваниями, оплачиваем лечение и предоставляем психологическую помощь.",
    fullDescription: `
      Онкологические заболевания требуют не только медицинской, но и психологической поддержки.
      
      **Наша помощь включает:**
      - Оплату химиотерапии и лучевой терапии
      - Закупку дорогостоящих препаратов
      - Организацию консультаций с ведущими онкологами
      - Психологическую поддержку пациенток и их семей
      - Помощь в реабилитации после лечения
      
      Мы помогли более 200 женщинам в борьбе с онкологией.
    `,
    icon: "https://angel-help.org/site/images/1/ioxukqshsai31sp5klduei8ertogimsntft6fpof.svg",
    slug: "programma-pomocshi-onkobolnym-zhencshinam",
    stats: {
      helped: "200+ женщин",
      volunteers: "25+ волонтеров",
      budget: "10 млн ₽",
    },
  },
  {
    id: 4,
    title: "Вместе меняем мир: Программа помощи малоимущим",
    description:
      "Оказываем материальную и продуктовую помощь малоимущим семьям, помогаем с одеждой и предметами первой необходимости.",
    fullDescription: `
      Программа направлена на поддержку семей, оказавшихся в трудной жизненной ситуации.
      
      **Виды помощи:**
      - Продуктовые наборы для семей
      - Одежда и обувь для детей и взрослых
      - Предметы первой необходимости
      - Помощь в оплате коммунальных услуг
      - Содействие в трудоустройстве
      
      Ежемесячно мы помогаем более 300 семьям.
    `,
    icon: "https://angel-help.org/site/images/1/i2zoozrwshhsnimdynmjfrhqsbr9slq9facoirhd.svg",
    slug: "vmeste-menyaem-mir-programma-pomocshi-maloimucshim",
    stats: {
      helped: "300+ семей",
      volunteers: "60+ волонтеров",
      budget: "8 млн ₽",
    },
  },
  {
    id: 5,
    title: "Программа помощи людям преклонного возраста",
    description:
      "Помогаем пожилым людям с продуктами, лекарствами и предметами первой необходимости, организуем социальную поддержку.",
    fullDescription: `
      Пожилые люди особенно нуждаются в нашей заботе и внимании.
      
      **Что мы предлагаем:**
      - Доставка продуктов и лекарств на дом
      - Помощь в уборке и бытовых вопросах
      - Социальное сопровождение и общение
      - Организация досуга и культурных мероприятий
      - Медицинская помощь и консультации
      
      Более 400 пожилых людей получают нашу регулярную поддержку.
    `,
    icon: "https://angel-help.org/site/images/1/iuje4ecpft3djhwy81mbu6z2ipjiauw7frcqqjfr.svg",
    slug: "programma-pomocshi-lyudyam-preklonnogo-vozrasta",
    stats: {
      helped: "400+ человек",
      volunteers: "45+ волонтеров",
      budget: "6 млн ₽",
    },
  },
  {
    id: 6,
    title: "Программа помощи медицинским учреждениям",
    description: "Закупаем необходимое оборудование и расходные материалы для больниц и медицинских центров.",
    fullDescription: `
      Современное медицинское оборудование спасает жизни. Мы помогаем больницам получить необходимую технику.
      
      **Наша деятельность:**
      - Закупка медицинского оборудования
      - Поставка расходных материалов
      - Ремонт и модернизация техники
      - Обучение персонала работе с новым оборудованием
      - Поддержка отделений реанимации и интенсивной терапии
      
      Мы сотрудничаем с 15 медицинскими учреждениями.
    `,
    icon: "https://angel-help.org/site/images/1/dggfoaaul9xd9uezjtqwk0wg5zmyhpxkcji8d9wu.svg",
    slug: "programma-pomocshi-medicinskim-ucherezhdeniyam",
    stats: {
      helped: "15 учреждений",
      volunteers: "20+ волонтеров",
      budget: "20 млн ₽",
    },
  },
  {
    id: 7,
    title: "Программа помощи детям-сиротам",
    description:
      "Поддерживаем детские дома и интернаты, организуем праздники для детей, помогаем с одеждой и учебными материалами.",
    fullDescription: `
      Дети-сироты особенно нуждаются в любви, заботе и поддержке.
      
      **Наша работа включает:**
      - Организацию праздников и развлекательных мероприятий
      - Закупку одежды и обуви
      - Помощь с учебными материалами и книгами
      - Содействие в получении образования
      - Подготовку к самостоятельной жизни
      
      Мы работаем с 10 детскими домами и помогаем более 500 детям.
    `,
    icon: "https://angel-help.org/site/images/1/v5yprl8soxazkrgtyn5jkihdfhnaa3gcc7krxn7e.svg",
    slug: "programma-pomocshi-detyam-sirotam",
    stats: {
      helped: "500+ детей",
      volunteers: "70+ волонтеров",
      budget: "12 млн ₽",
    },
  },
  {
    id: 8,
    title: "Помощь в Организации Деятельности Фонда",
    description:
      "Волонтерская программа для тех, кто хочет помочь в организации работы фонда, участвовать в акциях и мероприятиях.",
    fullDescription: `
      Стать волонтером нашего фонда - это возможность изменить мир к лучшему.
      
      **Чем можно помочь:**
      - Участие в благотворительных акциях
      - Помощь в организации мероприятий
      - Работа с документами и отчетностью
      - Ведение социальных сетей и PR
      - Поиск партнеров и спонсоров
      
      У нас более 200 активных волонтеров, и мы всегда рады новым людям в команде.
    `,
    icon: "https://angel-help.org/site/images/1/2.svg",
    slug: "pomocsh-v-organizacii-deyatelnosti-fonda",
    stats: {
      helped: "200+ волонтеров",
      volunteers: "200+ волонтеров",
      budget: "3 млн ₽",
    },
  },
]

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const program = programs.find((p) => p.slug === slug)

  if (!program) {
    return {
      title: "Программа не найдена",
    }
  }

  return {
    title: `${program.title} | Ваш Ангел Хранитель`,
    description: program.description,
  }
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params
  const program = programs.find((p) => p.slug === slug)

  if (!program) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white hover:text-white/80 mb-6" asChild>
            <Link href="/programs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Все программы
            </Link>
          </Button>
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Image src={program.icon || "/placeholder.svg"} alt={program.title} width={48} height={48} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{program.title}</h1>
              <p className="text-xl text-white/90">{program.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{program.stats.helped}</div>
              <div className="text-sm text-gray-600">Помогли</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{program.stats.volunteers}</div>
              <div className="text-sm text-gray-600">Волонтеры</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{program.stats.budget}</div>
              <div className="text-sm text-gray-600">Бюджет</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  {program.fullDescription.split("\n").map((paragraph, index) => {
                    if (paragraph.trim().startsWith("**") && paragraph.trim().endsWith("**")) {
                      return (
                        <h3 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                          {paragraph.replace(/\*\*/g, "")}
                        </h3>
                      )
                    }
                    if (paragraph.trim().startsWith("-")) {
                      return (
                        <li key={index} className="text-gray-700 leading-relaxed ml-6">
                          {paragraph.replace(/^-\s*/, "")}
                        </li>
                      )
                    }
                    if (paragraph.trim()) {
                      return (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Хотите помочь этой программе?</h3>
                <p className="text-white/90 mb-6">Ваше пожертвование поможет нам продолжать эту важную работу</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
                    <Link href="/#donate">Сделать пожертвование</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                    asChild
                  >
                    <Link href="/contacts">Стать волонтером</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
