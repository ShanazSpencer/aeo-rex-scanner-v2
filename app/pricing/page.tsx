'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Card from '@/components/Card';

type BillingCycle = 'monthly' | 'yearly';

interface PricingTier {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  priceId: {
    monthly: string;
    yearly: string;
  };
  features: string[];
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    priceId: {
      monthly: '',
      yearly: '',
    },
    features: [
      '5 AEO scans per month',
      'Basic competitor analysis',
      'Email support',
      'Standard reports',
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: 99,
    yearlyPrice: 999,
    priceId: {
      monthly: 'price_pro_monthly',
      yearly: 'price_pro_yearly',
    },
    features: [
      'Unlimited AEO scans',
      'Advanced competitor analysis',
      '10 competitor tracking slots',
      'Voice search optimization',
      'Priority email support',
      'Detailed analytics',
      'Export reports',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    monthlyPrice: 199,
    yearlyPrice: 1999,
    priceId: {
      monthly: 'price_premium_monthly',
      yearly: 'price_premium_yearly',
    },
    features: [
      'Everything in Pro',
      'Unlimited competitor tracking',
      'Sales tracking & alerts',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
      '24/7 priority support',
      'White-label reports',
    ],
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleCheckout = async (tier: PricingTier) => {
    if (tier.monthlyPrice === 0) {
      router.push('/signup');
      return;
    }

    setIsLoading(tier.name);

    try {
      const priceId = billingCycle === 'monthly' ? tier.priceId.monthly : tier.priceId.yearly;

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          billingCycle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen p-8" style={{ background: '#0f1729' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#00d9ff' }}>
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Unlock the power of AEO optimization
          </p>

          <div className="inline-flex items-center gap-4 p-2 rounded-lg border-2" style={{
            borderColor: '#00d9ff',
            background: 'rgba(0, 0, 0, 0.3)'
          }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              className="px-6 py-2 rounded-md font-semibold transition-all"
              style={{
                background: billingCycle === 'monthly' ? '#00d9ff' : 'transparent',
                color: billingCycle === 'monthly' ? '#0f1729' : '#00d9ff',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className="px-6 py-2 rounded-md font-semibold transition-all flex items-center gap-2"
              style={{
                background: billingCycle === 'yearly' ? '#00d9ff' : 'transparent',
                color: billingCycle === 'yearly' ? '#0f1729' : '#00d9ff',
              }}
            >
              Yearly
              <span className="text-xs px-2 py-1 rounded" style={{ background: '#ff0080', color: '#fff' }}>
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className="p-8 border-2 relative transition-all hover:scale-105"
              style={{
                borderColor: tier.highlighted ? '#ff0080' : '#00d9ff',
                background: tier.highlighted
                  ? 'rgba(255, 0, 128, 0.1)'
                  : 'rgba(15, 23, 41, 0.8)',
                boxShadow: tier.highlighted
                  ? '0 0 30px rgba(255, 0, 128, 0.4)'
                  : '0 0 20px rgba(0, 217, 255, 0.3)',
              }}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold" style={{
                  background: '#ff0080',
                  color: '#fff'
                }}>
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2" style={{ color: tier.highlighted ? '#ff0080' : '#00d9ff' }}>
                  {tier.name}
                </h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold" style={{ color: '#fff' }}>
                    £{billingCycle === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice}
                  </span>
                  {tier.monthlyPrice > 0 && (
                    <span className="text-gray-400">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  )}
                </div>
                {tier.monthlyPrice > 0 && billingCycle === 'yearly' && (
                  <p className="text-sm text-gray-400">
                    £{(tier.yearlyPrice / 12).toFixed(2)} per month
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span style={{ color: '#00d9ff' }}>✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleCheckout(tier)}
                disabled={isLoading === tier.name}
                className="w-full border-2 font-semibold py-6 text-lg transition-all hover:scale-105"
                style={{
                  background: tier.highlighted
                    ? 'linear-gradient(135deg, #ff0080 0%, #00d9ff 100%)'
                    : 'linear-gradient(135deg, #00d9ff 0%, #ff0080 100%)',
                  borderColor: tier.highlighted ? '#ff0080' : '#00d9ff',
                  color: '#fff'
                }}
              >
                {isLoading === tier.name
                  ? 'Processing...'
                  : tier.monthlyPrice === 0
                    ? 'Get Started Free'
                    : 'Subscribe Now'}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400">
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}
