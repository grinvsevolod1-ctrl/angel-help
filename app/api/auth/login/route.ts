import { type NextRequest, NextResponse } from "next/server"
import { getAdminUser } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const user = await getAdminUser(username)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // В реальном приложении здесь должна быть JWT токен генерация
    const response = NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })

    // Устанавливаем cookie с информацией о сессии
    response.cookies.set("admin-session", JSON.stringify({ userId: user.id }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
