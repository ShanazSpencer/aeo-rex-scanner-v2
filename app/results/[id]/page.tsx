'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';

interface Recommendation {
  category: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
}

interface ScanResult {
  id: string;
  url: string;
  score: number;
  createdAt: string;
  recommendations: Recommendation[];
  metrics: {
    structuredData: number;
    semanticMarkup: number;
    contentQuality: number;
    answerOptimization: number;
    technicalSEO: number;
  };
}

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadResults();
  }, [params.id]);

  const loadResults = async () => {
    try {
      const response = await fetch(`/api/scans/${params.id}`);

      if (!response.ok) {
        throw new Error('Failed to load scan results');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load results');
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#ff0080';
      case 'medium':
        return '#ffaa00';
      case 'low':
        return '#00d9ff';
      default:
        return '#00d9ff';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#00d9ff';
    if (score >= 60) return '#ffaa00';
    return '#ff0080';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f1729' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 mx-auto mb-4" style={{
            borderColor: '#00d9ff',
            borderTopColor: 'transparent'
          }}></div>
          <p style={{ color: '#00d9ff' }}>Loading results...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f1729' }}>
        <Card className="p-8 border-2 max-w-md" style={{
          borderColor: '#ff0080',
          background: 'rgba(15, 23, 41, 0.8)'
        }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#ff0080' }}>Error</h2>
          <p className="text-gray-400 mb-6">{error || 'Results not found'}</p>
          <Link href="/dashboard">
            <Button style={{
              background: 'linear-gradient(135deg, #00d9ff 0%, #ff0080 100%)',
              color: '#fff'
            }}>
              Back to Dashboard
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ background: '#0f1729' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard">
            <Button className="mb-4 border-2" style={{
              borderColor: '#00d9ff',
              background: 'transparent',
              color: '#00d9ff'
            }}>
              ← Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#00d9ff' }}>
            Scan Results
          </h1>
          <p className="text-gray-400">{result.url}</p>
          <p className="text-sm text-gray-500">
            Scanned on {new Date(result.createdAt).toLocaleString()}
          </p>
        </div>

        <Card className="p-8 mb-8 border-2" style={{
          borderColor: getScoreColor(result.score),
          background: 'rgba(15, 23, 41, 0.8)',
          boxShadow: `0 0 30px ${getScoreColor(result.score)}40`
        }}>
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Overall AEO Score</div>
            <div className="text-8xl font-bold mb-4" style={{ color: getScoreColor(result.score) }}>
              {result.score}%
            </div>
            <div className="text-gray-400">
              {result.score >= 80 ? 'Excellent' : result.score >= 60 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-5 gap-4 mb-8">
          {Object.entries(result.metrics).map(([key, value]) => (
            <Card key={key} className="p-4 border-2" style={{
              borderColor: '#00d9ff',
              background: 'rgba(15, 23, 41, 0.8)'
            }}>
              <div className="text-xs text-gray-400 mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-2xl font-bold" style={{ color: getScoreColor(value) }}>
                {value}%
              </div>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#00d9ff' }}>
            Recommendations
          </h2>

          {result.recommendations.length === 0 ? (
            <Card className="p-8 border-2" style={{
              borderColor: '#00d9ff',
              background: 'rgba(15, 23, 41, 0.8)'
            }}>
              <p className="text-center text-gray-400">
                Great job! No major recommendations at this time.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <Card key={index} className="p-6 border-2" style={{
                  borderColor: getSeverityColor(rec.severity),
                  background: 'rgba(15, 23, 41, 0.8)'
                }}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full" style={{
                      background: getSeverityColor(rec.severity)
                    }}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs px-2 py-1 rounded font-semibold uppercase" style={{
                          background: getSeverityColor(rec.severity),
                          color: '#fff'
                        }}>
                          {rec.severity}
                        </span>
                        <span className="text-xs px-2 py-1 rounded" style={{
                          background: 'rgba(0, 217, 255, 0.2)',
                          color: '#00d9ff'
                        }}>
                          {rec.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#fff' }}>
                        {rec.title}
                      </h3>
                      <p className="text-gray-400 mb-3">{rec.description}</p>
                      <div className="text-sm" style={{ color: '#00d9ff' }}>
                        Impact: {rec.impact}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-4">
          <Button
            onClick={() => router.push('/scan')}
            className="border-2 font-semibold py-6 px-8"
            style={{
              background: 'linear-gradient(135deg, #00d9ff 0%, #ff0080 100%)',
              borderColor: '#00d9ff',
              color: '#fff'
            }}
          >
            Run Another Scan
          </Button>
          <Button
            onClick={() => window.print()}
            className="border-2 font-semibold py-6 px-8"
            style={{
              borderColor: '#00d9ff',
              background: 'transparent',
              color: '#00d9ff'
            }}
          >
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
}
