import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature") || ""

  try {
    // Verify the webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "")

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      // Extract the user ID and style ID from the metadata
      const userId = session.metadata?.userId
      const styleId = session.metadata?.styleId

      if (userId && styleId) {
        // In a real app, you would update your database to grant the user access to the premium style
        console.log(`User ${userId} purchased access to style ${styleId}`)

        // Example database update (pseudocode):
        // await db.userPremiumStyles.create({
        //   data: {
        //     userId,
        //     styleId,
        //     purchasedAt: new Date(),
        //   },
        // });
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

