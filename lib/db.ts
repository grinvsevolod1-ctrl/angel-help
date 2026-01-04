import { unstable_noStore as noStore } from "next/cache"
import {
  blobStorage,
  type Child,
  type News,
  type Program,
  type Donation,
  type AdminUser,
  type SiteSettings,
} from "./blob-storage"

export type { Child, News, Program, Donation, AdminUser, SiteSettings }

// Children CRUD
export async function getChildren(): Promise<Child[]> {
  noStore()
  return await blobStorage.children.getAll()
}

export async function getChildById(id: string): Promise<Child | undefined> {
  noStore()
  return await blobStorage.children.getById(id)
}

export async function createChild(child: Omit<Child, "id" | "createdAt">): Promise<Child> {
  return await blobStorage.children.create(child)
}

export async function updateChild(id: string, updates: Partial<Child>): Promise<Child | null> {
  return await blobStorage.children.update(id, updates)
}

export async function deleteChild(id: string): Promise<boolean> {
  return await blobStorage.children.delete(id)
}

// News CRUD
export async function getNews(): Promise<News[]> {
  noStore()
  return await blobStorage.news.getAll()
}

export async function getNewsById(id: string): Promise<News | undefined> {
  noStore()
  return await blobStorage.news.getById(id)
}

export async function createNews(newsItem: Omit<News, "id" | "date">): Promise<News> {
  return await blobStorage.news.create(newsItem)
}

export async function updateNews(id: string, updates: Partial<News>): Promise<News | null> {
  return await blobStorage.news.update(id, updates)
}

export async function deleteNews(id: string): Promise<boolean> {
  return await blobStorage.news.delete(id)
}

// Programs CRUD
export async function getPrograms(): Promise<Program[]> {
  noStore()
  return await blobStorage.programs.getAll()
}

export async function getProgramById(id: string): Promise<Program | undefined> {
  noStore()
  return await blobStorage.programs.getById(id)
}

export async function getProgramBySlug(slug: string): Promise<Program | undefined> {
  noStore()
  return await blobStorage.programs.getBySlug(slug)
}

export async function createProgram(program: Omit<Program, "id" | "createdAt">): Promise<Program> {
  return await blobStorage.programs.create(program)
}

export async function updateProgram(id: string, updates: Partial<Program>): Promise<Program | null> {
  return await blobStorage.programs.update(id, updates)
}

export async function deleteProgram(id: string): Promise<boolean> {
  return await blobStorage.programs.delete(id)
}

// Donations CRUD
export async function getDonations(): Promise<Donation[]> {
  noStore()
  return await blobStorage.donations.getAll()
}

export async function getDonationById(id: string): Promise<Donation | undefined> {
  noStore()
  return await blobStorage.donations.getById(id)
}

export async function createDonation(donation: Omit<Donation, "id" | "createdAt">): Promise<Donation> {
  return await blobStorage.donations.create(donation)
}

export async function updateDonation(id: string, updates: Partial<Donation>): Promise<Donation | null> {
  return await blobStorage.donations.update(id, updates)
}

export async function deleteDonation(id: string): Promise<boolean> {
  return await blobStorage.donations.delete(id)
}

export async function getDonationStats() {
  noStore()
  return await blobStorage.donations.getStats()
}

// Admin Users CRUD
export async function getAdminUsers(): Promise<AdminUser[]> {
  noStore()
  return await blobStorage.users.getAll()
}

export async function getAdminUser(username: string): Promise<AdminUser | undefined> {
  noStore()
  return await blobStorage.users.getByUsername(username)
}

export async function getAdminUserById(id: string): Promise<AdminUser | undefined> {
  noStore()
  return await blobStorage.users.getById(id)
}

export async function createAdminUser(user: Omit<AdminUser, "id" | "createdAt">): Promise<AdminUser> {
  return await blobStorage.users.create(user)
}

export async function updateAdminUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser | null> {
  return await blobStorage.users.update(id, updates)
}

export async function deleteAdminUser(id: string): Promise<boolean> {
  return await blobStorage.users.delete(id)
}

export async function updateUserLastLogin(id: string): Promise<AdminUser | null> {
  return await blobStorage.users.updateLastLogin(id)
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  noStore()
  return await blobStorage.settings.get()
}

export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  return await blobStorage.settings.update(updates)
}
