'use client';

import React, { useState, useMemo } from 'react';

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  brand: string;
  sku: string;
  price: number;
  discountPrice?: number;
  stock: number;
  thumbnail: string;
  sizes: string[];
  colors: string[];
  collectionId: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    description: 'Studio-grade sound with 40hr battery life.',
    brand: 'Sony',
    sku: 'WH-1000XM5-BLK',
    price: 29999,
    discountPrice: 24999,
    stock: 42,
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    sizes: [],
    colors: ['Black', 'Silver'],
    collectionId: 'electronics-2024',
    isFeatured: true,
    isActive: true,
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'Running Shoes Pro X',
    slug: 'running-shoes-pro-x',
    description: 'Lightweight carbon-plate racer for speed.',
    brand: 'Nike',
    sku: 'NK-RSP-X-10',
    price: 12999,
    stock: 0,
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Red', 'White'],
    collectionId: 'footwear-2024',
    isFeatured: false,
    isActive: false,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    title: 'Slim Fit Formal Shirt',
    slug: 'slim-fit-formal-shirt',
    description: 'Premium cotton blend for all-day comfort.',
    brand: 'Arrow',
    sku: 'ARW-SFFS-WH',
    price: 2499,
    discountPrice: 1799,
    stock: 130,
    thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Grey'],
    collectionId: 'apparel-2024',
    isFeatured: false,
    isActive: true,
    createdAt: '2024-01-10',
  },
  {
    id: '4',
    title: 'Stainless Steel Water Bottle',
    slug: 'stainless-steel-water-bottle',
    description: 'Double-wall vacuum insulation keeps drinks cold 24hr.',
    brand: 'Hydro Flask',
    sku: 'HF-SS-WB-32',
    price: 3499,
    stock: 75,
    thumbnail: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
    sizes: ['18oz', '32oz', '40oz'],
    colors: ['Black', 'Blue', 'Green'],
    collectionId: 'lifestyle-2024',
    isFeatured: true,
    isActive: true,
    createdAt: '2024-04-01',
  },
  {
    id: '5',
    title: 'Mechanical Gaming Keyboard',
    slug: 'mechanical-gaming-keyboard',
    description: 'RGB per-key illumination with Cherry MX switches.',
    brand: 'Corsair',
    sku: 'CRS-MK-K95',
    price: 14999,
    discountPrice: 11999,
    stock: 18,
    thumbnail: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop',
    sizes: [],
    colors: ['Black'],
    collectionId: 'electronics-2024',
    isFeatured: true,
    isActive: true,
    createdAt: '2024-03-28',
  },
  {
    id: '6',
    title: 'Leather Tote Bag',
    slug: 'leather-tote-bag',
    description: 'Full-grain leather with brass hardware.',
    brand: 'Hidesign',
    sku: 'HDS-LTB-TAN',
    price: 6999,
    stock: 22,
    thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop',
    sizes: [],
    colors: ['Tan', 'Brown', 'Black'],
    collectionId: 'accessories-2024',
    isFeatured: false,
    isActive: true,
    createdAt: '2024-02-05',
  },
  {
    id: '7',
    title: '4K Smart LED TV 55"',
    slug: '4k-smart-led-tv-55',
    description: 'Dolby Vision & Atmos with 120Hz panel.',
    brand: 'LG',
    sku: 'LG-4K-55C3',
    price: 89999,
    discountPrice: 74999,
    stock: 9,
    thumbnail: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&h=300&fit=crop',
    sizes: [],
    colors: ['Black'],
    collectionId: 'electronics-2024',
    isFeatured: true,
    isActive: true,
    createdAt: '2024-04-12',
  },
  {
    id: '8',
    title: 'Yoga Mat Premium',
    slug: 'yoga-mat-premium',
    description: '6mm non-slip natural rubber mat.',
    brand: 'Manduka',
    sku: 'MNK-YMP-6MM',
    price: 4299,
    stock: 55,
    thumbnail: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=300&h=300&fit=crop',
    sizes: [],
    colors: ['Purple', 'Teal', 'Black'],
    collectionId: 'fitness-2024',
    isFeatured: false,
    isActive: true,
    createdAt: '2024-01-22',
  },
];

