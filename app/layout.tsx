import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AEO-Rex Scanner - AI Visibility Scanner',
  description: 'Check how visible your website is to AI chatbots',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Providers>
          <Navigation />
          <main style={{ flex: 1 }}>
            {children}
          </main>

          {/* Copyright Footer - appears on all pages */}
          <footer style={{
            background: 'linear-gradient(to top, #0a0e1a, #0f1729)',
            borderTop: '2px solid rgba(0,217,255,0.2)',
            padding: '30px 20px',
            marginTop: 'auto',
            textAlign: 'center'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>

              {/* Main Copyright Notice */}
              <div style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                <p style={{ margin: '0 0 10px 0' }}>
                  <strong style={{ color: '#00d9ff' }}>© 2025 AEO-Rex™</strong> - Answer Engine Optimization Scanner
                </p>
                <p style={{ margin: '0', fontSize: '13px' }}>
                  All rights reserved. Unauthorized reproduction or distribution of this software,
                  or any portion of it, may result in severe civil and criminal penalties.
                </p>
              </div>

              {/* Legal Links */}
              <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                fontSize: '13px'
              }}>
                <a href="/terms" style={{
                  color: '#00d9ff',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }} className="footer-link">
                  Terms of Service
                </a>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                <a href="/privacy" style={{
                  color: '#00d9ff',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }} className="footer-link">
                  Privacy Policy
                </a>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                <a href="/contact" style={{
                  color: '#00d9ff',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }} className="footer-link">
                  Contact Us
                </a>
              </div>

              {/* Additional Copyright Details */}
              <div style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: '1.5'
              }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  AEO-Rex™ and the AEO-Rex logo are trademarks of AEO-Rex Limited.
                </p>
                <p style={{ margin: '0' }}>
                  Made in Birmingham, UK 🇬🇧 | Powered by AI | Trusted by 50+ UK Businesses
                </p>
              </div>
            </div>
          </footer>
        </Providers>

        <style jsx global>{`
          .footer-link:hover {
            opacity: 0.7;
          }

          @media (max-width: 768px) {
            footer {
              padding: 25px 15px !important;
            }
            footer div {
              font-size: 12px !important;
            }
          }
        `}</style>
      </body>
    </html>
  )
}
