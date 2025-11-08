'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
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
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <Card className="p-8 border-2" style={{
          borderColor: '#00d9ff',
          background: 'rgba(15, 23, 41, 0.8)',
          boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)'
        }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#00d9ff' }}>
                Email
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
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#00d9ff' }}>
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full border-2"
                style={{
                  borderColor: '#00d9ff',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#fff'
                }}
              />
              <div className="mt-2 text-right">
                <Link 
                  href="/forgot-password" 
                  className="text-sm hover:underline transition-all"
                  style={{ color: '#00d9ff' }}
                >
                  Forgot your password?
                </Link>
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
              type="submit"
              disabled={isLoading}
              className="w-full border-2 font-semibold py-6 text-lg transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #00d9ff 0%, #ff0080 100%)',
                borderColor: '#00d9ff',
                color: '#fff'
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold hover:underline" style={{ color: '#ff0080' }}>
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
