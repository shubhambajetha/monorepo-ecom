import { SubCategory } from "../subcatgory/subcategorytype";

export interface Collection {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  bannerImage?: string | null;
  subcategoryId: string;
  subcategory?: SubCategory;
  createdAt?: string;
  updatedAt?: string;
}

export interface CollectionPayload {
  name: string;
  slug: string;
  subcategoryId: string;
  subcategory?: SubCategory;
  bannerImage?: File | null;
}



