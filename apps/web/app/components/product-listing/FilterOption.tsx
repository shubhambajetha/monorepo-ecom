'use client';
import { useState, Dispatch, SetStateAction, ReactNode } from 'react';
import { IoFilter } from 'react-icons/io5';

interface Category {
  label: string;
  count: number;
}

interface Theme {
  label: string;
  count: number;
}

interface Color {
  name: string;
  hex: string;
}

interface FilterData {
  categories: Category[];
  themes: Theme[];
  sizes: string[];
  colors: Color[];
  fitType: string[];
}

const filterData: FilterData = {
  categories: [
    { label: 'Cotton Linen Shirts', count: 8 },
    { label: 'Denim Jackets', count: 1 },
    { label: 'Denim Shirts', count: 1 },
    { label: 'Fanny Pack', count: 1 },
    { label: 'Holiday Shirts', count: 2 },
    { label: 'Korean Joggers', count: 1 },
    { label: 'Men Jeans', count: 7 },
    { label: 'Men Low Top Sneakers', count: 5 },
    { label: 'Men Mid Top Sneakers', count: 1 },
    { label: 'Men Oversized Hoodies', count: 1 },
  ],
  themes: [
    { label: 'Marvel™', count: 1 },
    { label: 'Mickey Mouse™', count: 1 },
    { label: 'Pink Panther', count: 1 },
    { label: 'Stranger Things', count: 1 },
    { label: 'The Souled Store', count: 87 },
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
  colors: [
    { name: 'Black', hex: '#1a1a1a' },
    { name: 'White', hex: '#f5f5f5' },
    { name: 'Navy', hex: '#1e3a5f' },
    { name: 'Sage', hex: '#8fae88' },
    { name: 'Sand', hex: '#c4a882' },
    { name: 'Olive', hex: '#6b7c3a' },
    { name: 'Red', hex: '#c0392b' },
    { name: 'Blue', hex: '#2980b9' },
  ],
  fitType: ['Regular Fit', 'Relaxed Fit', 'Oversized Fit', 'Slim Fit'],
};

interface CheckboxItemProps {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}

function CheckboxItem({ label, count, checked, onChange }: CheckboxItemProps) {
  return (
    <label className="flex items-center justify-between group cursor-pointer py-1.5 px-1 rounded-md hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-2.5">
        <div
          onClick={onChange}
          className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-150 flex-shrink-0 ${
            checked ? 'bg-gray-900 border-gray-900' : 'border-gray-300 group-hover:border-gray-500'
          }`}
        >
          {checked && (
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        <span
          className={`text-sm transition-colors ${
            checked ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-800'
          }`}
        >
          {label}
        </span>
      </div>

      {count !== undefined && <span className="text-xs text-gray-400 font-light">{count}</span>}
    </label>
  );
}

interface FilterSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 text-left group"
      >
        <span className="text-xs font-bold tracking-widest uppercase text-gray-800 group-hover:text-gray-500 transition-colors">
          {title}
        </span>

        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[400px] pb-3' : 'max-h-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function FilterOption() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(5000);
  const [searchCat, setSearchCat] = useState<string>('');

  const toggle = (arr: string[], setArr: Dispatch<SetStateAction<string[]>>, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const totalFilters =
    selectedCategories.length +
    selectedThemes.length +
    selectedSizes.length +
    selectedColors.length +
    selectedFits.length +
    (price < 5000 ? 1 : 0);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedThemes([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedFits([]);
    setPrice(5000);
  };

  const filteredCats = filterData.categories.filter((c) =>
    c.label.toLowerCase().includes(searchCat.toLowerCase())
  );

  const visibleCats = showMore ? filteredCats : filteredCats.slice(0, 6);
  return (
    <div className="min-h-screen flex items-start justify-center">
      <aside className="w-70 bg-white rounded-md p-4 max-h-screen overflow-y-auto sticky top-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <IoFilter />
            <span className="text-sm font-bold tracking-widest uppercase text-gray-800">
              Filters
            </span>
            {totalFilters > 0 && (
              <span className="bg-gray-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalFilters}
              </span>
            )}
          </div>
          {totalFilters > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-gray-700 font-medium underline underline-offset-2 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Active chips */}
        {totalFilters > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {[...selectedCategories, ...selectedThemes, ...selectedSizes, ...selectedFits].map(
              (f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-[11px] font-medium px-2 py-1 rounded-full"
                >
                  {f}
                  <button
                    onClick={() => {
                      toggle(selectedCategories, setSelectedCategories, f);
                      toggle(selectedThemes, setSelectedThemes, f);
                      toggle(selectedSizes, setSelectedSizes, f);
                      toggle(selectedFits, setSelectedFits, f);
                    }}
                    className="hover:text-gray-900 leading-none"
                  >
                    ×
                  </button>
                </span>
              )
            )}
            {selectedColors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-[11px] font-medium px-2 py-1 rounded-full"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block border border-gray-200"
                  style={{ background: filterData.colors.find((col) => col.name === c)?.hex }}
                />
                {c}
                <button
                  onClick={() => toggle(selectedColors, setSelectedColors, c)}
                  className="hover:text-gray-900 leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* CATEGORIES */}
        <FilterSection title="Categories">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Search for Categories"
              value={searchCat}
              onChange={(e) => setSearchCat(e.target.value)}
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-gray-400 bg-gray-50 placeholder:text-gray-400 transition-colors"
            />
          </div>
          <div className="space-y-0.5">
            {visibleCats.map((cat) => (
              <CheckboxItem
                key={cat.label}
                label={cat.label}
                count={cat.count}
                checked={selectedCategories.includes(cat.label)}
                onChange={() => toggle(selectedCategories, setSelectedCategories, cat.label)}
              />
            ))}
          </div>
          {filteredCats.length > 6 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-2 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              {showMore ? '− Show less' : `+ ${filteredCats.length - 6} more`}
            </button>
          )}
        </FilterSection>

        {/* THEMES */}
        <FilterSection title="Themes">
          <div className="space-y-0.5">
            {filterData.themes.map((t) => (
              <CheckboxItem
                key={t.label}
                label={t.label}
                count={t.count}
                checked={selectedThemes.includes(t.label)}
                onChange={() => toggle(selectedThemes, setSelectedThemes, t.label)}
              />
            ))}
          </div>
        </FilterSection>

        {/* SIZE */}
        <FilterSection title="Size">
          <div className="flex flex-wrap gap-2 pt-1">
            {filterData.sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggle(selectedSizes, setSelectedSizes, size)}
                className={`w-10 h-10 rounded-xl text-xs font-semibold border-2 transition-all duration-150 hover:scale-105 ${
                  selectedSizes.includes(size)
                    ? 'bg-gray-900 border-gray-900 text-white shadow-sm'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* COLORS */}
        <FilterSection title="Color">
          <div className="flex flex-wrap gap-2.5 pt-1">
            {filterData.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggle(selectedColors, setSelectedColors, color.name)}
                title={color.name}
                className={`w-8 h-8 rounded-full transition-all duration-150 hover:scale-110 border-2 ${
                  selectedColors.includes(color.name)
                    ? 'border-gray-700 scale-110 shadow-md'
                    : 'border-transparent hover:border-gray-300'
                }`}
                style={{
                  background: color.hex,
                  boxShadow: color.hex === '#f5f5f5' ? '0 0 0 1px #ddd' : undefined,
                }}
              />
            ))}
          </div>
          {selectedColors.length > 0 && (
            <p className="text-[11px] text-gray-400 mt-2">Selected: {selectedColors.join(', ')}</p>
          )}
        </FilterSection>

        <FilterSection title="Price">
          <div className="px-1 pt-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">₹0</span>
              <span className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-lg">
                ₹{price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">₹5,000</span>
            </div>
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-1.5 rounded-full cursor-pointer accent-gray-900"
              style={{
                background: `linear-gradient(to right, #111 ${(price / 5000) * 100}%, #e5e7eb ${(price / 5000) * 100}%)`,
              }}
            />
          </div>
        </FilterSection>

        {/* FIT TYPE */}
        <FilterSection title="Fit Type" defaultOpen={false}>
          <div className="space-y-0.5">
            {filterData.fitType.map((fit) => (
              <CheckboxItem
                key={fit}
                label={fit}
                checked={selectedFits.includes(fit)}
                onChange={() => toggle(selectedFits, setSelectedFits, fit)}
              />
            ))}
          </div>
        </FilterSection>
      </aside>
    </div>
  );
}
