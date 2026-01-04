import { type NextRequest, NextResponse } from "next/server"
import { getNewsById, updateNews, deleteNews } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const news = await getNewsById(id)
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }
    return NextResponse.json(news)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const updatedNews = await updateNews(id, body)
    if (!updatedNews) {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }
    return NextResponse.json(updatedNews)
  } catch (error) {
    console.error("Error updating news:", error)
    return NextResponse.json(
      {
        error: "Failed to update news",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const success = await deleteNews(id)
    if (!success) {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting news:", error)
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 })
  }
}
