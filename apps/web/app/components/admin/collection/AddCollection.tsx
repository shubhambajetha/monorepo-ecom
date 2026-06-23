'use client';

import React, { useState } from 'react';

const AddCollection = () => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      slug,
      subcategoryId,
      bannerImage,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Add Collection</h1>

        <p className="text-gray-500 mt-2">Create and manage your collections</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Collection Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Collection Name</label>

            <input
              type="text"
              placeholder="Enter collection name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>

            <input
              type="text"
              placeholder="collection-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subcategory
            </label>

            <select
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Subcategory</option>

              <option value="1">Gaming Laptop</option>

              <option value="2">Men Shoes</option>
            </select>
          </div>

          {/* Banner Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>

            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setBannerImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div>
              <img
                src={preview}
                alt="preview"
                className="w-full h-72 object-cover rounded-2xl border"
              />
            </div>
          )}

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
            >
              Create Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCollection;
