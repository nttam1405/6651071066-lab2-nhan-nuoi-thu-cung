import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Share2,
} from 'lucide-react';
import { Pet } from '../types';
import rawPetsData from '../data/data.json';
import { formatCurrency } from '../utils';
import { AdoptionModal } from '../components/AdoptionModal';

const allPets: Pet[] = rawPetsData as Pet[];

interface DetailPageProps {
  favorites: string[];
  onToggleFavorite: (petId: string) => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({
  favorites,
  onToggleFavorite,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const pet = allPets.find((p) => p.id === id);

  if (!pet) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Không tìm thấy thông tin thú cưng!
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Mã thú cưng <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{id}</code> không tồn tại hoặc đã được nhận nuôi trước đó.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại trang danh sách</span>
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(pet.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Nút Điều hướng Quay lại */}
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Nút Chia sẻ */}
          <button
            type="button"
            onClick={handleShare}
            aria-label="Sao chép liên kết chia sẻ bé thú cưng"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition"
          >
            <Share2 className="h-4 w-4" />
          </button>
          {copied && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-pulse">
              Đã sao chép link!
            </span>
          )}

          {/* Nút Yêu thích */}
          <button
            type="button"
            onClick={() => onToggleFavorite(pet.id)}
            aria-label={isFavorite ? `Bỏ bé ${pet.name} khỏi danh sách yêu thích` : `Thêm bé ${pet.name} vào danh sách yêu thích`}
            className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold shadow-sm transition ${
              isFavorite
                ? 'border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-300'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{isFavorite ? 'Đã yêu thích' : 'Thêm vào yêu thích'}</span>
          </button>
        </div>
      </div>

      {/* Khung Chi Tiết Thú Cưng */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Cột Trái: Ảnh lớn sắc nét */}
          <div className="relative aspect-square sm:aspect-auto sm:h-full bg-gray-100 dark:bg-gray-800">
            <img
              src={pet.imageUrl}
              alt={`Ảnh chi tiết của bé ${pet.name}, giống loài ${pet.breed}, màu sắc và trạng thái tươi vui`}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow">
                {pet.species}
              </span>
              <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {pet.gender} • {pet.age}
              </span>
            </div>
          </div>

          {/* Cột Phải: Thông tin chi tiết */}
          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex items-start justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                  {pet.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Giống: <span className="font-semibold text-gray-700 dark:text-gray-300">{pet.breed}</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">Phí bảo trợ</span>
                <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {pet.fee > 0 ? formatCurrency(pet.fee) : 'Miễn phí'}
                </span>
              </div>
            </div>

            {/* Thông số kỹ thuật nhanh */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-center border-b border-gray-100 dark:border-gray-800">
              <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-2.5">
                <span className="block text-[11px] text-gray-500 dark:text-gray-400">Độ tuổi</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{pet.age}</span>
              </div>
              <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-2.5">
                <span className="block text-[11px] text-gray-500 dark:text-gray-400">Giới tính</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{pet.gender}</span>
              </div>
              <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-2.5">
                <span className="block text-[11px] text-gray-500 dark:text-gray-400">Kích thước</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{pet.size}</span>
              </div>
              <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-2.5">
                <span className="block text-[11px] text-gray-500 dark:text-gray-400">Triệt sản</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {pet.spayed ? 'Đã triệt sản' : 'Chưa'}
                </span>
              </div>
            </div>

            {/* Tính cách nổi bật */}
            <div className="py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Tính cách & Đặc điểm
              </h3>
              <div className="flex flex-wrap gap-2">
                {pet.personality.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    {tag}
                  </span>
                ))}
                {pet.vaccinated && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-950/70 dark:text-blue-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    Đã tiêm phòng đầy đủ
                  </span>
                )}
              </div>
            </div>

            {/* Hoàn cảnh & Mô tả câu chuyện */}
            <div className="py-4 space-y-2 border-b border-gray-100 dark:border-gray-800 text-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Câu chuyện cứu hộ
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
                {pet.description}
              </p>
              <div className="rounded-xl bg-amber-50 dark:bg-amber-950/40 p-3 text-xs text-amber-900 dark:text-amber-200">
                <strong className="font-semibold">Tình trạng y tế:</strong> {pet.healthStatus}
              </div>
            </div>

            {/* Thông tin Trạm cứu hộ */}
            <div className="py-4 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Trạm cứu hộ bảo trợ
              </h3>
              <p className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                {pet.shelterName}
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                <span>{pet.location}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                <span>Điện thoại: {pet.contactPhone}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                <span>Email: {pet.contactEmail}</span>
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-gray-400 pt-1">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span>Ngày tiếp nhận vào hệ thống: {pet.dateAdded}</span>
              </p>
            </div>

            {/* Nút Đăng ký nhận nuôi */}
            <div className="pt-4 mt-auto">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full rounded-2xl bg-emerald-600 py-3.5 px-6 text-center text-sm font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all hover:scale-[1.01]"
              >
                Đăng Ký Nhận Nuôi Bé {pet.name} Ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Đăng Ký Nhận Nuôi (Hỗ trợ ESC, Bẫy Focus, Accessibility) */}
      <AdoptionModal
        pet={pet}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
