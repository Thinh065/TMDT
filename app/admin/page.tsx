'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { useAdmin } from '@/lib/context/admin-context';
import { Button } from '@/components/ui/button';
import { Package, ShoppingBag, Edit, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { products } = useAdmin();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Bảng Điều Khiển Admin</h1>
            <p className="text-muted-foreground mt-2">Chào mừng trở lại, {user.name}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="text-red-400 border-red-400/20 hover:bg-red-400/10"
          >
            Đăng Xuất
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Tổng Sản Phẩm</h3>
              <Package className="w-6 h-6 text-accent" />
            </div>
            <p className="text-3xl font-bold text-accent">{products.length}</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Còn Hàng</h3>
              <ShoppingBag className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">
              {products.filter((p) => p.inStock).length}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Xếp Hạng Trung Bình</h3>
              <span className="text-xl">⭐</span>
            </div>
            <p className="text-3xl font-bold text-accent">
              {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
            </p>
          </div>
        </div>

        {/* Products Management */}
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Quản Lý Sản Phẩm</h2>
            <Link href="/admin/products/new">
              <Button className="bg-accent text-black hover:bg-accent/90">
                <Plus className="w-5 h-5 mr-2" />
                Thêm Sản Phẩm
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Sản Phẩm</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Thương Hiệu</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Giá</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Kho</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Xếp Hạng</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 10).map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-4 text-foreground">{product.name}</td>
                    <td className="py-4 px-4 text-muted-foreground">{product.brand}</td>
                    <td className="py-4 px-4 text-accent font-semibold">${product.price}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {product.stockCount}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-foreground">{product.rating.toFixed(1)}</td>
                    <td className="py-4 px-4 space-x-2 flex">
                      <Link href={`/admin/products/${product.id}`}>
                        <Button variant="outline" size="sm" className="text-accent">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length > 10 && (
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Hiển thị 10 trong {products.length} sản phẩm
              </p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link href="/admin/products">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold text-foreground mb-2">Tất Cả Sản Phẩm</h3>
              <p className="text-muted-foreground">Quản lý toàn bộ danh mục sản phẩm của bạn</p>
            </div>
          </Link>

          <Link href="/blog">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold text-foreground mb-2">Xem Blog</h3>
              <p className="text-muted-foreground">Đọc các bài đăng đã xuất bản</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
