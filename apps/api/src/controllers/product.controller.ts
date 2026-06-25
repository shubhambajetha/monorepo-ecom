import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

interface productparam {
  id: string;
}

export const createProduct = async (req: Request, res: Response) => {
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
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const thumbnail = files?.thumbnail?.[0]
      ? `/uploads/products/${files.thumbnail[0].filename}`
      : null;

    const images = files?.images
      ? files.images.map((file) => `/uploads/products/${file.filename}`)
      : [];

    if (!thumbnail) {
      return res.status(400).json({
        success: false,
        message: 'Thumbnail is required',
      });
    }
    // slug conflict check
    const existingslug = await prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (existingslug) {
      return res.status(400).json({
        status: false,
        message: 'slug already present in the product',
      });
    }

    // sku check
    const existingsku = await prisma.product.findUnique({
      where: { sku },
    });

    if (existingsku) {
      return res.status(400).json({
        status: false,
        message: 'sku already exist in this product',
      });
    }

    // validate collectionid
    const collection = await prisma.collection.findUnique({
      where: {
        id: collectionId,
      },
    });

    if (!collection) {
      return res.status(400).json({
        status: false,
        message: 'collection not be found',
      });
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
        sizes: sizes || [],
        colors: colors || [],
        isFeatured: isFeatured ?? false,
        isActive: isActive ?? true,
      },
    });

    return res.status(201).json({
      status: true,
      message: 'product created sucessfully',
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : 'Internal server error',
    });
  }
};

export const getAllProducts = async (req:Request, res:Response) => {
  try {
   
  } catch (error) {}
};
