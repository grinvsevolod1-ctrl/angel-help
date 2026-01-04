import { Mail, Phone, Clock, MapPin } from "lucide-react"

export const metadata = {
  title: "Контакты | Ваш Ангел Хранитель",
  description: "Свяжитесь с благотворительным фондом Ваш Ангел Хранитель",
}

export default function ContactsPage() {
  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: "info@angel-help.org",
      href: "mailto:info@angel-help.org",
    },
    {
      icon: Phone,
      label: "Телефон",
      value: "+7 495 108 08 41",
      href: "tel:+74951080841",
    },
    {
      icon: Clock,
      label: "Время работы",
      value: "10:00 — 18:00",
      href: null,
    },
    {
      icon: MapPin,
      label: "Адрес",
      value: "Москва, ул. 2-я Энтузиастов, д. 5, к. 39",
      href: null,
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <section className="py-4 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <a href="/" className="hover:text-primary transition-colors">
              Главная
            </a>
            <span>/</span>
            <span className="text-gray-900">Контакты</span>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs md:text-sm font-medium text-primary uppercase tracking-widest mb-3 block">
              Связаться с нами
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Контакты</h1>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
            {contacts.map((contact, index) => {
              const Icon = contact.icon
              const Content = (
                <div key={index} className="flex items-center gap-4 p-6 md:p-8">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-gray-400 mb-1">{contact.label}</p>
                    <p className="text-base md:text-lg font-semibold text-gray-900 truncate">{contact.value}</p>
                  </div>
                </div>
              )

              return contact.href ? (
                <a
                  key={index}
                  href={contact.href}
                  className="bg-white border-2 border-gray-100 rounded-2xl md:rounded-3xl hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  {Content}
                </a>
              ) : (
                <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl md:rounded-3xl">
                  {Content}
                </div>
              )
            })}
          </div>

          <div className="mt-12 md:mt-16 max-w-4xl mx-auto">
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-gray-100 aspect-[16/9] md:aspect-[21/9]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A9e8f8b8f8b8f8b8f8b8f8b8f8b8f8b8f8b8f8b8f8b8f8b8f&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
