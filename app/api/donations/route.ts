import { type NextRequest, NextResponse } from "next/server"
import { getDonations, createDonation, getDonationStats } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stats = searchParams.get("stats")

    if (stats === "true") {
      const donationStats = await getDonationStats()
      return NextResponse.json(donationStats)
    }

    const donations = await getDonations()
    return NextResponse.json(donations)
  } catch (error) {
    console.error("Error fetching donations:", error)
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.amount || !body.donorName || !body.donorEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newDonation = await createDonation({
      ...body,
      amount: Number(body.amount),
      paymentStatus: body.paymentStatus || "pending",
      paymentMethod: body.paymentMethod || "card",
      isAnonymous: body.isAnonymous || false,
      isRecurring: body.isRecurring || false,
    })

    return NextResponse.json(newDonation, { status: 201 })
  } catch (error) {
    console.error("Error creating donation:", error)
    return NextResponse.json({ error: "Failed to create donation" }, { status: 500 })
  }
}
