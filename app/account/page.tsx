 'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
 
import { Button } from '@/components/ui/button';
import { User, ShoppingBag, Heart, LogOut } from 'lucide-react';
import { useEffect } from 'react';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
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
        <div className="py-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang Chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Hồ Sơ</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20 space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <nav className="space-y-2">
                <Link href="/account" className="block">
                  <Button variant="default" className="w-full justify-start bg-accent text-black">
                    <User className="w-4 h-4 mr-3" />
                    Hồ Sơ
                  </Button>
                </Link>
                <Link href="/account/orders" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingBag className="w-4 h-4 mr-3" />
                    Đơn Hàng
                  </Button>
                </Link>
                <Link href="/account/favorites" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="w-4 h-4 mr-3" />
                    Yêu Thích
                  </Button>
                </Link>
              </nav>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-start text-red-400 border-red-400/20 hover:bg-red-400/10"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Đăng Xuất
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-3xl font-bold text-foreground mb-8">Thông Tin Hồ Sơ</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Tên</label>
                  <p className="text-lg text-foreground">{user.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                  <p className="text-lg text-foreground">{user.email}</p>
                </div>

                {user.phone && (
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Điện Thoại</label>
                    <p className="text-lg text-foreground">{user.phone}</p>
                  </div>
                )}

                {user.address && (
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Địa Chỉ</label>
                    <p className="text-lg text-foreground">
                      {user.address}, {user.city} {user.zipCode}
                    </p>
                  </div>
                )}

                {!user.address && (
                  <div className="bg-secondary border border-border rounded-lg p-4">
                    <p className="text-muted-foreground text-sm mb-4">Không có địa chỉ giao hàng nào được lưu. Thêm một địa chỉ trong quá trình thanh toán.</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Là Thành Viên Từ</label>
                  <p className="text-lg text-foreground">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
