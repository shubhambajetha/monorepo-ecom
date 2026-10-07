'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import SingleCart from '../cards/SingleCart';
import FilterOption, { FilterState, AvailableFilterOptions } from './FilterOption';
import TopBar from './TopBar';
import { Product } from '@/app/types/product/productype';
import useGetProductByCollections from '@/app/hooks/collection/useGetProductByCollection';
import { useInfiniteProducts } from '@/app/hooks/products/useinfinitegetallproducts';
import { ApiResponse } from '@/app/utils/api';
import {
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  ArrowUpDown,
  Search,
  X,
} from 'lucide-react';

interface ProductCardProps {
  category?: string;
  collection?: string;
  initialProducts?: ApiResponse<Product[]> | Product[] | any;
}

const initialFilterState: FilterState = {
  categories: [],
  collections: [],
  brands: [],
  sizes: [],
  colors: [],
  minPrice: 0,
  maxPrice: 10000,
  inStockOnly: false,
  onSaleOnly: false,
  search: '',
  sortBy: 'featured',
};

const fallbackCatalogProducts: Product[] = [
  {
    id: 'demo-1',
    title: 'Solids: Vintage Drop-Shoulder Oversized Tee',
    slug: 'solids-vintage-drop-shoulder-tee',
    description: 'Heavyweight combed cotton with relaxed drop shoulder fit.',
    brand: 'The Souled Store',
    sku: 'TSS-OVR-01',
    price: 1499,
    discountPrice: 899,
    stock: 12,
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Sand'],
    rating: 4.9,
    isFeatured: true,
    isActive: true,
    isSpotlight: true,
    collectionId: 'col-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    title: 'Classic Relaxed Heavyweight Cotton Shirt',
    slug: 'classic-relaxed-heavyweight-shirt',
    description: 'Breathable linen-cotton blend with structured collar.',
    brand: 'Urban Classic',
    sku: 'URB-SHT-02',
    price: 1799,
    discountPrice: 1199,
    stock: 8,
    thumbnail: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'White', 'Olive'],
    rating: 4.8,
    isFeatured: true,
    isActive: true,
    isSpotlight: false,
    collectionId: 'col-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    title: 'Minimalist Raw Indigo Denim Jacket',
    slug: 'minimalist-raw-indigo-denim-jacket',
    description: '14oz rigid raw denim with custom metallic hardware.',
    brand: 'Luxe Basics',
    sku: 'LUX-DNM-03',
    price: 2999,
    discountPrice: 1999,
    stock: 5,
    thumbnail: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Black'],
    rating: 4.95,
    isFeatured: true,
    isActive: true,
    isSpotlight: true,
    collectionId: 'col-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-4',
    title: 'Vintage Sunset Washed Graphic Tee',
    slug: 'vintage-sunset-washed-graphic-tee',
    description: 'Acid washed super-soft cotton with retro front chest print.',
    brand: 'The Souled Store',
    sku: 'TSS-OVR-04',
    price: 1299,
    discountPrice: 799,
    stock: 15,
    thumbnail: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Orange', 'Sand', 'Black'],
    rating: 4.75,
    isFeatured: false,
    isActive: true,
    isSpotlight: false,
    collectionId: 'col-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-5',
    title: 'Washed Sage Cargo Utility Pants',
    slug: 'washed-sage-cargo-utility-pants',
    description: 'Relaxed fit multi-pocket tactical cargo trousers.',
    brand: 'Artisan Fit',
    sku: 'ART-CRG-05',
    price: 2499,
    discountPrice: 1699,
    stock: 9,
    thumbnail: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Sage', 'Olive', 'Black'],
    rating: 4.85,
    isFeatured: true,
    isActive: true,
    isSpotlight: false,
    collectionId: 'col-3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-6',
    title: 'Heavy Fleece French Terry Hoodie',
    slug: 'heavy-fleece-french-terry-hoodie',
    description: '450 GSM luxury brushed fleece with double-layer hood.',
    brand: 'Luxe Basics',
    sku: 'LUX-HDD-06',
    price: 2799,
    discountPrice: 1899,
    stock: 6,
    thumbnail: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Grey', 'Black', 'Navy'],
    rating: 4.9,
    isFeatured: true,
    isActive: true,
    isSpotlight: true,
    collectionId: 'col-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function ProductCard({
  category = '',
  collection = '',
  initialProducts,
}: ProductCardProps) {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const isCollectionRoute = Boolean(category && collection);

  // Hook 1: For collection routes
  const collectionQuery = useGetProductByCollections(category, collection);

  // Hook 2: For general listing / search routes
  const infiniteQuery = useInfiniteProducts({
    search: filters.search || undefined,
    brand: filters.brands.length ? filters.brands.join(',') : undefined,
    size: filters.sizes.length ? filters.sizes.join(',') : undefined,
    color: filters.colors.length ? filters.colors.join(',') : undefined,
    minPrice: filters.minPrice > 0 ? String(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice < 10000 ? String(filters.maxPrice) : undefined,
    sortBy: filters.sortBy,
  });

  const activeQuery = isCollectionRoute ? collectionQuery : infiniteQuery;
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = activeQuery;

  // Aggregate raw products from API, SSR initialProducts, or fallback demo
  const rawProducts: Product[] = useMemo(() => {
    if (data?.pages?.length) {
      const flattened = data.pages.flatMap((page: any) => page.data ?? []);
      if (flattened.length > 0) return flattened;
    }

    if (initialProducts) {
      const arr = Array.isArray(initialProducts) ? initialProducts : initialProducts?.data;
      if (Array.isArray(arr) && arr.length > 0) return arr;
    }

    return fallbackCatalogProducts;
  }, [data, initialProducts]);

  // Extract dynamic filter options from products
  const dynamicFilterOptions: AvailableFilterOptions = useMemo(() => {
    const catMap = new Map<string, number>();
    const brandMap = new Map<string, number>();
    const sizeSet = new Set<string>();
    const colorSet = new Set<string>();

    rawProducts.forEach((p) => {
      // Category
      const catName =
        typeof p.collection === 'object'
          ? (p.collection as any)?.title || (p.collection as any)?.name
          : typeof p.collection === 'string' && p.collection
            ? p.collection
            : p.brand || 'Apparel';
      if (catName) catMap.set(catName, (catMap.get(catName) || 0) + 1);

      // Brand
      if (p.brand) brandMap.set(p.brand, (brandMap.get(p.brand) || 0) + 1);

      // Sizes
      if (p.sizes?.length) p.sizes.forEach((s) => sizeSet.add(s));

      // Colors
      if (p.colors?.length) p.colors.forEach((c) => colorSet.add(c));
    });

    const categories = Array.from(catMap.entries()).map(([label, count]) => ({ label, count }));
    const brands = Array.from(brandMap.entries()).map(([label, count]) => ({ label, count }));
    const sizes = Array.from(sizeSet);

    return {
      categories: categories.length ? categories : undefined,
      brands: brands.length ? brands : undefined,
      sizes: sizes.length ? sizes : undefined,
      maxPriceLimit: 10000,
    };
  }, [rawProducts]);

  // Client-Side Multi-Criteria Filtering and Sorting
  const filteredProducts = useMemo(() => {
    let result = [...rawProducts];

    // 1. Search Query filter
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q)
      );
    }

    // 2. Categories / Collections filter
    if (filters.categories.length > 0) {
      result = result.filter((p) => {
        const catName =
          typeof p.collection === 'object'
            ? (p.collection as any)?.title || (p.collection as any)?.name
            : p.collection || p.brand;
        return (
          filters.categories.includes(catName) ||
          filters.categories.some((c) => p.title?.toLowerCase().includes(c.toLowerCase()))
        );
      });
    }

    // 3. Brands filter
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // 4. Sizes filter
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes?.some((s) => filters.sizes.includes(s))
      );
    }

    // 5. Colors filter
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors?.some((c) =>
          filters.colors.some((fc) => c.toLowerCase().includes(fc.toLowerCase()))
        )
      );
    }

    // 6. Price Range filter
    result = result.filter((p) => {
      const price =
        typeof p.discountPrice === 'number' && p.discountPrice > 0
          ? p.discountPrice
          : p.price || 0;
      return price >= filters.minPrice && price <= filters.maxPrice;
    });

    // 7. On Sale Only filter
    if (filters.onSaleOnly) {
      result = result.filter(
        (p) =>
          typeof p.discountPrice === 'number' &&
          p.discountPrice < (p.price || 0) &&
          p.discountPrice > 0
      );
    }

    // 8. In Stock Only filter
    if (filters.inStockOnly) {
      result = result.filter((p) => (p.stock || 0) > 0);
    }

    // 9. Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price || 0;
          const priceB = b.discountPrice || b.price || 0;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price || 0;
          const priceB = b.discountPrice || b.price || 0;
          return priceB - priceA;
        });
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'discount':
        result.sort((a, b) => {
          const discA = a.discountPrice && a.price ? (a.price - a.discountPrice) / a.price : 0;
          const discB = b.discountPrice && b.price ? (b.price - b.discountPrice) / b.price : 0;
          return discB - discA;
        });
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
        break;
      case 'featured':
      default:
        result.sort((a, b) => {
          if (a.isSpotlight && !b.isSpotlight) return -1;
          if (!a.isSpotlight && b.isSpotlight) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
        break;
    }

    return result;
  }, [rawProducts, filters]);

  // Infinite scroll intersection observer
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleClearAll = () => {
    setFilters(initialFilterState);
  };

  const pageTitle = collection
    ? collection.replace(/-/g, ' ')
    : category
      ? `${category} Collection`
      : 'All Products';

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-4">
        {/* TopBar with Breadcrumbs, Search, View Switcher & Sort */}
        <TopBar
          title={pageTitle}
          count={filteredProducts.length}
          category={category}
          collection={collection}
          filtersVisible={filtersVisible}
          onToggleFilters={() => setFiltersVisible(!filtersVisible)}
          filters={filters}
          onFilterChange={setFilters}
          onClearAll={handleClearAll}
          gridCols={gridCols}
          onGridColsChange={setGridCols}
          onOpenMobileFilters={() => setMobileDrawerOpen(true)}
        />

        {/* Main Body: Sliding Sidebar + Products Grid */}
        <div className="flex gap-8 mt-6 items-start">
          {/* ========================================================= */}
          {/* DESKTOP FILTER SIDEBAR (Smooth Collapsible Transition) */}
          {/* ========================================================= */}
          <aside
            className={`
              hidden lg:block flex-shrink-0 transition-all duration-300 ease-in-out
              ${filtersVisible ? 'w-72 opacity-100' : 'w-0 opacity-0 pointer-events-none -mr-8 overflow-hidden'}
            `}
          >
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 scrollbar-thin">
              <FilterOption
                filters={filters}
                onFilterChange={setFilters}
                onClearAll={handleClearAll}
                options={dynamicFilterOptions}
                totalProductsCount={filteredProducts.length}
              />
            </div>
          </aside>

          {/* ========================================================= */}
          {/* PRODUCTS CATALOG GRID */}
          {/* ========================================================= */}
          <main className="flex-1 min-w-0">
            {isLoading && !rawProducts.length ? (
              /* Loading Skeletons */
              <div
                className={`
                  grid gap-4 sm:gap-6
                  grid-cols-2
                  ${
                    filtersVisible
                      ? gridCols === 2
                        ? 'lg:grid-cols-2'
                        : gridCols === 4
                          ? 'lg:grid-cols-4'
                          : 'lg:grid-cols-3'
                      : gridCols === 2
                        ? 'lg:grid-cols-2'
                        : gridCols === 3
                          ? 'lg:grid-cols-3'
                          : 'lg:grid-cols-4'
                  }
                `}
              >
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-gray-100 overflow-hidden border border-gray-200/80 animate-pulse flex flex-col"
                  >
                    <div className="w-full aspect-[3/4] bg-gray-200" />
                    <div className="p-4 space-y-2.5">
                      <div className="w-1/3 h-3 bg-gray-200 rounded-md" />
                      <div className="w-4/5 h-4 bg-gray-200 rounded-md" />
                      <div className="w-1/2 h-4 bg-gray-200 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              /* Modern Empty State */
              <div className="rounded-3xl border border-gray-200/80 bg-gray-50/50 p-12 text-center flex flex-col items-center justify-center space-y-4 my-6 shadow-2xs">
                <div className="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-xs flex items-center justify-center text-gray-400">
                  <Search size={28} />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h3 className="text-base font-bold text-gray-900">No matching products found</h3>
                  <p className="text-xs text-gray-500">
                    We couldn&apos;t find any items matching your selected criteria. Try removing some filters or search keywords.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-transform hover:scale-102 cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              /* Product Cards Grid */
              <div>
                <div
                  className={`
                    grid gap-4 sm:gap-6
                    grid-cols-2
                    ${
                      filtersVisible
                        ? gridCols === 2
                          ? 'lg:grid-cols-2'
                          : gridCols === 4
                            ? 'lg:grid-cols-4'
                            : 'lg:grid-cols-3'
                        : gridCols === 2
                          ? 'lg:grid-cols-2'
                          : gridCols === 3
                            ? 'lg:grid-cols-3'
                            : 'lg:grid-cols-4'
                    }
                  `}
                >
                  {filteredProducts.map((product) => (
                    <SingleCart
                      key={product.id || product.slug}
                      product={{
                        ...product,
                        category: category || (product as any)?.category,
                        collection: collection || product.collection,
                      }}
                    />
                  ))}
                </div>

                {/* Infinite Scroll Sentinel */}
                <div ref={loadMoreRef} className="py-10 flex justify-center items-center">
                  {isFetchingNextPage && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                      <div className="w-3.5 h-3.5 border-2 border-gray-400 border-t-gray-900 rounded-full animate-spin" />
                      <span>Loading more styles...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE / TABLET FILTER SLIDE-OVER DRAWER */}
      {/* ========================================================= */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
            <div className="p-4 flex-1 overflow-y-auto">
              <FilterOption
                filters={filters}
                onFilterChange={setFilters}
                onClearAll={handleClearAll}
                options={dynamicFilterOptions}
                isMobileDrawer={true}
                onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
                totalProductsCount={filteredProducts.length}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
