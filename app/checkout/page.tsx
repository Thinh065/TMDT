'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/context/cart-context';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { generateOrderId } from '@/lib/utils/formatting';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { user, updateProfile } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const shipping = cart.totalPrice > 100 ? 0 : 10;
  const tax = Math.round(cart.totalPrice * 0.08 * 100) / 100;
  const total = cart.totalPrice + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.address || !formData.city || !formData.zipCode) {
      alert('Vui lòng điền vào tất cả các trường bắt buộc');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);

      // Update user profile with shipping info
      if (user) {
        updateProfile({
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
        });
      }

      // Store order in localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push({
        id: newOrderId,
        userId: user?.id,
        items: cart.items,
        totalPrice: total,
        status: 'processing',
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      });
      localStorage.setItem('orders', JSON.stringify(orders));

      clearCart();
      setOrderComplete(true);
      setIsProcessing(false);
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background py-12 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-green-400" />
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Đơn Hàng Được Xác Nhận!</h1>
            <p className="text-muted-foreground text-lg">
              Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được đặt thành công.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-left space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">ID Đơn Hàng</p>
              <p className="text-lg font-semibold text-accent">{orderId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dự Kiến Giao Hàng</p>
              <p className="text-lg font-semibold text-foreground">
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Địa Chỉ Giao Hàng</p>
              <p className="text-lg font-semibold text-foreground">
                {formData.address}, {formData.city} {formData.zipCode}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/account/orders" className="block">
              <Button className="w-full bg-accent text-black hover:bg-accent/90 font-semibold">
                Xem Đơn Hàng
              </Button>
            </Link>
            <Link href="/shop" className="block">
              <Button variant="outline" className="w-full">
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
        <h1 className="text-4xl font-bold text-foreground mb-12">Thanh Toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Thông Tin Giao Hàng</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                    disabled
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Họ và Tên"
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                    disabled
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Số Điện Thoại"
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Địa Chỉ</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Địa Chỉ Đường Phố"
                    required
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Thành Phố"
                      required
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Mã Bưu Chính"
                      required
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Phương Thức Thanh Toán (Demo)</h2>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4 text-sm text-blue-400">
                  Đây là thanh toán demo. Sử dụng bất kỳ số thẻ nào (ví dụ: 4242 4242 4242 4242) để kiểm tra.
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="Tên Chủ Thẻ"
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                  />
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Số Thẻ"
                    maxLength="19"
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                    />
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      placeholder="CVC"
                      maxLength="3"
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-accent text-black hover:bg-accent/90 font-semibold py-6 text-base"
              >
                {isProcessing ? 'Processing...' : 'Complete Purchase'}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="h-fit sticky top-20 bg-card border border-border rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Order Summary</h2>

            <div className="space-y-3 max-h-96 overflow-y-auto border-b border-border pb-6">
              {cart.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Item {index + 1}</span>
                  <span className="text-foreground">x{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${cart.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex justify-between text-xl font-bold text-foreground">
                <span>Total</span>
                <span className="text-accent">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
