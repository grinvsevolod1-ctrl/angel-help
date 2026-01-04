import { requireAuth } from "@/lib/auth"
import { getSettingsAction } from "@/app/actions/settings"
import { AdminHeader } from "@/components/admin/admin-header"
import { SettingsForm } from "@/components/admin/settings-form"

export default async function SettingsPage() {
  const session = await requireAuth()
  const settings = await getSettingsAction()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader username={session.username} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Настройки сайта</h1>
          <p className="text-muted-foreground">Управление общими настройками сайта</p>
        </div>

        <SettingsForm settings={settings} />
      </main>
    </div>
  )
}
