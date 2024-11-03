import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { Pet } from '../types';
import { formatCurrency, truncateText } from '../utils';

interface PetCardProps {
  pet: Pet;
  isFavorite: boolean;
  onToggleFavorite: (petId: string) => void;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      {/* Khung ảnh và nút yêu thích */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={pet.imageUrl}
          alt={`Hình ảnh của bé ${pet.name}, giống ${pet.breed}, ${pet.age}`}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Nút Yêu thích (Icon button có aria-label theo chuẩn Accessibility) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(pet.id);
          }}
          aria-label={isFavorite ? `Bỏ bé ${pet.name} khỏi danh sách yêu thích` : `Thêm bé ${pet.name} vào danh sách yêu thích`}
          className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all hover:scale-110 dark:bg-gray-900/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite
                ? 'fill-rose-500 text-rose-500'
                : 'text-gray-600 hover:text-rose-500 dark:text-gray-300'
            }`}
          />
        </button>

        {/* Tag loài và giới tính */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center rounded-full bg-emerald-600/90 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
            {pet.species}
          </span>
          <span className="inline-flex items-center rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            {pet.gender} • {pet.age}
          </span>
        </div>
      </div>

      {/* Thông tin thú cưng */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {pet.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{pet.breed}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 dark:text-gray-400 block">Phí nhận nuôi</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {pet.fee > 0 ? formatCurrency(pet.fee) : 'Miễn phí'}
            </span>
          </div>
        </div>

        {/* Tóm tắt tính cách */}
        <p className="mt-3 text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
          {truncateText(pet.description, 95)}
        </p>

        {/* Tags tính cách */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {pet.personality.slice(0, 2).map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <Sparkles className="h-3 w-3 text-amber-500" />
              {item}
            </span>
          ))}
          {pet.vaccinated && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              Đã tiêm
            </span>
          )}
        </div>

        {/* Địa điểm & nút Chi tiết */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs mt-auto">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 truncate max-w-[160px]">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <span className="truncate">{pet.location}</span>
          </div>

          <Link
            to={`/item/${pet.id}`}
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};
