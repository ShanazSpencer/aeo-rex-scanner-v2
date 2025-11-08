'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';

interface WatchlistItem {
  id: string;
  url: string;
  name: string;
  addedAt: string;
  metrics: {
    estimatedRevenue: number;
    trafficTrend: number;
    rankingKeywords: number;
    contentUpdates: number;
  };
}

interface Alert {
  id: string;
  type: 'ranking' | 'traffic' | 'content' | 'revenue';
  severity: 'high' | 'medium' | 'low';
  message: string;
  competitor: string;
  timestamp: string;
}

export default function CompetitorSalesTrackingPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompetitorUrl, setNewCompetitorUrl] = useState('');
  const [newCompetitorName, setNewCompetitorName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadTrackingData();
  }, []);

  const loadTrackingData = async () => {
    try {
      const [watchlistRes, alertsRes] = await Promise.all([
        fetch('/api/sales-tracking/watchlist'),
        fetch('/api/sales-tracking/alerts'),
      ]);

      if (watchlistRes.ok) {
        const watchlistData = await watchlistRes.json();
        setWatchlist(watchlistData.watchlist || []);
      }

      if (alertsRes.ok) {
        const alertsData = await alertsRes.json();
        setAlerts(alertsData.alerts || []);
      }
    } catch (error) {
      console.error('Failed to load tracking data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCompetitor = async () => {
    if (!newCompetitorUrl || !newCompetitorName) return;

    setIsAdding(true);

    try {
      const response = await fetch('/api/sales-tracking/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: newCompetitorUrl,
          name: newCompetitorName,
        }),
      });

      if (response.ok) {
        await loadTrackingData();
        setShowAddModal(false);
        setNewCompetitorUrl('');
        setNewCompetitorName('');
      }
    } catch (error) {
      console.error('Failed to add competitor:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveCompetitor = async (id: string) => {
    try {
      const response = await fetch(`/api/sales-tracking/watchlist/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadTrackingData();
      }
    } catch (error) {
      console.error('Failed to remove competitor:', error);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f1729' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 mx-auto mb-4" style={{
            borderColor: '#00d9ff',
            borderTopColor: 'transparent'
          }}></div>
          <p style={{ color: '#00d9ff' }}>Loading tracking data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ background: '#0f1729' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#00d9ff' }}>
            Competitor Sales Tracking
          </h1>
          <p className="text-gray-400">
            Monitor competitor performance, traffic, and revenue trends
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-2" style={{
            borderColor: '#00d9ff',
            background: 'rgba(15, 23, 41, 0.8)'
          }}>
            <div className="text-sm text-gray-400 mb-2">Tracked Competitors</div>
            <div className="text-3xl font-bold" style={{ color: '#00d9ff' }}>
              {watchlist.length}
            </div>
          </Card>

          <Card className="p-6 border-2" style={{
            borderColor: '#ff0080',
            background: 'rgba(15, 23, 41, 0.8)'
          }}>
            <div className="text-sm text-gray-400 mb-2">Active Alerts</div>
            <div className="text-3xl font-bold" style={{ color: '#ff0080' }}>
              {alerts.length}
            </div>
          </Card>

          <Card className="p-6 border-2" style={{
            borderColor: '#00d9ff',
            background: 'rgba(15, 23, 41, 0.8)'
          }}>
            <div className="text-sm text-gray-400 mb-2">Avg Traffic Trend</div>
            <div className="text-3xl font-bold" style={{ color: '#00d9ff' }}>
              +12%
            </div>
          </Card>

          <Card className="p-6 border-2" style={{
            borderColor: '#ff0080',
            background: 'rgba(15, 23, 41, 0.8)'
          }}>
            <div className="text-sm text-gray-400 mb-2">Market Position</div>
            <div className="text-3xl font-bold" style={{ color: '#ff0080' }}>
              #3
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <Card className="p-6 border-2" style={{
              borderColor: '#00d9ff',
              background: 'rgba(15, 23, 41, 0.8)',
              boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)'
            }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: '#00d9ff' }}>
                  Watchlist
                </h2>
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="border-2"
                  style={{
                    borderColor: '#00d9ff',
                    background: 'transparent',
                    color: '#00d9ff'
                  }}
                >
                  + Add Competitor
                </Button>
              </div>

              {watchlist.length === 0 ? (
                <p className="text-center text-gray-400 py-8">
                  No competitors tracked yet. Add your first competitor to get started!
                </p>
              ) : (
                <div className="space-y-4">
                  {watchlist.map((item) => (
                    <div key={item.id} className="p-4 rounded border-2" style={{
                      borderColor: 'rgba(0, 217, 255, 0.3)',
                      background: 'rgba(0, 0, 0, 0.3)'
                    }}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">{item.name}</h3>
                          <p className="text-sm text-gray-400 truncate">{item.url}</p>
                        </div>
                        <Button
                          onClick={() => handleRemoveCompetitor(item.id)}
                          className="text-sm border"
                          style={{
                            borderColor: '#ff0080',
                            background: 'transparent',
                            color: '#ff0080'
                          }}
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Est. Revenue</div>
                          <div className="font-bold" style={{ color: '#00d9ff' }}>
                            £{item.metrics.estimatedRevenue.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Traffic Trend</div>
                          <div className="font-bold" style={{ color: item.metrics.trafficTrend >= 0 ? '#00d9ff' : '#ff0080' }}>
                            {item.metrics.trafficTrend >= 0 ? '+' : ''}{item.metrics.trafficTrend}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Keywords</div>
                          <div className="font-bold text-white">
                            {item.metrics.rankingKeywords}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Updates</div>
                          <div className="font-bold text-white">
                            {item.metrics.contentUpdates}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <div>
            <Card className="p-6 border-2" style={{
              borderColor: '#ff0080',
              background: 'rgba(15, 23, 41, 0.8)',
              boxShadow: '0 0 20px rgba(255, 0, 128, 0.3)'
            }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#ff0080' }}>
                Recent Alerts
              </h2>

              {alerts.length === 0 ? (
                <p className="text-center text-gray-400 py-8">
                  No alerts at this time
                </p>
              ) : (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-4 rounded border-2" style={{
                      borderColor: getSeverityColor(alert.severity),
                      background: 'rgba(0, 0, 0, 0.3)'
                    }}>
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-xs px-2 py-1 rounded font-semibold uppercase" style={{
                          background: getSeverityColor(alert.severity),
                          color: '#fff'
                        }}>
                          {alert.severity}
                        </span>
                        <span className="text-xs px-2 py-1 rounded" style={{
                          background: 'rgba(0, 217, 255, 0.2)',
                          color: '#00d9ff'
                        }}>
                          {alert.type}
                        </span>
                      </div>
                      <p className="text-sm text-white mb-1">{alert.message}</p>
                      <p className="text-xs text-gray-400">
                        {alert.competitor} · {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <Card className="p-8 border-2 max-w-md w-full" style={{
              borderColor: '#00d9ff',
              background: '#0f1729',
              boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)'
            }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#00d9ff' }}>
                Add Competitor
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#00d9ff' }}>
                    Competitor Name
                  </label>
                  <Input
                    value={newCompetitorName}
                    onChange={(e) => setNewCompetitorName(e.target.value)}
                    placeholder="e.g., Competitor ABC"
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
                    Website URL
                  </label>
                  <Input
                    type="url"
                    value={newCompetitorUrl}
                    onChange={(e) => setNewCompetitorUrl(e.target.value)}
                    placeholder="https://competitor.com"
                    className="border-2"
                    style={{
                      borderColor: '#00d9ff',
                      background: 'rgba(0, 0, 0, 0.3)',
                      color: '#fff'
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddCompetitor}
                  disabled={isAdding || !newCompetitorUrl || !newCompetitorName}
                  className="flex-1 border-2 font-semibold py-6"
                  style={{
                    background: 'linear-gradient(135deg, #00d9ff 0%, #ff0080 100%)',
                    borderColor: '#00d9ff',
                    color: '#fff'
                  }}
                >
                  {isAdding ? 'Adding...' : 'Add Competitor'}
                </Button>
                <Button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewCompetitorUrl('');
                    setNewCompetitorName('');
                  }}
                  className="flex-1 border-2 font-semibold py-6"
                  style={{
                    borderColor: '#ff0080',
                    background: 'transparent',
                    color: '#ff0080'
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
