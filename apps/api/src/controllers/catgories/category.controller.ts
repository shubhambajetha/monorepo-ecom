import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';

interface CategoryParams {
  id: string;
}

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug } = req.body;

    const image = req.file ? `/uploads/categories/${req.file.filename}` : null;

    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists in category',
      });
    }

    const newCategory = await prisma.category.create({
      data: { name, slug, image },
    });

    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: newCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const getCategory = async (req: Request<CategoryParams>, res: Response) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Category fetched successfully',
      data: category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();

    return res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const updateCategory = async (req: Request<CategoryParams>, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }
    // Keep old image if no new file is uploaded
    const image = req.file ? `/uploads/categories/${req.file.filename}` : existingCategory.image;

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name, slug, image },
    });

    return res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const deleteCategory = async (req: Request<CategoryParams>, res: Response) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    await prisma.category.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
