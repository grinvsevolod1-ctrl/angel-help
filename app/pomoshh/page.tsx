import type { Metadata } from "next"
import { ChildrenNeedHelp } from "@/components/children-need-help"
import { DonationForm } from "@/components/donation-form"

export const metadata: Metadata = {
  title: "Помощь - angel-help.org",
  description: "Помогите детям, которые нуждаются в вашей поддержке",
}

export default function PomoshhPage() {
  return (
    <main className="min-h-screen">
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Помочь детям</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Каждый ребенок заслуживает шанс на здоровую и счастливую жизнь. Ваше пожертвование может изменить чью-то
              судьбу.
            </p>
          </div>
        </div>
      </section>

      <ChildrenNeedHelp />
      <DonationForm />
    </main>
  )
}
