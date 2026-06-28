import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/lib/data/products';
import ProductCard from '@/components/shop/product-card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = mockProducts.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black py-20 md:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent blur-3xl rounded-full opacity-10"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-accent font-semibold uppercase tracking-widest">Bước vào Hiệu Suất</p>
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Xu Hướng Giày Sneaker Mới Nhất
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Khám phá các đôi giày chất lượng cao từ những thương hiệu hàng đầu thế giới. Từ giày chạy bộ đến giày bóng rổ, tìm đôi giày hoàn hảo của bạn.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <Button size="lg" className="bg-accent text-black hover:bg-accent/90 font-semibold text-base">
                    Mua Ngay
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 font-semibold text-base"
                  >
                    Đọc Blog Của Chúng Tôi
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl font-bold text-accent">500+</p>
                  <p className="text-sm text-gray-400">Sản Phẩm</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">10K+</p>
                  <p className="text-sm text-gray-400">Khách Hàng</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">24/7</p>
                  <p className="text-sm text-gray-400">Hỗ Trợ</p>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative h-96 md:h-full flex items-center justify-center">
              <div className="relative w-full h-full bg-gradient-to-br from-accent/10 to-transparent rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"
                  alt="Giày Nổi Bật"
                  className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold uppercase tracking-widest mb-2">Mới Về</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Xem các sneaker mới nhất và tuyệt vời nhất của chúng tôi. Cập nhật hàng tuần với các phiên bản mới từ những thương hiệu yêu thích của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" className="bg-accent text-black hover:bg-accent/90">
                Xem Tất Cả Sản Phẩm
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Mua Sắm Theo Danh Mục</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Chạy Bộ', slug: 'running', icon: '🏃' },
              { name: 'Bóng Rổ', slug: 'basketball', icon: '🏀' },
              { name: 'Dạo Phố', slug: 'casual', icon: '👟' },
              { name: 'Thời Trang', slug: 'lifestyle', icon: '⚡' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="group relative overflow-hidden rounded-lg bg-background border border-border hover:border-accent transition-all"
              >
                <div className="aspect-square flex flex-col items-center justify-center p-6 text-center group-hover:bg-accent/5 transition-colors">
                  <p className="text-6xl mb-4">{category.icon}</p>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Cập Nhật Thông Tin</h2>
          <p className="text-xl text-gray-300">
            Đăng ký nhận bản tin của chúng tôi để nhận các ưu đãi độc quyền, phiên bản mới và tin tức sneaker mới nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors"
            />
            <Button className="bg-accent text-black hover:bg-accent/90 font-semibold">Đăng Ký</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
