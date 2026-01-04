"use server"

import { revalidatePath } from "next/cache"
import { blobStorage, type Child } from "@/lib/blob-storage"

export async function createChildAction(data: Omit<Child, "id" | "createdAt">) {
  try {
    console.log("[v0] Creating child:", data.name)
    const newChild = await blobStorage.children.create(data)
    console.log("[v0] Child created:", newChild.id)
    revalidatePath("/admin/children")
    revalidatePath("/")
    return { success: true, data: newChild }
  } catch (error) {
    console.error("[v0] Error creating child:", error)
    return { success: false, error: "Ошибка при создании подопечного" }
  }
}

export async function updateChildAction(id: string, data: Partial<Child>) {
  try {
    console.log("[v0] Updating child:", id)
    const updated = await blobStorage.children.update(id, data)
    if (!updated) {
      return { success: false, error: "Подопечный не найден" }
    }
    console.log("[v0] Child updated:", id)
    revalidatePath("/admin/children")
    revalidatePath("/")
    return { success: true, data: updated }
  } catch (error) {
    console.error("[v0] Error updating child:", error)
    return { success: false, error: "Ошибка при обновлении" }
  }
}

export async function deleteChildAction(id: string) {
  try {
    console.log("[v0] Deleting child:", id)
    const deleted = await blobStorage.children.delete(id)
    if (!deleted) {
      return { success: false, error: "Подопечный не найден" }
    }
    console.log("[v0] Child deleted:", id)
    revalidatePath("/admin/children")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting child:", error)
    return { success: false, error: "Ошибка при удалении" }
  }
}

export async function getChildrenAction() {
  try {
    return await blobStorage.children.getAll()
  } catch (error) {
    console.error("[v0] Error getting children:", error)
    return []
  }
}

export async function getChildByIdAction(id: string) {
  try {
    return await blobStorage.children.getById(id)
  } catch (error) {
    console.error("[v0] Error getting child:", error)
    return undefined
  }
}
