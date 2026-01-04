import { NextResponse } from "next/server"
import { getAdminUsers, createAdminUser } from "@/lib/db"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"

export async function GET() {
  try {
    const users = await getAdminUsers()
    const safeUsers = users.map(({ password, ...user }) => user)
    return NextResponse.json(safeUsers)
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ error: "Ошибка получения пользователей" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, email, password, fullName, role, permissions } = body

    if (!username || !email || !password || !fullName) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 })
    }

    // Check if user already exists
    const existingUsers = await getAdminUsers()
    if (existingUsers.some((u) => u.username === username || u.email === email)) {
      return NextResponse.json({ error: "Пользователь уже существует" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      fullName,
      role: role || "editor",
      permissions: permissions || [],
      isActive: true,
      createdAt: new Date().toISOString(),
    }

    await createAdminUser(newUser)

    const { password: _, ...safeUser } = newUser
    return NextResponse.json(safeUser, { status: 201 })
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ error: "Ошибка создания пользователя" }, { status: 500 })
  }
}
