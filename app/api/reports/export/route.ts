import { NextResponse } from "next/server"
import { getChildren, getDonations, getPrograms } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "donations"

    let data: any[] = []
    let filename = ""
    let headers: string[] = []

    switch (type) {
      case "donations":
        data = await getDonations()
        filename = "donations"
        headers = ["ID", "Донор", "Email", "Сумма", "Способ", "Статус", "Дата", "Назначение"]
        break
      case "children":
        data = await getChildren()
        filename = "children"
        headers = ["ID", "Имя", "Возраст", "Диагноз", "Цель", "Собрано", "Статус"]
        break
      case "programs":
        data = await getPrograms()
        filename = "programs"
        headers = ["ID", "Название", "Описание", "Статус"]
        break
      default:
        return NextResponse.json({ error: "Неизвестный тип отчета" }, { status: 400 })
    }

    // Create CSV content
    let csv = headers.join(";") + "\n"

    data.forEach((item) => {
      let row: string[] = []
      switch (type) {
        case "donations":
          row = [
            item.id,
            item.isAnonymous ? "Аноним" : item.donorName,
            item.donorEmail,
            item.amount.toString(),
            item.paymentMethod,
            item.paymentStatus,
            new Date(item.createdAt).toLocaleDateString("ru-RU"),
            item.childName || item.programName || "Общее",
          ]
          break
        case "children":
          row = [
            item.id,
            item.name,
            item.age?.toString() || "",
            item.diagnosis,
            item.targetAmount.toString(),
            item.currentAmount.toString(),
            item.status,
          ]
          break
        case "programs":
          row = [item.id, item.title, item.description, item.status]
          break
      }
      csv += row.map((cell) => `"${cell?.replace(/"/g, '""') || ""}"`).join(";") + "\n"
    })

    // Add BOM for Excel UTF-8 compatibility
    const BOM = "\uFEFF"
    const csvContent = BOM + csv

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Ошибка экспорта" }, { status: 500 })
  }
}
