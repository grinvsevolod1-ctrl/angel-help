import { requireAuth } from "@/lib/auth"
import { getDonationsAction, getDonationStatsAction } from "@/app/actions/donations"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DonationsTable } from "@/components/admin/donations-table"
import { CreditCard, TrendingUp, Users, Repeat } from "lucide-react"

export default async function DonationsManagementPage() {
  const session = await requireAuth()
  const donations = await getDonationsAction()
  const stats = await getDonationStatsAction()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Управление пожертвованиями</h1>
          <p className="text-muted-foreground">История и статистика пожертвований</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего собрано</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total.toLocaleString()} ₽</div>
              <p className="text-xs text-muted-foreground">{stats.count} пожертвований</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Средний чек</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.average).toLocaleString()} ₽</div>
              <p className="text-xs text-muted-foreground">На одно пожертвование</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Регулярные</CardTitle>
              <Repeat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recurring}</div>
              <p className="text-xs text-muted-foreground">Подписок на пожертвования</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">По картам</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.byMethod.card.toLocaleString()} ₽</div>
              <p className="text-xs text-muted-foreground">
                Банковские переводы: {stats.byMethod.bank.toLocaleString()} ₽
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Все пожертвования</CardTitle>
            <CardDescription>История всех полученных пожертвований</CardDescription>
          </CardHeader>
          <CardContent>
            <DonationsTable donations={donations} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
