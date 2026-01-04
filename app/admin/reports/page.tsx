import { requireAuth } from "@/lib/auth"
import { getChildren, getDonations, getDonationStats, getPrograms } from "@/lib/db"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, CreditCard, Heart } from "lucide-react"
import { ExportButtons } from "@/components/admin/export-buttons"

export default async function ReportsPage() {
  const session = await requireAuth()
  const children = await getChildren()
  const donations = await getDonations()
  const stats = await getDonationStats()
  const programs = await getPrograms()

  const activeChildren = children.filter((c) => c.status === "active")
  const completedChildren = children.filter((c) => c.status === "completed")

  const totalCollected = children.reduce((sum, c) => sum + c.currentAmount, 0)
  const totalTarget = children.reduce((sum, c) => sum + c.targetAmount, 0)

  // Group donations by month
  const donationsByMonth: { [key: string]: number } = {}
  donations.forEach((d) => {
    if (d.paymentStatus === "completed") {
      const month = new Date(d.createdAt).toLocaleDateString("ru-RU", { year: "numeric", month: "long" })
      donationsByMonth[month] = (donationsByMonth[month] || 0) + d.amount
    }
  })

  // Top donors
  const donorTotals: { [key: string]: { name: string; total: number; count: number } } = {}
  donations.forEach((d) => {
    if (d.paymentStatus === "completed" && !d.isAnonymous) {
      if (!donorTotals[d.donorEmail]) {
        donorTotals[d.donorEmail] = { name: d.donorName, total: 0, count: 0 }
      }
      donorTotals[d.donorEmail].total += d.amount
      donorTotals[d.donorEmail].count++
    }
  })
  const topDonors = Object.values(donorTotals)
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Отчеты и аналитика</h1>
            <p className="text-muted-foreground">Статистика работы фонда</p>
          </div>
          <ExportButtons />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего собрано</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCollected.toLocaleString()} ₽</div>
              <p className="text-xs text-muted-foreground">
                {totalTarget > 0 ? ((totalCollected / totalTarget) * 100).toFixed(1) : 0}% от цели
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Подопечных</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{children.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeChildren.length} активных, {completedChildren.length} завершённых
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Пожертвований</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.count}</div>
              <p className="text-xs text-muted-foreground">
                Средний чек: {Math.round(stats.average).toLocaleString()} ₽
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Программ</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{programs.length}</div>
              <p className="text-xs text-muted-foreground">
                {programs.filter((p) => p.status === "active").length} активных
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="donations">Пожертвования</TabsTrigger>
            <TabsTrigger value="children">Подопечные</TabsTrigger>
            <TabsTrigger value="donors">Топ доноров</TabsTrigger>
          </TabsList>

          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <CardTitle>Пожертвования по месяцам</CardTitle>
                <CardDescription>Динамика поступлений за последнее время</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(donationsByMonth).length > 0 ? (
                    Object.entries(donationsByMonth).map(([month, amount]) => (
                      <div key={month} className="flex items-center justify-between p-4 border rounded-lg">
                        <span className="font-medium capitalize">{month}</span>
                        <span className="text-green-600 font-bold">{amount.toLocaleString()} ₽</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">Нет данных о пожертвованиях</p>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-4">По способам оплаты</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Карты</p>
                      <p className="text-lg font-bold">{stats.byMethod.card.toLocaleString()} ₽</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Банк. перевод</p>
                      <p className="text-lg font-bold">{stats.byMethod.bank.toLocaleString()} ₽</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">СМС</p>
                      <p className="text-lg font-bold">{stats.byMethod.sms.toLocaleString()} ₽</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Крипто</p>
                      <p className="text-lg font-bold">{stats.byMethod.crypto.toLocaleString()} ₽</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="children">
            <Card>
              <CardHeader>
                <CardTitle>Статистика по подопечным</CardTitle>
                <CardDescription>Прогресс сбора средств</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {children.length > 0 ? (
                    children.map((child) => {
                      const progress = child.targetAmount > 0 ? (child.currentAmount / child.targetAmount) * 100 : 0
                      return (
                        <div key={child.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium">{child.name}</p>
                              <p className="text-sm text-muted-foreground">{child.diagnosis}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{child.currentAmount.toLocaleString()} ₽</p>
                              <p className="text-xs text-muted-foreground">
                                из {child.targetAmount.toLocaleString()} ₽
                              </p>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-full rounded-full ${
                                progress >= 100 ? "bg-green-500" : progress >= 50 ? "bg-blue-500" : "bg-orange-500"
                              }`}
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{progress.toFixed(1)}% собрано</p>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-center text-muted-foreground py-8">Нет данных о подопечных</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donors">
            <Card>
              <CardHeader>
                <CardTitle>Топ благотворителей</CardTitle>
                <CardDescription>Наиболее активные доноры</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDonors.length > 0 ? (
                    topDonors.map((donor, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{donor.name}</p>
                            <p className="text-sm text-muted-foreground">{donor.count} пожертвований</p>
                          </div>
                        </div>
                        <span className="text-green-600 font-bold">{donor.total.toLocaleString()} ₽</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">Нет данных о донорах</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
