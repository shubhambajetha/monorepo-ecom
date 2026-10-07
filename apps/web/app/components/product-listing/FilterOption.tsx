'use client';

import React, { useState, ReactNode } from 'react';
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Search,
  Check,
  Tag,
  Sparkles,
  DollarSign,
  Layers,
  Palette,
  Ruler,
} from 'lucide-react';

export interface FilterState {
  categories: string[];
  collections: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  search: string;
  sortBy: string;
}

export interface AvailableFilterOptions {
  categories?: { label: string; count?: number }[];
  collections?: { label: string; count?: number }[];
  brands?: { label: string; count?: number }[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  maxPriceLimit?: number;
}

interface FilterOptionProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onClearAll: () => void;
  options?: AvailableFilterOptions;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
  totalProductsCount?: number;
}

const defaultColors = [
  { name: 'Black', hex: '#111111' },
  { name: 'White', hex: '#f9f9f9' },
  { name: 'Navy', hex: '#1e3a8a' },
  { name: 'Sage', hex: '#6b8e23' },
  { name: 'Olive', hex: '#556b2f' },
  { name: 'Sand', hex: '#d2b48c' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Grey', hex: '#6b7280' },
  { name: 'Orange', hex: '#ea580c' },
];

const defaultSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

const defaultCategories = [
  { label: 'Oversized T-Shirts', count: 18 },
  { label: 'Classic Cotton Shirts', count: 12 },
  { label: 'Heavyweight Hoodies', count: 9 },
  { label: 'Casual Denim Jackets', count: 6 },
  { label: 'Relaxed Fit Jeans', count: 14 },
  { label: 'Cargo Pants & Joggers', count: 8 },
  { label: 'Resort Summer Shirts', count: 7 },
  { label: 'Sweatshirts & Knits', count: 10 },
];

const defaultBrands = [
  { label: 'The Souled Store', count: 32 },
  { label: 'Urban Classic', count: 18 },
  { label: 'Luxe Basics', count: 15 },
  { label: 'Artisan Fit', count: 11 },
  { label: 'Nike', count: 8 },
  { label: 'Adidas Originals', count: 6 },
];

function FilterAccordion({
  title,
  icon,
  children,
  defaultOpen = true,
  badgeCount = 0,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  badgeCount?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100/90 py-3 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-1 text-left group cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-xs font-bold tracking-wider uppercase text-gray-900 group-hover:text-gray-600 transition-colors">
            {title}
          </span>
          {badgeCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-gray-900 text-white text-[9px] font-bold flex items-center justify-center">
              {badgeCount}
            </span>
          )}
        </div>

        <ChevronDown
          size={15}
          className={`text-gray-400 group-hover:text-gray-900 transition-transform duration-200 ${
            open ? 'rotate-180 text-gray-900' : 'rotate-0'
          }`}
        />
      </button>

      {open && <div className="pt-3 pb-1 animate-in fade-in duration-200">{children}</div>}
    </div>
  );
}

