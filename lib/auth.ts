"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { blobStorage } from "@/lib/blob-storage"

export interface SessionUser {
  userId: string
  username: string
  email: string
  role: string
  fullName: string
  permissions: string[]
}

export async function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("[v0] Login attempt for:", username)
    const user = await blobStorage.users.getByUsername(username)

    if (!user || user.password !== password) {
      console.log("[v0] Invalid credentials")
      return { success: false, error: "Неверный логин или пароль" }
    }

    if (!user.isActive) {
      console.log("[v0] User inactive")
      return { success: false, error: "Учетная запись деактивирована" }
    }

    // Update last login
    await blobStorage.users.updateLastLogin(user.id)

    const sessionData: SessionUser = {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      permissions: user.permissions,
    }

    const cookieStore = await cookies()
    cookieStore.set("admin-session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    console.log("[v0] Login successful for:", username)
    return { success: true }
  } catch (error) {
    console.error("[v0] Login error:", error)
    return { success: false, error: "Ошибка при входе" }
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("admin-session")
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("admin-session")

    if (!sessionCookie) {
      return null
    }

    const sessionData = JSON.parse(sessionCookie.value)
    return sessionData
  } catch {
    return null
  }
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  return session
}

export async function hasPermission(permission: string): Promise<boolean> {
  const session = await getSession()

  if (!session) {
    return false
  }

  if (session.role === "admin" || session.permissions.includes("all")) {
    return true
  }

  return session.permissions.includes(permission)
}

export async function requirePermission(permission: string): Promise<SessionUser> {
  const session = await requireAuth()

  if (session.role !== "admin" && !session.permissions.includes("all") && !session.permissions.includes(permission)) {
    redirect("/admin")
  }

  return session
}
