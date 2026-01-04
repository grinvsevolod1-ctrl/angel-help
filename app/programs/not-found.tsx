import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Программа не найдена</h2>
        <p className="text-xl text-gray-600 mb-8">К сожалению, запрашиваемая программа не существует</p>
        <Button size="lg" asChild>
          <Link href="/programs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Все программы
          </Link>
        </Button>
      </div>
    </main>
  )
}
