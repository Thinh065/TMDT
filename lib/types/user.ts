export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
