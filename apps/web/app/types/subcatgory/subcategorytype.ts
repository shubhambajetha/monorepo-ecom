import { Category } from '../category/categorytype';

export interface subcategoryPayload {
  name: string;
  slug: string;
  categoryId: string;
  image?: File | null;
  isFeatured?: boolean;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  categoryId: string;
  category?: Category;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type subcateCategory = SubCategory;


