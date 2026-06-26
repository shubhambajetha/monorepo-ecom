import { Prisma } from '@prisma/client';

export const productInclude = {
  collection: {
    select: {
      id: true,
      name: true,
      subcategory: {
        select: {
          id: true,
          name: true,
          category: {
            select: { id: true, name: true },
          },
        },
      },
    },
  },
} satisfies Prisma.ProductInclude;
