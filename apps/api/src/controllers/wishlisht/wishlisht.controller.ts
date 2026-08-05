import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prisma';

export const createWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        status: false,
        message: 'Unauthorized',
      });
    }

    const productId = typeof req.params.productId === 'string' ? req.params.productId.trim() : '';

    if (!productId) {
      return res.status(400).json({
        success: false,
        status: false,
        message: 'Product ID is required',
      });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        status: false,
        message: 'Product not found',
      });
    }

    const existingWishlist = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingWishlist) {
      return res.status(409).json({
        success: false,
        status: false,
        message: 'Product already exists in wishlist',
      });
    }

    const wishlist = await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });

    return res.status(201).json({
      success: true,
      status: true,
      message: 'Product added to wishlist successfully',
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        status: false,
        message: 'Unauthorized',
      });
    }

    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            price: true,
            discountPrice: true,
            stock: true,
          },
        },
      }, 
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      success: true,
      status: true,
      message: 'Wishlist fetched successfully',
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        status: false,
        message: 'Unauthorized',
      });
    }

    const productId = typeof req.params.productId === 'string' ? req.params.productId.trim() : '';

    if (!productId) {
      return res.status(400).json({
        success: false,
        status: false,
        message: 'Product ID is required',
      });
    }

    const wishlistItem = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        status: false,
        message: 'Product not found in wishlist',
      });
    }

    await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    return res.status(200).json({
      success: true,
      status: true,
      message: 'Product removed from wishlist successfully',
    });
  } catch (error) {
    next(error);
  }
};

