import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prisma';

interface SubCategoryParams {
  id?: string;
}

export const createSubCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, slug, categoryId } = req.body;

    const image = req.file ? `/uploads/subCategory/${req.file.filename}` : null;

    const existingSlug = await prisma.subcategory.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists in subcategory',
      });
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    const newSubCategory = await prisma.subcategory.create({
      data: { name, slug, categoryId, image },
    });

    return res.status(201).json({
      success: true,
      message: 'Subcategory created successfully',
      data: newSubCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubCategory = async (req: Request<SubCategoryParams>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

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
      success: true,
      message: 'Subcategory fetched successfully',
      data: subcategory,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSubCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subcategories = await prisma.subcategory.findMany({
      include: { category: true },
    });

    return res.status(200).json({
      success: true,
      message: 'Subcategories fetched successfully',
      data: subcategories,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubCategoryWithCollections = async (
  req: Request<SubCategoryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const subcategory = await prisma.subcategory.findUnique({
      where: { id },
      include: {
        collections: true, // your relation name in schema
      },
    });

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Subcategory with collections fetched successfully',
      data: subcategory,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubCategory = async (req: Request<SubCategoryParams>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, slug, categoryId } = req.body;

    const existingSubCategory = await prisma.subcategory.findUnique({
      where: { id },
    });

    if (!existingSubCategory) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found',
      });
    }

    // Check slug conflict only if slug is being changed
    if (slug && slug !== existingSubCategory.slug) {
      const slugConflict = await prisma.subcategory.findFirst({
        where: { slug, NOT: { id } },
      });

      if (slugConflict) {
        return res.status(400).json({
          success: false,
          message: 'Slug already exists',
        });
      }
    }

    // Validate new categoryId only if it is being changed
    if (categoryId && categoryId !== existingSubCategory.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }
    }

    // Keep old image if no new file is uploaded
    const image = req.file
      ? `/uploads/subCategory/${req.file.filename}`
      : existingSubCategory.image;

    const updatedSubCategory = await prisma.subcategory.update({
      where: { id },
      data: { name, slug, categoryId, image },
    });

    return res.status(200).json({
      success: true,
      message: 'Subcategory updated successfully',
      data: updatedSubCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubCategory = async (req: Request<SubCategoryParams>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const subcategory = await prisma.subcategory.findUnique({
      where: { id },
    });

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found',
      });
    }

    await prisma.subcategory.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: 'Subcategory deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
