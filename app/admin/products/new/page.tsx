'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { useAdmin } from '@/lib/context/admin-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const categories = [
  { value: 'running', label: 'Chạy Bộ' },
  { value: 'basketball', label: 'Bóng Rổ' },
  { value: 'casual', label: 'Dạo Phố' },
  { value: 'lifestyle', label: 'Thời Trang' },
  { value: 'training', label: 'Huấn Luyện' },
] as const;

export default function NewProductPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addProduct } = useAdmin();
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    image: '',
    description: '',
    material: '',
    category: 'running',
    sizes: '',
    colors: '',
    stockCount: '',
    inStock: true,
    featured: false,
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/auth/login');
    }
  }, [user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.brand || !formData.price || !formData.image || !formData.description) {
      setError('Vui lòng điền đầy đủ tên, thương hiệu, giá, hình ảnh và mô tả.');
      return;
    }

    const price = Number(formData.price);
    const originalPrice = formData.originalPrice ? Number(formData.originalPrice) : undefined;
    const stockCount = Number(formData.stockCount || '0');
    const sizes = formData.sizes
      .split(',')
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isFinite(value));
    const colors = formData.colors
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    setIsSaving(true);

    try {
      addProduct({
        name: formData.name,
        brand: formData.brand,
        price,
        originalPrice,
        image: formData.image,
        images: [formData.image],
        description: formData.description,
        material: formData.material || 'Chưa có',
        category: formData.category as any,
        sizes: sizes.length > 0 ? sizes : [38, 39, 40, 41],
        colors: colors.length > 0 ? colors : ['Black'],
        rating: 0,
        reviewCount: 0,
        inStock: formData.inStock,
        stockCount,
        featured: formData.featured,
      });
      router.push('/admin/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tạo sản phẩm');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Thêm Sản Phẩm Mới</h1>
            <p className="text-muted-foreground mt-2">Tạo sản phẩm mới và gán vào danh mục.</p>
          </div>
          <Link href="/admin/products">
            <Button variant="outline">Quay Lại Danh Sách</Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-xl p-8">
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Tên sản phẩm</span>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Thương hiệu</span>
              <input
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Giá</span>
              <input
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Giá gốc</span>
              <input
                name="originalPrice"
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Danh mục</span>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Ảnh đại diện</span>
              <input
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://..."
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Chất liệu</span>
              <input
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Kích cỡ (phân tách bằng dấu phẩy)</span>
              <input
                name="sizes"
                value={formData.sizes}
                onChange={handleInputChange}
                placeholder="36, 37, 38, 39"
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Màu sắc (phân tách bằng dấu phẩy)</span>
              <input
                name="colors"
                value={formData.colors}
                onChange={handleInputChange}
                placeholder="Black, White"
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Mô tả</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-accent focus:outline-none"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Số lượng tồn kho</span>
              <input
                name="stockCount"
                type="number"
                value={formData.stockCount}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              />
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
                className="h-4 w-4 accent-accent"
              />
              <span className="text-sm text-foreground">Còn hàng</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 accent-accent"
              />
              <span className="text-sm text-foreground">Sản phẩm nổi bật</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
            <Link href="/admin/products">
              <Button variant="outline">Hủy</Button>
            </Link>
            <Button type="submit" disabled={isSaving} className="bg-accent text-black hover:bg-accent/90">
              {isSaving ? 'Đang lưu...' : 'Tạo sản phẩm'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
