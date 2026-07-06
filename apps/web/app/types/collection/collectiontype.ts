export interface Collection {
  id: number;
  name: string;
  slug?: string;
  image?: string;
  bannerImage?: string;
  subcategoryId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CollectionPayload {
  name: string;
  slug: string;
  subcategoryId?: string;
  bannerImage?: File | null;
}
