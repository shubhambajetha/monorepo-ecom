export type collectionParam = {
  category?: string;
};

export interface homecollection {
  id: string;
  name: string;
  slug: string;
  bannerImage?: string;
  subcategoryId: string;
  subcategory?: {
    id: string;
    name: string;
    slug: string;
    category?: {
      id: string;
      name: string;
      slug: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface spotlight {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  brand?: string;
  sku?: string;
  price?: number;
  discountPrice?: number | null;
  stock?: number;
  thumbnail: string;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  rating?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  isSpotlight?: boolean;
  collectionId?: string;
  collection?: {
    id: string;
    name: string;
    slug: string;
    subcategory?: {
      id: string;
      name: string;
      slug: string;
      category?: {
        id: string;
        name: string;
        slug: string;
      };
    };
  };
  createdAt?: string;
  updatedAt?: string;
}

