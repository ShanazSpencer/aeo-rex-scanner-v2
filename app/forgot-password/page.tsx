'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetLink, setResetLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setResetLink('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // For testing - REMOVE IN PRODUCTION
        if (data.resetLink) {
          setResetLink(data.resetLink);
        }
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0f1729' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#00d9ff' }}>
            AEO Rex Scanner
          </h1>
          <p className="text-gray-400">Reset your password</p>
        </div>

        <Card className="p-8 border-2" style={{
          borderColor: '#00d9ff',
          background: 'rgba(15, 23, 41, 0.8)',
          boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)'
        }}>
          {success ? (
            <div className="space-y-6">
              <div className="p-4 rounded border-2 text-center" style={{
                borderColor: '#00d9ff',
                background: 'rgba(0, 217, 255, 0.1)',
                color: '#00d9ff'
              }}>
                <p className="font-semibold mb-2">Check your email for reset instructions</p>
                <p className="text-sm text-gray-400">
                  We've sent a password reset link to your email address.
                </p>
              </div>

              {/* DEVELOPMENT ONLY - REMOVE IN PRODUCTION */}
              {resetLink && (
                <div className="p-4 rounded border-2" style={{
                  borderColor: '#ff0080',
                  background: 'rgba(255, 0, 128, 0.1)',
                  color: '#ff0080'
                }}>
                  <p className="font-semibold mb-2 text-sm">TESTING MODE - Reset Link:</p>
                  <a 
                    href={resetLink} 
                    className="text-xs break-all hover:underline"
                    style={{ color: '#00d9ff' }}
                  >
                    {resetLink}
                  </a>
                  <p className="text-xs mt-2 text-gray-400">
                    (This will be sent via email in production)
                  </p>
                </div>
              )}

              <Link href="/login">
                <Button
                  type="button"
                  className="w-full border-2 font-semibold py-6 text-lg transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #00d9ff 0%, #ff0080 100%)',
                    borderColor: '#00d9ff',
                    color: '#fff'
                  }}
                >
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#00d9ff' }}>
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full border-2"
                  style={{
                    borderColor: '#00d9ff',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#fff'
                  }}
                />
                <p className="text-xs text-gray-400 mt-2">
                  Enter the email associated with your account and we'll send you a link to reset your password.
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
                type="submit"
                disabled={isLoading}
                className="w-full border-2 font-semibold py-6 text-lg transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #00d9ff 0%, #ff0080 100%)',
                  borderColor: '#00d9ff',
                  color: '#fff'
                }}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <div className="text-center">
                <Link 
                  href="/login" 
                  className="text-sm hover:underline transition-all"
                  style={{ color: '#00d9ff' }}
                >
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
