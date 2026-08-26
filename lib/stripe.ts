import Stripe from "stripe"

let stripe: Stripe | null = null

export function getStripe() {
  if (stripe) {
    return stripe
  }

  const apiKey = process.env.STRIPE_SECRET_KEY
  if (!apiKey) {
    throw new Error("Missing STRIPE_SECRET_KEY")
  }

  stripe = new Stripe(apiKey)
  return stripe
}
