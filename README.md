# RoomRent / Home — Nền tảng Cho thuê Nhà, Căn hộ & Villa

Nền tảng kết nối trực tiếp Người cho thuê (Landlord) và Người thuê (Renter) với đầy đủ tính năng: Đăng tin theo Wizard, Tìm kiếm & Lọc đa chiều, Slideshow ảnh cảm ứng trên Mobile, Đặt lịch xem phòng, Chat trực tiếp 1-1, Hợp đồng số và Admin Panel quản trị.

---

## 🌟 Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System, Flexbox/Grid, Responsive Media Queries), Vanilla JavaScript (ES6 Modules, Touch/Swipe gesture cho Slideshow).
- **Backend**: Node.js, Express.js (REST API, Pre-rendering SEO, Socket.io Realtime Chat).
- **Architecture**: Phân tầng chuẩn (Controllers, Services, Models/Store, Routes, Middleware).
- **Localization**: Đa ngôn ngữ (Tiếng Việt / English), Đa tiền tệ (VND / USD).

---

## 🚀 Cấu trúc Thư mục

```
website/
├── docs/
│   ├── rental-prd-v1.md         # Tài liệu PRD đặc tả chi tiết
│   └── architecture.md          # Sơ đồ kiến trúc & luồng dữ liệu
├── server/
│   ├── config/                  # Cấu hình hệ thống & hằng số
│   ├── data/                    # Database store & Mock seed data
│   ├── controllers/             # Bộ điều khiển nghiệp vụ (Auth, Property, Booking, Chat, Contract, Admin)
│   ├── middleware/              # Auth JWT & validation middleware
│   ├── routes/                  # API endpoints
│   ├── services/                # Business logic
│   └── server.js                # Express & Socket.io server entry point
├── public/
│   ├── css/                     # Toàn bộ CSS thuần (base, components, slideshow, pages, responsive)
│   ├── js/                      # JS Modules (api, auth, slideshow, filter, wizard, booking, chat, contract, admin)
│   ├── index.html               # Trang chủ (Hero Slideshow, Luxury badge, Villa tags)
│   ├── search.html              # Trang tìm kiếm & bộ lọc đa năng + Bản đồ
│   ├── detail.html              # Trang chi tiết phòng + Slideshow ảnh đa điểm chạm
│   ├── post-property.html       # Wizard 8 bước đăng tin cho thuê
│   ├── booking.html             # Quản lý lịch xem phòng
│   ├── chat.html                # Chat trực tiếp 1-1 kèm thẻ bất động sản
│   ├── contract.html            # Hợp đồng thuê điện tử
│   ├── pricing.html             # Bảng giá gói đăng tin & đẩy tin
│   ├── dashboard.html           # Dashboard quản lý dành cho Chủ nhà & Người thuê
│   ├── admin.html               # Admin Panel duyệt tin & thống kê
│   └── login.html               # Đăng nhập & Đăng ký phân quyền
└── package.json
```

---

## 🛠️ Hướng dẫn Chạy Dự án

```bash
# 1. Cài đặt dependencies
npm install

# 2. Khởi chạy máy chủ phát triển
npm run dev

# 3. Mở trình duyệt tại:
# http://localhost:3000
```

---

## 🔑 Tài khoản Mẫu để Test

| Vai trò | Email | Mật khẩu | Mô tả |
|---|---|---|---|
| **Admin** | `admin@roomrent.vn` | `admin123` | Quản trị hệ thống, duyệt bài, xem doanh thu |
| **Chủ nhà (Landlord)** | `landlord@roomrent.vn` | `landlord123` | Đăng tin, quản lý lịch hẹn, chat, ký hợp đồng |
| **Người thuê (Renter)** | `renter@roomrent.vn` | `renter123` | Tìm phòng, đặt lịch xem phòng, chat, xem hợp đồng |

---

## 📄 Bản quyền & Đóng góp
Repository: [BiM1406/Home](https://github.com/BiM1406/Home)
Giấy phép: MIT License
