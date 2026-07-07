import { Collection } from '../collection/collectiontype';

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  brand: string;
  sku: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  thumbnail: string;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  isFeatured: boolean;
  isActive: boolean;
  collectionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductPayload {
  title: string;
  slug: string;
  description: string;
  brand: string;
  sku: string;
  price: number;
  discountPrice?: number;
  stock: number;
  thumbnail?: File | string | null;
  images?: (File | string | null)[];
  sizes: string[];
  colors: string[];
  isFeatured?: boolean;
  isActive?: boolean;
  collectionId: string;
}