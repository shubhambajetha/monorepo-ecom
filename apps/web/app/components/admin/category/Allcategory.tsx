'use client';

import React from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus, ImageIcon } from 'lucide-react';
import { Category } from '@/app/types/category/categorytype';
import useGetAllCategory from '@/app/hooks/category/useGetAllCategory';
import useDeleteCategory from '@/app/hooks/category/useDeleteCategory';
import { ApiResponse } from '@/app/utils/api';

interface AllCategoryProps {
  initialData?: ApiResponse<Category[]>;
}

const Allcategory = ({ initialData }: AllCategoryProps) => {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllCategory(initialData);

  const { mutate: deleteCategoryMutate, isPending: isDeleting } = useDeleteCategory();

  const categories = response?.data ?? [];

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" category?`)) {
      deleteCategoryMutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1450px] mx-auto px-4 py-8">
        <div className="py-16 text-center text-gray-500">
          Loading categories...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[1450px] mx-auto px-4 py-8">
        <div className="py-16 text-center text-red-500">
          Failed to load categories. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1450px] mx-auto px-4 py-6">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            All Categories
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all your product categories
          </p>
        </div>

        <Link
          href="/admin/create-category"
          className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Link>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-12 border-b border-gray-200 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-600">
          <div className="col-span-1">#</div>
          <div className="col-span-2">Image</div>
          <div className="col-span-3">Category Name</div>
          <div className="col-span-4">Slug</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        {/* Table Body */}
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="grid grid-cols-12 items-center border-b border-gray-100 px-6 py-4 text-sm hover:bg-gray-50 transition"
          >
            {/* Number */}
            <div className="col-span-1 font-medium text-gray-700">
              {index + 1}
            </div>

            {/* Image */}
            <div className="col-span-2 flex items-center">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                  <ImageIcon className="h-5 w-5" />
                </div>
              )}
            </div>

            {/* Name */}
            <div className="col-span-3">
              <h2 className="font-medium text-gray-800">
                {category.name}
              </h2>
            </div>

            {/* Slug */}
            <div className="col-span-4">
              <span className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-xs text-gray-600">
                {category.slug}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex items-center justify-center gap-3">
              <Link
                href={`/admin/create-category?id=${category.id}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-black hover:text-white transition"
                title="Edit category"
              >
                <Pencil className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={() => handleDelete(category.id, category.name)}
                disabled={isDeleting}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                title="Delete category"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="py-16 text-center">
            <h2 className="text-lg font-medium text-gray-700">
              No Categories Found
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Start by adding your first category
            </p>
            <div className="mt-4">
              <Link
                href="/admin/create-category"
                className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allcategory;