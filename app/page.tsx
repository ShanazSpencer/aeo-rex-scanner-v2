'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Card from '@/components/Card'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!session) {
      router.push('/login')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Scan failed')
      }

      router.push(`/results/${data.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-white">Check Your </span>
            <span className="text-primary">AI Visibility</span>
          </h1>
          <p className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Discover how visible your website is to AI chatbots like ChatGPT, Claude, and Perplexity.
            Get actionable insights to improve your AEO (AI Engine Optimization).
          </p>

          {/* Scan Form */}
          <Card className="max-w-2xl mx-auto" glow>
            <form onSubmit={handleScan} className="space-y-4">
              <div>
                <Input
                  type="url"
                  placeholder="Enter your website URL (e.g., https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="text-lg"
                />
              </div>
              {error && (
                <p className="text-secondary text-sm">{error}</p>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full text-lg py-4"
              >
                {loading ? 'Scanning...' : 'Scan Now'}
              </Button>
              {!session && (
                <p className="text-sm text-gray-400">
                  Sign in required to scan websites
                </p>
              )}
            </form>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-dark-light">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-primary">Powerful Features</span> for AI Optimization
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <div className="text-primary text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">URL Scanning</h3>
              <p className="text-gray-400">
                Analyze any website for AI visibility and get an AEO score from 0-100
              </p>
            </Card>

            <Card>
              <div className="text-secondary text-4xl mb-4">⚔️</div>
              <h3 className="text-xl font-bold mb-2">Competitor Analysis</h3>
              <p className="text-gray-400">
                Compare your AI visibility against up to 5 competitors
              </p>
            </Card>

            <Card>
              <div className="text-primary text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Sales Tracking</h3>
              <p className="text-gray-400">
                Monitor competitor performance in AI-driven sales channels
              </p>
            </Card>

            <Card>
              <div className="text-secondary text-4xl mb-4">🎙️</div>
              <h3 className="text-xl font-bold mb-2">Voice Optimizer</h3>
              <p className="text-gray-400">
                Optimize your site for AI voice assistants and search
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Dominate <span className="text-primary">AI Search</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Get started with a free account and unlock powerful AI visibility insights
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.push('/signup')} className="px-8 py-4">
              Get Started Free
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/pricing')}
              className="px-8 py-4"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
