'use client';

import React from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus, ImageIcon, Layers, Loader2 } from 'lucide-react';
import { Collection } from '@/app/types/collection/collectiontype';
import useGetAllCollections from '@/app/hooks/collection/useGetAllCollections';
import useDeleteCollection from '@/app/hooks/collection/useDeleteCollection';
import { ApiResponse } from '@/app/utils/api';
import { resolveApiAssetUrl } from '@/app/lib/config';

export interface AllCollectionProps {
  intialData?: ApiResponse<Collection[]>;
}

const GetCollection = ({ intialData }: AllCollectionProps) => {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetAllCollections(intialData);

  const { mutate: deleteCollectionMutate, isPending: isDeleting } = useDeleteCollection();

  const collections = response?.data ?? [];

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" collection?`)) {
      deleteCollectionMutate(id, {
        onError: (err: any) => {
          alert(err?.message || 'Failed to delete collection');
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1450px] mx-auto px-4 py-12">
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-3" />
          <p className="text-gray-500 text-sm">Loading collections...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[1450px] mx-auto px-4 py-12">
        <div className="py-16 text-center">
          <p className="text-red-500 font-medium mb-3">Failed to load collections. Please try again.</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1450px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-800">All Collections</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">Manage all your product collections</p>
        </div>

        <Link
          href="/collection"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600 shadow-sm transition"
        >
          <Plus className="h-4 w-4" />
          Add Collection
        </Link>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-12 border-b border-gray-200 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-600">
          <div className="col-span-1">#</div>
          <div className="col-span-2">Banner</div>
          <div className="col-span-3">Collection Name</div>
          <div className="col-span-3">Subcategory</div>
          <div className="col-span-2">Slug</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {/* Table Body */}
        {collections.map((col, index) => {
          const bannerUrl = col.bannerImage ? resolveApiAssetUrl(col.bannerImage) || col.bannerImage : '';

          return (
            <div
              key={col.id}
              className="grid grid-cols-12 items-center border-b border-gray-100 px-6 py-4 text-sm hover:bg-gray-50/80 transition"
            >
              {/* Index */}
              <div className="col-span-1 font-medium text-gray-500">{index + 1}</div>

              {/* Banner Image */}
              <div className="col-span-2 flex items-center">
                {bannerUrl ? (
                  <img
                    src={bannerUrl}
                    alt={col.name}
                    className="h-12 w-20 rounded-lg object-cover border border-gray-200"
                  />
                ) : (
                  <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-gray-100 text-gray-400 border border-gray-200">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Collection Name */}
              <div className="col-span-3">
                <span className="font-semibold text-gray-900">{col.name}</span>
              </div>

              {/* Subcategory */}
              <div className="col-span-3">
                {col.subcategory?.name ? (
                  <span className="inline-block rounded-lg bg-gray-900 px-2.5 py-1 text-xs font-medium text-white">
                    {col.subcategory.name}
                  </span>
                ) : (
                  <span className="text-xs text-gray-400 font-mono">
                    {col.subcategoryId || 'Unassigned'}
                  </span>
                )}
              </div>

              {/* Slug */}
              <div className="col-span-2">
                <span className="inline-block rounded-lg bg-gray-100 px-2.5 py-1 text-xs text-gray-700 font-mono">
                  {col.slug}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex items-center justify-center gap-2">
                {/* Edit */}
                <Link
                  href={`/collection?id=${col.id}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition"
                  title="Edit collection"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(col.id, col.name)}
                  disabled={isDeleting}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                  title="Delete collection"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {collections.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-3 text-orange-500">
              <Layers className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">No Collections Found</h2>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first collection
            </p>
            <div className="mt-5">
              <Link
                href="/collection"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Add Collection
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetCollection;
