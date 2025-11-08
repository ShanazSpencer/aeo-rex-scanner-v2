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
              take: 2 // Current and previous week
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

    // Generate alerts based on changes
    const alerts: any[] = []

    user.competitorSalesTracking.forEach(tracking => {
      if (tracking.snapshots.length >= 2) {
        const current = tracking.snapshots[0].metrics as any
        const previous = tracking.snapshots[1].metrics as any

        // Check for significant changes (>20%)
        const mentionChange = ((current.aiMentions - previous.aiMentions) / previous.aiMentions) * 100
        const visibilityChange = ((current.recommendationFrequency - previous.recommendationFrequency) / previous.recommendationFrequency) * 100

        if (Math.abs(mentionChange) > 20) {
          alerts.push({
            competitorName: tracking.companyName,
            type: mentionChange > 0 ? 'increase' : 'decrease',
            metric: 'AI Mentions',
            change: `${Math.abs(mentionChange).toFixed(1)}%`,
            message: `${tracking.companyName} ${mentionChange > 0 ? 'increased' : 'decreased'} AI mentions by ${Math.abs(mentionChange).toFixed(1)}%`,
            severity: Math.abs(mentionChange) > 50 ? 'high' : 'medium',
            date: tracking.updatedAt
          })
        }

        if (Math.abs(visibilityChange) > 20) {
          alerts.push({
            competitorName: tracking.companyName,
            type: visibilityChange > 0 ? 'increase' : 'decrease',
            metric: 'Visibility Score',
            change: `${Math.abs(visibilityChange).toFixed(1)}%`,
            message: `${tracking.companyName} ${visibilityChange > 0 ? 'increased' : 'decreased'} AI visibility by ${Math.abs(visibilityChange).toFixed(1)}%`,
            severity: Math.abs(visibilityChange) > 50 ? 'high' : 'medium',
            date: tracking.updatedAt
          })
        }
      }
    })

    return NextResponse.json({ alerts })
  } catch (error) {
    console.error('Alerts error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
