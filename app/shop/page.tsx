import ShopContent from '@/components/shop/shop-content';
import { mockProducts } from '@/lib/data/products';

export const dynamic = 'force-dynamic';

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
