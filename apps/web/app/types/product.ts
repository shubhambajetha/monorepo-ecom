// Product types
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductWithReviews extends Product {
  reviews: Review[];
  rating: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Cart types
export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

// User/Address types
export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
