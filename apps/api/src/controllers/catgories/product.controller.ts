import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prisma.js';
import { getPagination } from '../../helpers/pagination.js';
import { buildProductWhereClause, type ProductQueryParams } from '../../helpers/productFilter.js';
import { getProductOrderBy } from '../../helpers/productSorting.js';
import { productInclude } from '../../helpers/productInclude.js';

interface ProductParams {
  id?: string;
}

// Helper to parse boolean values from form-data safely
const parseBool = (value: any): boolean | undefined => {
  if (value === 'true' || value === true) return true;
  if (value === 'false' || value === false) return false;
  return undefined;
};

const parseArray = (value: any): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }
  return [];
};

/**
 * Create a new Product
 */
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      slug,
      description,
      brand,
      sku,
      collectionId,
      price,
      discountPrice,
      stock,
      sizes,
      colors,
      isFeatured,
      isActive,
    } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const thumbnail = files?.thumbnail?.[0]
      ? `/uploads/products/${files.thumbnail[0].filename}`
      : null;
    const images = files?.images ? files.images.map((f) => `/uploads/products/${f.filename}`) : [];

    if (!thumbnail) {
      return res.status(400).json({ success: false, message: 'Thumbnail is required' });
    }

    const [existingSlug, existingSku, collection] = await Promise.all([
      prisma.product.findUnique({ where: { slug } }),
      prisma.product.findUnique({ where: { sku } }),
      prisma.collection.findUnique({ where: { id: collectionId } }),
    ]);

    if (existingSlug) {
      return res.status(400).json({ success: false, message: 'Product slug already exists' });
    }
    if (existingSku) {
      return res.status(400).json({ success: false, message: 'SKU already exists' });
    }
    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        brand,
        sku,
        collectionId,
        price: parseFloat(price),
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        stock: parseInt(stock),
        thumbnail,
        images,
        sizes: parseArray(sizes),
        colors: parseArray(colors),
        isFeatured: parseBool(isFeatured) ?? false,
        isActive: parseBool(isActive) ?? true,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all products (with pagination, filtering, search, sorting)
 */
export const getAllProducts = async (
  req: Request<{}, {}, {}, ProductQueryParams & { sortBy?: string; page?: string; limit?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const orderBy = getProductOrderBy(req.query.sortBy);
    const where = await buildProductWhereClause(req.query);

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: productInclude,
      }),
      prisma.product.count({ where }),
    ]);

    return res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single product by ID
 */
export const getProduct = async (
  req: Request<ProductParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: productInclude,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a product
 */
export const updateProduct = async (
  req: Request<ProductParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      description,
      brand,
      sku,
      collectionId,
      price,
      discountPrice,
      stock,
      sizes,
      colors,
      isFeatured,
      isActive,
    } = req.body;

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Parallel checks for slug, SKU, and collection validity
    const [slugConflict, skuConflict, collectionExists] = await Promise.all([
      slug && slug !== existingProduct.slug
        ? prisma.product.findFirst({ where: { slug, NOT: { id } } })
        : null,
      sku && sku !== existingProduct.sku
        ? prisma.product.findFirst({ where: { sku, NOT: { id } } })
        : null,
      collectionId && collectionId !== existingProduct.collectionId
        ? prisma.collection.findUnique({ where: { id: collectionId } })
        : true,
    ]);

    if (slugConflict) {
      return res.status(400).json({ success: false, message: 'Product slug already exists' });
    }
    if (skuConflict) {
      return res.status(400).json({ success: false, message: 'SKU already exists' });
    }
    if (!collectionExists) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }

    // Handles images and thumbnails
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const thumbnail = files?.thumbnail?.[0]
      ? `/uploads/products/${files.thumbnail[0].filename}`
      : existingProduct.thumbnail;
    const newImages = files?.images
      ? files.images.map((f) => `/uploads/products/${f.filename}`)
      : [];
    const images =
      newImages.length > 0 ? [...existingProduct.images, ...newImages] : existingProduct.images;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        brand,
        sku,
        collectionId,
        price: price ? parseFloat(price) : undefined,
        discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
        stock: stock ? parseInt(stock) : undefined,
        thumbnail,
        images,
        sizes: sizes ? parseArray(sizes) : undefined,
        colors: colors ? parseArray(colors) : undefined,
        isFeatured: parseBool(isFeatured),
        isActive: parseBool(isActive),
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (
  req: Request<ProductParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await prisma.product.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get distinct filter parameters (brands, colors, sizes, collections, categories, and price ranges)
 * for building front-end filter bars.
 */
export const getProductFilters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [products, collections] = await Promise.all([
      prisma.product.findMany({
        where: { isActive: true },
        select: {
          brand: true,
          colors: true,
          sizes: true,
          price: true,
        },
      }),
      prisma.collection.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
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
      }),
    ]);

    // Compute distinct lists
    const brands = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));
    const colors = Array.from(new Set(products.flatMap((p) => p.colors).filter(Boolean)));
    const sizes = Array.from(new Set(products.flatMap((p) => p.sizes).filter(Boolean)));

    // Compute price range boundary
    const prices = products.map((p) => p.price);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

    return res.status(200).json({
      success: true,
      message: 'Filters metadata retrieved successfully',
      data: {
        brands,
        colors,
        sizes,
        priceRange: {
          min: minPrice,
          max: maxPrice,
        },
        collections,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getfeaturedproduct = async (req: Request, res: Response, next: NextFunction) => {
  let isFeature = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      collection: true,
    },
  });
  return res.status(200).json({
    message: 'product isFeatured find sucessfully',
    success: true,
    data: isFeature,
  });
};
