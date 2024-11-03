import React, { useEffect, useRef, useState, useId } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Pet } from '../types';
import { validateEmail, formatCurrency } from '../utils';

interface AdoptionModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AdoptionModal: React.FC<AdoptionModalProps> = ({ pet, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const fullNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const experienceId = useId();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Đóng bằng phím Esc và bẫy focus (Trap Focus) theo chuẩn Accessibility Mục III.3 - 5
  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      setFullName('');
      setEmail('');
      setPhone('');
      setExperience('');
      setEmailError('');
      return;
    }

    // Tự động focus vào ô nhập đầu tiên
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Trap focus
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !pet) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Email không hợp lệ. Vui lòng nhập đúng định dạng (vd: user@example.com).');
      return;
    }
    setEmailError('');
    setIsSuccess(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-5 dark:border-gray-800">
          <div>
            <h3 id="modal-title" className="text-lg font-bold text-gray-900 dark:text-white">
              Đăng Ký Nhận Nuôi Bé {pet.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {pet.species} • {pet.breed} • Phí: {pet.fee > 0 ? formatCurrency(pet.fee) : 'Miễn phí'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ đăng ký nhận nuôi"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-5">
          {isSuccess ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                Gửi Hồ Sơ Nhận Nuôi Thành Công!
              </h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Cảm ơn bạn <span className="font-semibold text-gray-900 dark:text-white">{fullName}</span> đã mở rộng vòng tay với bé <span className="font-semibold text-emerald-600">{pet.name}</span>.
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Trạm cứu hộ <span className="font-medium text-gray-700 dark:text-gray-300">{pet.shelterName}</span> sẽ liên hệ lại qua số điện thoại <span className="font-semibold">{phone}</span> trong vòng 24 giờ.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex w-full justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                Hoàn tất & Đóng
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor={fullNameId} className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Họ và tên của bạn <span className="text-rose-500">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  id={fullNameId}
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor={emailId} className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Email liên hệ <span className="text-rose-500">*</span>
                </label>
                <input
                  id={emailId}
                  required
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="tenban@example.com"
                  className={`w-full rounded-xl border px-3 py-2 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white ${
                    emailError
                      ? 'border-rose-500 bg-rose-50/50 focus:ring-rose-500/20 dark:border-rose-500'
                      : 'border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-gray-700'
                  }`}
                />
                {emailError && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={phoneId} className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Số điện thoại <span className="text-rose-500">*</span>
                </label>
                <input
                  id={phoneId}
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912345678"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor={experienceId} className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Kinh nghiệm chăm sóc thú cưng & Điều kiện nuôi
                </label>
                <textarea
                  id={experienceId}
                  rows={3}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Chia sẻ ngắn về không gian sống (chung cư/nhà phố), bạn đã từng nuôi chó/mèo chưa..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                  Xác nhận gửi đơn
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
