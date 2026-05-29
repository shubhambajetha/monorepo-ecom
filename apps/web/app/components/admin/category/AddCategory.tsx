'use client';

import React, { use, useState } from 'react';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleCategoryName = (value: string) => {
    setCategory(value);

    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

    setSlug(generatedSlug);
  };

  return (
    <div className="max-w-[1450px] mx-auto px-4 py-4">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Add Category</h1>

        <p className="text-sm text-gray-500 mt-1">Create a new product category</p>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Category Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category Name
            </label>

            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => handleCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-2">
            <label htmlFor="slug" className="text-sm font-medium text-gray-700">
              Slug
            </label>

            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Enter category slug"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
            />

            <p className="text-xs text-gray-400">URL: /category/{slug || 'category-slug'}</p>
          </div>

          {/* Image */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="image" className="text-sm font-medium text-gray-700">
              Category Image
            </label>

            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-600
              file:mr-4 file:rounded-lg file:border-0
              file:bg-black file:px-4 file:py-2
              file:text-white hover:file:bg-gray-800"
            />
          </div>
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-end">
          <button className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition">
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
