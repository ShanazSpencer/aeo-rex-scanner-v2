import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ 
        message: 'If that email exists, we sent reset instructions' 
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });

    // TODO: Send email with reset link
    // Integrate email service: Resend, SendGrid, AWS SES
    console.log('Reset token:', resetToken);
    console.log('Reset link:', `http://localhost:3000/reset-password?token=${resetToken}`);

    return NextResponse.json({ 
      message: 'If that email exists, we sent reset instructions',
      // REMOVE THIS IN PRODUCTION - only for testing
      resetLink: `http://localhost:3000/reset-password?token=${resetToken}`
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
