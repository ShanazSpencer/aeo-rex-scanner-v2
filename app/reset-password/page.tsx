'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link');
    }
  }, [token]);

  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password) && /[^a-zA-Z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [password]);

  const getStrengthColor = () => {
    if (passwordStrength >= 75) return '#00d9ff';
    if (passwordStrength >= 50) return '#ffaa00';
    return '#ff0080';
  };

  const getStrengthText = () => {
    if (passwordStrength >= 75) return 'Strong';
    if (passwordStrength >= 50) return 'Medium';
    if (passwordStrength >= 25) return 'Weak';
    return 'Very Weak';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!token) {
      setError('Invalid reset token');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/login?reset=success'), 2000);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0f1729' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#00d9ff' }}>AEO Rex Scanner</h1>
          <p className="text-gray-400">Create a new password</p>
        </div>
        <Card className="p-8 border-2" style={{ borderColor: '#00d9ff', background: 'rgba(15, 23, 41, 0.8)', boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}>
          {success ? (
            <div className="space-y-6 text-center">
              <div className="p-4 rounded border-2" style={{ borderColor: '#00d9ff', background: 'rgba(0, 217, 255, 0.1)', color: '#00d9ff' }}>
                <p className="font-semibold mb-2">Password Reset Successful!</p>
                <p className="text-sm text-gray-400">Redirecting...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#00d9ff' }}>New Password</label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter new password" className="w-full border-2" style={{ borderColor: '#00d9ff', background: 'rgba(0, 0, 0, 0.3)', color: '#fff' }} />
                {password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Password Strength:</span>
                      <span className="text-xs font-semibold" style={{ color: getStrengthColor() }}>{getStrengthText()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full transition-all duration-300" style={{ width: passwordStrength + '%', background: getStrengthColor() }} />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: '#00d9ff' }}>Confirm Password</label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirm password" className="w-full border-2" style={{ borderColor: '#00d9ff', background: 'rgba(0, 0, 0, 0.3)', color: '#fff' }} />
              </div>
              {error && (
                <div className="p-3 rounded border-2" style={{ borderColor: '#ff0080', background: 'rgba(255, 0, 128, 0.1)', color: '#ff0080' }}>{error}</div>
              )}
              <Button type="submit" disabled={isLoading || !token} className="w-full border-2 font-semibold py-6 text-lg transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #00d9ff 0%, #ff0080 100%)', borderColor: '#00d9ff', color: '#fff' }}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
              <div className="text-center">
                <Link href="/login" className="text-sm hover:underline" style={{ color: '#00d9ff' }}>Back to Login</Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: '#0f1729' }}><div style={{ color: '#00d9ff' }}>Loading...</div></div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
