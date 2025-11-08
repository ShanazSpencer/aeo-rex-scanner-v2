import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: {
        competitorSalesTracking: {
          include: {
            snapshots: {
              orderBy: { week: 'desc' },
              take: 12 // Last 12 weeks
            }
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      competitors: user.competitorSalesTracking.map(tracking => ({
        id: tracking.id,
        companyName: tracking.companyName,
        competitorUrl: tracking.competitorUrl,
        currentMetrics: {
          aiMentions: tracking.aiMentions,
          recommendationFrequency: tracking.recommendationFrequency,
          citationRate: tracking.citationRate,
          shoppingPresence: tracking.shoppingPresence,
          brandTrustScore: tracking.brandTrustScore,
          estimatedTraffic: tracking.estimatedTraffic
        },
        history: tracking.snapshots
      }))
    })
  } catch (error) {
    console.error('Analyze error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
