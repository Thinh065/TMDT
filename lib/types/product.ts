export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  material: string;
  category: 'running' | 'basketball' | 'casual' | 'lifestyle' | 'training';
  sizes: number[];
  colors: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  releaseDate?: string;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedSize: number;
  selectedColor: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}
