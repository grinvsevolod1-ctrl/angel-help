"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import useSWR from "swr"

interface Donation {
  id: string
  childName?: string
  donorName: string
  amount: number
  createdAt: string
  isAnonymous: boolean
  paymentStatus: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function maskName(name: string, isAnonymous: boolean): string {
  if (isAnonymous || !name || name === "Аноним") return "Аноним"
  const parts = name.split(" ")
  if (parts.length >= 1 && parts[0].length > 0) {
    return parts[0].slice(0, 3) + "*******"
  }
  return name.slice(0, 3) + "*******"
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const months = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ]
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export function DonationRecent() {
  const {
    data: donations,
    isLoading,
    error,
  } = useSWR<Donation[]>("/api/donations", fetcher, {
    refreshInterval: 10000, // Refresh every 10 seconds
    revalidateOnFocus: true,
  })

  const { data: stats } = useSWR<{ count: number }>("/api/donations?stats=true", fetcher, { refreshInterval: 30000 })

  // Filter only completed donations
  const completedDonations = donations?.filter((d) => d.paymentStatus === "completed") || []

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 rounded-full px-6 py-3 mb-4">
            <p className="text-3xl font-black text-primary">{stats?.count ?? 1345}</p>
          </div>
          <p className="text-lg text-gray-600">детей уже сохранили жизнь</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Последние пожертвования</h3>
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {isLoading ? (
                  // Loading skeleton
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <Skeleton className="h-4 w-3/4 mb-3" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-3 w-1/3" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>
                  ))
                ) : error ? (
                  <p className="text-center text-muted-foreground py-8">Не удалось загрузить пожертвования</p>
                ) : completedDonations.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Пока нет пожертвований</p>
                ) : (
                  completedDonations.map((donation) => (
                    <div
                      key={donation.id}
                      className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors border border-gray-100"
                    >
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {donation.childName
                            ? `Помощь для ребёнка "${donation.childName}"`
                            : "Благотворительное пожертвование"}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-gray-600">
                              От кого:{" "}
                              <span className="font-medium">{maskName(donation.donorName, donation.isAnonymous)}</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="text-lg font-bold text-primary">
                              {donation.amount.toLocaleString("ru-RU")} ₽
                            </p>
                            <p className="text-xs text-gray-500">{formatDate(donation.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </section>
  )
}
