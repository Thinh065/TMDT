'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { useAdmin } from '@/lib/context/admin-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function ProductsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { products, deleteProduct } = useAdmin();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-foreground">Manage Products</h1>
            <p className="text-muted-foreground mt-2">
              Total products: <span className="font-semibold text-accent">{products.length}</span>
            </p>
          </div>
          <Link href="/admin/products/new">
            <Button className="bg-accent text-black hover:bg-accent/90">
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Products Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Product</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Brand</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Category</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">Price</th>
                  <th className="text-center py-4 px-6 font-semibold text-foreground">Stock</th>
                  <th className="text-center py-4 px-6 font-semibold text-foreground">Rating</th>
                  <th className="text-center py-4 px-6 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <p className="text-foreground font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{product.brand}</td>
                    <td className="py-4 px-6 text-muted-foreground capitalize">{product.category}</td>
                    <td className="py-4 px-6 text-right font-semibold text-accent">${product.price}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        product.inStock
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {product.stockCount}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-foreground">{product.rating.toFixed(1)} ⭐</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/admin/products/${product.id}`}>
                          <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm(`Delete ${product.name}?`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground text-lg font-semibold mb-4">No products found</p>
            <Link href="/admin/products/new">
              <Button className="bg-accent text-black hover:bg-accent/90">
                Create First Product
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
