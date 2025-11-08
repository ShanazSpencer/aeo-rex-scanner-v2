# AEO-Rex Scanner - AI Visibility Scanner

A comprehensive Next.js 14 SaaS application for analyzing and optimizing website visibility to AI chatbots and search engines.

## Features

- **URL Scanning**: Analyze any website for AI Engine Optimization (AEO) with scores from 0-100
- **Competitor Analysis**: Compare your AI visibility against up to 5 competitors side-by-side
- **Sales Tracking**: Monitor competitor performance in AI-driven sales channels
- **Voice Search Optimizer**: Optimize your site for AI voice assistants like Alexa, Siri, and Google Assistant
- **User Authentication**: Secure email/password authentication with NextAuth.js
- **Subscription Plans**: Three tiers (Free, Pro, Premium) with Stripe integration
- **Dashboard**: Comprehensive dashboard showing all scan history and insights

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Cyberpunk theme)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **AI Integration**: Google Gemini AI
- **Charts**: Recharts
- **Forms**: React Hook Form

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for local)
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `GEMINI_API_KEY`: Google Gemini AI API key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- Stripe Price IDs for each plan tier

### 3. Set Up Database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
aeo-rex-scanner-v2/
├── app/                          # Next.js 14 App Router pages
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth.js
│   │   ├── scan/                 # Scan endpoints
│   │   ├── sales-tracking/       # Sales tracking endpoints
│   │   ├── user/                 # User data endpoints
│   │   ├── signup/               # User registration
│   │   └── webhook/              # Stripe webhooks
│   ├── dashboard/                # User dashboard
│   ├── competitor-analysis/      # Competitor comparison
│   ├── competitor-sales-tracking/# Sales tracking page
│   ├── voice-search-optimizer/   # Voice optimization
│   ├── results/[id]/             # Scan results
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   ├── pricing/                  # Pricing page
│   └── page.tsx                  # Homepage
├── components/                   # Reusable components
│   ├── charts/                   # Chart components
│   ├── scan/                     # Scan components
│   ├── competitor/               # Competitor components
│   ├── sales-tracking/           # Sales tracking components
│   └── voice/                    # Voice optimization components
├── lib/                          # Utilities and configurations
│   ├── prisma.ts                 # Prisma client
│   ├── auth.ts                   # NextAuth config
│   ├── gemini.ts                 # Gemini AI integration
│   └── stripe.ts                 # Stripe config
├── prisma/                       # Database schema
│   └── schema.prisma
└── public/                       # Static assets
```

## Pricing Plans

- **Free**: £0/month - 5 scans, 1 competitor comparison, 1 voice scan, track 2 competitors
- **Pro**: £99/month or £999/year - 50 scans, 10 comparisons, 10 voice scans, track 10 competitors, weekly reports
- **Premium**: £199/month or £1999/year - Unlimited everything, daily alerts, white-label reports, API access

## Database Models

- **User**: User accounts with plan information
- **Scan**: Single URL scan results
- **CompetitorScan**: Competitor comparison results
- **CompetitorSalesTracking**: Competitor sales performance tracking
- **SalesTrackingSnapshot**: Weekly snapshots of competitor metrics
- **VoiceScan**: Voice search optimization results
- **Subscription**: Stripe subscription data
- **Watchlist**: Competitor watchlist

## API Endpoints

- `POST /api/signup` - User registration
- `POST /api/scan` - Scan a single URL
- `POST /api/scan/competitor` - Compare competitors
- `POST /api/scan/voice` - Voice optimization scan
- `POST /api/sales-tracking/add-competitor` - Add competitor to watchlist
- `GET /api/sales-tracking/analyze` - Get sales tracking data
- `GET /api/sales-tracking/history` - Get historical snapshots
- `GET /api/sales-tracking/alerts` - Get competitor alerts
- `GET /api/user/scans` - Get user's scan history
- `GET /api/user/competitors` - Get competitor analyses
- `GET /api/user/voice-scans` - Get voice scans
- `GET /api/user/watchlist` - Get watchlist
- `POST /api/webhook` - Stripe webhook handler

## Design Theme

- **Background**: Dark navy (#0f1729)
- **Primary**: Cyan (#00d9ff)
- **Secondary**: Hot pink (#ff0080)
- **Dark**: #0a0f1f
- **Dark Light**: #1a2332

## License

MIT

## Support

For support, email support@aeo-rex-scanner.com or join our Slack channel.
