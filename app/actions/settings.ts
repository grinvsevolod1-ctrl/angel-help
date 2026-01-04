"use server"

import { revalidatePath } from "next/cache"
import { blobStorage, type SiteSettings } from "@/lib/blob-storage"

export async function getSettingsAction(): Promise<SiteSettings> {
  try {
    return await blobStorage.settings.get()
  } catch (error) {
    console.error("[v0] Error getting settings:", error)
    // Return default settings on error
    return {
      siteName: "Ваш Ангел Хранитель",
      siteDescription: "Благотворительный фонд помощи детям",
      contactEmail: "info@angel-help.org",
      contactPhone: "+7 (495) 123-45-67",
      contactAddress: "г. Москва, ул. Примерная, д. 1",
      socialLinks: {},
      bankDetails: {
        bankName: "",
        bik: "",
        inn: "",
        kpp: "",
        accountNumber: "",
        corrAccount: "",
      },
      smsNumber: "",
      smsKeyword: "",
      maintenanceMode: false,
    }
  }
}

export async function updateSettingsAction(data: Partial<SiteSettings>): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("[v0] Updating settings")
    await blobStorage.settings.update(data)
    console.log("[v0] Settings updated")
    revalidatePath("/admin/settings")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error updating settings:", error)
    return { success: false, error: "Ошибка при обновлении настроек" }
  }
}
