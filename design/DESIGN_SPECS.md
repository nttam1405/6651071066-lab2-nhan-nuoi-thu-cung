# BẢN THIẾT KẾ & THÔNG SỐ GIAO DIỆN (DESIGN SPECS)
**Mã Sinh Viên:** 6651071066  
**Chủ đề (D = 8):** Nền tảng nhận nuôi thú cưng (Pet Adoption)  
**Bộ 3 tính năng bắt buộc (F = 6):** Infinite scroll · Yêu thích (localStorage) · Dark/Light mode  
**Màu chủ đạo (C = 1):** Emerald (`#059669`)

---

## 1. Bảng màu (Color Palette)
- **Primary / Accent Color (C = 1):** `#059669` (Tailwind Emerald 600)
- **Primary Hover:** `#047857` (Tailwind Emerald 700)
- **Light Theme Background:** `#F9FAFB` (Gray 50)
- **Light Theme Card:** `#FFFFFF` (White)
- **Dark Theme Background:** `#030712` (Gray 950)
- **Dark Theme Card:** `#111827` (Gray 900)
- **Yêu thích (Heart Icon):** `#E11D48` (Rose 600) / Active Fill `#F43F5E`
- **Độ tương phản (Accessibility Contrast Ratio):** Đạt chuẩn WCAG 2.1 AA (Tỷ lệ tương phản chữ `#059669` và nền trắng đạt > 4.5:1; chữ trắng trên nền `#059669` đạt 4.6:1).

---

## 2. Hệ thống Responsive (3 Breakpoints bắt buộc theo Mục III.3 - 4)
- **Mobile (< 640px):** 1 cột (`grid-cols-1`). Menu rút gọn, banner tràn viền, ảnh thú cưng tỉ lệ 4:3.
- **Tablet (640px – 1024px):** 2 cột (`sm:grid-cols-2`). Thanh tìm kiếm và bộ lọc cùng hàng.
- **Desktop (> 1024px):** 3-4 cột (`lg:grid-cols-3 xl:grid-cols-4`). Hiển thị tối đa không gian lưới card, modal bẫy focus nổi bật giữa màn hình.

---

## 3. Kiến trúc Component
- `Header`: Điều hướng Logo, Tabs "Tất cả thú cưng", Tab "Yêu thích" kèm badge số lượng, nút bật/tắt Dark/Light Mode.
- `PetFilter`: Ô tìm kiếm (Debounce 300ms theo `src/utils.ts`), chọn giống loài (Chó / Mèo / Thỏ), kích cỡ (Nhỏ / Vừa / Lớn).
- `PetCard`: Thẻ hiển thị thông tin từng bé, nút tim yêu thích (Icon button có `aria-label`), nút xem chi tiết.
- `SkeletonCard`: Hiệu ứng shimmer loading khi tính năng Infinite Scroll đang tải thêm lô thú cưng tiếp theo.
- `AdoptionModal`: Modal đăng ký nhận nuôi bẫy focus (Trap focus Tab/Shift+Tab), đóng bằng phím ESC hoặc backdrop click, validate email bằng `validateEmail`.
- `Footer`: Thông tin đề tài, thông số MSSV 6651071066 và cam kết y tế.
