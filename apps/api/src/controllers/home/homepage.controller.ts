import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prisma';
import { productInclude } from '../../helpers/productInclude';

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

    res.status(200).json(collections);
  } catch (error) {
    next(error);
  }
};

export const getHomelatestproduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.params;

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
      orderBy: {
        createdAt: 'desc',
      },
      take: 12,
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
    const { category } = req.params;

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
      // include: productInclude,
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
