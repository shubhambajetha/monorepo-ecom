export interface Collection {
  id: number;
  name: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CollectionPayload {
  name: string;
  image?: File | string;
  slug: string;
}
