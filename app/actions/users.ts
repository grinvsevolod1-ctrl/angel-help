"use server"

import { revalidatePath } from "next/cache"
import { blobStorage, type AdminUser } from "@/lib/blob-storage"

export async function getUsersAction(): Promise<AdminUser[]> {
  try {
    return await blobStorage.users.getAll()
  } catch (error) {
    console.error("[v0] Error getting users:", error)
    return []
  }
}

export async function getUserByIdAction(id: string): Promise<AdminUser | undefined> {
  try {
    return await blobStorage.users.getById(id)
  } catch (error) {
    console.error("[v0] Error getting user:", error)
    return undefined
  }
}

export async function createUserAction(
  data: Omit<AdminUser, "id" | "createdAt">,
): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
  try {
    console.log("[v0] Creating user:", data.username)
    const user = await blobStorage.users.create(data)
    console.log("[v0] User created:", user.id)
    revalidatePath("/admin/users")
    return { success: true, user }
  } catch (error) {
    console.error("[v0] Error creating user:", error)
    return { success: false, error: "Ошибка при создании пользователя" }
  }
}

export async function updateUserAction(
  id: string,
  data: Partial<AdminUser>,
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("[v0] Updating user:", id)
    const result = await blobStorage.users.update(id, data)
    if (!result) {
      return { success: false, error: "Пользователь не найден" }
    }
    console.log("[v0] User updated:", id)
    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error updating user:", error)
    return { success: false, error: "Ошибка при обновлении пользователя" }
  }
}

export async function deleteUserAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("[v0] Deleting user:", id)
    const result = await blobStorage.users.delete(id)
    if (!result) {
      return { success: false, error: "Пользователь не найден" }
    }
    console.log("[v0] User deleted:", id)
    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting user:", error)
    return { success: false, error: "Ошибка при удалении пользователя" }
  }
}
