import React from 'react';
import { Heart, ShieldCheck, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 transition-colors duration-200 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
              <span className="text-[#059669] dark:text-emerald-400">PetAdopt</span>
              <span>- Nền Tảng Nhận Nuôi Thú Cưng</span>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Dự án thực hành Thiết Kế Web - Buổi 2. Xây dựng nền tảng kết nối những người yêu động vật với các trạm cứu hộ uy tín.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Thông tin sinh viên</h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li><strong className="text-gray-700 dark:text-gray-300">MSSV:</strong> 6651071066</li>
              <li><strong className="text-gray-700 dark:text-gray-300">Chủ đề (D=8):</strong> Nhận nuôi thú cưng</li>
              <li><strong className="text-gray-700 dark:text-gray-300">Bộ 3 tính năng (F=6):</strong> Infinite Scroll, Yêu thích, Dark/Light Mode</li>
              <li><strong className="text-gray-700 dark:text-gray-300">Màu chủ đạo (C=1):</strong> Emerald (#059669)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cam kết trạm cứu hộ</h4>
            <div className="space-y-2 text-gray-600 dark:text-gray-400 text-xs">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>100% thú cưng được khám sức khỏe và tiêm ngừa</span>
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Mạng lưới hỗ trợ tại Hà Nội, Đà Nẵng, TP.HCM</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Hỗ trợ tư vấn chăm sóc trọn đời</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <p>© 2024 PetAdopt. Bài thực hành Lab 2 - MSSV 6651071066.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Được phát triển với <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> bằng React 18, Vite & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
