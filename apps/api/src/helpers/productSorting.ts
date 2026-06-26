import { Prisma } from '@prisma/client';

export type SortByOption =
  | 'price_asc'
  | 'price_desc'
  | 'newest'
  | 'oldest'
  | 'name_asc'
  | 'name_desc'
  | 'top_rated';

const sortMap: Record<SortByOption, Prisma.ProductOrderByWithRelationInput> = {
  price_asc:  { price:     'asc'  },
  price_desc: { price:     'desc' },
  newest:     { createdAt: 'desc' },
  oldest:     { createdAt: 'asc'  },
  name_asc:   { title:     'asc'  },
  name_desc:  { title:     'desc' },
  top_rated:  { rating:    'desc' },
};

/**
 * Returns the Prisma order by clause for sorting products.
 * Defaults to 'newest' (createdAt: 'desc') if no option or invalid option is provided.
 */
export const getProductOrderBy = (
  sortBy?: string
): Prisma.ProductOrderByWithRelationInput => {
  return sortMap[sortBy as SortByOption] ?? sortMap.newest;
};
