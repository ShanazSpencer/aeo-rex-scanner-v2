'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';

interface Scan {
  id: string;
  url: string;
  score: number;
  createdAt: string;
}

interface CompetitorAnalysis {
  id: string;
  url: string;
  competitorCount: number;
  createdAt: string;
}

interface VoiceScan {
  id: string;
  url: string;
  optimizationScore: number;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [recentScans, setRecentScans] = useState<Scan[]>([]);
  const [competitorAnalyses, setCompetitorAnalyses] = useState<CompetitorAnalysis[]>([]);
  const [voiceScans, setVoiceScans] = useState<VoiceScan[]>([]);
  const [showTrackerBanner, setShowTrackerBanner] = useState(true);
  const [stats, setStats] = useState({
    totalScans: 0,
    avgScore: 0,
    trackedCompetitors: 0,
    voiceOptimizations: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      loadDashboardData();
    }
  }, [status, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('trackerBannerDismissed');
      if (dismissed === 'true') {
        setShowTrackerBanner(false);
      }
    }
  }, []);

  const loadDashboardData = async () => {
    try {
      const [scansRes, competitorRes, voiceRes, statsRes] = await Promise.all([
        fetch('/api/scans?limit=5'),
        fetch('/api/competitor-analysis?limit=5'),
        fetch('/api/voice-scans?limit=5'),
        fetch('/api/dashboard/stats'),
      ]);

      if (scansRes.ok) {
        const scansData = await scansRes.json();
        setRecentScans(scansData.scans || []);
      }

      if (competitorRes.ok) {
        const competitorData = await competitorRes.json();
        setCompetitorAnalyses(competitorData.analyses || []);
      }

      if (voiceRes.ok) {
        const voiceData = await voiceRes.json();
        setVoiceScans(voiceData.scans || []);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f1729' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 mx-auto mb-4" style={{
            borderColor: '#00d9ff',
            borderTopColor: 'transparent'
          }}></div>
          <p style={{ color: '#00d9ff' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ background: '#0f1729' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#00d9ff' }}>
            Welcome back, {session?.user?.name}!
          </h1>
          <p className="text-gray-400">Here's your AEO optimization overview</p>
        </div>

        {/* LARGE COMPETITOR TRACKER BANNER */}
        {showTrackerBanner && (
          <div id="tracker-banner" style={{
            background: 'linear-gradient(135deg, #00d9ff 0%, #0099cc 50%, #ff0080 100%)',
            border: '4px solid #fff',
            borderRadius: '20px',
            padding: '50px 40px',
            marginBottom: '40px',
            textAlign: 'center',
            boxShadow: '0 10px 50px rgba(0,217,255,0.6)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated background effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Large Icon */}
              <div style={{ marginBottom: '25px' }}>
                <span style={{ fontSize: '80px' }}>🎯📊🚀</span>
              </div>

              {/* Main Headline */}
              <h2 style={{
                fontSize: '48px',
                color: '#000',
                fontWeight: 900,
                margin: '0 0 20px 0',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '2px 2px 4px rgba(255,255,255,0.3)'
              }}>
                🔥 NEW FEATURE ALERT! 🔥
              </h2>

              <h3 style={{
                fontSize: '36px',
                color: '#000',
                fontWeight: 800,
                margin: '0 0 25px 0',
                lineHeight: 1.3
              }}>
                Competitor Sales Tracker Now Live!
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '22px',
                color: '#000',
                margin: '0 auto 35px auto',
                maxWidth: '800px',
                lineHeight: 1.6,
                fontWeight: 600
              }}>
                Track your competitors&apos; AI visibility in <strong>real-time</strong>.<br/>
                See exactly who&apos;s dominating ChatGPT, Claude & Perplexity searches.<br/>
                Know what queries trigger AI to recommend them instead of you.
              </p>

              {/* Key Benefits */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                maxWidth: '900px',
                margin: '0 auto 40px auto'
              }}>
                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>📈</div>
                  <div style={{ color: '#000', fontWeight: 700, fontSize: '16px' }}>
                    Weekly Reports
                  </div>
                </div>

                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚡</div>
                  <div style={{ color: '#000', fontWeight: 700, fontSize: '16px' }}>
                    Real-Time Alerts
                  </div>
                </div>

                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎯</div>
                  <div style={{ color: '#000', fontWeight: 700, fontSize: '16px' }}>
                    Market Share %
                  </div>
                </div>

                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>💡</div>
                  <div style={{ color: '#000', fontWeight: 700, fontSize: '16px' }}>
                    Steal Their Strategy
                  </div>
                </div>
              </div>

              {/* Large CTA Button */}
              <a href="/competitor-sales-tracking" style={{
                display: 'inline-block',
                background: '#000',
                color: '#00d9ff',
                padding: '22px 60px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 900,
                fontSize: '24px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
                transition: 'transform 0.2s',
                border: '3px solid #00d9ff'
              }}>
                🚀 Track Competitors Now
              </a>

              <p style={{
                marginTop: '20px',
                fontSize: '16px',
                color: '#000',
                fontWeight: 600
              }}>
                ⚡ Available on Pro & Premium plans • Start free trial today
              </p>
            </div>

            {/* Dismissible close button */}
            <button type="button" onClick={() => {
              setShowTrackerBanner(false);
              localStorage.setItem('trackerBannerDismissed', 'true');
            }} style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'rgba(0,0,0,0.3)',
              border: '2px solid #000',
              color: '#000',
              fontSize: '28px',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background 0.2s'
            }}>
              ✕
            </button>
          </div>
        )}

        {/* MEDIUM VOICE OPTIMIZATION BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, #1a0a2e 0%, #16213e 100%)',
          border: '3px solid #00d9ff',
          borderRadius: '16px',
          padding: '35px 30px',
          marginBottom: '30px',
          boxShadow: '0 8px 30px rgba(0,217,255,0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle animated background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, transparent 0%, rgba(0,217,255,0.05) 50%, transparent 100%)',
          }}></div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '25px', flexWrap: 'wrap' }}>

            {/* Left side: Icon + Content */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                <span style={{ fontSize: '48px' }}>🎤</span>
                <div>
                  <div style={{
                    display: 'inline-block',
                    background: '#00d9ff',
                    color: '#000',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    marginBottom: '8px'
                  }}>
                    NEW FEATURE
                  </div>
                  <h3 style={{
                    fontSize: '28px',
                    color: '#fff',
                    fontWeight: 800,
                    margin: 0,
                    lineHeight: 1.2
                  }}>
                    AI Voice Search Optimization
                  </h3>
                </div>
              </div>

              <p style={{
                fontSize: '17px',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.6,
                margin: '0 0 20px 0'
              }}>
                <strong style={{ color: '#00d9ff' }}>75% of searches will be voice by 2026.</strong><br/>
                Optimize your website for Siri, Alexa & Google Assistant. Get found when customers ask AI for recommendations.
              </p>

              {/* Quick stats */}
              <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '24px', color: '#00d9ff', fontWeight: 800 }}>✓</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>iPhone Compatible</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', color: '#00d9ff', fontWeight: 800 }}>✓</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Featured Snippets</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', color: '#00d9ff', fontWeight: 800 }}>✓</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>FAQ Optimization</div>
                </div>
              </div>
            </div>

            {/* Right side: CTA */}
            <div style={{ textAlign: 'center' }}>
              <a href="/voice-search-optimizer" style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #00d9ff, #0099cc)',
                color: '#000',
                padding: '16px 35px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '18px',
                boxShadow: '0 6px 20px rgba(0,217,255,0.4)',
                transition: 'transform 0.2s',
                whiteSpace: 'nowrap'
              }}>
                Optimize for Voice →
              </a>
              <p style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                marginTop: '12px'
              }}>
                ⚡ Free on all plans
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-2" style={{
            borderColor: '#00d9ff',
            background: 'rgba(15, 23, 41, 0.8)',
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)'
          }}>
            <div className="text-sm text-gray-400 mb-2">Total Scans</div>
            <div className="text-3xl font-bold" style={{ color: '#00d9ff' }}>
              {stats.totalScans}
            </div>
          </Card>

          <Card className="p-6 border-2" style={{
            borderColor: '#ff0080',
            background: 'rgba(15, 23, 41, 0.8)',
            boxShadow: '0 0 20px rgba(255, 0, 128, 0.3)'
          }}>
            <div className="text-sm text-gray-400 mb-2">Average Score</div>
            <div className="text-3xl font-bold" style={{ color: '#ff0080' }}>
              {stats.avgScore}%
            </div>
          </Card>

          <Card className="p-6 border-2" style={{
            borderColor: '#00d9ff',
            background: 'rgba(15, 23, 41, 0.8)',
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)'
          }}>
            <div className="text-sm text-gray-400 mb-2">Tracked Competitors</div>
            <div className="text-3xl font-bold" style={{ color: '#00d9ff' }}>
              {stats.trackedCompetitors}
            </div>
          </Card>

          <Card className="p-6 border-2" style={{
            borderColor: '#ff0080',
            background: 'rgba(15, 23, 41, 0.8)',
            boxShadow: '0 0 20px rgba(255, 0, 128, 0.3)'
          }}>
            <div className="text-sm text-gray-400 mb-2">Voice Optimizations</div>
            <div className="text-3xl font-bold" style={{ color: '#ff0080' }}>
              {stats.voiceOptimizations}
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 border-2" style={{
            borderColor: '#00d9ff',
            background: 'rgba(15, 23, 41, 0.8)',
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)'
          }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: '#00d9ff' }}>Recent Scans</h2>
              <Link href="/scan">
                <Button className="border-2" style={{
                  borderColor: '#00d9ff',
                  background: 'transparent',
                  color: '#00d9ff'
                }}>
                  New Scan
                </Button>
              </Link>
            </div>

            {recentScans.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No scans yet. Start your first scan!</p>
            ) : (
              <div className="space-y-4">
                {recentScans.map((scan) => (
                  <Link key={scan.id} href={`/results/${scan.id}`}>
                    <div className="p-4 rounded border-2 hover:scale-105 transition-all cursor-pointer" style={{
                      borderColor: 'rgba(0, 217, 255, 0.3)',
                      background: 'rgba(0, 0, 0, 0.3)'
                    }}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold text-white truncate">{scan.url}</div>
                          <div className="text-sm text-gray-400">
                            {new Date(scan.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-2xl font-bold ml-4" style={{
                          color: scan.score >= 80 ? '#00d9ff' : scan.score >= 60 ? '#ff0080' : '#ff4444'
                        }}>
                          {scan.score}%
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6 border-2" style={{
            borderColor: '#ff0080',
            background: 'rgba(15, 23, 41, 0.8)',
            boxShadow: '0 0 20px rgba(255, 0, 128, 0.3)'
          }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: '#ff0080' }}>Competitor Analysis</h2>
              <Link href="/competitor-analysis">
                <Button className="border-2" style={{
                  borderColor: '#ff0080',
                  background: 'transparent',
                  color: '#ff0080'
                }}>
                  Analyze
                </Button>
              </Link>
            </div>

            {competitorAnalyses.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No competitor analyses yet.</p>
            ) : (
              <div className="space-y-4">
                {competitorAnalyses.map((analysis) => (
                  <div key={analysis.id} className="p-4 rounded border-2" style={{
                    borderColor: 'rgba(255, 0, 128, 0.3)',
                    background: 'rgba(0, 0, 0, 0.3)'
                  }}>
                    <div className="font-semibold text-white truncate">{analysis.url}</div>
                    <div className="text-sm text-gray-400">
                      {analysis.competitorCount} competitors · {new Date(analysis.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 border-2" style={{
            borderColor: '#00d9ff',
            background: 'rgba(15, 23, 41, 0.8)',
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)'
          }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: '#00d9ff' }}>Voice Search</h2>
              <Link href="/voice-search-optimizer">
                <Button className="border-2" style={{
                  borderColor: '#00d9ff',
                  background: 'transparent',
                  color: '#00d9ff'
                }}>
                  Optimize
                </Button>
              </Link>
            </div>

            {voiceScans.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No voice optimizations yet.</p>
            ) : (
              <div className="space-y-4">
                {voiceScans.map((scan) => (
                  <div key={scan.id} className="p-4 rounded border-2" style={{
                    borderColor: 'rgba(0, 217, 255, 0.3)',
                    background: 'rgba(0, 0, 0, 0.3)'
                  }}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-semibold text-white truncate">{scan.url}</div>
                        <div className="text-sm text-gray-400">
                          {new Date(scan.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-xl font-bold ml-4" style={{ color: '#00d9ff' }}>
                        {scan.optimizationScore}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6 border-2" style={{
            borderColor: '#ff0080',
            background: 'rgba(15, 23, 41, 0.8)',
            boxShadow: '0 0 20px rgba(255, 0, 128, 0.3)'
          }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: '#ff0080' }}>Sales Tracking</h2>
              <Link href="/competitor-sales-tracking">
                <Button className="border-2" style={{
                  borderColor: '#ff0080',
                  background: 'transparent',
                  color: '#ff0080'
                }}>
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded border-2" style={{
                borderColor: 'rgba(255, 0, 128, 0.3)',
                background: 'rgba(0, 0, 0, 0.3)'
              }}>
                <div className="text-sm text-gray-400 mb-1">Active Watchlists</div>
                <div className="text-2xl font-bold" style={{ color: '#ff0080' }}>
                  {stats.trackedCompetitors}
                </div>
              </div>
              <div className="p-4 rounded border-2" style={{
                borderColor: 'rgba(255, 0, 128, 0.3)',
                background: 'rgba(0, 0, 0, 0.3)'
              }}>
                <div className="text-sm text-gray-400 mb-1">Recent Alerts</div>
                <div className="text-2xl font-bold" style={{ color: '#ff0080' }}>
                  0
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
