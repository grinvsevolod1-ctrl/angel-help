"use server"

import { revalidatePath } from "next/cache"
import { blobStorage, type Program } from "@/lib/blob-storage"

export async function getProgramsAction(): Promise<Program[]> {
  try {
    return await blobStorage.programs.getAll()
  } catch (error) {
    console.error("[v0] Error getting programs:", error)
    return []
  }
}

export async function getProgramByIdAction(id: string): Promise<Program | undefined> {
  try {
    return await blobStorage.programs.getById(id)
  } catch (error) {
    console.error("[v0] Error getting program:", error)
    return undefined
  }
}

export async function createProgramAction(
  data: Omit<Program, "id" | "createdAt">,
): Promise<{ success: boolean; error?: string; program?: Program }> {
  try {
    console.log("[v0] Creating program:", data.title)
    const program = await blobStorage.programs.create(data)
    console.log("[v0] Program created:", program.id)
    revalidatePath("/admin/programs")
    revalidatePath("/programs")
    revalidatePath("/")
    return { success: true, program }
  } catch (error) {
    console.error("[v0] Error creating program:", error)
    return { success: false, error: "Ошибка при создании программы" }
  }
}

export async function updateProgramAction(
  id: string,
  data: Partial<Program>,
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("[v0] Updating program:", id)
    const result = await blobStorage.programs.update(id, data)
    if (!result) {
      return { success: false, error: "Программа не найдена" }
    }
    console.log("[v0] Program updated:", id)
    revalidatePath("/admin/programs")
    revalidatePath("/programs")
    revalidatePath(`/programs/${result.slug}`)
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error updating program:", error)
    return { success: false, error: "Ошибка при обновлении программы" }
  }
}

export async function deleteProgramAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("[v0] Deleting program:", id)
    const result = await blobStorage.programs.delete(id)
    if (!result) {
      return { success: false, error: "Программа не найдена" }
    }
    console.log("[v0] Program deleted:", id)
    revalidatePath("/admin/programs")
    revalidatePath("/programs")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting program:", error)
    return { success: false, error: "Ошибка при удалении программы" }
  }
}
