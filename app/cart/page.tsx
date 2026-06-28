'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/context/cart-context';
import { useAuth } from '@/lib/context/auth-context';
import { mockProducts } from '@/lib/data/products';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowLeft } from 'lucide-react';
import { formatPrice } from '@/lib/utils/formatting';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();

  const getProductById = (id: string) => mockProducts.find((p) => p.id === id);

  const shipping = cart.totalPrice > 100 ? 0 : 10;
  const tax = Math.round(cart.totalPrice * 0.08 * 100) / 100;
  const total = cart.totalPrice + shipping + tax;

  const handleCheckout = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    router.push('/checkout');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">Giỏ Hàng Của Bạn Trống</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Có vẻ như bạn chưa thêm bất cứ thứ gì. Bắt đầu mua sắm!
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-accent text-black hover:bg-accent/90">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Tiếp Tục Mua Sắm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/shop" className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Tiếp Tục Mua Sắm
          </Link>
          <h1 className="text-4xl font-bold text-foreground mt-4">Giỏ Hàng</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;

              return (
                <div key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`} className="border border-border rounded-lg p-6 bg-card">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <Link href={`/shop/${product.id}`} className="w-24 h-24 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/shop/${product.id}`} className="hover:text-accent transition-colors">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">
                        Màu sắc: <span className="text-foreground font-medium">{item.selectedColor}</span> | Kích cỡ:{' '}
                        <span className="text-foreground font-medium">{item.selectedSize}</span>
                      </p>
                      <p className="text-lg font-bold text-accent">{formatPrice(product.price)}</p>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() =>
                          removeFromCart(item.productId, item.selectedSize, item.selectedColor)
                        }
                        className="text-red-500 hover:text-red-400 transition-colors mb-4"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          className="px-3 py-1 border border-border rounded hover:bg-secondary transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          className="px-3 py-1 border border-border rounded hover:bg-secondary transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="h-fit sticky top-20 bg-card border border-border rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Tóm Tắt Đơn Hàng</h2>

            <div className="space-y-3 border-b border-border pb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Tổng Phụ</span>
                <span>{formatPrice(cart.totalPrice)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Giao Hàng</span>
                <span>{shipping === 0 ? 'Miễn Phí' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Thuế (ước tính)</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold text-foreground">
              <span>Tổng Cộng</span>
              <span className="text-accent">{formatPrice(total)}</span>
            </div>

            {shipping === 0 && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-sm text-green-400">
                Giao hàng miễn phí! Đơn hàng của bạn đủ điều kiện giao hàng miễn phí.
              </div>
            )}

            <Button
              onClick={handleCheckout}
              className="w-full bg-accent text-black hover:bg-accent/90 font-semibold py-6 text-base"
            >
              Tiến Hành Thanh Toán
            </Button>

            <Button
              variant="outline"
              onClick={clearCart}
              className="w-full"
            >
              Xóa Giỏ Hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
