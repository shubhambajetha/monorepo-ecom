import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, categoryId } = req.body;

    const image = req.file ? `/uploads/subCategory/${req.file.filename}` : null;

    const existingSlug = await prisma.subcategory.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return res.status(400).json({
        status: false,
        message: 'Slug already exists in subcategory', 
      });
    }

    const categoryProduct = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryProduct) {
      return res.status(404).json({
        status: false,
        message: 'Category not found',
      });
    }

    const createcategory = await prisma.subcategory.create({
      data: { name, slug, categoryId, image },
    });

    return res.status(201).json({
      success: true,
      message: 'Subcategory created successfully', 
      data: createcategory, 
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const getsubcategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: 'Invalid subcategory id', // fix: typo
      });
    }

    const subcategory = await prisma.subcategory.findUnique({
      where: { id },
    });

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Subcategory fetched successfully',
      data: subcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).json({
        status: false,
        message: 'Invalid subcategory id',
      });
    }

    const existingSubCategory = await prisma.subcategory.findUnique({
      where: { id },
    });

    if (!existingSubCategory) {
      return res.status(404).json({
        status: false,
        message: 'Subcategory not found',
      });
    }

    const { name, slug, categoryId } = req.body;

    if (slug) {
      const existingSlug = await prisma.subcategory.findFirst({
        where: { slug, NOT: { id } },
      });

      if (existingSlug) {
        return res.status(400).json({
          status: false,
          message: 'Slug already exists',
        });
      }
    }

    if (categoryId) {
      const categoryProduct = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!categoryProduct) {
        return res.status(404).json({
          status: false,
          message: 'Category not found',
        });
      }
    }

    const image = req.file
      ? `/uploads/subCategory/${req.file.filename}`
      : existingSubCategory.image;

    const updatedSubCategory = await prisma.subcategory.update({
      where: { id },
      data: { name, slug, categoryId, image },
    });

    return res.status(200).json({
      status: true,
      message: 'Subcategory updated successfully',
      data: updatedSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: 'Invalid subcategory id',
      });
    }

    const subcategory = await prisma.subcategory.findUnique({
      where: { id },
    });

    if (!subcategory) {
      return res.status(404).json({
        status: false,
        message: 'Subcategory not found',
      });
    }

    await prisma.subcategory.delete({ where: { id } });

    return res.status(200).json({
      status: true,
      message: 'Subcategory deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
