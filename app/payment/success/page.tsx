import { Suspense } from "react"
import { PaymentSuccessContent } from "@/components/payment-success-content"
import { Loader2 } from "lucide-react"

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-16 h-16 animate-spin text-primary" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  )
}
