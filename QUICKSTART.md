# AEO-Rex Scanner - Quick Start Guide

## Project Successfully Built! ✅

Your Next.js 14 AEO-Rex Scanner application is ready to use.

## What's Included

### Pages
- ✅ Homepage with hero section and scan form
- ✅ Login & Signup pages
- ✅ Pricing page (3 tiers with Stripe)
- ✅ Dashboard with scan history
- ✅ Scan results page
- ✅ Competitor analysis page
- ✅ Competitor sales tracking page
- ✅ Voice search optimizer page

### Features
- ✅ URL scanning with AEO scoring
- ✅ Competitor comparison (up to 5 competitors)
- ✅ Sales tracking with weekly snapshots
- ✅ Voice search optimization analysis
- ✅ User authentication (email/password)
- ✅ Subscription management with Stripe
- ✅ Protected routes and API endpoints
- ✅ Responsive cyberpunk design

### Database Models
- User, Scan, CompetitorScan, VoiceScan
- CompetitorSalesTracking, SalesTrackingSnapshot
- Subscription, Watchlist

## Next Steps

### 1. Set Up Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then fill in these required values:

```env
# Database - Set up PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/aeo_rex_scanner"

# NextAuth - Generate secret with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"

# Gemini AI - Get from https://makersuite.google.com/app/apikey
GEMINI_API_KEY="your-gemini-api-key"

# Stripe - Get from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Stripe Price IDs - Create products in Stripe dashboard
STRIPE_PRICE_ID_PRO_MONTHLY="price_..."
STRIPE_PRICE_ID_PRO_YEARLY="price_..."
STRIPE_PRICE_ID_PREMIUM_MONTHLY="price_..."
STRIPE_PRICE_ID_PREMIUM_YEARLY="price_..."
```

### 2. Set Up PostgreSQL Database

Option A - Local PostgreSQL:
```bash
# Install PostgreSQL, then:
createdb aeo_rex_scanner
```

Option B - Cloud (recommended for quick start):
- Use [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [Railway](https://railway.app/)
- Get connection string and add to DATABASE_URL

### 3. Run Database Migrations

```bash
npx prisma generate
npx prisma db push
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Testing the Application

### 1. Create a Test Account
- Go to `/signup`
- Create an account with email/password
- Login at `/login`

### 2. Test URL Scanning
- On homepage, enter a URL (e.g., https://example.com)
- Click "Scan Now"
- View results with AEO score and recommendations

### 3. Test Competitor Analysis
- Go to `/competitor-analysis`
- Enter your URL + up to 5 competitor URLs
- View side-by-side comparison

### 4. Test Sales Tracking
- Go to `/competitor-sales-tracking`
- Add competitors to watchlist
- View metrics and trends

### 5. Test Voice Optimizer
- Go to `/voice-search-optimizer`
- Enter URL to analyze
- View voice readiness score and recommendations

## API Keys You'll Need

### 1. Google Gemini AI (Required)
- Visit: https://makersuite.google.com/app/apikey
- Create API key
- Add to `GEMINI_API_KEY`

### 2. Stripe (Required for payments)
- Visit: https://dashboard.stripe.com/register
- Get test keys from API section
- Create products for Pro and Premium plans
- Get Price IDs for monthly/yearly billing

### 3. PostgreSQL Database (Required)
- Local: Install PostgreSQL
- Cloud: Neon, Supabase, or Railway

## Stripe Setup

1. Create account at https://stripe.com
2. Go to Dashboard → Products
3. Create two products:
   - **AEO-Rex Pro**: £99/month or £999/year
   - **AEO-Rex Premium**: £199/month or £1999/year
4. Copy the Price IDs to your .env file
5. Set up webhook:
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhook`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy webhook secret to .env

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Deploy to Other Platforms
- Works with any platform supporting Next.js 14
- Ensure Node.js 18+ is available
- Set all environment variables
- Run database migrations on deploy

## Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Database Connection Issues
```bash
# Test connection
npx prisma db pull

# Reset database (WARNING: Deletes all data)
npx prisma db push --force-reset
```

### Prisma Client Issues
```bash
# Regenerate Prisma client
npx prisma generate
```

## Project Structure

```
aeo-rex-scanner-v2/
├── app/                  # Next.js 14 App Router
│   ├── api/             # API routes
│   ├── (pages)/         # Page components
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/          # Reusable components
│   ├── charts/          # Recharts components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Navigation.tsx
├── lib/                 # Utilities
│   ├── prisma.ts        # Database client
│   ├── auth.ts          # NextAuth config
│   ├── gemini.ts        # AI integration
│   └── stripe.ts        # Payment config
├── prisma/
│   └── schema.prisma    # Database schema
└── public/              # Static assets
```

## Features by Plan

### Free (£0/month)
- 5 scans/month
- 1 competitor comparison/month
- 1 voice scan/month
- Track 2 competitors

### Pro (£99/month or £999/year)
- 50 scans/month
- 10 competitor comparisons/month
- 10 voice scans/month
- Track 10 competitors
- Weekly sales reports
- Priority support

### Premium (£199/month or £1999/year)
- Unlimited scans
- Unlimited competitor comparisons
- Unlimited voice scans
- Track unlimited competitors
- Daily sales alerts
- White-label reports
- API access
- Predictive AI forecasting

## Support

If you encounter issues:

1. Check this guide
2. Review `.env.example` for required variables
3. Ensure all API keys are valid
4. Check database connection
5. Review console logs for errors

## What's Next?

1. ✅ Set up environment variables
2. ✅ Configure database
3. ✅ Get API keys (Gemini, Stripe)
4. ✅ Run migrations
5. ✅ Test locally
6. ✅ Deploy to production
7. ✅ Set up domain and SSL
8. ✅ Configure Stripe webhook in production
9. ✅ Launch!

Happy building! 🚀
