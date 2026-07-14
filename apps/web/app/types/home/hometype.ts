export type collectionParam = {
  category: string;
};

export interface homecollection {
  id: string;
  name: string;
  slug: string;
  bannerImage?: string;
  subcategoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface spotlight {
  id: string;
  title: string;
  slug: string;
  description: string;
  brand: string;
  sku: string;
  price: number;
  discountPrice: number;
  stock: number;
  thumbnail: string;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  isFeatured: boolean;
  isActive: boolean;
  isSpotlight: boolean;
  collectionId: string;
  createdAt: string; // Use Date if you convert it on the frontend
  updatedAt: string; // Use Date if you convert it on the frontend
}


