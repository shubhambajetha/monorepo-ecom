export interface CategoryPayload {
  name: string;
  slug: string;
  image?: File | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

