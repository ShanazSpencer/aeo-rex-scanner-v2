import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { analyzeCompetitors } from '@/lib/gemini'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { userUrl, competitorUrls } = await req.json()

    if (!userUrl || !competitorUrls || !Array.isArray(competitorUrls)) {
      return NextResponse.json(
        { error: 'User URL and competitor URLs are required' },
        { status: 400 }
      )
    }

    if (competitorUrls.length === 0 || competitorUrls.length > 5) {
      return NextResponse.json(
        { error: 'Please provide 1-5 competitor URLs' },
        { status: 400 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: {
        competitorScans: {
          where: {
            createdAt: {
              gte: new Date(new Date().setDate(1))
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

    // Check limits
    const limits = {
      free: 1,
      pro: 10,
      premium: -1
    }

    const currentComparisons = user.competitorScans.length
    const limit = limits[user.plan as keyof typeof limits]

    if (limit !== -1 && currentComparisons >= limit) {
      return NextResponse.json(
        { error: 'Competitor comparison limit reached. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    // Analyze with Gemini
    const analysis = await analyzeCompetitors(userUrl, competitorUrls)

    // Save to database
    const scan = await prisma.competitorScan.create({
      data: {
        userId: user.id,
        userUrl,
        competitorUrls,
        results: analysis as any
      }
    })

    return NextResponse.json({
      id: scan.id,
      userUrl: scan.userUrl,
      competitorUrls: scan.competitorUrls,
      results: scan.results,
      createdAt: scan.createdAt
    })
  } catch (error) {
    console.error('Competitor scan error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
