'use client';
import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { TiArrowSortedDown } from 'react-icons/ti';

interface TopBarProps {
  title?: string;
  count?: number;
  onToggleFilters?: () => void;
  filtersVisible?: boolean;
  sortOptions?: string[];
  onSortChange?: (option: string) => void;
}

const TopBar = ({
  title = 'Nike Pegasus 42',
  count = 32,
  onToggleFilters,
  filtersVisible = true,
  sortOptions = ['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low'],
  onSortChange,
}: TopBarProps) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Featured');

  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    setSortOpen(false);
    onSortChange?.(option);
  };

  return (
    <div className="relative flex items-center justify-between px-6 py-4 border-gray-200 bg-white">
      {/* Left — Title + Count */}
      <h1 className="text-base font-bold text-gray-900 tracking-tight">
        {title} <span className="font-normal text-gray-500">({count})</span>
      </h1>

      {/* Right — Hide Filters + Sort By */}
      <div className="flex items-center gap-6">
        {/* Hide / Show Filters */}
        <button
          onClick={onToggleFilters}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group"
        >
          <span>{filtersVisible ? 'Hide Filters' : 'Show Filters'}</span>
          {/* Sliders icon */}
          <FaFilter />
        </button>

        {/* Divider */}
        <span className="w-px h-4 bg-gray-300" />

        {/* Sort By dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            <span>Sort By</span>
            <TiArrowSortedDown />
          </button>

          {/* Dropdown */}
          {sortOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1 overflow-hidden">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSortSelect(option)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      selectedSort === option
                        ? 'bg-gray-900 text-white font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
