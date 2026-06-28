import type { Metadata } from 'next';
import ShopContent from '@/components/shop/shop-content';
import { mockProducts } from '@/lib/data/products';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Cửa Hàng - SOLE | Giày Sneaker & Thể Thao',
  description: 'Duyệt bộ sưu tập hoàn chỉnh các sneaker chất lượng cao và giày thể thao từ các thương hiệu hàng đầu.',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://tmdt-9evc.vercel.app/shop',
    siteName: 'SOLE Shop',
    title: 'Cửa Hàng - SOLE | Giày Sneaker & Thể Thao',
    description: 'Duyệt bộ sưu tập hoàn chỉnh các sneaker chất lượng cao và giày thể thao từ các thương hiệu hàng đầu.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'SOLE Shop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cửa Hàng - SOLE | Giày Sneaker & Thể Thao',
    description: 'Duyệt bộ sưu tập hoàn chỉnh các sneaker chất lượng cao và giày thể thao từ các thương hiệu hàng đầu.',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=630&fit=crop'],
  },
};

export default function ShopPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Xem Tất Cả Sản Phẩm',
    description: 'Duyệt bộ sưu tập hoàn chỉnh các sneaker chất lượng cao và giày thể thao',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: mockProducts.slice(0, 12).map((product, index) => ({
        '@type': 'Product',
        position: index + 1,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        priceCurrency: 'USD',
        brand: {
          '@type': 'Brand',
          name: product.brand || 'SOLE',
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Xem Tất Cả Sản Phẩm</h1>
          <p className="text-muted-foreground text-lg">
            Duyệt bộ sưu tập hoàn chỉnh các sneaker chất lượng cao và giày thể thao của chúng tôi
          </p>
        </div>

        <ShopContent />
      </div>
    </div>
  );
}
