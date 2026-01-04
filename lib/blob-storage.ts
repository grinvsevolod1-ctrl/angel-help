import { put, list, del } from "@vercel/blob"

const DATA_PREFIX = "data/"

export interface StorageData {
  children: Child[]
  news: News[]
  programs: Program[]
  donations: Donation[]
  users: AdminUser[]
  settings: SiteSettings
}

export interface Child {
  id: string
  name: string
  age: number
  diagnosis: string
  story: string
  image: string
  targetAmount: number
  currentAmount: number
  createdAt: string
  status: "active" | "completed" | "archived"
}

export interface News {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  publishedAt?: string
  category: string
}

export interface Program {
  id: string
  slug: string
  title: string
  description: string
  fullDescription: string
  image: string
  icon: string
  goals: string[]
  results: string[]
  status: "active" | "paused" | "completed"
  createdAt: string
}

export interface Donation {
  id: string
  childId?: string
  childName?: string
  programId?: string
  programName?: string
  amount: number
  donorName: string
  donorEmail: string
  donorPhone?: string
  paymentMethod: "card" | "bank" | "sms" | "crypto"
  paymentStatus: "pending" | "completed" | "failed" | "refunded"
  paymentId?: string
  comment?: string
  isAnonymous: boolean
  isRecurring: boolean
  recurringPeriod?: "monthly" | "quarterly" | "yearly"
  createdAt: string
}

export interface AdminUser {
  id: string
  username: string
  email: string
  password: string
  role: "admin" | "manager" | "editor"
  fullName: string
  avatar?: string
  lastLogin?: string
  isActive: boolean
  createdAt: string
  permissions: string[]
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  socialLinks: {
    vk?: string
    telegram?: string
    youtube?: string
    instagram?: string
  }
  bankDetails: {
    bankName: string
    bik: string
    inn: string
    kpp: string
    accountNumber: string
    corrAccount: string
  }
  smsNumber: string
  smsKeyword: string
  yookassaShopId?: string
  yookassaSecretKey?: string
  maintenanceMode: boolean
  analyticsId?: string
}

