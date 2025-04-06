import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import Stripe from "stripe"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession()

    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ error: "You must be logged in to purchase premium styles" }, { status: 401 })
    }

    const { styleId } = await request.json()

    // Create a Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Premium Milestone Style",
              description: `Access to the premium "${styleId}" style`,
            },
            unit_amount: 300, // €3.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}`,
      metadata: {
        userId: session.user.id,
        styleId,
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}

