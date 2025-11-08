import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { analyzeSingleUrl } from '@/lib/gemini'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { url } = await req.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Get user's current plan and scan count
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: {
        scans: {
          where: {
            createdAt: {
              gte: new Date(new Date().setDate(1)) // First day of current month
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

    // Check scan limits
    const limits = {
      free: 5,
      pro: 50,
      premium: -1 // unlimited
    }

    const currentScans = user.scans.length
    const limit = limits[user.plan as keyof typeof limits]

    if (limit !== -1 && currentScans >= limit) {
      return NextResponse.json(
        { error: 'Scan limit reached. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    // Analyze URL with Gemini
    const analysis = await analyzeSingleUrl(url)

    // Save scan to database
    const scan = await prisma.scan.create({
      data: {
        url,
        score: analysis.score,
        recommendations: JSON.stringify(analysis.recommendations),
        userId: user.id
      }
    })

    return NextResponse.json({
      id: scan.id,
      url: scan.url,
      score: scan.score,
      recommendations: scan.recommendations,
      createdAt: scan.createdAt
    })
  } catch (error) {
    console.error('Scan error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