export default function FilterOption({
  filters,
  onFilterChange,
  onClearAll,
  options,
  isMobileDrawer = false,
  onCloseMobileDrawer,
  totalProductsCount,
}: FilterOptionProps) {
  const [searchCategoryQuery, setSearchCategoryQuery] = useState('');
  const [searchBrandQuery, setSearchBrandQuery] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const categories = options?.categories?.length ? options.categories : defaultCategories;
  const brands = options?.brands?.length ? options.brands : defaultBrands;
  const sizes = options?.sizes?.length ? options.sizes : defaultSizes;
  const colors = options?.colors?.length ? options.colors : defaultColors;
  const maxLimit = options?.maxPriceLimit || 10000;

  // Toggle helper
  const toggleArrayItem = (key: 'categories' | 'brands' | 'sizes' | 'colors', item: string) => {
    const list = filters[key];
    const exists = list.includes(item);
    const updated = exists ? list.filter((i) => i !== item) : [...list, item];
    onFilterChange({
      ...filters,
      [key]: updated,
    });
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.maxPrice < maxLimit ? 1 : 0) +
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0) +
    (filters.search ? 1 : 0);

  const filteredCategories = categories.filter((c) =>
    c.label.toLowerCase().includes(searchCategoryQuery.toLowerCase())
  );
  const visibleCategories = showAllCategories
    ? filteredCategories
    : filteredCategories.slice(0, 6);

  const filteredBrands = brands.filter((b) =>
    b.label.toLowerCase().includes(searchBrandQuery.toLowerCase())
  );
  const visibleBrands = showAllBrands ? filteredBrands : filteredBrands.slice(0, 5);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gray-900 text-white flex items-center justify-center shadow-xs">
            <SlidersHorizontal size={14} />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 leading-none">
              Filters
            </h3>
            {totalProductsCount !== undefined && (
              <span className="text-[10px] text-gray-400 font-medium mt-0.5 block">
                {totalProductsCount} Products Found
              </span>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <span className="bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-semibold text-red-600 hover:text-red-700 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Clear All
            </button>
          )}

          {isMobileDrawer && onCloseMobileDrawer && (
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:text-black flex items-center justify-center"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="divide-y divide-gray-100">
        {/* AVAILABILITY / SALE QUICK TOGGLES */}
        <div className="py-3 space-y-2">
          <label className="flex items-center justify-between py-1 px-1 rounded-lg hover:bg-gray-50/80 cursor-pointer transition-colors">
            <span className="text-xs font-semibold text-gray-800">On Sale / Discounts</span>
            <input
              type="checkbox"
              checked={filters.onSaleOnly}
              onChange={(e) =>
                onFilterChange({ ...filters, onSaleOnly: e.target.checked })
              }
              className="w-4 h-4 rounded text-gray-900 focus:ring-gray-900 border-gray-300 cursor-pointer accent-gray-900"
            />
          </label>

          <label className="flex items-center justify-between py-1 px-1 rounded-lg hover:bg-gray-50/80 cursor-pointer transition-colors">
            <span className="text-xs font-semibold text-gray-800">In Stock Only</span>
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) =>
                onFilterChange({ ...filters, inStockOnly: e.target.checked })
              }
              className="w-4 h-4 rounded text-gray-900 focus:ring-gray-900 border-gray-300 cursor-pointer accent-gray-900"
            />
          </label>
        </div>

        {/* PRICE RANGE */}
        <FilterAccordion
          title="Price Range"
          icon={<DollarSign size={14} className="text-emerald-600" />}
          badgeCount={filters.maxPrice < maxLimit || filters.minPrice > 0 ? 1 : 0}
        >
          <div className="space-y-3 px-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-lg">
                ₹{filters.minPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-gray-400 font-medium">to</span>
              <span className="font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-lg">
                ₹{filters.maxPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={maxLimit}
              step={100}
              value={filters.maxPrice}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  maxPrice: Number(e.target.value),
                })
              }
              className="w-full h-1.5 rounded-full cursor-pointer accent-gray-900"
              style={{
                background: `linear-gradient(to right, #111111 ${
                  (filters.maxPrice / maxLimit) * 100
                }%, #e5e7eb ${(filters.maxPrice / maxLimit) * 100}%)`,
              }}
            />

            <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
              <span>₹0</span>
              <span>₹{maxLimit.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </FilterAccordion>

        {/* CATEGORIES */}
        <FilterAccordion
          title="Categories"
          icon={<Layers size={14} className="text-indigo-600" />}
          badgeCount={filters.categories.length}
        >
          <div className="space-y-2">
            {categories.length > 5 && (
              <div className="relative mb-2">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchCategoryQuery}
                  onChange={(e) => setSearchCategoryQuery(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-hidden focus:border-gray-900 transition-all placeholder:text-gray-400"
                />
              </div>
            )}

            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {visibleCategories.map((cat) => {
                const checked = filters.categories.includes(cat.label);
                return (
                  <label
                    key={cat.label}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleArrayItem('categories', cat.label)}
                        className="w-3.5 h-3.5 rounded text-gray-900 focus:ring-gray-900 border-gray-300 cursor-pointer accent-gray-900 flex-shrink-0"
                      />
                      <span
                        className={`text-xs truncate ${
                          checked
                            ? 'text-gray-900 font-bold'
                            : 'text-gray-700 group-hover:text-gray-900 font-medium'
                        }`}
                      >
                        {cat.label}
                      </span>
                    </div>
                    {cat.count !== undefined && (
                      <span className="text-[10px] text-gray-400 font-mono flex-shrink-0 ml-1">
                        {cat.count}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>

            {filteredCategories.length > 6 && (
              <button
                type="button"
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="text-xs font-bold text-gray-600 hover:text-black pt-1 transition-colors block"
              >
                {showAllCategories
                  ? '− Show less'
                  : `+ ${filteredCategories.length - 6} more`}
              </button>
            )}
          </div>
        </FilterAccordion>

        {/* BRANDS */}
        <FilterAccordion
          title="Brands"
          icon={<Tag size={14} className="text-amber-600" />}
          badgeCount={filters.brands.length}
        >
          <div className="space-y-2">
            {brands.length > 5 && (
              <div className="relative mb-2">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchBrandQuery}
                  onChange={(e) => setSearchBrandQuery(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-hidden focus:border-gray-900 transition-all placeholder:text-gray-400"
                />
              </div>
            )}

            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {visibleBrands.map((b) => {
                const checked = filters.brands.includes(b.label);
                return (
                  <label
                    key={b.label}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleArrayItem('brands', b.label)}
                        className="w-3.5 h-3.5 rounded text-gray-900 focus:ring-gray-900 border-gray-300 cursor-pointer accent-gray-900 flex-shrink-0"
                      />
                      <span
                        className={`text-xs truncate ${
                          checked
                            ? 'text-gray-900 font-bold'
                            : 'text-gray-700 group-hover:text-gray-900 font-medium'
                        }`}
                      >
                        {b.label}
                      </span>
                    </div>
                    {b.count !== undefined && (
                      <span className="text-[10px] text-gray-400 font-mono flex-shrink-0 ml-1">
                        {b.count}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>

            {filteredBrands.length > 5 && (
              <button
                type="button"
                onClick={() => setShowAllBrands(!showAllBrands)}
                className="text-xs font-bold text-gray-600 hover:text-black pt-1 transition-colors block"
              >
                {showAllBrands ? '− Show less' : `+ ${filteredBrands.length - 5} more`}
              </button>
            )}
          </div>
        </FilterAccordion>

        {/* SIZES */}
        <FilterAccordion
          title="Sizes"
          icon={<Ruler size={14} className="text-purple-600" />}
          badgeCount={filters.sizes.length}
        >
          <div className="flex flex-wrap gap-2 pt-1">
            {sizes.map((size) => {
              const active = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleArrayItem('sizes', size)}
                  className={`min-w-[42px] h-9 px-2 rounded-xl text-xs font-bold border transition-all duration-150 flex items-center justify-center ${
                    active
                      ? 'bg-gray-900 border-gray-900 text-white shadow-xs scale-105'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-900 hover:text-black'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </FilterAccordion>

        {/* COLORS */}
        <FilterAccordion
          title="Colors"
          icon={<Palette size={14} className="text-rose-600" />}
          badgeCount={filters.colors.length}
        >
          <div className="flex flex-wrap gap-2.5 pt-1">
            {colors.map((color) => {
              const active = filters.colors.includes(color.name);
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => toggleArrayItem('colors', color.name)}
                  title={color.name}
                  className={`relative w-8 h-8 rounded-full border-2 transition-all duration-150 hover:scale-110 flex items-center justify-center shadow-2xs ${
                    active
                      ? 'border-gray-900 ring-2 ring-gray-900/30 scale-110'
                      : 'border-gray-200/80 hover:border-gray-400'
                  }`}
                  style={{
                    backgroundColor: color.hex,
                  }}
                >
                  {active && (
                    <Check
                      size={13}
                      className={
                        color.hex === '#f9f9f9' || color.hex === '#ffffff'
                          ? 'text-gray-900 font-extrabold'
                          : 'text-white font-extrabold'
                      }
                    />
                  )}
                </button>
              );
            })}
          </div>
          {filters.colors.length > 0 && (
            <p className="text-[11px] text-gray-500 mt-2 font-medium">
              Selected: <strong className="text-gray-900">{filters.colors.join(', ')}</strong>
            </p>
          )}
        </FilterAccordion>
      </div>

      {/* Mobile Sticky Apply Bar */}
      {isMobileDrawer && onCloseMobileDrawer && (
        <div className="pt-4 mt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="w-full py-3 rounded-xl bg-gray-900 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-black transition-colors"
          >
            Apply Filters {totalProductsCount !== undefined ? `(${totalProductsCount})` : ''}
          </button>
        </div>
      )}
    </div>
  );
}
