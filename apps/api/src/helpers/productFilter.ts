import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma.js';

export interface ProductQueryParams {
  subcategoryId?: string;
  collectionId?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
  isFeatured?: string;
  size?: string;
  color?: string;
  search?: string;
  isActive?: string;
}

/**
 * Builds the Prisma where clause for filtering products.
 */
export const  buildProductWhereClause = async (
  query: ProductQueryParams
): Promise<Prisma.ProductWhereInput> => {
  const {
    subcategoryId,
    collectionId,
    brand,
    minPrice,
    maxPrice,
    inStock,
    isFeatured,
    size,
    color,
    search,
    isActive,
  } = query;

  const where: Prisma.ProductWhereInput = {};

  // 1. Hierarchy / Relation Filters
  if (subcategoryId) {
    const collections = await prisma.collection.findMany({
      where: { subcategoryId },
      select: { id: true },
    });
    where.collectionId = { in: collections.map((c) => c.id) };
  } else if (collectionId) {
    where.collectionId = collectionId;
  }

  // 2. Exact Field Filters (case-insensitive where applicable)
  if (brand) {
    where.brand = { equals: brand, mode: 'insensitive' };
  }

  if (isFeatured === 'true') {
    where.isFeatured = true;
  }

  if (inStock === 'true') {
    where.stock = { gt: 0 };
  }

  if (isActive === 'true') {
    where.isActive = true;
  } else if (isActive === 'false') {
    where.isActive = false;
  }

  // 3. Array Contains Filters
  if (size) {
    where.sizes = { has: size };
  }

  if (color) {
    where.colors = { has: color };
  }

  // 4. Price Boundaries
  if (minPrice || maxPrice) {
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;

    where.price = {
      ...(min !== undefined && !isNaN(min) && { gte: min }),
      ...(max !== undefined && !isNaN(max) && { lte: max }),
    };
  }

  // 5. Full Text / Fuzzy Search
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { brand: { contains: search, mode: 'insensitive' } },
    ];
  }

  return where;
};
