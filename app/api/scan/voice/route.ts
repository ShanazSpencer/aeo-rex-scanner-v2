import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { analyzeVoiceSearch } from '@/lib/gemini'

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

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: {
        voiceScans: {
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

    const currentScans = user.voiceScans.length
    const limit = limits[user.plan as keyof typeof limits]

    if (limit !== -1 && currentScans >= limit) {
      return NextResponse.json(
        { error: 'Voice scan limit reached. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    // Analyze with Gemini
    const analysis = await analyzeVoiceSearch(url)

    // Save to database
    const scan = await prisma.voiceScan.create({
      data: {
        userId: user.id,
        url,
        voiceScore: analysis.voiceScore,
        recommendations: analysis as any
      }
    })

    return NextResponse.json({
      id: scan.id,
      url: scan.url,
      voiceScore: scan.voiceScore,
      recommendations: scan.recommendations,
      createdAt: scan.createdAt
    })
  } catch (error) {
    console.error('Voice scan error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
