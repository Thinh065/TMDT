export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const generateOrderId = (): string => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const productSlug = (text: string): string => {
  return text
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^A-Za-z0-9]/g, '');
};

export const generateProductDescription = (product: {
  name: string;
  brand?: string;
  category?: string;
  material?: string;
  description?: string;
}): string => {
  const base = product.description?.trim() ?? '';
  const extra = `${product.name} từ ${product.brand ?? 'SOLE'} với phong cách ${product.category ?? 'đời thường'}, chất liệu ${product.material ?? 'cao cấp'}, mang lại cảm giác thoải mái và phù hợp cho mọi hoạt động hàng ngày.`;
  const result = base.length >= 160 ? base : `${base} ${extra}`.trim();
  return result.length > 300 ? `${result.slice(0, 297).trim()}...` : result;
};
