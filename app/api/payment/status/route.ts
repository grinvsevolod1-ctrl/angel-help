import { type NextRequest, NextResponse } from "next/server"
import { getYookassaPayment } from "@/lib/yookassa"
import { getDonationById, updateDonation } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const paymentId = searchParams.get("paymentId")
    const donationId = searchParams.get("donationId")

    if (donationId) {
      const donation = await getDonationById(donationId)
      if (donation) {
        return NextResponse.json({
          status: donation.paymentStatus,
          paid: donation.paymentStatus === "completed",
          amount: donation.amount.toString(),
          donorName: donation.isAnonymous ? "Аноним" : donation.donorName,
          childName: donation.childName,
          isAnonymous: donation.isAnonymous,
          createdAt: donation.createdAt,
        })
      }
    }

    if (!paymentId) {
      return NextResponse.json({ error: "Payment ID or Donation ID is required" }, { status: 400 })
    }

    const payment = await getYookassaPayment(paymentId)

    if (payment.paid && payment.metadata?.donationId) {
      await updateDonation(payment.metadata.donationId, {
        paymentStatus: "completed",
      })
    }

    return NextResponse.json({
      status: payment.status,
      paid: payment.paid,
      amount: payment.amount.value,
      donorName: payment.metadata?.name || "Аноним",
      isAnonymous: !payment.metadata?.name || payment.metadata?.name === "Аноним",
    })
  } catch (error) {
    console.error("[v0] Payment status check error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to get payment status" },
      { status: 500 },
    )
  }
}
