import React, { useId } from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { SpeciesFilter, SizeFilter } from '../types';

interface PetFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSpecies: SpeciesFilter;
  onSpeciesChange: (species: SpeciesFilter) => void;
  selectedSize: SizeFilter;
  onSizeChange: (size: SizeFilter) => void;
  onReset: () => void;
  totalResults: number;
}

export const PetFilter: React.FC<PetFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedSpecies,
  onSpeciesChange,
  selectedSize,
  onSizeChange,
  onReset,
  totalResults,
}) => {
  const searchInputId = useId();
  const sizeSelectId = useId();

  const speciesList: SpeciesFilter[] = ['Tất cả', 'Chó', 'Mèo', 'Thỏ'];
  const sizeList: SizeFilter[] = ['Tất cả', 'Nhỏ', 'Vừa', 'Lớn'];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 transition-colors">
      <div className="flex flex-col gap-4">
        {/* Hàng 1: Tìm kiếm */}
        <div className="relative">
          <label htmlFor={searchInputId} className="sr-only">
            Tìm kiếm thú cưng theo tên, giống loài hoặc tính cách
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            id={searchInputId}
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên bé, giống (vd: Golden, Poodle, Xiêm...)"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-emerald-400"
          />
        </div>

        {/* Hàng 2: Bộ lọc loài và kích cỡ */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100 dark:border-gray-800 text-sm">
          {/* Tabs loài */}
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Lọc theo loài">
            {speciesList.map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => onSpeciesChange(sp)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedSpecies === sp
                    ? 'bg-emerald-600 text-white shadow-sm dark:bg-emerald-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>

          {/* Lọc kích cỡ & Nút đặt lại */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <label htmlFor={sizeSelectId} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Kích cỡ:</span>
              </label>
              <select
                id={sizeSelectId}
                value={selectedSize}
                onChange={(e) => onSizeChange(e.target.value as SizeFilter)}
                className="rounded-lg border border-gray-200 bg-white py-1 px-2 text-xs text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                {sizeList.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {(searchTerm || selectedSpecies !== 'Tất cả' || selectedSize !== 'Tất cả') && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Đặt lại</span>
              </button>
            )}

            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              ({totalResults} kết quả)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
