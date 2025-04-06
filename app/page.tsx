"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      router.push("/")
      return
    }

    // In a real app, you would verify the payment with Stripe
    // For demo purposes, we'll just simulate a loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg shadow-lg shadow-purple-500/10 p-8 text-center border border-zinc-700">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-zinc-100 mb-4"></div>
              <h2 className="text-xl font-semibold mb-2 text-zinc-100">Processing your payment</h2>
              <p className="text-zinc-300">Please wait a moment...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-zinc-100">Payment Successful!</h2>
              <p className="text-zinc-300 mb-6">
                Thank you for your purchase. You now have access to premium milestone styles.
              </p>
              <Button onClick={() => router.push("/")} className="w-full">
                Create Your Milestone
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

