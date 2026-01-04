import { type NextRequest, NextResponse } from "next/server"
import { createYookassaPayment } from "@/lib/yookassa"
import { createDonation } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, name, email, childId, childName, isAnonymous } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    const description = childId ? `Пожертвование на лечение ребенка` : "Благотворительное пожертвование"

    const donation = await createDonation({
      amount: Number(amount),
      donorName: isAnonymous ? "Аноним" : name || "Не указано",
      donorEmail: email,
      childId: childId || undefined,
      childName: childName || undefined,
      paymentMethod: "card",
      paymentStatus: "pending",
      isAnonymous: isAnonymous || false,
      isRecurring: false,
    })

    const payment = await createYookassaPayment(amount, description, {
      email,
      name: isAnonymous ? "Аноним" : name,
      childId,
      donationId: donation.id, // Pass donation ID to link payment
    })

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/donations/${donation.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId: payment.id }),
    })

    return NextResponse.json({
      paymentId: payment.id,
      donationId: donation.id,
      confirmationUrl: payment.confirmation.confirmation_url,
    })
  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create payment" },
      { status: 500 },
    )
  }
}
