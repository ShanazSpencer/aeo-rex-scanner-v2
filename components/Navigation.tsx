'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-dark-light border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-primary">AEO-Rex</span>
              <span className="text-secondary ml-1">Scanner</span>
            </Link>

            {session && (
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/dashboard')
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-300 hover:text-primary'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/competitor-analysis"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/competitor-analysis')
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-300 hover:text-primary'
                  }`}
                >
                  Competitor Analysis
                </Link>
                <Link
                  href="/competitor-sales-tracking"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/competitor-sales-tracking')
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-300 hover:text-primary'
                  }`}
                >
                  Sales Tracking
                </Link>
                <Link
                  href="/voice-search-optimizer"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/voice-search-optimizer')
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-300 hover:text-primary'
                  }`}
                >
                  Voice Optimizer
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/pricing"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/pricing')
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-300 hover:text-primary'
              }`}
            >
              Pricing
            </Link>

            {session ? (
              <>
                <span className="text-sm text-gray-400">{session.user?.email}</span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-secondary/90"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