// Default data
const defaultData: StorageData = {
  children: [
    {
      id: "1",
      name: "Тимофеев Максим",
      age: 7,
      diagnosis: "Детский церебральный паралич",
      story: "Максим с рождения борется с ДЦП. Несмотря на трудности, он очень старательный и жизнерадостный мальчик.",
      image: "/images/children/timofeev-maksim.jpg",
      targetAmount: 500000,
      currentAmount: 234000,
      createdAt: "2024-01-15T10:00:00Z",
      status: "active",
    },
    {
      id: "2",
      name: "Куракина Кира",
      age: 5,
      diagnosis: "Онкология",
      story:
        "Кире всего 5 лет, но она уже столкнулась с серьезным заболеванием. Девочке требуется дорогостоящее лечение.",
      image: "/images/children/kurakina-kira.jpg",
      targetAmount: 1200000,
      currentAmount: 780000,
      createdAt: "2024-02-20T10:00:00Z",
      status: "active",
    },
    {
      id: "3",
      name: "Гурьянова Диана",
      age: 12,
      diagnosis: "Порок сердца",
      story:
        "Диане нужна операция на сердце. Это сложная операция, которую можно провести только в специализированной клинике.",
      image: "/images/children/guryanova-diana.jpg",
      targetAmount: 2500000,
      currentAmount: 1100000,
      createdAt: "2024-03-10T10:00:00Z",
      status: "active",
    },
  ],
  news: [
    {
      id: "1",
      title: "Максиму собрали необходимую сумму!",
      excerpt: "Благодаря вашей помощи Максим Тимофеев получит необходимое лечение",
      content: "Дорогие друзья! Спешим поделиться радостной новостью - мы собрали необходимую сумму для Максима!",
      image: "/images/news/filyukov-leonid.jpg",
      date: "2024-12-20T10:00:00Z",
      publishedAt: "2024-12-20T10:00:00Z",
      category: "Успехи",
    },
    {
      id: "2",
      title: "Новогодний благотворительный концерт",
      excerpt: "Приглашаем всех на праздничное мероприятие в поддержку наших подопечных",
      content: "25 декабря состоится традиционный новогодний благотворительный концерт.",
      image: "/images/news/vasov-avgust.jpg",
      date: "2024-12-15T10:00:00Z",
      publishedAt: "2024-12-15T10:00:00Z",
      category: "Мероприятия",
    },
  ],
  programs: [
    {
      id: "1",
      slug: "lechebnaya-pomoshh",
      title: "Лечебная помощь",
      description: "Оплата лечения, операций, реабилитации для тяжелобольных детей",
      fullDescription: "Программа направлена на оказание финансовой помощи в оплате дорогостоящего лечения.",
      image: "/images/programs/lechebnaya-pomoshh.jpg",
      icon: "Heart",
      goals: ["Оплата операций", "Реабилитация", "Медикаменты"],
      results: ["Более 500 детей получили помощь", "150 успешных операций"],
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
    },
  ],
  donations: [
    {
      id: "1",
      childId: "1",
      childName: "Тимофеев Максим",
      amount: 5000,
      donorName: "Иванов Петр",
      donorEmail: "ivanov@example.com",
      paymentMethod: "card",
      paymentStatus: "completed",
      paymentId: "pay_123456",
      isAnonymous: false,
      isRecurring: false,
      createdAt: "2024-12-20T10:00:00Z",
    },
  ],
  users: [
    {
      id: "1",
      username: "admin",
      email: "admin@angel-help.org",
      password: "admin123",
      role: "admin",
      fullName: "Администратор",
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
      permissions: ["all"],
    },
  ],
  settings: {
    siteName: "Ваш Ангел Хранитель",
    siteDescription: "Благотворительный фонд помощи детям",
    contactEmail: "info@angel-help.org",
    contactPhone: "+7 (495) 123-45-67",
    contactAddress: "г. Москва, ул. Примерная, д. 1",
    socialLinks: {
      vk: "https://vk.com/angelhelp",
      telegram: "https://t.me/angelhelp",
    },
    bankDetails: {
      bankName: "ПАО Сбербанк",
      bik: "044525225",
      inn: "7707083893",
      kpp: "773601001",
      accountNumber: "40703810938000000001",
      corrAccount: "30101810400000000225",
    },
    smsNumber: "3443",
    smsKeyword: "АНГЕЛ",
    maintenanceMode: false,
  },
}

// In-memory cache
let cachedData: StorageData | null = null
let lastFetch = 0
const CACHE_TTL = 5000 // 5 seconds

async function loadData(): Promise<StorageData> {
  // Check cache
  if (cachedData && Date.now() - lastFetch < CACHE_TTL) {
    return cachedData
  }

  try {
    const { blobs } = await list({ prefix: DATA_PREFIX })
    const dataBlob = blobs.find((b) => b.pathname === `${DATA_PREFIX}storage.json`)

    if (dataBlob) {
      const response = await fetch(dataBlob.url)
      const data = await response.json()
      cachedData = data
      lastFetch = Date.now()
      return data
    }
  } catch (error) {
    console.error("[v0] Error loading data from blob:", error)
  }

  // Return default data if no blob found
  cachedData = defaultData
  lastFetch = Date.now()
  return defaultData
}

async function saveData(data: StorageData): Promise<void> {
  try {
    // Delete old blob if exists
    try {
      const { blobs } = await list({ prefix: DATA_PREFIX })
      const oldBlob = blobs.find((b) => b.pathname === `${DATA_PREFIX}storage.json`)
      if (oldBlob) {
        await del(oldBlob.url)
      }
    } catch {}

    // Save new data
    await put(`${DATA_PREFIX}storage.json`, JSON.stringify(data, null, 2), {
      access: "public",
      contentType: "application/json",
    })

    cachedData = data
    lastFetch = Date.now()
  } catch (error) {
    console.error("[v0] Error saving data to blob:", error)
    throw error
  }
}

