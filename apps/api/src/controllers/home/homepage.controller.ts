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

    const collections = await prisma.collection.findMany({
      where: {
        subcategory: {
          category: {
            slug: category as string,
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

    const newArrival = await prisma.product.findMany({
      where: {
        collection: {
          subcategory: {
            category: {
              slug: category as string,
            },
          },
        },
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 8,
      // include: productInclude,
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

    const spotlight = await prisma.product.findMany({
      where: {
        collection: {
          subcategory: {
            category: {
              slug: category as string,
            },
          },
        },
        isSpotlight: true,
      },
      take: 12,
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
