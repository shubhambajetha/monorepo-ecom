import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { number, string, success } from 'zod';

/**
 * Create Cart / Add Item to Cart
 */
export const createCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const productId = typeof req.params.productId === 'string' ? req.params.productId.trim() : '';

    const quantity = req.body?.quantity !== undefined ? Number(req.body.quantity) : 1;

    if (!productId || !Number.isSafeInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'productId and a positive whole-number quantity are required',
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // The composite unique key makes this a single atomic operation. A
    // find-then-create sequence can fail when the same item is added twice
    // concurrently for one user.
    const cart = await prisma.cartItem.upsert({
      where: {
        userId_productId: { userId, productId },
      },
      create: {
        userId,
        productId,
        quantity: 1,
      },
      update: {
        quantity: {
          increment: 1,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      data: cart,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Get Cart
 */
export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const cart = await prisma.cartItem.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Cart fetched successfully',
      data: cart,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update Cart Quantity
 */
export const updateCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const productId = typeof req.params.productId === 'string' ? req.params.productId.trim() : '';

    const quantity = Number(req.body.quantity);

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a positive whole number',
      });
    }

    const updatedCart = await prisma.cartItem.update({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      data: {
        quantity,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      data: updatedCart,
    });
  } catch (error: any) {
    // Prisma record not found
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    return next(error);
  }
};
/**
 * Count Cart Items
 */
export const countItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const count = await prisma.cartItem.count({
      where: {
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Cart item count fetched successfully',
      data: count,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Remove Single Cart Item
 */
export const removeSingle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const productId = typeof req.params.productId === 'string' ? req.params.productId.trim() : '';

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'A product ID is required',
      });
    }

    const result = await prisma.cartItem.deleteMany({
      where: {
        userId,
        OR: [{ productId }, { id: productId }],
      },
    });

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Clear Entire Cart
 */
export const clearCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const result = await prisma.cartItem.deleteMany({
      where: {
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: result.count > 0 ? 'Cart cleared successfully' : 'Cart is already empty',
      deletedItems: result.count,
    });
  } catch (error) {
    return next(error);
  }
};
