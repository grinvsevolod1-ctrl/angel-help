import { type NextRequest, NextResponse } from "next/server"
import { getNews, createNews } from "@/lib/db"

export async function GET() {
  try {
    const news = await getNews()
    return NextResponse.json(news)
  } catch (error) {
    console.error("[v0] Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Received POST request for news with body:", body)

    if (!body.title || !body.excerpt || !body.content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newNews = await createNews(body)
    console.log("[v0] News created via API:", newNews)
    return NextResponse.json(newNews, { status: 201 })
  } catch (error) {
    console.error("[v0] Error in POST /api/news:", error)
    return NextResponse.json(
      {
        error: "Failed to create news",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
