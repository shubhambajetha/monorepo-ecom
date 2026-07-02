export interface CategoryPayload {
  name: string;
  slug: string;
  image: File;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