// Export storage API
export const blobStorage = {
  // Children
  children: {
    getAll: async (): Promise<Child[]> => {
      const data = await loadData()
      return data.children
    },
    getById: async (id: string): Promise<Child | undefined> => {
      const data = await loadData()
      return data.children.find((c) => c.id === id)
    },
    create: async (child: Omit<Child, "id" | "createdAt">): Promise<Child> => {
      const data = await loadData()
      const newChild: Child = {
        ...child,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      data.children.push(newChild)
      await saveData(data)
      return newChild
    },
    update: async (id: string, updates: Partial<Child>): Promise<Child | null> => {
      const data = await loadData()
      const index = data.children.findIndex((c) => c.id === id)
      if (index === -1) return null
      data.children[index] = { ...data.children[index], ...updates }
      await saveData(data)
      return data.children[index]
    },
    delete: async (id: string): Promise<boolean> => {
      const data = await loadData()
      const before = data.children.length
      data.children = data.children.filter((c) => c.id !== id)
      if (data.children.length < before) {
        await saveData(data)
        return true
      }
      return false
    },
  },

  // News
  news: {
    getAll: async (): Promise<News[]> => {
      const data = await loadData()
      return data.news
    },
    getById: async (id: string): Promise<News | undefined> => {
      const data = await loadData()
      return data.news.find((n) => n.id === id)
    },
    create: async (news: Omit<News, "id" | "date">): Promise<News> => {
      const data = await loadData()
      const newNews: News = {
        ...news,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      }
      data.news.unshift(newNews)
      await saveData(data)
      return newNews
    },
    update: async (id: string, updates: Partial<News>): Promise<News | null> => {
      const data = await loadData()
      const index = data.news.findIndex((n) => n.id === id)
      if (index === -1) return null
      data.news[index] = { ...data.news[index], ...updates }
      await saveData(data)
      return data.news[index]
    },
    delete: async (id: string): Promise<boolean> => {
      const data = await loadData()
      const before = data.news.length
      data.news = data.news.filter((n) => n.id !== id)
      if (data.news.length < before) {
        await saveData(data)
        return true
      }
      return false
    },
  },

  // Programs
  programs: {
    getAll: async (): Promise<Program[]> => {
      const data = await loadData()
      return data.programs
    },
    getById: async (id: string): Promise<Program | undefined> => {
      const data = await loadData()
      return data.programs.find((p) => p.id === id)
    },
    getBySlug: async (slug: string): Promise<Program | undefined> => {
      const data = await loadData()
      return data.programs.find((p) => p.slug === slug)
    },
    create: async (program: Omit<Program, "id" | "createdAt">): Promise<Program> => {
      const data = await loadData()
      const newProgram: Program = {
        ...program,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      data.programs.push(newProgram)
      await saveData(data)
      return newProgram
    },
    update: async (id: string, updates: Partial<Program>): Promise<Program | null> => {
      const data = await loadData()
      const index = data.programs.findIndex((p) => p.id === id)
      if (index === -1) return null
      data.programs[index] = { ...data.programs[index], ...updates }
      await saveData(data)
      return data.programs[index]
    },
    delete: async (id: string): Promise<boolean> => {
      const data = await loadData()
      const before = data.programs.length
      data.programs = data.programs.filter((p) => p.id !== id)
      if (data.programs.length < before) {
        await saveData(data)
        return true
      }
      return false
    },
  },

  // Donations
  donations: {
    getAll: async (): Promise<Donation[]> => {
      const data = await loadData()
      return data.donations
    },
    getById: async (id: string): Promise<Donation | undefined> => {
      const data = await loadData()
      return data.donations.find((d) => d.id === id)
    },
    create: async (donation: Omit<Donation, "id" | "createdAt">): Promise<Donation> => {
      const data = await loadData()
      const newDonation: Donation = {
        ...donation,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      data.donations.unshift(newDonation)
      await saveData(data)
      return newDonation
    },
    update: async (id: string, updates: Partial<Donation>): Promise<Donation | null> => {
      const data = await loadData()
      const index = data.donations.findIndex((d) => d.id === id)
      if (index === -1) return null
      data.donations[index] = { ...data.donations[index], ...updates }
      await saveData(data)
      return data.donations[index]
    },
    delete: async (id: string): Promise<boolean> => {
      const data = await loadData()
      const before = data.donations.length
      data.donations = data.donations.filter((d) => d.id !== id)
      if (data.donations.length < before) {
        await saveData(data)
        return true
      }
      return false
    },
    getStats: async () => {
      const data = await loadData()
      const completed = data.donations.filter((d) => d.paymentStatus === "completed")
      return {
        total: completed.reduce((sum, d) => sum + d.amount, 0),
        count: completed.length,
        average: completed.length > 0 ? completed.reduce((sum, d) => sum + d.amount, 0) / completed.length : 0,
        recurring: data.donations.filter((d) => d.isRecurring).length,
        byMethod: {
          card: completed.filter((d) => d.paymentMethod === "card").reduce((sum, d) => sum + d.amount, 0),
          bank: completed.filter((d) => d.paymentMethod === "bank").reduce((sum, d) => sum + d.amount, 0),
          sms: completed.filter((d) => d.paymentMethod === "sms").reduce((sum, d) => sum + d.amount, 0),
          crypto: completed.filter((d) => d.paymentMethod === "crypto").reduce((sum, d) => sum + d.amount, 0),
        },
      }
    },
  },

  // Users
  users: {
    getAll: async (): Promise<AdminUser[]> => {
      const data = await loadData()
      return data.users
    },
    getById: async (id: string): Promise<AdminUser | undefined> => {
      const data = await loadData()
      return data.users.find((u) => u.id === id)
    },
    getByUsername: async (username: string): Promise<AdminUser | undefined> => {
      const data = await loadData()
      return data.users.find((u) => u.username === username)
    },
    create: async (user: Omit<AdminUser, "id" | "createdAt">): Promise<AdminUser> => {
      const data = await loadData()
      const newUser: AdminUser = {
        ...user,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      data.users.push(newUser)
      await saveData(data)
      return newUser
    },
    update: async (id: string, updates: Partial<AdminUser>): Promise<AdminUser | null> => {
      const data = await loadData()
      const index = data.users.findIndex((u) => u.id === id)
      if (index === -1) return null
      data.users[index] = { ...data.users[index], ...updates }
      await saveData(data)
      return data.users[index]
    },
    delete: async (id: string): Promise<boolean> => {
      const data = await loadData()
      const before = data.users.length
      data.users = data.users.filter((u) => u.id !== id)
      if (data.users.length < before) {
        await saveData(data)
        return true
      }
      return false
    },
    updateLastLogin: async (id: string): Promise<AdminUser | null> => {
      const data = await loadData()
      const index = data.users.findIndex((u) => u.id === id)
      if (index === -1) return null
      data.users[index].lastLogin = new Date().toISOString()
      await saveData(data)
      return data.users[index]
    },
  },

  // Settings
  settings: {
    get: async (): Promise<SiteSettings> => {
      const data = await loadData()
      return data.settings
    },
    update: async (updates: Partial<SiteSettings>): Promise<SiteSettings> => {
      const data = await loadData()
      data.settings = { ...data.settings, ...updates }
      await saveData(data)
      return data.settings
    },
  },

  // Utility functions
  exportAll: async (): Promise<StorageData> => {
    return await loadData()
  },
  importAll: async (newData: StorageData): Promise<void> => {
    await saveData(newData)
  },
  reset: async (): Promise<void> => {
    await saveData(defaultData)
  },
}
