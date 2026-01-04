import { NextResponse } from "next/server"
import { getChildren, getNews, getPrograms } from "@/lib/db"

export async function GET() {
  try {
    const [children, news, programs] = await Promise.all([getChildren(), getNews(), getPrograms()])

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      data: {
        children: children.length,
        news: news.length,
        programs: programs.length,
      },
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
