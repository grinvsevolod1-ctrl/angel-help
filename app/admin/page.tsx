import { requireAuth } from "@/lib/auth"
import { getChildren, getNews, getPrograms, getDonations, getDonationStats } from "@/lib/db"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Newspaper, DollarSign, TrendingUp, Heart, FolderOpen, CreditCard, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  // Проверка авторизации
  const session = await requireAuth()

  // Данные
  const children = await getChildren()
  const news = await getNews()
  const programs = await getPrograms()
  const donations = await getDonations()
  const stats = await getDonationStats()

  const activeChildren = children.filter((child) => child.status === "active")
  const totalCollected = children.reduce((sum, child) => sum + child.currentAmount, 0)
  const totalTarget = children.reduce((sum, child) => sum + child.targetAmount, 0)
  const averageProgress = totalTarget > 0 ? Math.round((totalCollected / totalTarget) * 100) : 0

  const recentDonations = donations.slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Панель управления</h1>
          <p className="text-muted-foreground">Добро пожаловать, {session.username}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Подопечных</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeChildren.length}</div>
              <p className="text-xs text-muted-foreground">Активных из {children.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Собрано</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(stats.total / 1000).toFixed(0)}K ₽</div>
              <p className="text-xs text-muted-foreground">{stats.count} пожертвований</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Прогресс</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageProgress}%</div>
              <p className="text-xs text-muted-foreground">Средний по сборам</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Программ</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{programs.filter((p) => p.status === "active").length}</div>
              <p className="text-xs text-muted-foreground">Активных программ</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-base">Подопечные</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Управление карточками детей</p>
              <Button asChild size="sm" className="w-full">
                <Link href="/admin/children">
                  Перейти <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-100">
                  <Newspaper className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-base">Новости</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Публикация новостей</p>
              <Button asChild size="sm" className="w-full">
                <Link href="/admin/news">
                  Перейти <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Heart className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-base">Программы</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Благотворительные программы</p>
              <Button asChild size="sm" className="w-full">
                <Link href="/admin/programs">
                  Перейти <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-orange-100">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                </div>
                <CardTitle className="text-base">Пожертвования</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">История платежей</p>
              <Button asChild size="sm" className="w-full">
                <Link href="/admin/donations">
                  Перейти <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Children */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Последние подопечные</CardTitle>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/admin/children">Все</Link>
                </Button>
              </div>
            </CardHeader>
                        <CardContent>
              <div className="space-y-4">
                {children.slice(0, 4).map((child) => (
                  <div key={child.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{child.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{child.diagnosis}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-medium">
                        {((child.currentAmount / child.targetAmount) * 100).toFixed(0)}%
                      </p>
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${Math.min((child.currentAmount / child.targetAmount) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Donations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Последние пожертвования</CardTitle>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/admin/donations">Все</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDonations.length > 0 ? (
                  recentDonations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {donation.isAnonymous ? "Аноним" : donation.donorName}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {donation.childName || donation.programName || "Общее пожертвование"}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-medium text-green-600">
                          +{donation.amount.toLocaleString()} ₽
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(donation.createdAt).toLocaleDateString("ru-RU")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">Нет пожертвований</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
