import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика конфиденциальности и обработки персональных данных фонда «Ваш Ангел Хранитель»",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Политика конфиденциальности
            </h1>
            <p className="text-lg text-muted-foreground">
              Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
            </p>
          </div>

          <div className="prose prose-gray max-w-none space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Общие положения</h2>
              <p className="text-muted-foreground leading-relaxed">
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных
                пользователей сайта благотворительного фонда «Ваш Ангел Хранитель».
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Какие данные мы собираем</h2>
              <div className="space-y-2">
                <p className="text-muted-foreground leading-relaxed">Мы собираем следующие типы данных:</p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Имя и электронная почта при оформлении пожертвования</li>
                  <li>Информацию о платежных транзакциях</li>
                  <li>Данные об использовании сайта через cookie-файлы</li>
                  <li>IP-адрес и техническую информацию о браузере</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. Как мы используем данные</h2>
              <div className="space-y-2">
                <p className="text-muted-foreground leading-relaxed">Собранные данные используются для:</p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Обработки пожертвований и выдачи подтверждений</li>
                  <li>Улучшения работы сайта и пользовательского опыта</li>
                  <li>Аналитики и статистики</li>
                  <li>Отправки информации о деятельности фонда (с вашего согласия)</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Cookie-файлы</h2>
              <p className="text-muted-foreground leading-relaxed">
                Наш сайт использует cookie-файлы для улучшения работы и анализа использования сайта. Cookie-файлы — это
                небольшие текстовые файлы, которые сохраняются на вашем устройстве. Вы можете отключить cookie в
                настройках браузера, но это может повлиять на функциональность сайта.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Защита данных</h2>
              <p className="text-muted-foreground leading-relaxed">
                Мы применяем современные технические и организационные меры для защиты ваших персональных данных от
                несанкционированного доступа, изменения, раскрытия или уничтожения.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Ваши права</h2>
              <div className="space-y-2">
                <p className="text-muted-foreground leading-relaxed">Вы имеете право:</p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Получить информацию о ваших персональных данных</li>
                  <li>Запросить исправление неточных данных</li>
                  <li>Запросить удаление ваших данных</li>
                  <li>Отозвать согласие на обработку данных</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Контакты</h2>
              <p className="text-muted-foreground leading-relaxed">
                По вопросам обработки персональных данных и политики конфиденциальности вы можете обратиться к нам по
                адресу:{" "}
                <a
                  href="mailto:info@angel-help.org"
                  className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  info@angel-help.org
                </a>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Изменения в политике</h2>
              <p className="text-muted-foreground leading-relaxed">
                Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Обновления будут
                опубликованы на этой странице с указанием даты последнего изменения.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
