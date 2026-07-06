export interface subcategoryPayload {
  name: string;
  slug: string;
  categoryId: string;
  image?: File | null;
}

export interface subcateCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