type SortKey = 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'stock_asc' | 'stock_desc';
type FilterStatus = 'all' | 'active' | 'inactive' | 'featured' | 'out_of_stock';

const ITEMS_PER_PAGE = 6;

const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);

const stockBadge = (stock: number) => {
  if (stock === 0) return { label: 'Out of stock', cls: 'bg-red-50 text-red-600 border-red-100' };
  if (stock < 20)
    return { label: `Low: ${stock}`, cls: 'bg-amber-50 text-amber-700 border-amber-100' };
  return { label: `${stock} in stock`, cls: 'bg-green-50 text-green-700 border-green-100' };
};

// ── Component ──────────────────────────────────────────────────────────────
const GetProduct = () => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

 
  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.collectionId.toLowerCase().includes(q)
      );
    }

    if (filterStatus === 'active') list = list.filter((p) => p.isActive);
    else if (filterStatus === 'inactive') list = list.filter((p) => !p.isActive);
    else if (filterStatus === 'featured') list = list.filter((p) => p.isFeatured);
    else if (filterStatus === 'out_of_stock') list = list.filter((p) => p.stock === 0);

    list.sort((a, b) => {
      if (sortKey === 'newest')
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortKey === 'oldest')
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortKey === 'price_asc')
        return (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price);
      if (sortKey === 'price_desc')
        return (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price);
      if (sortKey === 'stock_asc') return a.stock - b.stock;
      if (sortKey === 'stock_desc') return b.stock - a.stock;
      return 0;
    });

    return list;
  }, [products, search, sortKey, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
    setSelectedIds((prev) => {
      const s = new Set(prev);
      s.delete(id);
      return s;
    });
  };

  const handleBulkDelete = () => {
    setProducts((prev) => prev.filter((p) => !selectedIds.has(p.id)));
    setSelectedIds(new Set());
  };

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });

  const toggleSelectAll = () => {
    if (selectedIds.size === paginated.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginated.map((p) => p.id)));
  };

  const toggleActive = (id: string) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)));

  // Stats
  const stats = useMemo(
    () => ({
      total: products.length,
      active: products.filter((p) => p.isActive).length,
      featured: products.filter((p) => p.isFeatured).length,
      outOfStock: products.filter((p) => p.stock === 0).length,
    }),
    [products]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 py-8">
        {/* ── Header ── */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-indigo-600 font-medium">Products</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage, edit, and track your entire product catalog.
            </p>
          </div>
          <a
            href="/dashboard/products/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </a>
        </div>

        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            {
              label: 'Total Products',
              value: stats.total,
              icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
              color: 'text-indigo-600 bg-indigo-50',
            },
            {
              label: 'Active',
              value: stats.active,
              icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
              color: 'text-emerald-600 bg-emerald-50',
            },
            {
              label: 'Featured',
              value: stats.featured,
              icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
              color: 'text-amber-600 bg-amber-50',
            },
            {
              label: 'Out of Stock',
              value: stats.outOfStock,
              icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
              color: 'text-red-600 bg-red-50',
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.color}`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900 leading-none">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 mb-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, brand, SKU…"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* Status filter */}
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value as FilterStatus);
                setPage(1);
              }}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="featured">Featured</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            {/* Sort */}
            <select
              value={sortKey}
              onChange={(e) => {
                setSortKey(e.target.value as SortKey);
                setPage(1);
              }}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="stock_asc">Stock: Low → High</option>
              <option value="stock_desc">Stock: High → Low</option>
            </select>

            {/* View toggle */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`px-3 py-2 transition-colors ${view === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                title="Grid view"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 0113.5 15h-3A1.5 1.5 0 019 13.5v-3z" />
                </svg>
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-3 py-2 transition-colors ${view === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                title="List view"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Bulk Action Bar ── */}
        {selectedIds.size > 0 && (
          <div className="mb-4 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-indigo-700">
              {selectedIds.size} product{selectedIds.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedIds(new Set())}
                className="text-sm text-indigo-600 hover:underline"
              >
                Deselect all
              </button>
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Selected
              </button>
            </div>
          </div>
        )}

        {/* ── Empty State ── */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-700 mb-1">No products found</h3>
            <p className="text-sm text-gray-400">Try adjusting your search or filter.</p>
          </div>
        )}

        {/* ── Grid View ── */}
        {view === 'grid' && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {paginated.map((product) => {
              const badge = stockBadge(product.stock);
              const discount = product.discountPrice
                ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                : null;

              return (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl border shadow-sm overflow-hidden group transition-all hover:shadow-md ${
                    selectedIds.has(product.id)
                      ? 'border-indigo-400 ring-2 ring-indigo-200'
                      : 'border-gray-100'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gray-50 overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/300x300?text=No+Image';
                      }}
                    />

                    {/* Checkbox */}
                    <div className="absolute top-3 left-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                      {product.isFeatured && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                          ★ Featured
                        </span>
                      )}
                      {discount && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-600 text-white">
                          -{discount}%
                        </span>
                      )}
                    </div>

                    {/* Inactive overlay */}
                    {!product.isActive && (
                      <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center">
                        <span className="text-xs font-semibold text-white bg-gray-700/80 px-3 py-1 rounded-full">
                          Inactive
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 flex-1">
                        {product.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      {product.brand} · {product.sku}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      {product.discountPrice ? (
                        <>
                          <span className="text-base font-bold text-gray-900">
                            {formatPrice(product.discountPrice)}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-base font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full border ${badge.cls}`}
                      >
                        {badge.label}
                      </span>
                      <div className="flex gap-1">
                        {/* Toggle active */}
                        <button
                          onClick={() => toggleActive(product.id)}
                          title={product.isActive ? 'Deactivate' : 'Activate'}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={
                                product.isActive
                                  ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                                  : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                              }
                            />
                          </svg>
                        </button>
                        {/* Edit */}
                        <button
                          title="Edit product"
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          title="Delete product"
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── List View ── */}
        {view === 'list' && filtered.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 w-8">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === paginated.length && paginated.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider hidden md:table-cell">
                    SKU
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider hidden sm:table-cell">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider hidden lg:table-cell">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-600 text-xs uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((product) => {
                  const badge = stockBadge(product.stock);
                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-gray-50 transition-colors ${selectedIds.has(product.id) ? 'bg-indigo-50' : ''}`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(product.id)}
                          onChange={() => toggleSelect(product.id)}
                          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://placehold.co/40x40?text=?';
                            }}
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate max-w-[180px]">
                              {product.title}
                            </p>
                            <p className="text-xs text-gray-400">{product.brand}</p>
                          </div>
                          {product.isFeatured && (
                            <span className="hidden xl:inline text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 flex-shrink-0">
                              ★ Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs hidden md:table-cell">
                        {product.sku}
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <span className="font-semibold text-gray-900">
                            {formatPrice(product.discountPrice ?? product.price)}
                          </span>
                          {product.discountPrice && (
                            <p className="text-xs text-gray-400 line-through">
                              {formatPrice(product.price)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${badge.cls}`}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${product.isActive ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-100 text-gray-500 border-gray-200'}`}
                        >
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 justify-end">
                          <button
                            onClick={() => toggleActive(product.id)}
                            title="Toggle active"
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button
                            title="Edit"
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-emerald-600 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(product.id)}
                            title="Delete"
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Pagination ── */}
        {filtered.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Showing{' '}
              <span className="font-medium text-gray-700">
                {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)}
              </span>{' '}
              of <span className="font-medium text-gray-700">{filtered.length}</span> products
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1.5 text-sm border rounded-lg transition-colors ${
                    p === page
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* ── Delete Confirm Modal ── */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900 text-center mb-1">
                Delete Product
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to delete{' '}
                <span className="font-medium text-gray-700">
                  "{products.find((p) => p.id === deleteConfirm)?.title}"
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetProduct;
