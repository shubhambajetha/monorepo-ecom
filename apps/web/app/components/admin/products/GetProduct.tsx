'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Pencil,
  Trash2,
  Plus,
  ImageIcon,
  Search,
  Package,
  Layers,
  Sparkles,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { Product, PaginatedResponse } from '@/app/types/product/productype';
import useGetAllProducts from '@/app/hooks/products/useGetAllProducts';
import { useDeleteProduct } from '@/app/hooks/products/useDeleteProduct';
import useGetAllCollections from '@/app/hooks/collection/useGetAllCollections';
import { resolveApiAssetUrl } from '@/app/lib/config';

interface GetProductProps {
  initialData?: PaginatedResponse<Product>;
}

const GetProduct = ({ initialData }: GetProductProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('ALL');
  const [selectedStockStatus, setSelectedStockStatus] = useState<'ALL' | 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'>('ALL');

  // Fetch collections for filter dropdown
  const { data: collectionsResponse } = useGetAllCollections();
  const collections = collectionsResponse?.data ?? [];

  // Fetch products from backend
  const {
    data: productsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetAllProducts(
    {
      collectionId: selectedCollection !== 'ALL' ? selectedCollection : undefined,
      search: searchTerm.trim() || undefined,
      limit: '100',
    },
    initialData
  );

  const { mutate: deleteProductMutate, isPending: isDeleting } = useDeleteProduct();

  const products = productsResponse?.data ?? [];

  // Client-side filtering for stock status
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedStockStatus === 'IN_STOCK' && p.stock <= 0) return false;
      if (selectedStockStatus === 'LOW_STOCK' && (p.stock <= 0 || p.stock > 10)) return false;
      if (selectedStockStatus === 'OUT_OF_STOCK' && p.stock > 0) return false;
      return true;
    });
  }, [products, selectedStockStatus]);

  // Summary statistics
  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.isActive).length;
    const outOfStock = products.filter((p) => p.stock <= 0).length;
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
    return { total, active, outOfStock, lowStock };
  }, [products]);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}" product?`)) {
      deleteProductMutate(id, {
        onError: (err: any) => {
          alert(err?.message || 'Failed to delete product');
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1450px] mx-auto px-4 py-12">
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-3" />
          <p className="text-gray-500 text-sm">Loading products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[1450px] mx-auto px-4 py-12">
        <div className="py-16 text-center">
          <p className="text-red-500 font-medium mb-3">Failed to load products. Please try again.</p>
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
            <Package className="w-6 h-6 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor all your catalog items</p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600 shadow-sm transition"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase">Total Items</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-emerald-600 uppercase">Active</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{stats.active}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-amber-600 uppercase">Low Stock (≤10)</span>
          <p className="text-2xl font-bold text-amber-700 mt-1">{stats.lowStock}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-red-600 uppercase">Out of Stock</span>
          <p className="text-2xl font-bold text-red-700 mt-1">{stats.outOfStock}</p>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, brand, SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Collection Filter */}
          <select
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="ALL">All Collections</option>
            {collections.map((col) => (
              <option key={col.id} value={col.id}>
                {col.name}
              </option>
            ))}
          </select>

          {/* Stock Status Filter */}
          <select
            value={selectedStockStatus}
            onChange={(e) => setSelectedStockStatus(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="ALL">All Stock Statuses</option>
            <option value="IN_STOCK">In Stock (&gt;0)</option>
            <option value="LOW_STOCK">Low Stock (1-10)</option>
            <option value="OUT_OF_STOCK">Out of Stock (0)</option>
          </select>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-12 border-b border-gray-200 bg-gray-50 px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          <div className="col-span-1">#</div>
          <div className="col-span-1">Image</div>
          <div className="col-span-3">Product Info</div>
          <div className="col-span-2">Collection</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-1">Stock</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {/* Table Rows */}
        {filteredProducts.map((p, index) => {
          const thumbUrl = p.thumbnail ? resolveApiAssetUrl(p.thumbnail) || p.thumbnail : '';

          return (
            <div
              key={p.id}
              className="grid grid-cols-12 items-center border-b border-gray-100 px-6 py-4 text-sm hover:bg-gray-50/80 transition"
            >
              {/* Index */}
              <div className="col-span-1 font-medium text-gray-400 text-xs">{index + 1}</div>

              {/* Thumbnail */}
              <div className="col-span-1 flex items-center">
                {thumbUrl ? (
                  <img
                    src={thumbUrl}
                    alt={p.title}
                    className="h-11 w-11 rounded-lg object-cover border border-gray-200"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-gray-400 border border-gray-200">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Title & Brand */}
              <div className="col-span-3 pr-2">
                <p className="font-semibold text-gray-900 line-clamp-1">{p.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-500 font-medium">{p.brand}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[11px] font-mono text-gray-400">{p.sku}</span>
                </div>
              </div>

              {/* Collection */}
              <div className="col-span-2 pr-2">
                {p.collection?.name ? (
                  <span className="inline-block rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
                    {p.collection.name}
                  </span>
                ) : (
                  <span className="text-xs text-gray-400 font-mono">Unassigned</span>
                )}
              </div>

              {/* Price */}
              <div className="col-span-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-900">
                    ₹{p.discountPrice !== undefined && p.discountPrice !== null ? p.discountPrice : p.price}
                  </span>
                  {p.discountPrice !== undefined && p.discountPrice !== null && p.discountPrice < p.price && (
                    <span className="text-xs text-gray-400 line-through">₹{p.price}</span>
                  )}
                </div>
              </div>

              {/* Stock */}
              <div className="col-span-1">
                {p.stock <= 0 ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                    0
                  </span>
                ) : p.stock <= 10 ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {p.stock}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {p.stock}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="col-span-1 text-center flex items-center justify-center gap-1">
                {p.isActive ? (
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" title="Active" />
                ) : (
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-300" title="Inactive" />
                )}
                {p.isFeatured && (
                  <span title="Featured Product">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="col-span-1 flex items-center justify-center gap-2">
                {/* Edit */}
                <Link
                  href={`/products?id=${p.id}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition"
                  title="Edit product"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(p.id, p.title)}
                  disabled={isDeleting}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                  title="Delete product"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-3 text-orange-500">
              <Package className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">No Products Found</h2>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedCollection !== 'ALL' || selectedStockStatus !== 'ALL'
                ? 'Try adjusting your filters or search terms.'
                : 'Start by creating your first product.'}
            </p>
            <div className="mt-5">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetProduct;
