export interface CartItem {
  productId: string;
  quantity: number;
  selectedSize: number;
  selectedColor: string;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}
