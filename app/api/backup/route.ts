import { NextResponse } from "next/server"
import { getChildren, getDonations, getPrograms, getNews, getAdminUsers, getSiteSettings } from "@/lib/db"

export async function GET() {
  try {
    const [children, donations, programs, news, users, settings] = await Promise.all([
      getChildren(),
      getDonations(),
      getPrograms(),
      getNews(),
      getAdminUsers(),
      getSiteSettings(),
    ])

    const backup = {
      version: "1.0",
      createdAt: new Date().toISOString(),
      data: {
        children,
        donations,
        programs,
        news,
        users: users.map(({ password, ...user }) => user),
        settings,
      },
    }

    return new NextResponse(JSON.stringify(backup, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="backup-${new Date().toISOString().split("T")[0]}.json"`,
      },
    })
  } catch (error) {
    console.error("Backup error:", error)
    return NextResponse.json({ error: "Ошибка создания резервной копии" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const backup = await request.json()

    if (!backup.version || !backup.data) {
      return NextResponse.json({ error: "Неверный формат резервной копии" }, { status: 400 })
    }

    // Here you would restore the data
    // For now, just validate the structure
    const requiredKeys = ["children", "donations", "programs", "news"]
    for (const key of requiredKeys) {
      if (!backup.data[key]) {
        return NextResponse.json({ error: `Отсутствует раздел: ${key}` }, { status: 400 })
      }
    }

    return NextResponse.json({
      success: true,
      message: "Резервная копия успешно загружена",
      stats: {
        children: backup.data.children?.length || 0,
        donations: backup.data.donations?.length || 0,
        programs: backup.data.programs?.length || 0,
        news: backup.data.news?.length || 0,
      },
    })
  } catch (error) {
    console.error("Restore error:", error)
    return NextResponse.json({ error: "Ошибка восстановления данных" }, { status: 500 })
  }
}
