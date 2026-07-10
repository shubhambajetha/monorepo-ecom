// catalog.ts
// Step 3: Catalog structure (Category -> Subcategory -> Collection)
// This is the seed "skeleton" — products will be generated later using @faker-js/faker
// and attached to each collection via `collectionId`.
//
// Structure matches your Prisma schema:
//   Category    -> name, slug, image
//   Subcategory -> name, slug, image, isFeatured
//   Collection  -> name, slug, bannerImage

export const catalog = [
  {
    name: 'Men',
    slug: 'men',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e',
    subcategories: [
      {
        name: 'Clothing',
        slug: 'men-clothing',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        isFeatured: true,
        collections: [
          { name: 'T-Shirts', slug: 'men-tshirts' },
          { name: 'Shirts', slug: 'men-shirts' },
          { name: 'Hoodies', slug: 'men-hoodies' },
          { name: 'Sweatshirts', slug: 'men-sweatshirts' },
          { name: 'Jeans', slug: 'men-jeans' },
          { name: 'Joggers', slug: 'men-joggers' },
          { name: 'Shorts', slug: 'men-shorts' },
          { name: 'Jackets', slug: 'men-jackets' },
          { name: 'Sweaters', slug: 'men-sweaters' },
          { name: 'Track Pants', slug: 'men-track-pants' },
          { name: 'Boxers', slug: 'men-boxers' },
          { name: 'Pyjamas', slug: 'men-pyjamas' },
        ],
      },
      {
        name: 'Footwear',
        slug: 'men-footwear',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
        isFeatured: true,
        collections: [
          { name: 'Running Shoes', slug: 'men-running-shoes' },
          { name: 'Sneakers', slug: 'men-sneakers' },
          { name: 'Training Shoes', slug: 'men-training-shoes' },
          { name: 'Slides', slug: 'men-slides' },
          { name: 'Sandals', slug: 'men-sandals' },
          { name: 'Boots', slug: 'men-boots' },
        ],
      },
      {
        name: 'Accessories',
        slug: 'men-accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
        isFeatured: false,
        collections: [
          { name: 'Caps', slug: 'men-caps' },
          { name: 'Bags', slug: 'men-bags' },
          { name: 'Belts', slug: 'men-belts' },
          { name: 'Wallets', slug: 'men-wallets' },
          { name: 'Socks', slug: 'men-socks' },
          { name: 'Gloves', slug: 'men-gloves' },
        ],
      },
    ],
  },
  {
    name: 'Women',
    slug: 'women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    subcategories: [
      {
        name: 'Clothing',
        slug: 'women-clothing',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
        isFeatured: true,
        collections: [
          { name: 'Tops', slug: 'women-tops' },
          { name: 'T-Shirts', slug: 'women-tshirts' },
          { name: 'Shirts', slug: 'women-shirts' },
          { name: 'Dresses', slug: 'women-dresses' },
          { name: 'Skirts', slug: 'women-skirts' },
          { name: 'Jeans', slug: 'women-jeans' },
          { name: 'Leggings', slug: 'women-leggings' },
          { name: 'Joggers', slug: 'women-joggers' },
          { name: 'Hoodies', slug: 'women-hoodies' },
          { name: 'Sweaters', slug: 'women-sweaters' },
          { name: 'Jackets', slug: 'women-jackets' },
          { name: 'Nightwear', slug: 'women-nightwear' },
        ],
      },
      {
        name: 'Footwear',
        slug: 'women-footwear',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
        isFeatured: true,
        collections: [
          { name: 'Sneakers', slug: 'women-sneakers' },
          { name: 'Running Shoes', slug: 'women-running-shoes' },
          { name: 'Heels', slug: 'women-heels' },
          { name: 'Flats', slug: 'women-flats' },
          { name: 'Sandals', slug: 'women-sandals' },
          { name: 'Boots', slug: 'women-boots' },
        ],
      },
      {
        name: 'Accessories',
        slug: 'women-accessories',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
        isFeatured: false,
        collections: [
          { name: 'Handbags', slug: 'women-handbags' },
          { name: 'Backpacks', slug: 'women-backpacks' },
          { name: 'Caps', slug: 'women-caps' },
          { name: 'Jewelry', slug: 'women-jewelry' },
          { name: 'Scarves', slug: 'women-scarves' },
          { name: 'Sunglasses', slug: 'women-sunglasses' },
        ],
      },
    ],
  },
];

export type CatalogCollection = {
  name: string;
  slug: string;
  bannerImage?: string;
};

export type CatalogSubcategory = {
  name: string;
  slug: string;
  image?: string;
  isFeatured?: boolean;
  collections: CatalogCollection[];
};

export type CatalogCategory = {
  name: string;
  slug: string;
  image?: string;
  subcategories: CatalogSubcategory[];
};
