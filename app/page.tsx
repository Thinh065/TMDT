import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/shop/product-card';
import { mockBlogPosts } from '@/lib/data/blog-posts';
import { formatDate } from '@/lib/utils/formatting';
import { ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/product-service';

export default async function Home() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.filter((p) => p.featured).slice(0, 4);
  const featuredBlogPosts = mockBlogPosts.slice(0, 4);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SOLE',
    url: 'https://sole-store.com',
    logo: 'https://sole-store.com/logo.png',
    description: 'Discover the latest sneaker trends from top brands worldwide',
    sameAs: [
      'https://www.facebook.com/sole-store',
      'https://www.twitter.com/sole-store',
      'https://www.instagram.com/sole-store',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      telephone: '+1-xxx-xxx-xxxx',
      email: 'support@sole-store.com',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SOLE',
    url: 'https://sole-store.com',
    description: 'Premium Sneaker Store - Discover and Shop Latest Shoe Collection',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://sole-store.com/shop?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="w-full">
      <script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
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

      {/* About SOLE Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold uppercase tracking-widest mb-2">Về SOLE</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Mua Giày Thông Minh Hơn Với SOLE
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              SOLE mang đến bộ sưu tập giày sneaker đa dạng với thiết kế hiện đại và hiệu suất cao. Chúng tôi chọn lựa sản phẩm theo tiêu chí chất lượng, thoải mái và độ bền, để mỗi bước đi đều tự tin và phong cách.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6 text-muted-foreground">
              <p>
                Tại SOLE, mỗi đôi giày đều được xử lý kỹ lưỡng từ thiết kế đến chất liệu. Bạn sẽ tìm thấy giày chạy bộ với đệm êm, giày bóng rổ có độ đàn hồi tốt, giày lifestyle phù hợp đi học đi làm và nhiều lựa chọn đa dạng cho phong cách cá nhân.
              </p>
              <p>
                Chúng tôi cam kết cung cấp trải nghiệm mua sắm trực tuyến đơn giản, hỗ trợ khách hàng 24/7 và chính sách đổi trả nhanh chóng. Tìm giày phù hợp chưa bao giờ dễ dàng hơn với SOLE.
              </p>
            </div>

            <div className="rounded-3xl bg-card border border-border p-8 text-foreground">
              <h3 className="text-2xl font-semibold mb-4">Tại sao nên chọn SOLE?</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent">•</span>
                  Bộ sưu tập giày chất lượng từ Nike, Adidas, Jordan, Puma và nhiều thương hiệu khác.
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">•</span>
                  Giao hàng nhanh, đổi trả linh hoạt và hỗ trợ tư vấn chọn size chính xác.
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">•</span>
                  Thiết kế thời trang, đa dạng màu sắc và công nghệ đệm hiện đại cho mọi hoạt động.
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">•</span>
                  Thông tin sản phẩm chi tiết giúp bạn chọn đúng mẫu ngay từ lần đầu xem.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold uppercase tracking-widest mb-2">Câu hỏi thường gặp</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Câu trả lời cho những thắc mắc phổ biến</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Dưới đây là một số câu hỏi khách hàng thường hỏi khi mua giày tại SOLE. Chúng tôi muốn bạn yên tâm ngay từ lần đầu truy cập trang web.
            </p>
          </div>

          <div className="space-y-8 text-muted-foreground">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">SOLE có hỗ trợ đổi size không?</h3>
              <p>
                Chắc chắn rồi. SOLE cung cấp chính sách đổi size nhanh chóng trong vòng 7 ngày kể từ ngày nhận hàng. Chúng tôi hỗ trợ hướng dẫn chọn size chính xác dựa trên chiều dài bàn chân và kiểu dáng giày, để bạn không phải lo lắng khi đặt hàng trực tuyến.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">Giày SOLE có phù hợp để chạy bộ và chơi thể thao không?</h3>
              <p>
                Có. Nhiều mẫu giày tại SOLE được thiết kế dành riêng cho chạy bộ, bóng rổ và tập luyện. Chúng tôi mô tả rõ ràng công nghệ đệm, chất liệu và hỗ trợ cổ chân của từng sản phẩm để bạn chọn đúng đôi phù hợp với nhu cầu vận động.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">Làm sao để biết giày phù hợp với phong cách của tôi?</h3>
              <p>
                Trang chủ và trang danh mục sản phẩm của SOLE đều có các bộ lọc theo category, màu sắc và thương hiệu. Bạn có thể dễ dàng tìm giày lifestyle, giày chạy bộ hoặc giày bóng rổ theo phong cách cá nhân, đồng thời xem hình ảnh thật và mô tả chi tiết để quyết định nhanh chóng.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">SOLE có giao hàng nhanh trong nước không?</h3>
              <p>
                Có. SOLE hợp tác với đối tác vận chuyển uy tín để giao hàng nhanh trong nước, đồng thời cung cấp theo dõi đơn hàng để bạn kiểm soát thời gian nhận hàng một cách dễ dàng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold uppercase tracking-widest mb-2">Blog SOLE</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Bài Viết Nổi Bật</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cập nhật thông tin mới nhất về xu hướng sneaker, hướng dẫn chọn giày và tin tức từ cộng đồng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBlogPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-all hover:shadow-lg"
              >
                {/* Image */}
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-video overflow-hidden bg-secondary">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-accent/90 px-3 py-1 rounded-full text-xs font-semibold text-black">
                      {post.category}
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-2">
                      {post.author}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="group/title">
                      <h3 className="text-lg font-bold text-foreground group-hover/title:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                  </div>

                  <p className="text-muted-foreground line-clamp-2 text-sm">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</p>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
                        Đọc Thêm
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button size="lg" className="bg-accent text-black hover:bg-accent/90">
                Xem Tất Cả Bài Viết
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Content Expansion Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold uppercase tracking-widest mb-2">SOLE Nói Gì</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Tại Sao Khách Hàng Tin Dùng SOLE
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              SOLE là điểm đến cho những người yêu giày sneaker và thể thao, nơi họ tìm thấy sản phẩm phù hợp với cả phong cách và hiệu suất. Chúng tôi kết hợp kinh nghiệm chọn giày, dịch vụ khách hàng chu đáo và chính sách hậu mãi rõ ràng để giúp bạn mua sắm dễ dàng và hoàn toàn yên tâm.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 text-muted-foreground">
            <div className="space-y-6">
              <p>
                Mỗi sản phẩm tại SOLE đều được tuyển chọn từ những thương hiệu hàng đầu như Nike, Adidas, Jordan, Puma và New Balance. Chúng tôi tập trung vào những mẫu giày có thiết kế hiện đại, cảm giác êm ái và độ bền cao, phù hợp cho cả vận động hàng ngày và phong cách streetwear.
              </p>
              <p>
                Trong phần miêu tả chi tiết sản phẩm, bạn sẽ thấy thông tin về chất liệu, công nghệ đệm và kích cỡ được trình bày rõ ràng. Điều này giúp bạn lựa chọn đúng đôi giày phù hợp với nhu cầu chạy bộ, chơi bóng hoặc dạo phố mà không cần mất thời gian tìm kiếm.
              </p>
              <p>
                Ngoài ra, SOLE luôn cập nhật xu hướng mới nhất và các bộ sưu tập độc quyền. Bạn có thể dễ dàng so sánh các mẫu giày, xem đánh giá cũng như cập nhật các chương trình khuyến mãi từ website ngay trên trang chủ.
              </p>
            </div>

            <div className="rounded-3xl bg-card border border-border p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Cam Kết Dịch Vụ</h3>
              <p className="mb-4">
                Chúng tôi đồng hành cùng bạn từ lúc chọn giày đến khi nhận hàng. SOLE cung cấp:
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-3"><span className="text-accent">•</span> Tư vấn chọn size chính xác và phù hợp từng dáng chân.</li>
                <li className="flex gap-3"><span className="text-accent">•</span> Giao hàng nhanh chóng, kiểm tra chất lượng trước khi gửi.</li>
                <li className="flex gap-3"><span className="text-accent">•</span> Chính sách đổi trả rõ ràng và hỗ trợ bảo hành khi cần.</li>
                <li className="flex gap-3"><span className="text-accent">•</span> Cập nhật tin tức, mẹo chọn giày và xu hướng sneaker mới nhất.</li>
              </ul>
            </div>
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
