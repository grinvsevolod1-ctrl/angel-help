import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <FileQuestion className="h-24 w-24 mx-auto mb-6 text-gray-400" />
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Статья не найдена</h1>
        <p className="text-xl text-gray-600 mb-8">К сожалению, запрашиваемая статья не существует или была удалена.</p>
        <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500" asChild>
          <Link href="/articles">Вернуться к статьям</Link>
        </Button>
      </div>
    </main>
  )
}
