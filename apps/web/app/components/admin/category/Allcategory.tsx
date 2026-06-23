import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Mobile Phones',
    slug: 'mobile-phones',
    products: 12,
  },
  {
    id: 2,
    name: 'Laptops',
    slug: 'laptops',
    products: 8,
  },
  {
    id: 3,
    name: 'Fashion',
    slug: 'fashion',
    products: 20,
  },
];

const Allcategory = () => {
  return (
    <div className="max-w-[1450px] mx-auto px-4 py-4">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Categories</h1>

        <p className="text-sm text-gray-500 mt-1">Manage all your product categories</p>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-12 border-b border-gray-200 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-600">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Category Name</div>
          <div className="col-span-4">Slug</div>
          <div className="col-span-2">Products</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        {/* Table Body */}
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="grid grid-cols-12 items-center border-b border-gray-100 px-6 py-4 text-sm hover:bg-gray-50 transition"
          >
            {/* Number */}
            <div className="col-span-1 font-medium text-gray-700">{index + 1}</div>

            {/* Name */}
            <div className="col-span-3">
              <h2 className="font-medium text-gray-800">{category.name}</h2>
            </div>

            {/* Slug */}
            <div className="col-span-4">
              <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs text-gray-600">
                {category.slug}
              </span>
            </div>

            {/* Products */}
            <div className="col-span-2 text-gray-600">{category.products} Products</div>

            {/* Actions */}
            <div className="col-span-2 flex items-center justify-center gap-3">
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-black hover:text-white transition">
                <Pencil className="h-4 w-4" />
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="py-16 text-center">
            <h2 className="text-lg font-medium text-gray-700">No Categories Found</h2>

            <p className="mt-1 text-sm text-gray-500">Start by adding your first category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allcategory;
