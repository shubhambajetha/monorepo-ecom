'use client';

import React from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus, ImageIcon, Sparkles } from 'lucide-react';
import useGetAllSubCategory from '@/app/hooks/subcategory/useGetAllSubCategory';
import useDeleteSubCategory from '@/app/hooks/subcategory/useDeleteSubCategory';
import { SubCategory } from '@/app/types/subcatgory/subcategorytype';
import { ApiResponse } from '@/app/utils/api';

interface GetAllSubcatProps {
  initialData?: ApiResponse<SubCategory[]>;
}

const GetAllSubcat = ({ initialData }: GetAllSubcatProps) => {
  const { data: response, isLoading, isError } = useGetAllSubCategory(initialData);
  const { mutate: deleteSubCategoryMutate, isPending: isDeleting } = useDeleteSubCategory();

  const subcategories = response?.data ?? [];

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" subcategory?`)) {
      deleteSubCategoryMutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1450px] mx-auto px-4 py-8">
        <div className="py-16 text-center text-gray-500">Loading subcategories...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[1450px] mx-auto px-4 py-8">
        <div className="py-16 text-center text-red-500">
          Failed to load subcategories. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1450px] mx-auto px-4 py-6">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">All Subcategories</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all your product subcategories</p>
        </div>

        <Link
          href="/subcategory"
          className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition"
        >
          <Plus className="h-4 w-4" />
          Add Subcategory
        </Link>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-12 border-b border-gray-200 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-600">
          <div className="col-span-1">#</div>
          <div className="col-span-2">Image</div>
          <div className="col-span-3">Subcategory Name</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Slug</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        {/* Table Body */}
        {subcategories.map((sub, index) => (
          <div
            key={sub.id}
            className="grid grid-cols-12 items-center border-b border-gray-100 px-6 py-4 text-sm hover:bg-gray-50 transition"
          >
            {/* Number */}
            <div className="col-span-1 font-medium text-gray-700">{index + 1}</div>

            {/* Image */}
            <div className="col-span-2 flex items-center">
              {sub.image ? (
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                  <ImageIcon className="h-5 w-5" />
                </div>
              )}
            </div>

            {/* Name */}
            <div className="col-span-3 flex items-center gap-2">
              <span className="font-medium text-gray-800">{sub.name}</span>
              {sub.isFeatured && (
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 border border-amber-200">
                  <Sparkles className="h-3 w-3" /> Featured
                </span>
              )}
            </div>

            {/* Category */}
            <div className="col-span-2">
              {sub.category?.name ? (
                <span className="inline-block rounded-lg bg-gray-900 px-2.5 py-1 text-xs font-medium text-white">
                  {sub.category.name}
                </span>
              ) : (
                <span className="text-xs text-gray-400">Unassigned</span>
              )}
            </div>

            {/* Slug */}
            <div className="col-span-2">
              <span className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-xs text-gray-600 font-mono">
                {sub.slug}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex items-center justify-center gap-3">
              <Link
                href={`/subcategory?id=${sub.id}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-black hover:text-white transition"
                title="Edit subcategory"
              >
                <Pencil className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={() => handleDelete(sub.id, sub.name)}
                disabled={isDeleting}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                title="Delete subcategory"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {subcategories.length === 0 && (
          <div className="py-16 text-center">
            <h2 className="text-lg font-medium text-gray-700">No Subcategories Found</h2>
            <p className="mt-1 text-sm text-gray-500">Start by creating your first subcategory</p>
            <div className="mt-4">
              <Link
                href="/subcategory"
                className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
              >
                <Plus className="h-4 w-4" />
                Add Subcategory
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllSubcat;
