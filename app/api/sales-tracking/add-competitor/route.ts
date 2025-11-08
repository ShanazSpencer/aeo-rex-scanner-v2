import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { analyzeSalesTracking } from '@/lib/gemini'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { competitorUrl, companyName } = await req.json()

    if (!competitorUrl || !companyName) {
      return NextResponse.json(
        { error: 'Competitor URL and company name are required' },
        { status: 400 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: {
        competitorSalesTracking: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check limits
    const limits = {
      free: 2,
      pro: 10,
      premium: -1
    }

    const currentTracked = user.competitorSalesTracking.length
    const limit = limits[user.plan as keyof typeof limits]

    if (limit !== -1 && currentTracked >= limit) {
      return NextResponse.json(
        { error: 'Competitor tracking limit reached. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    // Check if already tracking
    const existing = await prisma.competitorSalesTracking.findFirst({
      where: {
        userId: user.id,
        competitorUrl
      }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Already tracking this competitor' },
        { status: 400 }
      )
    }

    // Analyze with Gemini
    const analysis = await analyzeSalesTracking(competitorUrl, companyName)

    // Create tracking entry
    const tracking = await prisma.competitorSalesTracking.create({
      data: {
        userId: user.id,
        competitorUrl,
        companyName,
        aiMentions: analysis.aiMentions,
        recommendationFrequency: analysis.recommendationFrequency,
        citationRate: analysis.citationRate,
        shoppingPresence: analysis.shoppingPresence,
        brandTrustScore: analysis.brandTrustScore,
        estimatedTraffic: analysis.estimatedTraffic
      }
    })

    // Create initial snapshot
    await prisma.salesTrackingSnapshot.create({
      data: {
        trackingId: tracking.id,
        week: new Date(),
        metrics: {
          aiMentions: analysis.aiMentions,
          recommendationFrequency: analysis.recommendationFrequency,
          citationRate: analysis.citationRate,
          shoppingPresence: analysis.shoppingPresence,
          brandTrustScore: analysis.brandTrustScore,
          estimatedTraffic: analysis.estimatedTraffic,
          insights: analysis.insights
        }
      }
    })

    return NextResponse.json({
      id: tracking.id,
      competitorUrl: tracking.competitorUrl,
      companyName: tracking.companyName,
      metrics: {
        aiMentions: tracking.aiMentions,
        recommendationFrequency: tracking.recommendationFrequency,
        citationRate: tracking.citationRate,
        shoppingPresence: tracking.shoppingPresence,
        brandTrustScore: tracking.brandTrustScore,
        estimatedTraffic: tracking.estimatedTraffic
      }
    })
  } catch (error) {
    console.error('Add competitor error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
