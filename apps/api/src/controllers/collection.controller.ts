import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

interface CollectionParams {
  id: string;
}

export const createCollection = async (req: Request, res: Response) => {
  try {
    const { name, slug, subcategoryId } = req.body;

    const bannerImage = req.file ? `/uploads/collection/${req.file.filename}` : null;

    const existingSlug = await prisma.collection.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return res.status(400).json({
        success: false,
        message: 'Collection slug already exists',
      });
    }

    const subcategory = await prisma.subcategory.findUnique({
      where: { id: subcategoryId },
    });

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found',
      });
    }

    const newCollection = await prisma.collection.create({
      data: { name, slug, bannerImage, subcategoryId },
    });

    return res.status(201).json({
      success: true,
      message: 'Collection created successfully',
      data: newCollection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const getCollection = async (req: Request<CollectionParams>, res: Response) => {
  try {
    const { id } = req.params;

    const collection = await prisma.collection.findUnique({
      where: { id },
    });

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Collection fetched successfully',
      data: collection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const getAllCollections = async (req: Request, res: Response) => {
  try {
    const collections = await prisma.collection.findMany({
      include: { subcategory: true },
    });

    return res.status(200).json({
      success: true,
      message: 'Collections fetched successfully',
      data: collections,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const getCollectionWithProducts = async (req: Request<CollectionParams>, res: Response) => {
  try {
    const { id } = req.params;

    const collection = await prisma.collection.findUnique({
      where: { id },
      include: {
        products: true, // your relation name in schema
      },
    });

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Collection with products fetched successfully',
      data: collection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const updateCollection = async (req: Request<CollectionParams>, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, subcategoryId } = req.body;

    const existingCollection = await prisma.collection.findUnique({
      where: { id },
    });

    if (!existingCollection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
      });
    }

    // Check slug conflict only if slug is being changed
    if (slug && slug !== existingCollection.slug) {
      const slugConflict = await prisma.collection.findFirst({
        where: { slug, NOT: { id } },
      });

      if (slugConflict) {
        return res.status(400).json({
          success: false,
          message: 'Collection slug already exists',
        });
      }
    }

    // Validate new subcategoryId only if it is being changed
    if (subcategoryId && subcategoryId !== existingCollection.subcategoryId) {
      const subcategory = await prisma.subcategory.findUnique({
        where: { id: subcategoryId },
      });

      if (!subcategory) {
        return res.status(404).json({
          success: false,
          message: 'Subcategory not found',
        });
      }
    }

    // Keep old image if no new file is uploaded
    const bannerImage = req.file
      ? `/uploads/collection/${req.file.filename}`
      : existingCollection.bannerImage;

    const updatedCollection = await prisma.collection.update({
      where: { id },
      data: { name, slug, subcategoryId, bannerImage },
    });

    return res.status(200).json({
      success: true,
      message: 'Collection updated successfully',
      data: updatedCollection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const deleteCollection = async (req: Request<CollectionParams>, res: Response) => {
  try {
    const { id } = req.params;

    const collection = await prisma.collection.findUnique({
      where: { id },
    });

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
      });
    }

    await prisma.collection.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: 'Collection deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};