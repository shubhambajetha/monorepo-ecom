import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const subcategories = [
  {
    id: '1',
    name: 'Gaming Laptop',
    slug: 'gaming-laptop',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    category: {
      name: 'Electronics',
    },
  },

  {
    id: '2',
    name: 'Men Shoes',
    slug: 'men-shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: {
      name: 'Fashion',
    },
  },
];

const GetAllSubcat = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Subcategories</h1>

        <p className="text-gray-500 mt-2">Manage all your subcategories</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Image</th>

                <th className="text-left px-6 py-4 font-semibold text-gray-700">Name</th>

                <th className="text-left px-6 py-4 font-semibold text-gray-700">Slug</th>

                <th className="text-left px-6 py-4 font-semibold text-gray-700">Category</th>

                <th className="text-center px-6 py-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody>
              {subcategories.map((sub) => (
                <tr key={sub.id} className="border-t hover:bg-gray-50 transition">
                  {/* Image */}
                  <td className="px-6 py-4">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 font-medium text-gray-800">{sub.name}</td>

                  {/* Slug */}
                  <td className="px-6 py-4 text-gray-500">{sub.slug}</td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                      {sub.category.name}
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

export default GetAllSubcat;
