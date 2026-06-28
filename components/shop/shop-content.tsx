'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockProducts } from '@/lib/data/products';
import ProductCard from '@/components/shop/product-card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function ShopContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category') || '';
    setSelectedCategory(category);
  }, [searchParams]);

  // Get unique brands
  const brands = Array.from(new Set(mockProducts.map((p) => p.brand))).sort();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        break;
    }

    return filtered;
  }, [search, selectedCategory, selectedBrands, priceRange, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const categories = [
    { value: '', label: 'Tất Cả Danh Mục' },
    { value: 'running', label: 'Chạy Bộ' },
    { value: 'basketball', label: 'Bóng Rổ' },
    { value: 'casual', label: 'Dạo Phố' },
    { value: 'lifestyle', label: 'Thời Trang' },
    { value: 'training', label: 'Huấn Luyện' },
  ];

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên sản phẩm hoặc thương hiệu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-6 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="space-y-6 bg-card rounded-lg p-6 border border-border">
            {/* Close Button for Mobile */}
            {showFilters && (
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden text-muted-foreground hover:text-foreground"
              >
                ✕ Đóng Bộ Lọc
              </button>
            )}

            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Danh Mục</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedCategory === cat.value
                        ? 'bg-accent text-black font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Thương Hiệu</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 accent-current"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Khoảng Giá</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">
                    ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-accent"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={() => {
                setSearch('');
                setSelectedCategory('');
                setSelectedBrands([]);
                setPriceRange([0, 300]);
                setSortBy('newest');
              }}
              className="w-full"
            >
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Sort and Filter Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full sm:w-auto"
              >
                Filters
              </Button>

              <div className="relative w-full sm:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground appearance-none cursor-pointer focus:outline-none focus:border-accent"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl font-semibold text-foreground mb-2">No products found</p>
              <p className="text-muted-foreground">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
