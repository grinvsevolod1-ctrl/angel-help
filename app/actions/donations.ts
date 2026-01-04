"use server"

import { revalidatePath } from "next/cache"
import { blobStorage, type Donation } from "@/lib/blob-storage"

export async function getDonationsAction(): Promise<Donation[]> {
  try {
    return await blobStorage.donations.getAll()
  } catch (error) {
    console.error("[v0] Error getting donations:", error)
    return []
  }
}

export async function getDonationByIdAction(id: string): Promise<Donation | undefined> {
  try {
    return await blobStorage.donations.getById(id)
  } catch (error) {
    console.error("[v0] Error getting donation:", error)
    return undefined
  }
}

export async function getDonationStatsAction() {
  try {
    return await blobStorage.donations.getStats()
  } catch (error) {
    console.error("[v0] Error getting donation stats:", error)
    return {
      total: 0,
      count: 0,
      average: 0,
      recurring: 0,
      byMethod: {
        card: 0,
        bank: 0,
        sms: 0,
        crypto: 0,
      },
    }
  }
}

export async function createDonationAction(
  data: Omit<Donation, "id" | "createdAt">,
): Promise<{ success: boolean; error?: string; donation?: Donation }> {
  try {
    console.log("[v0] Creating donation:", data.amount)
    const donation = await blobStorage.donations.create(data)
    console.log("[v0] Donation created:", donation.id)
    revalidatePath("/admin/donations")
    revalidatePath("/admin")
    return { success: true, donation }
  } catch (error) {
    console.error("[v0] Error creating donation:", error)
    return { success: false, error: "Ошибка при создании пожертвования" }
  }
}

export async function updateDonationAction(
  id: string,
  data: Partial<Donation>,
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("[v0] Updating donation:", id)
    const result = await blobStorage.donations.update(id, data)
    if (!result) {
      return { success: false, error: "Пожертвование не найдено" }
    }
    console.log("[v0] Donation updated:", id)
    revalidatePath("/admin/donations")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error updating donation:", error)
    return { success: false, error: "Ошибка при обновлении пожертвования" }
  }
}

export async function deleteDonationAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("[v0] Deleting donation:", id)
    const result = await blobStorage.donations.delete(id)
    if (!result) {
      return { success: false, error: "Пожертвование не найдено" }
    }
    console.log("[v0] Donation deleted:", id)
    revalidatePath("/admin/donations")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting donation:", error)
    return { success: false, error: "Ошибка при удалении пожертвования" }
  }
}
