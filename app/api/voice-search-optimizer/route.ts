import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// This is an alias for the voice scan endpoint
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Forward to the actual scan/voice endpoint
  const body = await req.json()
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  const response = await fetch(`${baseUrl}/api/scan/voice`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': req.headers.get('cookie') || ''
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}
