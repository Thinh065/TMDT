import ShopContent from '@/components/shop/shop-content';

export const dynamic = 'force-dynamic';

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Shop All Products</h1>
          <p className="text-muted-foreground text-lg">
            Browse our complete collection of premium sneakers and athletic shoes
          </p>
        </div>

        <ShopContent />
      </div>
    </div>
  );
}
