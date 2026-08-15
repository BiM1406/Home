# RoomRent - Nền Tảng Cho Thuê Nhà & Căn Hộ

Nền tảng kết nối trực tiếp giữa Chủ nhà và Khách thuê (không trung gian môi giới), xây dựng theo kiến trúc **Vanilla SPA (Single Page Application)** thuần HTML, CSS & JavaScript ES6 Modules.

---

## 🚀 Cách Chạy Dự Án

Dự án là **100% Client-Side Pure Vanilla JS**, không yêu cầu cài đặt `node_modules` hay chạy lệnh build:

1. Mở thư mục dự án trong **VS Code**.
2. Chuột phải vào file [`index.html`](file:///e:/workspace/website/ChoThueNha/index.html) và chọn **Open with Live Server**.
3. Website sẽ chạy tại `http://127.0.0.1:5500` (hoặc cổng Live Server tương ứng).

---

## 📁 Cấu Trúc Thư Mục Dự Án

```text
ChoThueNha/
├── index.html                  # Khung SPA Shell duy nhất
│
├── css/                        # Hệ thống CSS Design System
│   ├── base.css                # CSS Variables, Reset & Typography
│   ├── layout.css              # Header, Navbar, Footer, Transition
│   ├── components.css          # Buttons, Cards, Badges, Modals, Forms
│   └── responsive.css          # Tối ưu Mobile & Tablet
│
├── js/                         # JavaScript ES6 Modules
│   ├── app.js                  # Entry point chính
│   ├── router.js               # SPA Hash Router điều hướng không reload
│   ├── services/               # Store & Auth service
│   ├── components/             # Navbar, Footer, Toast...
│   └── views/                  # Các trang chức năng độc lập (Home, Search, Detail, Post...)
│
├── assets/                     # Hình ảnh và biểu tượng
│   ├── images/
│   └── icons/
│
├── .gitignore
└── README.md
```
