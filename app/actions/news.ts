"use server"

import { revalidatePath } from "next/cache"
import { blobStorage, type News } from "@/lib/blob-storage"

export async function createNewsAction(data: Omit<News, "id" | "date">) {
  try {
    console.log("[v0] Creating news:", data.title)
    const newNews = await blobStorage.news.create(data)
    console.log("[v0] News created:", newNews.id)
    revalidatePath("/admin/news")
    revalidatePath("/news")
    revalidatePath("/")
    return { success: true, data: newNews }
  } catch (error) {
    console.error("[v0] Error creating news:", error)
    return { success: false, error: "Ошибка при создании новости" }
  }
}

export async function updateNewsAction(id: string, data: Partial<News>) {
  try {
    console.log("[v0] Updating news:", id)
    const updated = await blobStorage.news.update(id, data)
    if (!updated) {
      return { success: false, error: "Новость не найдена" }
    }
    console.log("[v0] News updated:", id)
    revalidatePath("/admin/news")
    revalidatePath("/news")
    revalidatePath("/")
    return { success: true, data: updated }
  } catch (error) {
    console.error("[v0] Error updating news:", error)
    return { success: false, error: "Ошибка при обновлении" }
  }
}

export async function deleteNewsAction(id: string) {
  try {
    console.log("[v0] Deleting news:", id)
    const deleted = await blobStorage.news.delete(id)
    if (!deleted) {
      return { success: false, error: "Новость не найдена" }
    }
    console.log("[v0] News deleted:", id)
    revalidatePath("/admin/news")
    revalidatePath("/news")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting news:", error)
    return { success: false, error: "Ошибка при удалении" }
  }
}

export async function getNewsAction() {
  try {
    return await blobStorage.news.getAll()
  } catch (error) {
    console.error("[v0] Error getting news:", error)
    return []
  }
}

export async function getNewsByIdAction(id: string) {
  try {
    return await blobStorage.news.getById(id)
  } catch (error) {
    console.error("[v0] Error getting news:", error)
    return undefined
  }
}
