'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { useFavorites } from '@/lib/context/favorites-context';
import { mockProducts } from '@/lib/data/products';
import { Button } from '@/components/ui/button';
import { User, ShoppingBag, Heart, LogOut } from 'lucide-react';
import ProductCard from '@/components/shop/product-card';

export default function FavoritesPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const favoriteProducts = mockProducts.filter((p) => favorites.includes(p.id));

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
                    Profile
                  </Button>
                </Link>
                <Link href="/account/orders" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingBag className="w-4 h-4 mr-3" />
                    Orders
                  </Button>
                </Link>
                <Link href="/account/favorites" className="block">
                  <Button variant="default" className="w-full justify-start bg-accent text-black">
                    <Heart className="w-4 h-4 mr-3" />
                    Favorites
                  </Button>
                </Link>
              </nav>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-start text-red-400 border-red-400/20 hover:bg-red-400/10"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-foreground mb-8">Favorite Products</h2>

            {favoriteProducts.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground text-lg font-semibold mb-2">No favorites yet</p>
                <p className="text-muted-foreground mb-6">Start adding your favorite shoes to your wishlist</p>
                <Link href="/shop">
                  <Button className="bg-accent text-black hover:bg-accent/90">Browse Products</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
