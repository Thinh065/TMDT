'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-accent mb-2">SOLE</h1>
          <p className="text-muted-foreground">Đăng nhập vào tài khoản của bạn</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email hoặc tên đăng nhập
            </label>
            <input
              id="email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="trannhatthinh2004"
              required
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Mật Khẩu
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent text-black hover:bg-accent/90 font-semibold py-3"
          >
            {isLoading ? 'Đang Đăng Nhập...' : 'Đăng Nhập'}
          </Button>

          <div className="text-center">
            <span className="text-muted-foreground">Chưa có tài khoản? </span>
            <Link href="/auth/register" className="text-accent hover:underline font-medium">
              Đăng ký
            </Link>
          </div>
        </form>

        {/* Demo Info */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-sm text-blue-400">
          Chế Độ Demo: có thể đăng nhập bằng tài khoản admin sau hoặc tạo tài khoản bình thường.
          <div className="mt-2">
            <strong>Admin:</strong> trannhatthinh2004 / TNKzero9
          </div>
        </div>
      </div>
    </div>
  );
}
