import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const scan = await prisma.scan.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!scan) {
      return NextResponse.json(
        { error: 'Scan not found' },
        { status: 404 }
      )
    }

    // Parse recommendations from JSON string
    let recommendations = []
    try {
      const parsed = JSON.parse(scan.recommendations)
      // If it's a simple array of strings, convert to detailed format
      if (Array.isArray(parsed) && typeof parsed[0] === 'string') {
        recommendations = parsed.map((rec: string, index: number) => ({
          category: 'Content',
          severity: index < 2 ? 'high' : index < 4 ? 'medium' : 'low',
          title: rec,
          description: rec,
          impact: 'Improving this will enhance AI visibility'
        }))
      } else {
        recommendations = parsed
      }
    } catch {
      recommendations = []
    }

    // Generate mock metrics based on score
    const baseMetric = scan.score
    const metrics = {
      structuredData: Math.min(100, baseMetric + Math.floor(Math.random() * 10)),
      semanticMarkup: Math.min(100, baseMetric - 5 + Math.floor(Math.random() * 10)),
      contentQuality: Math.min(100, baseMetric + Math.floor(Math.random() * 10)),
      answerOptimization: Math.min(100, baseMetric - 3 + Math.floor(Math.random() * 10)),
      technicalSEO: Math.min(100, baseMetric + 2 + Math.floor(Math.random() * 10))
    }

    return NextResponse.json({
      id: scan.id,
      url: scan.url,
      score: scan.score,
      recommendations,
      metrics,
      createdAt: scan.createdAt
    })
  } catch (error) {
    console.error('Scan fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
