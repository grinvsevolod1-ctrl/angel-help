import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "О фонде",
  description: "Благотворительный фонд «Ваш Ангел Хранитель» - наша миссия, программы и команда",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[400px] w-full">
        <Image src="/images/about-fund-page.jpg" alt="О фонде" fill className="object-cover" priority />
      </section>

      {/* Quick Links */}
      <section className="bg-gray-50 py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="#team" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Наша команда
            </Link>
            <Link href="#docs" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Документы
            </Link>
            <Link href="#requisites" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Реквизиты
            </Link>
            <Link href="#politics" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Политика безопасности и возвратов
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 mb-2">О фонде</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase">«ВАШ АНГЕЛ ХРАНИТЕЛЬ»</h1>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <p className="leading-relaxed">
              В современном мире, несмотря на рост доходов и уровня жизни в развитых странах, социальные проблемы
              остаются вызовом. Миллионы людей нуждаются в поддержке, и благотворительность продолжает быть надежным
              источником помощи для тех, кто оказался в трудной ситуации.
            </p>

            {/* Mission Section */}
            <div className="bg-orange-50 rounded-3xl p-8 my-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Наша миссия</h2>
              <p className="text-lg font-semibold text-primary mb-3">ПОМОЩЬ В ТРУДНЫЕ МОМЕНТЫ ЖИЗНИ</p>
              <p className="leading-relaxed">
                Фонд «Ваш Ангел Хранитель» стремится оказать помощь незащищенным слоям населения и тем, кто столкнулся с
                трудностями. Наша миссия не ограничивается финансовой поддержкой; мы также предоставляем юридическую и
                психологическую помощь. Источником наших средств являются вклады от частных лиц и компаний, благодаря
                которым мы создаем новые программы и оказываем помощь нашим подопечным.
              </p>
            </div>

            {/* Programs Section */}
            <div className="bg-gray-50 rounded-3xl p-8 my-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Программы фонда</h2>
              <p className="text-lg font-semibold text-primary mb-3">ВМЕСТЕ МЫ МОЖЕМ БОЛЬШЕ</p>
              <p className="leading-relaxed mb-4">
                Фонд «Ваш Ангел Хранитель» реализует семь программ, охватывающих различные аспекты поддержки наших
                соотечественников:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Помощь Тяжелобольным:</strong> Обеспечиваем поддержку детям и взрослым, столкнувшимся с
                    онкологическими, кардиологическими и аутоиммунными заболеваниями.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Программа помощи онкобольным женщинам:</strong> Фокусируемся на поддержке женщин,
                    столкнувшихся с онкологическими диагнозами.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Поддержка одиноких пожилых людей:</strong> Покупаем продукты, лекарства, обеспечиваем уход и
                    поддержку в повседневных вопросах.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Помощь малоимущим:</strong> Предоставляем финансовую поддержку тем, кто по различным
                    обстоятельствам не может работать полный рабочий день.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Программа помощи медицинским учереждениям:</strong> Закупаем оборудование, расходные
                    материалы и лекарства для медицинских учреждений.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Помощь Детям-сиротам:</strong> Оказываем поддержку детям, оставшимся без родителей.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Пожертвования на организацию работы фонда:</strong> Привлекаем волонтеров, спонсоров и
                    компании для совместной работы.
                  </span>
                </li>
              </ul>
            </div>

            {/* Principles */}
            <div className="my-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Наши принципы</h2>
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="bg-white border-2 border-primary rounded-2xl p-4">
                  <p className="text-lg font-bold text-primary">ЧЕСТНОСТЬ</p>
                </div>
                <div className="bg-white border-2 border-primary rounded-2xl p-4">
                  <p className="text-lg font-bold text-primary">ОТКРЫТОСТЬ</p>
                </div>
                <div className="bg-white border-2 border-primary rounded-2xl p-4">
                  <p className="text-lg font-bold text-primary">ДОВЕРИЕ</p>
                </div>
              </div>
              <p className="leading-relaxed">
                Мы придерживаемся принципов честности, открытости и доверия в своей работе. Поступившие средства
                распределяются по проектам, а каждое пожертвование подлежит обязательному отчету. Важен каждый вклад,
                каждый час, проведенный вместе с нашими подопечными. Будьте частью нашей благотворительной семьи и
                помогайте нам делать мир добрее.
              </p>
            </div>

            <p className="leading-relaxed">
              В основе нашей деятельности – социальная защита и поддержка тех, кто в этом остро нуждается. Фонд
              финансирует благотворительные программы, инвестируя в них средства благотворителей. Основные источники
              финансирования – средства от частных и общественных благотворителей.
            </p>

            <p className="leading-relaxed">
              Наша цель – обеспечить взаимодействие между благотворителями и получателями помощи. В нашем стремлении
              сделать мир лучше каждый день, мы призываем к объединению вокруг общей цели — спасения жизней. Ведь каждый
              из нас может столкнуться с непредвиденными трудностями, и мы хотим предоставить всем возможность жить
              полноценной жизнью, несмотря ни на что. Наша миссия — это дарить людям надежду!
            </p>

            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-3xl p-8 my-8">
              <p className="leading-relaxed text-gray-800">
                Мы создали уникальное предложение — «Миссия Спаси Жизнь!» Каждый может вступить в нашу миссию, и чем нас
                будет больше, тем больше жизней мы сможем спасти. Вместе мы формируем большую команду, единый фронт в
                борьбе за жизнь — самое ценное, что у нас есть.
              </p>
            </div>

            <p className="leading-relaxed text-center text-xl font-semibold text-primary my-8">
              Судьба не всегда предсказуема, но мы можем влиять на ее ход. Верьте в хорошее и творите добро, и ваш
              ангел-хранитель обязательно придет на помощь в трудные моменты!
            </p>

            {/* Mission Program */}
            <div className="border-l-4 border-primary pl-6 my-8">
              <h3 className="text-xl font-bold mb-3">Программа пожертвований</h3>
              <h4 className="text-2xl font-bold text-primary mb-4">«МИССИЯ СПАСИ ЖИЗНЬ»</h4>
              <p className="leading-relaxed mb-4">
                Если вы стремитесь совершать добрые поступки каждый день, каждую неделю, каждый месяц, то для вас
                создана уникальная программа пожертвований — «Миссия Спаси Жизнь!»
              </p>
              <p className="leading-relaxed">
                Просто укажите сумму ежедневного пожертвования, будь то{" "}
                <strong className="text-primary">1 рубль!</strong> За неделю это всего <strong>7 рублей,</strong> за
                месяц — <strong>30 рублей,</strong> а в год — всего <strong>360 рублей.</strong>
              </p>
            </div>

            <p className="leading-relaxed text-center text-lg italic">
              Только вместе мы можем быть всегда, образуя единое семейное сообщество, которое называется «Миссия Спасти
              Жизни Людей!» Давайте воплотим добро и сделаем этот мир светлее и теплее каждый день!
            </p>
          </div>
        </div>
      </section>

      {/* Photos Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">ДЕЛАЕМ МИР ЛУЧШЕ ВМЕСТЕ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
            {[6, 7, 8, 9, 10, 11].map((num) => (
              <div
                key={num}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <Image
                  src={`/images/kid-slider${num}.jpg`}
                  alt={`Ребенок ${num}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold px-12 py-6 text-lg rounded-full"
              asChild
            >
              <Link href="/#donate">Хочу помочь</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 mb-2">Познакомьтесь с командой фонда</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase">НАША КОМАНДА</h2>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src="/images/documents/team-1.jpg"
                  alt="Богданова Валентина Сергеевна"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">БОГДАНОВА ВАЛЕНТИНА СЕРГЕЕВНА</h3>
                <p className="text-primary font-semibold">Президент Благотворительного фонда</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section id="docs" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 mb-2">Лицензии и сертификаты</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase">ДОКУМЕНТЫ</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Устав", link: "https://angel-help.org/site/theme/img/new_img/ustav.pdf" },
              { title: "Свидетельство ФНС", link: "https://angel-help.org/site/theme/img/new_img/doc-3.jpg" },
              { title: "Выписка ЕГРЮЛ", link: "https://angel-help.org/site/theme/img/new_img/doc-1.jpg" },
              { title: "Свидетельство", link: "https://angel-help.org/site/theme/img/new_img/doc-2.jpg" },
            ].map((doc, index) => (
              <a
                key={index}
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="aspect-[3/4] bg-gray-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl text-gray-300">📄</div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{doc.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Requisites Section */}
      <section id="requisites" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 mb-2">Что может понадобиться</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase">РЕКВИЗИТЫ</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Sberbank */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">ПАО Сбербанк</h3>
              <div className="grid gap-4 text-sm">
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">Полное наименование Фонда:</span>
                  <span className="text-gray-600">Благотворительный Фонд «Ваш Ангел Хранитель»</span>
                </div>
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">Корреспондентский счет:</span>
                  <span className="text-gray-600 font-mono">3010 1810 4000 0000 0225</span>
                </div>
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">БИК:</span>
                  <span className="text-gray-600">044525225</span>
                </div>
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">Назначение платежа:</span>
                  <span className="text-gray-600">Пожертвование согласно ст.582 ГК РФ. Без налога (НДС)</span>
                </div>
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">ИНН:</span>
                  <span className="text-gray-600">7720910214</span>
                </div>
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">КПП:</span>
                  <span className="text-gray-600">772001001</span>
                </div>
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">ОГРН:</span>
                  <span className="text-gray-600">1237700721675</span>
                </div>
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">Расчетный счет:</span>
                  <span className="text-gray-600 font-mono">4070 3810 2380 0001 9021</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-64">Наименование банка:</span>
                  <span className="text-gray-600">ПАО Сбербанк</span>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a
                    href="https://angel-help.org/site/theme/img/new_img/req.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Скачать реквизиты
                  </a>
                </Button>
              </div>
            </div>

            {/* Alfa Bank */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <Image src="/icons/logo-alfa.svg" alt="Альфа-Банк" width={40} height={40} />
                <h3 className="text-2xl font-bold text-gray-900">Реквизиты для перевода АО «АЛЬФА-БАНК»</h3>
              </div>
              <div className="grid gap-4 text-sm">
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">Наименование банка:</span>
                  <span className="text-gray-600">АО «АЛЬФА-БАНК»</span>
                </div>
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">Расчетный счет:</span>
                  <span className="text-gray-600 font-mono">4070 3810 1011 0000 0489</span>
                </div>
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">БИК:</span>
                  <span className="text-gray-600">044525593</span>
                </div>
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">ИНН:</span>
                  <span className="text-gray-600">7720910214</span>
                </div>
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">КПП:</span>
                  <span className="text-gray-600">772001001</span>
                </div>
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">Получатель:</span>
                  <span className="text-gray-600">Благотворительный Фонд «Ваш Ангел Хранитель»</span>
                </div>
                <div className="flex border-b pb-3">
                  <span className="font-semibold text-gray-700 w-64">Корреспондентский счет:</span>
                  <span className="text-gray-600 font-mono">3010 1810 2000 0000 0593</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-64">Назначение платежа:</span>
                  <span className="text-gray-600">Благотворительное пожертвование</span>
                </div>
              </div>
            </div>

            {/* International Transfers */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h4 className="text-lg font-bold mb-4 text-gray-900">
                  Банковские реквизиты для перечислений в долларах
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold">Name:</span> Благотворительный Фонд «Ваш Ангел Хранитель»
                  </div>
                  <div>
                    <span className="font-semibold">Account:</span>{" "}
                    <span className="font-mono">4070 3840 5380 0000 0933</span>
                  </div>
                  <div>
                    <span className="font-semibold">Bank address:</span> RUSSIAN FEDERATION, MOSCOW
                  </div>
                  <div>
                    <span className="font-semibold">National ID:</span> 7720910214
                  </div>
                  <div>
                    <span className="font-semibold">Bank name:</span> SBERBANK
                  </div>
                  <div>
                    <span className="font-semibold">SWIFT:</span> SABRRUMM
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h4 className="text-lg font-bold mb-4 text-gray-900">Банковские реквизиты для перечислений в евро</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold">Name:</span> Благотворительный Фонд «Ваш Ангел Хранитель»
                  </div>
                  <div>
                    <span className="font-semibold">Account:</span>{" "}
                    <span className="font-mono">4070 3978 8380 0000 0961</span>
                  </div>
                  <div>
                    <span className="font-semibold">Bank address:</span> RUSSIAN FEDERATION, MOSCOW
                  </div>
                  <div>
                    <span className="font-semibold">National ID:</span> 7720910214
                  </div>
                  <div>
                    <span className="font-semibold">Bank name:</span> SBERBANK
                  </div>
                  <div>
                    <span className="font-semibold">SWIFT:</span> SABRRUMM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Policy */}
      <section id="politics" className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 mb-2">Что нужно знать</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase">
              ПОЛИТИКА БЕЗОПАСНОСТИ И ВОЗВРАТОВ
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="leading-relaxed">
              При оплате заказа банковской картой, обработка платежа (включая ввод номера карты) происходит на
              защищенной странице процессинговой системы, которая прошла международную сертификацию. Это значит, что
              Ваши конфиденциальные данные (реквизиты карты, регистрационные данные и др.) не поступают в
              интернет-магазин, их обработка полностью защищена и никто, в том числе наш интернет-магазин, не может
              получить персональные и банковские данные клиента.
            </p>

            <p className="leading-relaxed">
              При работе с карточными данными применяется стандарт защиты информации, разработанный международными
              платёжными системами Visa и MasterCard - Payment Card Industry Data Security Standard (PCI DSS), что
              обеспечивает безопасную обработку реквизитов Банковской карты Держателя. Применяемая технология передачи
              данных гарантирует безопасность по сделкам с Банковскими картами путем использования протоколов Secure
              Sockets Layer (SSL), Verified by Visa, Secure Code, и закрытых банковских сетей, имеющих высшую степень
              защиты.
            </p>

            <p className="leading-relaxed">
              Уважаемые Клиенты, информируем Вас о том, что при запросе возврата денежных средств при отказе от покупки,
              возврат производится исключительно на ту же банковскую карту, с которой была произведена оплата.
            </p>

            <div className="bg-orange-50 rounded-2xl p-6 my-6">
              <h3 className="text-xl font-bold mb-4">Как вернуть деньги, потраченные на благотворительность?</h3>

              <h4 className="font-bold mt-4 mb-2">Для физических лиц</h4>
              <p className="text-sm leading-relaxed">
                Если Вы хотите, чтобы сумма благотворительного взноса осталась анонимной, сообщите нам данные о Вашем
                платеже. Это необходимо для того, чтобы операторы максимально быстро смогли корректировать информацию,
                поступившую в работу. При желании оформить налоговый вычет нам также потребуются эти данные, чтобы мы
                помогли Вам оформить пакет документов.
              </p>

              <h4 className="font-bold mt-4 mb-2">Для юридических лиц</h4>
              <p className="text-sm leading-relaxed">
                Если Вы хотите получить второй экземпляр договора пожертвования, а также заверенные в официальном
                порядке копии документов, Вам необходимо сообщить информацию по произведенному платежу, юридический и
                фактический адрес фирмы, а также контактные данные. После получения информации пакет документов будет
                отправлен в ближайший срок.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
