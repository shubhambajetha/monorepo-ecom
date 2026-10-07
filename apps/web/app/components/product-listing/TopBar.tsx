'use client';

import React, { useState } from 'react';
import {
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  Grid2X2,
  Grid3X3,
  Search,
  X,
  Home,
  ChevronRight,
  Check,
  ArrowDownAZ,
} from 'lucide-react';
import Link from 'next/link';
import { FilterState } from './FilterOption';

export interface TopBarProps {
  title?: string;
  count?: number;
  category?: string;
  collection?: string;
  filtersVisible?: boolean;
  onToggleFilters?: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearAll: () => void;
  gridCols?: 2 | 3 | 4;
  onGridColsChange?: (cols: 2 | 3 | 4) => void;
  onOpenMobileFilters?: () => void;
}

const sortOptionsList = [
  { value: 'featured', label: 'Featured & Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Customer Rating' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'discount', label: 'Biggest Discount' },
];

export default function TopBar({
  title = 'Catalog',
  count = 0,
  category = '',
  collection = '',
  filtersVisible = true,
  onToggleFilters,
  filters,
  onFilterChange,
  onClearAll,
  gridCols = 3,
  onGridColsChange,
  onOpenMobileFilters,
}: TopBarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const activeSortLabel =
    sortOptionsList.find((s) => s.value === filters.sortBy)?.label || 'Featured & Popular';

  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.maxPrice < 10000 ? 1 : 0) +
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0) +
    (filters.search ? 1 : 0);

  const removeChip = (key: keyof FilterState, value?: any) => {
    if (key === 'categories' || key === 'brands' || key === 'sizes' || key === 'colors') {
      onFilterChange({
        ...filters,
        [key]: filters[key].filter((v: string) => v !== value),
      });
    } else if (key === 'maxPrice') {
      onFilterChange({ ...filters, maxPrice: 10000 });
    } else if (key === 'minPrice') {
      onFilterChange({ ...filters, minPrice: 0 });
    } else if (key === 'onSaleOnly') {
      onFilterChange({ ...filters, onSaleOnly: false });
    } else if (key === 'inStockOnly') {
      onFilterChange({ ...filters, inStockOnly: false });
    } else if (key === 'search') {
      onFilterChange({ ...filters, search: '' });
    }
  };

  return (
    <div className="w-full space-y-3 pb-2 border-b border-gray-100 bg-white">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 py-1">
        <Link href="/" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
          <Home size={13} />
          <span>Home</span>
        </Link>
        <ChevronRight size={12} className="text-gray-300" />
        <Link href="/product-listing" className="hover:text-gray-900 transition-colors">
          Catalog
        </Link>
        {category && (
          <>
            <ChevronRight size={12} className="text-gray-300" />
            <Link
              href={`/${category}`}
              className="hover:text-gray-900 transition-colors capitalize font-medium"
            >
              {category}
            </Link>
          </>
        )}
        {collection && (
          <>
            <ChevronRight size={12} className="text-gray-300" />
            <span className="text-gray-900 font-semibold capitalize truncate">{collection}</span>
          </>
        )}
      </nav>

      {/* Main Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Title & Count */}
        <div className="flex items-baseline gap-2.5">
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight capitalize">
            {title}
          </h1>
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
            {count} {count === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Quick Search */}
          <div className="relative">
            {searchOpen || filters.search ? (
              <div className="flex items-center border border-gray-300 rounded-xl px-2.5 py-1.5 bg-white shadow-2xs focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 animate-in fade-in duration-150">
                <Search size={14} className="text-gray-400 mr-1.5" />
                <input
                  type="text"
                  placeholder="Filter styles..."
                  value={filters.search}
                  onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                  className="text-xs outline-hidden bg-transparent w-28 sm:w-36 text-gray-900 placeholder:text-gray-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    onFilterChange({ ...filters, search: '' });
                    setSearchOpen(false);
                  }}
                  className="text-gray-400 hover:text-gray-700 ml-1"
                >
                  <X size={13} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                title="Search Products"
                className="p-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors shadow-2xs"
              >
                <Search size={15} />
              </button>
            )}
          </div>

          {/* Desktop Grid Layout Switcher */}
          {onGridColsChange && (
            <div className="hidden lg:flex items-center border border-gray-200 rounded-xl p-0.5 bg-gray-50">
              <button
                type="button"
                onClick={() => onGridColsChange(2)}
                title="2 Columns"
                className={`p-1.5 rounded-lg transition-all ${
                  gridCols === 2 ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <Grid2X2 size={15} />
              </button>
              <button
                type="button"
                onClick={() => onGridColsChange(3)}
                title="3 Columns"
                className={`p-1.5 rounded-lg transition-all ${
                  gridCols === 3 ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <Grid3X3 size={15} />
              </button>
              <button
                type="button"
                onClick={() => onGridColsChange(4)}
                title="4 Columns"
                className={`p-1.5 rounded-lg transition-all ${
                  gridCols === 4 ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <LayoutGrid size={15} />
              </button>
            </div>
          )}

          {/* Desktop Filter Toggle */}
          <button
            type="button"
            onClick={onToggleFilters}
            className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 hover:border-gray-900 bg-white text-xs font-bold text-gray-800 transition-all shadow-2xs"
          >
            <SlidersHorizontal size={14} />
            <span>{filtersVisible ? 'Hide Filters' : 'Show Filters'}</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-gray-900 text-white text-[9px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Mobile Filter Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold shadow-xs active:scale-95 transition-transform"
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-gray-900 text-[9px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort By Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-800 hover:border-gray-900 transition-all shadow-2xs"
            >
              <span className="text-gray-400 font-normal">Sort:</span>
              <span className="truncate max-w-[110px] sm:max-w-[140px]">{activeSortLabel}</span>
              <ChevronDown
                size={14}
                className={`text-gray-500 transition-transform ${sortOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {sortOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setSortOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200/90 rounded-2xl shadow-xl z-40 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3.5 py-1.5 border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Sort Products
                  </div>
                  {sortOptionsList.map((opt) => {
                    const isSelected = filters.sortBy === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          onFilterChange({ ...filters, sortBy: opt.value });
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-gray-900 text-white font-bold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check size={13} className="text-white" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-2 animate-in fade-in duration-200">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Active:
          </span>

          {filters.search && (
            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200">
              Keyword: &ldquo;{filters.search}&rdquo;
              <button onClick={() => removeChip('search')} className="hover:text-red-600">
                <X size={12} />
              </button>
            </span>
          )}

          {filters.categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1 bg-gray-100 text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200"
            >
              {cat}
              <button onClick={() => removeChip('categories', cat)} className="hover:text-red-600">
                <X size={12} />
              </button>
            </span>
          ))}

          {filters.brands.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 bg-gray-100 text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200"
            >
              Brand: {b}
              <button onClick={() => removeChip('brands', b)} className="hover:text-red-600">
                <X size={12} />
              </button>
            </span>
          ))}

          {filters.sizes.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 bg-gray-100 text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200"
            >
              Size: {s}
              <button onClick={() => removeChip('sizes', s)} className="hover:text-red-600">
                <X size={12} />
              </button>
            </span>
          ))}

          {filters.colors.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1 bg-gray-100 text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200"
            >
              Color: {c}
              <button onClick={() => removeChip('colors', c)} className="hover:text-red-600">
                <X size={12} />
              </button>
            </span>
          ))}

          {filters.maxPrice < 10000 && (
            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200">
              Under ₹{filters.maxPrice.toLocaleString('en-IN')}
              <button onClick={() => removeChip('maxPrice')} className="hover:text-red-600">
                <X size={12} />
              </button>
            </span>
          )}

          {filters.onSaleOnly && (
            <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-red-200">
              On Sale Only
              <button onClick={() => removeChip('onSaleOnly')} className="hover:text-red-900">
                <X size={12} />
              </button>
            </span>
          )}

          {filters.inStockOnly && (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
              In Stock Only
              <button onClick={() => removeChip('inStockOnly')} className="hover:text-emerald-900">
                <X size={12} />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-bold text-red-600 hover:text-red-700 underline underline-offset-2 ml-1 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
