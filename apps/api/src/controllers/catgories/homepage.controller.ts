import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prisma.js';
import { productInclude } from '../../helpers/productInclude.js';

export const getCollections = async (req: Request, res: Response, next: NextFunction) => {
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

export const getlatestproduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const  newArrival = await prisma.product.findMany({
        orderBy:{
            createdAt:"desc"
        },
        take:12,
        include:productInclude
    })
    return res.status(200).json({
        message:"product fetched sucessfully",
        data:newArrival
    })
  } catch (error) {
    next(error);
  }
};
