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
  thumbnail: string;
}
