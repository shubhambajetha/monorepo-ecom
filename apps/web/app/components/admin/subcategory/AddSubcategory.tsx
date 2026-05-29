'use client';

import React, { useState } from 'react';

const AddSubcategory = () => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      slug,
      categoryId,
      image,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Subcategory</h1>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium">Subcategory Name</label>

            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block mb-2 font-medium">Slug</label>

            <input
              type="text"
              placeholder="subcategory-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">Select Category</label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select Category</option>
              <option value="1">Electronics</option>
              <option value="2">Fashion</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 font-medium">Upload Image</label>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Submit */}
          <button type="submit" className="bg-black text-white px-6 py-3 rounded-xl">
            Create Subcategory
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubcategory;
