import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Moon, Sun, PawPrint } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  favoritesCount: number;
  currentTab: 'all' | 'favorites';
  onSelectTab: (tab: 'all' | 'favorites') => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onToggleDarkMode,
  favoritesCount,
  currentTab,
  onSelectTab,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95 transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo và Thông tin đề tài */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            onClick={() => onSelectTab('all')}
            className="flex items-center gap-2 group text-brand-600 dark:text-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 group-hover:scale-105 transition-transform">
              <PawPrint className="h-6 w-6 text-[#059669]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Pet<span className="text-[#059669] dark:text-emerald-400">Adopt</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                MSSV: 6651071066
              </span>
            </div>
          </Link>
        </div>

        {/* Thanh điều hướng và nút chức năng */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            onClick={() => onSelectTab('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'all'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
            }`}
          >
            Tất cả thú cưng
          </Link>

          {/* Nút Tab Yêu thích */}
          <Link
            to="/"
            onClick={() => onSelectTab('favorites')}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'favorites'
                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
            }`}
          >
            <Heart className={`h-4 w-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>Yêu thích</span>
            {favoritesCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-rose-600 rounded-full">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Toggle Dark / Light mode */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={isDarkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
