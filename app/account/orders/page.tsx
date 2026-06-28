'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import { User, ShoppingBag, Heart, LogOut } from 'lucide-react';
import { formatPrice } from '@/lib/utils/formatting';

interface Order {
  id: string;
  userId: string;
  items: any[];
  totalPrice: number;
  status: string;
  shippingAddress: string;
  createdAt: string;
  estimatedDelivery?: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = allOrders.filter((order: Order) => order.userId === user.id);
    setOrders(userOrders);
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'shipped':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'delivered':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-3" />
                    Hồ Sơ
                  </Button>
                </Link>
                <Link href="/account/orders" className="block">
                  <Button variant="default" className="w-full justify-start bg-accent text-black">
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
            <h2 className="text-3xl font-bold text-foreground mb-8">Lịch Sử Đơn Hàng</h2>

            {orders.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground text-lg font-semibold mb-2">Chưa có đơn hàng nào</p>
                <p className="text-muted-foreground mb-6">Bắt đầu mua sắm để đặt đơn hàng đầu tiên của bạn</p>
                <Link href="/shop">
                  <Button className="bg-accent text-black hover:bg-accent/90">Tiếp Tục Mua Sắm</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">ID Đơn Hàng</p>
                        <p className="text-lg font-semibold text-accent">{order.id}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-lg border ${getStatusColor(order.status)}`}>
                        <p className="text-sm font-semibold capitalize">{order.status}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 py-4 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground">Ngày</p>
                        <p className="text-foreground">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mục</p>
                        <p className="text-foreground">{order.items.length} mục</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tổng Cộng</p>
                        <p className="text-lg font-semibold text-accent">{formatPrice(order.totalPrice)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dự Kiến Giao Hàng</p>
                        <p className="text-foreground">
                          {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString('vi-VN') : 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-secondary rounded-lg p-4 text-sm">
                      <p className="text-muted-foreground">Địa Chỉ Giao Hàng</p>
                      <p className="text-foreground">{order.shippingAddress}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
