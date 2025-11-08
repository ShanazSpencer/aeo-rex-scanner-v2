'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';

interface CompetitorData {
  url: string;
  score: number;
  metrics: {
    structuredData: number;
    semanticMarkup: number;
    contentQuality: number;
    answerOptimization: number;
    technicalSEO: number;
  };
  strengths: string[];
  weaknesses: string[];
}

interface AnalysisResult {
  userSite: CompetitorData;
  competitors: CompetitorData[];
  insights: string[];
}

export default function CompetitorAnalysisPage() {
  const [userUrl, setUserUrl] = useState('');
  const [competitorUrls, setCompetitorUrls] = useState(['', '', '']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleCompetitorUrlChange = (index: number, value: string) => {
    const newUrls = [...competitorUrls];
    newUrls[index] = value;
    setCompetitorUrls(newUrls);
  };

  const addCompetitorField = () => {
    setCompetitorUrls([...competitorUrls, '']);
  };

  const removeCompetitorField = (index: number) => {
    const newUrls = competitorUrls.filter((_, i) => i !== index);
    setCompetitorUrls(newUrls);
  };

  const handleAnalyze = async () => {
    setError('');

    if (!userUrl) {
      setError('Please enter your website URL');
      return;
    }

    const validCompetitors = competitorUrls.filter(url => url.trim() !== '');
    if (validCompetitors.length === 0) {
      setError('Please enter at least one competitor URL');
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/competitor-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userUrl,
          competitorUrls: validCompetitors,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze competitors');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#00d9ff';
    if (score >= 60) return '#ffaa00';
    return '#ff0080';
  };

  return (
    <div className="min-h-screen p-8" style={{ background: '#0f1729' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#00d9ff' }}>
            Competitor Analysis
          </h1>
          <p className="text-gray-400">
            Compare your AEO performance against competitors
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
                Your Website URL
              </label>
              <Input
                type="url"
                value={userUrl}
                onChange={(e) => setUserUrl(e.target.value)}
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium" style={{ color: '#ff0080' }}>
                  Competitor URLs
                </label>
                <Button
                  onClick={addCompetitorField}
                  className="text-sm border"
                  style={{
                    borderColor: '#ff0080',
                    background: 'transparent',
                    color: '#ff0080'
                  }}
                >
                  + Add Competitor
                </Button>
              </div>

              <div className="space-y-3">
                {competitorUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="url"
                      value={url}
                      onChange={(e) => handleCompetitorUrlChange(index, e.target.value)}
                      placeholder={`https://competitor${index + 1}.com`}
                      className="border-2"
                      style={{
                        borderColor: '#ff0080',
                        background: 'rgba(0, 0, 0, 0.3)',
                        color: '#fff'
                      }}
                    />
                    {competitorUrls.length > 1 && (
                      <Button
                        onClick={() => removeCompetitorField(index)}
                        className="border"
                        style={{
                          borderColor: '#ff0080',
                          background: 'transparent',
                          color: '#ff0080'
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
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
              {isAnalyzing ? 'Analyzing...' : 'Analyze Competitors'}
            </Button>
          </div>
        </Card>

        {result && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#00d9ff' }}>
                Analysis Results
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-4" style={{
                  borderColor: '#00d9ff',
                  background: 'rgba(15, 23, 41, 0.8)',
                  boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)'
                }}>
                  <div className="text-sm text-gray-400 mb-2">Your Site</div>
                  <div className="font-semibold text-white mb-4 truncate">{result.userSite.url}</div>
                  <div className="text-5xl font-bold mb-4" style={{ color: getScoreColor(result.userSite.score) }}>
                    {result.userSite.score}%
                  </div>
                  <div className="space-y-2">
                    {Object.entries(result.userSite.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span style={{ color: getScoreColor(value) }}>{value}%</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {result.competitors.map((competitor, index) => (
                  <Card key={index} className="p-6 border-2" style={{
                    borderColor: '#ff0080',
                    background: 'rgba(15, 23, 41, 0.8)',
                    boxShadow: '0 0 20px rgba(255, 0, 128, 0.3)'
                  }}>
                    <div className="text-sm text-gray-400 mb-2">Competitor {index + 1}</div>
                    <div className="font-semibold text-white mb-4 truncate">{competitor.url}</div>
                    <div className="text-5xl font-bold mb-4" style={{ color: getScoreColor(competitor.score) }}>
                      {competitor.score}%
                    </div>
                    <div className="space-y-2">
                      {Object.entries(competitor.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span style={{ color: getScoreColor(value) }}>{value}%</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 border-2" style={{
                borderColor: '#00d9ff',
                background: 'rgba(15, 23, 41, 0.8)'
              }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#00d9ff' }}>
                  Your Strengths
                </h3>
                <ul className="space-y-3">
                  {result.userSite.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span style={{ color: '#00d9ff' }}>✓</span>
                      <span className="text-gray-300">{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 border-2" style={{
                borderColor: '#ff0080',
                background: 'rgba(15, 23, 41, 0.8)'
              }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#ff0080' }}>
                  Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {result.userSite.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span style={{ color: '#ff0080' }}>!</span>
                      <span className="text-gray-300">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card className="p-6 border-2" style={{
              borderColor: '#00d9ff',
              background: 'rgba(15, 23, 41, 0.8)'
            }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#00d9ff' }}>
                Key Insights
              </h3>
              <ul className="space-y-3">
                {result.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-2xl" style={{ color: '#00d9ff' }}>→</span>
                    <span className="text-gray-300 text-lg">{insight}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
