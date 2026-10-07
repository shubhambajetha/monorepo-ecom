import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prisma';

function getCollectionBanner(slug: string, bannerImage?: string | null): string {
  if (bannerImage) {
    return bannerImage;
  }

  return `https://picsum.photos/seed/${encodeURIComponent(slug)}-banner/1200/600`;
}

export const getHomeCollections = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;

    const categorySlug =
      typeof category === 'string' && category.trim() && category !== 'undefined'
        ? category.trim()
        : undefined;

    const collections = await prisma.collection.findMany({
      where: categorySlug
        ? {
            subcategory: {
              category: {
                slug: categorySlug,
              },
            },
          }
        : {},
      include: {
        subcategory: {
          include: {
            category: true,
          },
        },
      },
      take: 12,
    });

    const normalizedCollections = collections.map((collection) => ({
      ...collection,
      bannerImage: getCollectionBanner(collection.slug, collection.bannerImage),
    }));

    res.status(200).json({
      message: 'collection fetched sucessfully',
      data: normalizedCollections,
    });
  } catch (error) {
    next(error);
  }
};

export const getHomelatestproduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;

    const categorySlug =
      typeof category === 'string' && category.trim() && category !== 'undefined'
        ? category.trim()
        : undefined;

    const newArrival = await prisma.product.findMany({
      where: {
        isActive: true,
        ...(categorySlug
          ? {
              collection: {
                subcategory: {
                  category: {
                    slug: categorySlug,
                  },
                },
              },
            }
          : {}),
      },
      include: {
        collection: {
          include: {
            subcategory: {
              include: {
                category: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 12,
    });

    return res.status(200).json({
      message: 'Products fetched successfully',
      data: newArrival,
    });
  } catch (error) {
    next(error);
  }
};

export const getHomeSportlight = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;

    const categorySlug =
      typeof category === 'string' && category.trim() && category !== 'undefined'
        ? category.trim()
        : undefined;

    const spotlight = await prisma.product.findMany({
      where: {
        isSpotlight: true,
        isActive: true,
        ...(categorySlug
          ? {
              collection: {
                subcategory: {
                  category: {
                    slug: categorySlug,
                  },
                },
              },
            }
          : {}),
      },
      include: {
        collection: {
          include: {
            subcategory: {
              include: {
                category: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 30,
    });

    return res.status(200).json({
      status: true,
      message: 'Spotlight products fetched successfully',
      data: spotlight,
    });
  } catch (error) {
    next(error);
  }
};

