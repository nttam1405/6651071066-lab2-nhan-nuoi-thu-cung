/**
 * Các hàm tiện ích bắt buộc theo yêu cầu đề bài
 * MSSV: 6651071066
 */

/**
 * Định dạng số tiền sang chuỗi có dấu phân cách hàng nghìn và ký hiệu tiền tệ
 */
export function formatCurrency(amount: number, currency: string = 'VND'): string {
  const parts = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  if (currency === 'VND' || currency === '₫') {
    return `${parts} ₫`;
  }
  return `${parts} ${currency}`;
}

/**
 * Cắt ngắn văn bản nếu vượt quá độ dài tối đa và thêm dấu ba chấm '...'
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

/**
 * Kiểm tra địa chỉ email có hợp lệ không
 */
export function validateEmail(email: string): boolean {
  // Regex kiểm tra email có định dạng name@domain.tld
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

/**
 * Trì hoãn việc gọi hàm sau một khoảng thời gian delay
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: unknown, ...args: Parameters<T>) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };

  return debounced as unknown as T;
}
