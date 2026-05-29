import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const collections = [
  {
    id: '1',
    name: 'Gaming Setup',
    slug: 'gaming-setup',
    bannerImage: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
    subcategory: {
      name: 'Gaming Laptop',
    },
  },

  {
    id: '2',
    name: 'Running Shoes',
    slug: 'running-shoes',
    bannerImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    subcategory: {
      name: 'Men Shoes',
    },
  },
];

const GetCollection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Collections</h1>

        <p className="text-gray-500 mt-2">Manage all your collections</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Head */}
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Banner</th>

                <th className="text-left px-6 py-4 font-semibold text-gray-700">Collection Name</th>

                <th className="text-left px-6 py-4 font-semibold text-gray-700">Slug</th>

                <th className="text-left px-6 py-4 font-semibold text-gray-700">Subcategory</th>

                <th className="text-center px-6 py-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {collections.map((collection) => (
                <tr key={collection.id} className="border-t hover:bg-gray-50 transition">
                  {/* Banner Image */}
                  <td className="px-6 py-4">
                    <img
                      src={collection.bannerImage}
                      alt={collection.name}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 font-medium text-gray-800">{collection.name}</td>

                  {/* Slug */}
                  <td className="px-6 py-4 text-gray-500">{collection.slug}</td>

                  {/* Subcategory */}
                  <td className="px-6 py-4">
                    <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                      {collection.subcategory.name}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      {/* Edit */}
                      <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
                        <Pencil size={18} />
                      </button>

                      {/* Delete */}
                      <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetCollection;
