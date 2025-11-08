'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';

interface VoiceOptimizationResult {
  url: string;
  overallScore: number;
  conversationalScore: number;
  questionAnswerScore: number;
  naturalLanguageScore: number;
  localOptimizationScore: number;
  recommendations: {
    category: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  voiceQueries: {
    query: string;
    likelihood: number;
    currentRanking: string;
  }[];
}

export default function VoiceSearchOptimizerPage() {
  const [url, setUrl] = useState('');
  const [targetKeywords, setTargetKeywords] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<VoiceOptimizationResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setError('');

    if (!url) {
      setError('Please enter a URL to analyze');
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/voice-search-optimizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          keywords: targetKeywords.split(',').map(k => k.trim()).filter(k => k),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze voice search optimization');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#00d9ff';
    if (score >= 60) return '#ffaa00';
    return '#ff0080';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  return (
    <div className="min-h-screen p-8" style={{ background: '#0f1729' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#00d9ff' }}>
            Voice Search Optimizer
          </h1>
          <p className="text-gray-400">
            Optimize your content for voice search and conversational queries
          </p>
        </div>

        <Card className="p-8 mb-8 border-2" style={{
          borderColor: '#00d9ff',
          background: 'rgba(15, 23, 41, 0.8)',
          boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)'
        }}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#00d9ff' }}>
                Website URL
              </label>
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="border-2"
                style={{
                  borderColor: '#00d9ff',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#fff'
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#00d9ff' }}>
                Target Keywords (comma-separated, optional)
              </label>
              <Input
                value={targetKeywords}
                onChange={(e) => setTargetKeywords(e.target.value)}
                placeholder="best coffee shop, coffee near me, late night cafe"
                className="border-2"
                style={{
                  borderColor: '#00d9ff',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#fff'
                }}
              />
              <p className="text-xs text-gray-400 mt-2">
                Add keywords to get specific voice query suggestions
              </p>
            </div>

            {error && (
              <div className="p-3 rounded border-2" style={{
                borderColor: '#ff0080',
                background: 'rgba(255, 0, 128, 0.1)',
                color: '#ff0080'
              }}>
                {error}
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full border-2 font-semibold py-6 text-lg transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #00d9ff 0%, #ff0080 100%)',
                borderColor: '#00d9ff',
                color: '#fff'
              }}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Voice Search Optimization'}
            </Button>
          </div>
        </Card>

        {result && (
          <div className="space-y-8">
            <Card className="p-8 border-2" style={{
              borderColor: getScoreColor(result.overallScore),
              background: 'rgba(15, 23, 41, 0.8)',
              boxShadow: `0 0 30px ${getScoreColor(result.overallScore)}40`
            }}>
              <div className="text-center mb-8">
                <div className="text-sm text-gray-400 mb-2">Voice Search Optimization Score</div>
                <div className="text-8xl font-bold mb-4" style={{ color: getScoreColor(result.overallScore) }}>
                  {result.overallScore}%
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Conversational</div>
                  <div className="text-3xl font-bold" style={{ color: getScoreColor(result.conversationalScore) }}>
                    {result.conversationalScore}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Q&A Format</div>
                  <div className="text-3xl font-bold" style={{ color: getScoreColor(result.questionAnswerScore) }}>
                    {result.questionAnswerScore}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Natural Language</div>
                  <div className="text-3xl font-bold" style={{ color: getScoreColor(result.naturalLanguageScore) }}>
                    {result.naturalLanguageScore}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Local SEO</div>
                  <div className="text-3xl font-bold" style={{ color: getScoreColor(result.localOptimizationScore) }}>
                    {result.localOptimizationScore}%
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 border-2" style={{
                borderColor: '#00d9ff',
                background: 'rgba(15, 23, 41, 0.8)',
                boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)'
              }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#00d9ff' }}>
                  Optimization Recommendations
                </h2>

                {result.recommendations.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">
                    Great job! Your content is well optimized for voice search.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="p-4 rounded border-2" style={{
                        borderColor: getPriorityColor(rec.priority),
                        background: 'rgba(0, 0, 0, 0.3)'
                      }}>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs px-2 py-1 rounded font-semibold uppercase" style={{
                            background: getPriorityColor(rec.priority),
                            color: '#fff'
                          }}>
                            {rec.priority}
                          </span>
                          <span className="text-xs px-2 py-1 rounded" style={{
                            background: 'rgba(0, 217, 255, 0.2)',
                            color: '#00d9ff'
                          }}>
                            {rec.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{rec.title}</h3>
                        <p className="text-sm text-gray-400">{rec.description}</p>
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
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#ff0080' }}>
                  Potential Voice Queries
                </h2>

                {result.voiceQueries.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">
                    Add target keywords to see voice query suggestions
                  </p>
                ) : (
                  <div className="space-y-4">
                    {result.voiceQueries.map((query, index) => (
                      <div key={index} className="p-4 rounded border-2" style={{
                        borderColor: 'rgba(255, 0, 128, 0.3)',
                        background: 'rgba(0, 0, 0, 0.3)'
                      }}>
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-white font-medium flex-1">"{query.query}"</p>
                          <span className="text-xs px-2 py-1 rounded ml-2" style={{
                            background: 'rgba(0, 217, 255, 0.2)',
                            color: '#00d9ff'
                          }}>
                            {query.likelihood}% likely
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          Current ranking: {query.currentRanking}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            <Card className="p-6 border-2" style={{
              borderColor: '#00d9ff',
              background: 'rgba(15, 23, 41, 0.8)'
            }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#00d9ff' }}>
                Voice Search Best Practices
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-white mb-3">Content Tips</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span style={{ color: '#00d9ff' }}>•</span>
                      <span>Use natural, conversational language</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: '#00d9ff' }}>•</span>
                      <span>Structure content in Q&A format</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: '#00d9ff' }}>•</span>
                      <span>Target long-tail keywords and questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: '#00d9ff' }}>•</span>
                      <span>Provide concise, direct answers</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3">Technical Tips</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span style={{ color: '#ff0080' }}>•</span>
                      <span>Implement FAQ schema markup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: '#ff0080' }}>•</span>
                      <span>Optimize for mobile and page speed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: '#ff0080' }}>•</span>
                      <span>Include local business schema</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: '#ff0080' }}>•</span>
                      <span>Use structured data for rich snippets</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
