# Google Analytics Setup Guide

## 🎯 Cách cài đặt Google Analytics

### Bước 1: Tạo Google Analytics Account

1. Truy cập [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Điền thông tin:
   - **Property name**: SOLE Sneaker Store
   - **Reporting timezone**: Vietnam (UTC+7)
   - **Currency**: VND (Vietnamese Dong)

### Bước 2: Tạo Web Stream

1. Chọn platform: **Web**
2. Điền thông tin website:
   - **Website URL**: https://tmdt-9evc.vercel.app
   - **Stream name**: SOLE Website
3. Click **Create stream**

### Bước 3: Lấy Measurement ID

1. Sau khi tạo stream, bạn sẽ thấy **Measurement ID**
2. Format: `G-XXXXXXXXXX`
3. Copy ID này

### Bước 4: Thêm vào .env.local

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://tmdt-9evc.vercel.app/
```

Thay `G-XXXXXXXXXX` bằng Measurement ID của bạn.

### Bước 5: Xác nhận Setup

1. Deploy website hoặc run locally: `npm run dev`
2. Truy cập https://tmdt-9evc.vercel.app
3. Vào Google Analytics > Real-time
4. Bạn sẽ thấy traffic hiện tại

## ✅ Những gì được track:

- 📊 Page views
- 👥 Users
- ⏱️ Session duration
- 🔗 Outbound links
- 🛒 E-commerce events (nếu cấu hình thêm)
- 📱 Device info
- 🌍 Geographic data

## 🎯 Các metric quan trọng:

| Metric | Ý nghĩa |
|--------|---------|
| **Users** | Số lượng khách truy cập |
| **Sessions** | Phiên làm việc của khách |
| **Page views** | Số lượt xem trang |
| **Bounce rate** | % người rời sau 1 trang |
| **Avg. session duration** | Thời gian trung bình truy cập |

## 📈 Tracking Events (Optional)

Bạn có thể thêm event tracking cho:

- Nhấp nút "Mua ngay"
- Thêm vào giỏ hàng
- Xem chi tiết sản phẩm
- Đăng ký newsletter
- etc.

## 🔗 Liên kết hữu ích:

- [Google Analytics Dashboard](https://analytics.google.com/)
- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Measurement ID Help](https://support.google.com/analytics/answer/9539674)

---

Sau khi setup, Google Analytics sẽ bắt đầu tracking ngay lập tức! 🚀
