import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.customer && session.subscription) {
          const customerId = session.customer as string
          const subscriptionId = session.subscription as string

          // Get subscription details
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)

          // Determine plan based on price ID
          let plan = 'free'
          const priceId = subscription.items.data[0].price.id

          if (priceId === process.env.STRIPE_PRICE_ID_PRO_MONTHLY ||
              priceId === process.env.STRIPE_PRICE_ID_PRO_YEARLY) {
            plan = 'pro'
          } else if (priceId === process.env.STRIPE_PRICE_ID_PREMIUM_MONTHLY ||
                     priceId === process.env.STRIPE_PRICE_ID_PREMIUM_YEARLY) {
            plan = 'premium'
          }

          // Update or create subscription
          const user = await prisma.user.findFirst({
            where: {
              subscription: {
                stripeCustomerId: customerId
              }
            }
          })

          if (user) {
            await prisma.subscription.upsert({
              where: { userId: user.id },
              create: {
                userId: user.id,
                stripeCustomerId: customerId,
                status: subscription.status,
                planId: priceId
              },
              update: {
                status: subscription.status,
                planId: priceId
              }
            })

            await prisma.user.update({
              where: { id: user.id },
              data: { plan }
            })
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription

        let plan = 'free'
        const priceId = subscription.items.data[0].price.id

        if (priceId === process.env.STRIPE_PRICE_ID_PRO_MONTHLY ||
            priceId === process.env.STRIPE_PRICE_ID_PRO_YEARLY) {
          plan = 'pro'
        } else if (priceId === process.env.STRIPE_PRICE_ID_PREMIUM_MONTHLY ||
                   priceId === process.env.STRIPE_PRICE_ID_PREMIUM_YEARLY) {
          plan = 'premium'
        }

        await prisma.subscription.update({
          where: { stripeCustomerId: subscription.customer as string },
          data: {
            status: subscription.status,
            planId: priceId,
            user: {
              update: {
                plan
              }
            }
          }
        })
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        await prisma.subscription.update({
          where: { stripeCustomerId: subscription.customer as string },
          data: {
            status: 'canceled',
            user: {
              update: {
                plan: 'free'
              }
            }
          }
        })
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
