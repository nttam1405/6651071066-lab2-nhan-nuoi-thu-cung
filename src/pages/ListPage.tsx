import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { PetCard } from '../components/PetCard';
import { PetFilter } from '../components/PetFilter';
import { SkeletonCard } from '../components/SkeletonCard';
import { Pet, SpeciesFilter, SizeFilter, ViewMode } from '../types';
import rawPetsData from '../data/data.json';
import { Heart, Loader2, Sparkles } from 'lucide-react';

const allPets: Pet[] = rawPetsData as Pet[];
const PAGE_SIZE = 8;

interface ListPageProps {
  favorites: string[];
  onToggleFavorite: (petId: string) => void;
  viewMode: ViewMode;
  onSetViewMode: (mode: ViewMode) => void;
}

export const ListPage: React.FC<ListPageProps> = ({
  favorites,
  onToggleFavorite,
  viewMode,
  onSetViewMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesFilter>('Tất cả');
  const [selectedSize, setSelectedSize] = useState<SizeFilter>('Tất cả');

  // Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Lọc dữ liệu theo tìm kiếm, loài, kích thước và tab Yêu thích
  const filteredPets = useMemo(() => {
    return allPets.filter((pet) => {
      // Lọc theo chế độ xem (Tất cả hay chỉ Yêu thích)
      if (viewMode === 'favorites' && !favorites.includes(pet.id)) {
        return false;
      }

      // Lọc theo từ khóa tìm kiếm (tên, giống, mô tả, tính cách)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchName = pet.name.toLowerCase().includes(query);
        const matchBreed = pet.breed.toLowerCase().includes(query);
        const matchLocation = pet.location.toLowerCase().includes(query);
        const matchPersonality = pet.personality.some((p) => p.toLowerCase().includes(query));

        if (!matchName && !matchBreed && !matchLocation && !matchPersonality) {
          return false;
        }
      }

      // Lọc theo loài
      if (selectedSpecies !== 'Tất cả' && pet.species !== selectedSpecies) {
        return false;
      }

      // Lọc theo kích cỡ
      if (selectedSize !== 'Tất cả' && pet.size !== selectedSize) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedSpecies, selectedSize, viewMode, favorites]);

  // Reset số lượng hiển thị khi đổi bộ lọc
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchTerm, selectedSpecies, selectedSize, viewMode]);

  const hasMore = visibleCount < filteredPets.length;

  // Xử lý tải thêm thú cưng (Infinite Scroll)
  const loadMorePets = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredPets.length));
      setIsLoadingMore(false);
    }, 450); // delay nhẹ tạo hiệu ứng tải mượt mà
  }, [isLoadingMore, hasMore, filteredPets.length]);

  // Cài đặt IntersectionObserver cho tính năng Infinite Scroll bắt buộc
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMorePets();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoadingMore, loadMorePets]);

  const currentDisplayPets = filteredPets.slice(0, visibleCount);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSpecies('Tất cả');
    setSelectedSize('Tất cả');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Banner Giới Thiệu Chủ Đề Nhận Nuôi Thú Cưng */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-6 sm:p-10 text-white shadow-lg mb-8">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md mb-3">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Mỗi bé cưng xứng đáng có một mái ấm yêu thương</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Kết Nối & Nhận Nuôi Thú Cưng
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-100 max-w-xl">
            Tìm kiếm người bạn bốn chân trung thành. Tất cả thú cưng đã được các trạm cứu hộ chăm sóc y tế, tiêm phòng và sẵn sàng về nhà mới.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
            <span className="rounded-lg bg-emerald-950/40 px-3 py-1.5">
              🐾 Tổng số thú cưng: <strong>{allPets.length} bé</strong>
            </span>
            <span className="rounded-lg bg-emerald-950/40 px-3 py-1.5">
              ❤️ Đã yêu thích: <strong>{favorites.length} bé</strong>
            </span>
          </div>
        </div>

        {/* Trang trí background */}
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Tabs View Mode (Tất cả / Yêu thích) */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 w-full">
          <button
            type="button"
            onClick={() => onSetViewMode('all')}
            className={`pb-2 px-3 text-sm font-semibold transition-colors border-b-2 -mb-2.5 ${
              viewMode === 'all'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Tất cả danh sách ({allPets.length})
          </button>
          <button
            type="button"
            onClick={() => onSetViewMode('favorites')}
            className={`pb-2 px-3 text-sm font-semibold transition-colors border-b-2 -mb-2.5 flex items-center gap-1.5 ${
              viewMode === 'favorites'
                ? 'border-rose-500 text-rose-600 dark:border-rose-400 dark:text-rose-400'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            <span>Đã thả tim ({favorites.length})</span>
          </button>
        </div>
      </div>

      {/* Bộ Lọc & Tìm Kiếm */}
      <div className="mb-8">
        <PetFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedSpecies={selectedSpecies}
          onSpeciesChange={setSelectedSpecies}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
          onReset={handleResetFilters}
          totalResults={filteredPets.length}
        />
      </div>

      {/* Danh Sách Thú Cưng (Responsive chuẩn: mobile 1 cột, tablet 2 cột, desktop 3-4 cột) */}
      {filteredPets.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 mb-3">
            <Heart className="h-8 w-8" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            {viewMode === 'favorites'
              ? 'Bạn chưa lưu bé thú cưng nào vào danh sách yêu thích'
              : 'Không tìm thấy thú cưng phù hợp'}
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            {viewMode === 'favorites'
              ? 'Hãy dạo một vòng và bấm vào biểu tượng trái tim để lưu lại những người bạn bạn ưng ý nhất nhé!'
              : 'Hãy thử tìm kiếm với từ khóa khác hoặc bấm nút đặt lại bộ lọc bên trên.'}
          </p>
          {viewMode === 'favorites' ? (
            <button
              type="button"
              onClick={() => onSetViewMode('all')}
              className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-emerald-700 transition"
            >
              Xem tất cả thú cưng
            </button>
          ) : (
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 rounded-xl bg-gray-100 dark:bg-gray-800 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition"
            >
              Xóa bộ lọc tìm kiếm
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentDisplayPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                isFavorite={favorites.includes(pet.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}

            {/* Skeleton Loading hiển thị khi Infinite Scroll đang tải thêm */}
            {isLoadingMore && (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}
          </div>

          {/* Phần tử Sentinel để IntersectionObserver kích hoạt Infinite Scroll */}
          <div ref={observerTarget} className="mt-8 flex flex-col items-center justify-center py-4">
            {hasMore ? (
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={loadMorePets}
                  disabled={isLoadingMore}
                  className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                      <span>Đang tải thêm thú cưng...</span>
                    </>
                  ) : (
                    <span>Cuộn xuống hoặc bấm để tải thêm</span>
                  )}
                </button>
                <span className="text-[11px] text-gray-400">
                  (Đã hiển thị {currentDisplayPets.length} / {filteredPets.length} thú cưng - Infinite Scroll)
                </span>
              </div>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-2">
                🎉 Đã hiển thị toàn bộ {filteredPets.length} thú cưng sẵn sàng nhận nuôi!
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
