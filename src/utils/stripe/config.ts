import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is missing from environment variables. Stripe features will fail.')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  // Using the current stable API version or the latest
  apiVersion: '2025-02-24-preview' as any,
  appInfo: {
    name: 'FairwayImpact',
    version: '0.1.0',
  },
})
