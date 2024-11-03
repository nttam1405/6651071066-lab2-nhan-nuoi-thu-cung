import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 animate-pulse">
      <div className="h-52 w-full rounded-xl bg-gray-200 dark:bg-gray-800 mb-4" />
      <div className="h-6 w-2/3 rounded bg-gray-200 dark:bg-gray-800 mb-2" />
      <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800 mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
        <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-8 w-20 rounded-lg bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
};
