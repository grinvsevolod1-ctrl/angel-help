import { v4 as uuidv4 } from "uuid"

export interface YookassaPayment {
  amount: {
    value: string
    currency: string
  }
  confirmation: {
    type: "redirect"
    return_url: string
  }
  capture: boolean
  description: string
  metadata?: {
    email?: string
    name?: string
    childId?: string
    donationId?: string
  }
}

export interface YookassaPaymentResponse {
  id: string
  status: string
  paid: boolean
  amount: {
    value: string
    currency: string
  }
  confirmation: {
    type: string
    confirmation_url: string
  }
  created_at: string
  description: string
  metadata?: {
    email?: string
    name?: string
    childId?: string
    donationId?: string
  }
}

export async function createYookassaPayment(
  amount: number,
  description: string,
  metadata?: { email?: string; name?: string; childId?: string; donationId?: string },
): Promise<YookassaPaymentResponse> {
  const shopId = process.env.YOOKASSA_SHOP_ID
  const secretKey = process.env.YOOKASSA_SECRET_KEY

  if (!shopId || !secretKey) {
    throw new Error("Yookassa credentials not configured")
  }

  const idempotenceKey = uuidv4()
  const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/success${metadata?.donationId ? `?donationId=${metadata.donationId}` : ""}`

  const payment: YookassaPayment = {
    amount: {
      value: amount.toFixed(2),
      currency: "RUB",
    },
    confirmation: {
      type: "redirect",
      return_url: returnUrl,
    },
    capture: true,
    description,
    metadata,
  }

  const response = await fetch("https://api.yookassa.ru/v3/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotence-Key": idempotenceKey,
      Authorization: "Basic " + Buffer.from(`${shopId}:${secretKey}`).toString("base64"),
    },
    body: JSON.stringify(payment),
  })

  if (!response.ok) {
    const error = await response.json()
    console.error("[v0] Yookassa API error:", error)
    throw new Error(`Failed to create payment: ${error.description || response.statusText}`)
  }

  return response.json()
}

export async function getYookassaPayment(paymentId: string): Promise<YookassaPaymentResponse> {
  const shopId = process.env.YOOKASSA_SHOP_ID
  const secretKey = process.env.YOOKASSA_SECRET_KEY

  if (!shopId || !secretKey) {
    throw new Error("Yookassa credentials not configured")
  }

  const response = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
    method: "GET",
    headers: {
      Authorization: "Basic " + Buffer.from(`${shopId}:${secretKey}`).toString("base64"),
    },
  })

  if (!response.ok) {
    throw new Error("Failed to get payment status")
  }

  return response.json()
}
