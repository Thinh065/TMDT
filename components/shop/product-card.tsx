'use client';

import Link from 'next/link';
import { Product } from '@/lib/types/product';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/lib/context/favorites-context';
import { useCart } from '@/lib/context/cart-context';
import { useState } from 'react';
import { formatPrice } from '@/lib/utils/formatting';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [showSizeSelect, setShowSizeSelect] = useState(false);

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product.id, selectedSize, selectedColor);
      setShowSizeSelect(false);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  return (
    <div className="group relative bg-card rounded-lg border border-border overflow-hidden hover:border-accent transition-all hover:shadow-lg">
      {/* Image Container */}
      <Link href={`/shop/${product.id}`} className="relative block overflow-hidden bg-secondary aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Sale
          </div>
        )}
      </Link>

      {/* Heart Button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-3 left-3 bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors z-10"
      >
        <Heart
          className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
        />
      </button>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <Link href={`/shop/${product.id}`} className="hover:text-accent transition-colors">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">{product.brand}</p>
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'text-accent' : 'text-muted'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-accent">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Colors */}
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                selectedColor === color ? 'border-accent' : 'border-border'
              }`}
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
              title={color}
            />
          ))}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-accent text-black hover:bg-accent/90 font-semibold"
        >
          Add to Cart
        </Button>

        {/* View Details Link */}
        <Link href={`/shop/${product.id}`} className="block w-full text-center py-2 text-xs text-accent hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
}
