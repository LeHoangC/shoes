export function formatVND(amount) {
    // amount có thể là số hoặc chuỗi số
    const num = parseFloat(amount);
    if (isNaN(num)) return "0 ₫";

    return num.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
}