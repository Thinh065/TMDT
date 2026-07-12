"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types/product';
import { useCart } from '@/lib/context/cart-context';
import { useFavorites } from '@/lib/context/favorites-context';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import ProductCard from '@/components/shop/product-card';
import { formatPrice } from '@/lib/utils/formatting';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [selectedSize, setSelectedSize] = useState<number | null>(product?.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = () => {
    if (selectedSize) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product.id, selectedSize, selectedColor);
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  const relatedProducts = [] as Product[];

  return (
    <>
      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left - Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-card rounded-lg border border-border overflow-hidden">
              <img
                src={product.images?.[currentImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                      currentImageIndex === index ? 'border-accent' : 'border-border'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Info */}
          <div className="space-y-8">
            <div>
              <p className="text-accent uppercase text-xs font-semibold tracking-widest mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating || 0) ? 'text-accent text-lg' : 'text-muted text-lg'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} đánh giá)
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-accent">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                  {product.inStock ? `${product.stockCount} còn hàng` : 'Hết Hàng'}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Về Sản Phẩm Này</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="mt-4 space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="text-foreground font-semibold">Vật Liệu:</span> {product.material}
                </p>
                <p className="text-muted-foreground">
                  <span className="text-foreground font-semibold">Danh Mục:</span> {product.category?.charAt(0).toUpperCase() + product.category?.slice(1)}
                </p>
              </div>
            </div>

            <div className="space-y-6 border-t border-b border-border py-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-4">Chọn Màu Sắc</label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedColor === color ? 'border-accent bg-accent/10' : 'border-border hover:border-muted'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-foreground/30"
                        style={{
                          backgroundColor: color.toLowerCase().includes('white')
                            ? '#ffffff'
                            : color.toLowerCase().includes('black')
                            ? '#000000'
                            : color.toLowerCase().includes('blue')
                            ? '#3b82f6'
                            : color.toLowerCase().includes('red')
                            ? '#ef4444'
                            : color.toLowerCase().includes('gold')
                            ? '#fbbf24'
                            : '#666666',
                        }}
                      />
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-4">Chọn Kích Cỡ</label>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-2 rounded-lg border-2 font-semibold text-sm transition-all ${
                        selectedSize === size ? 'border-accent bg-accent text-black' : 'border-border hover:border-muted'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-4">Số Lượng</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 border border-border rounded-lg hover:bg-secondary">−</button>
                  <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 border border-border rounded-lg hover:bg-secondary">+</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleAddToCart} disabled={!selectedSize || !product.inStock} className="flex-1 bg-accent text-black hover:bg-accent/90 font-semibold py-6 text-base">
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Đã Thêm Vào Giỏ
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Thêm Vào Giỏ
                  </>
                )}
              </Button>

              <Button onClick={toggleFavorite} variant="outline" className="px-6 py-6">
                <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related products placeholder (client can fetch or be passed) */}
      {relatedProducts.length > 0 && (
        <section className="py-12 border-t border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">Sản Phẩm Liên Quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
