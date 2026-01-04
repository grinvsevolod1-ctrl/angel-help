import { type NextRequest, NextResponse } from "next/server"
import { getAdminUsers, updateAdminUser, deleteAdminUser } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const users = await getAdminUsers()
    const user = users.find((u) => u.id === id)

    if (!user) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 })
    }

    const { password, ...safeUser } = user
    return NextResponse.json(safeUser)
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Ошибка получения пользователя" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const updates: Record<string, unknown> = { ...body }

    if (body.password) {
      updates.password = await bcrypt.hash(body.password, 10)
    }

    const updatedUser = await updateAdminUser(id, updates)

    if (!updatedUser) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 })
    }

    const { password, ...safeUser } = updatedUser
    return NextResponse.json(safeUser)
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Ошибка обновления пользователя" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const success = await deleteAdminUser(id)

    if (!success) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete user error:", error)
    return NextResponse.json({ error: "Ошибка удаления пользователя" }, { status: 500 })
  }
}
