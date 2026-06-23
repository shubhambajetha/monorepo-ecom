import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const createCollection = async (req: Request, res: Response) => {
  try {
    const { name, slug, subcategoryId } = req.body;

    const bannerImage = req.file ? `/uploads/collection/${req.file.filename}` : null;

    const existingSlug = await prisma.collection.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return res.status(400).json({
        status: false,
        message: 'Collection slug already exists',
      });
    }

    const subcategory = await prisma.subcategory.findUnique({
      where: { id: subcategoryId },
    });

    if (!subcategory) {
      return res.status(404).json({
        status: false,
        message: 'Subcategory not found',
      });
    }

    const collection = await prisma.collection.create({
      data: { name, slug, bannerImage, subcategoryId },
    });

    return res.status(201).json({
      status: true,
      message: 'Collection created successfully',
      data: collection,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const getCollection = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.status(400).json({
        // fix: was 200
        status: false,
        message: 'Invalid collection id',
      });
    }

    const collection = await prisma.collection.findUnique({
      where: { id },
    });

    if (!collection) {
      return res.status(404).json({
        status: false,
        message: 'Collection not found',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Collection fetched successfully',
      data: collection,
    });
  } catch (error) {
    return res.status(500).json({
      // fix: was 400
      status: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const updateCollection = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: 'Invalid collection id',
      });
    }

    const existingCollection = await prisma.collection.findUnique({
      // fix: added await, was querying by subcategoryId
      where: { id },
    });

    if (!existingCollection) {
      return res.status(404).json({
        status: false,
        message: 'Collection not found',
      });
    }

    const { name, slug, subcategoryId } = req.body;

    // fix: slug conflict check was missing entirely
    if (slug) {
      const existingSlug = await prisma.collection.findFirst({
        where: { slug, NOT: { id } },
      });

      if (existingSlug) {
        return res.status(400).json({
          status: false,
          message: 'Collection slug already exists',
        });
      }
    }

    // fix: subcategory validation was missing entirely
    if (subcategoryId) {
      const subcategory = await prisma.subcategory.findUnique({
        where: { id: subcategoryId },
      });

      if (!subcategory) {
        return res.status(404).json({
          status: false,
          message: 'Subcategory not found',
        });
      }
    }

    // fix: image handling was missing entirely
    const bannerImage = req.file
      ? `/uploads/collection/${req.file.filename}`
      : existingCollection.bannerImage;

    // fix: actual update call was missing entirely
    const updatedCollection = await prisma.collection.update({
      where: { id },
      data: { name, slug, subcategoryId, bannerImage },
    });

    return res.status(200).json({
      status: true,
      message: 'Collection updated successfully',
      data: updatedCollection,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
