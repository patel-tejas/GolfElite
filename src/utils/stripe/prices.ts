export const STRIPE_PRICES = {
  WEEKLY: process.env.STRIPE_PRICE_ID_WEEKLY || 'price_placeholder_weekly',
  MONTHLY: process.env.STRIPE_PRICE_ID_MONTHLY || 'price_placeholder_monthly',
}

export const PLANS = [
  {
    name: 'Weekly Entry',
    price: '$5',
    priceId: STRIPE_PRICES.WEEKLY,
    description: 'Perfect for casual players wanting to test the waters.',
    features: [
      '1 Weekly Score Entry',
      'Eligibility for Weekly Draw',
      'Charity Contribution included',
    ],
  },
  {
    name: 'Monthly Pro',
    price: '$18',
    priceId: STRIPE_PRICES.MONTHLY,
    description: 'Best value for serious golfers tracking progress.',
    features: [
      'Unlimited Score Entries (Top 5 count)',
      'Eligibility for all Monthly Draws',
      'Priority Charity Impact Reports',
      'Save 10% compared to weekly',
    ],
    popular: true,
  },
]
