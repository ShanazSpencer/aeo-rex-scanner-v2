import Stripe from 'stripe'

const apiKey = process.env.STRIPE_SECRET_KEY || ''
let stripeInstance: Stripe | null = null

if (apiKey) {
  stripeInstance = new Stripe(apiKey, {
    apiVersion: '2025-02-24.acacia'
  })
}

export const stripe = stripeInstance as Stripe

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    scans: 5,
    competitorComparisons: 1,
    voiceScans: 1,
    competitorsTracked: 2,
    features: [
      '5 scans per month',
      '1 competitor comparison',
      '1 voice optimization scan',
      'Track 2 competitors',
      'Basic reports'
    ]
  },
  pro: {
    name: 'Pro',
    priceMonthly: 99,
    priceYearly: 999,
    scans: 50,
    competitorComparisons: 10,
    voiceScans: 10,
    competitorsTracked: 10,
    features: [
      '50 scans per month',
      '10 competitor comparisons',
      '10 voice optimization scans',
      'Track 10 competitors',
      'Weekly sales reports',
      'Priority support',
      'Advanced analytics'
    ]
  },
  premium: {
    name: 'Premium',
    priceMonthly: 199,
    priceYearly: 1999,
    scans: -1, // unlimited
    competitorComparisons: -1,
    voiceScans: -1,
    competitorsTracked: -1,
    features: [
      'Unlimited scans',
      'Unlimited competitor comparisons',
      'Unlimited voice optimization scans',
      'Track unlimited competitors',
      'Daily sales alerts',
      'White-label reports',
      'API access',
      'Predictive AI sales forecasting',
      'Dedicated account manager'
    ]
  }
}
