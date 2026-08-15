# Kế hoạch Triển khai Dự án RoomRent (Nền tảng Cho thuê Phòng / Nhà / Căn hộ / Villa)

> **Mục tiêu**: Xây dựng nền tảng kết nối trực tiếp Người cho thuê (Landlord) và Người thuê (Renter) với 3 vai trò (Admin / Landlord / Renter).
> **Tech Stack**:
> - **Frontend**: HTML5 Semantic + Vanilla CSS3 (Custom Design System, HSL Tokens, Responsive Media Queries, Không dùng Tailwind) + Vanilla JS (ES6 Modules, Touch/Swipe Mobile Gestures).
> - **Backend**: Node.js + Express.js (Clean Modular Architecture, REST API, JWT Auth, Socket.io Realtime Chat, Pre-render SEO sitemap).
> - **Repository**: `https://github.com/BiM1406/Home.git` (Branches: `main`, `develop`, `feature/*`).

---

## 1. Phân rã Chi tiết theo Functional Requirements (PRD)

| Mã FR | Tên Module | Chi tiết Kỹ thuật & Nghiệp vụ |
|---|---|---|
| **FR-01** | **Quản lý User & Phân quyền** | 3 vai trò: `Admin`, `Landlord`, `Renter`. Xác thực JWT, đăng ký/đăng nhập, chuyển đổi vai trò linh hoạt, hồ sơ cá nhân & huy hiệu xác minh (Verified). |
| **FR-02** | **Đăng tin cho thuê (Landlord)** | **Wizard 8 bước chuẩn PRD**:<br>1. Loại hình (Phòng trọ / Chung cư mini / Căn hộ / Căn hộ cao cấp / Nhà nguyên căn / Villa)<br>2. Thông tin cơ bản (Diện tích, số phòng, số tầng, nội thất)<br>3. **Điều kiện riêng (Villa & Căn hộ cao cấp)**: hồ bơi, sân vườn, bảo vệ 24/7, chỗ đỗ xe, camera an ninh, nội thất cao cấp<br>4. Giá & Chi phí (Tiền thuê/tháng, tiền cọc, giá điện/nước/mạng)<br>5. Vị trí & Bản đồ (Tọa độ lat/lng Leaflet + Địa chỉ hành chính)<br>6. Hình ảnh (Upload tối đa 10 ảnh + xem trước thumbnails)<br>7. Mô tả & Tiện ích (Multi-select: điều hòa, máy giặt, bếp...)<br>8. Chính sách (Số người tối đa, thú cưng, giờ giấc).<br>Trạng thái tin: *Draft, Pending (chờ duyệt), Active, Inactive, Expired, Rejected*. |
| **FR-03** | **Tìm kiếm, Lọc & Slideshow (Renter)** | • **FR-03.4 Trang chủ & Hero Slideshow**: Carousel tự động quay vòng, hỗ trợ vuốt chạm cảm ứng (touch swipe) trên mobile, danh mục nhanh, Section **Căn hộ cao cấp** (badge Luxury mạ vàng), Section **Villa** (tags điều kiện riêng: hồ bơi, sân vườn, bảo vệ...).<br>• **FR-03.2 Bộ lọc nâng cao**: Toggle Căn hộ cao cấp, Multi-select Điều kiện Villa, Khoảng giá, Diện tích, Tiện ích, Cho nuôi thú cưng.<br>• **FR-03.3 Chi tiết phòng**: **Slideshow ảnh (Carousel)** auto-play, nút điều hướng, vuốt mobile, hỗ trợ 10+ ảnh, thumbnails preview, popup Lightbox; Nút Yêu thích & Đặt lịch xem phòng. |
| **FR-04** | **Đặt lịch xem phòng (Viewing)** | Renter chọn khung giờ có sẵn -> Gửi yêu cầu; Landlord duyệt / từ chối / đề xuất giờ khác; Quản lý 4 trạng thái: *Chờ xác nhận, Đã xác nhận, Đã hủy, Đã xem*. |
| **FR-05** | **Realtime Chat 1-1** | Chat trực tiếp 1-1 giữa Renter & Landlord gắn với tin đăng cụ thể; Đính kèm thẻ tin đăng xem nhanh; Tự động che/ẩn số điện thoại trong nội dung chat để bảo mật (FR-05.2); Báo cáo vi phạm. |
| **FR-06** | **Hợp đồng cho thuê số** | Hệ thống tự điền thông tin 2 bên vào template chuẩn; Landlord tùy biến điều khoản; Ký số xác nhận đồng ý ("Đã đồng ý" + timestamp); Tải/In hợp đồng PDF. |
| **FR-07** | **Gói đăng tin & Đẩy tin** | Bảng giá 3 gói: *Miễn phí*, *Tiêu chuẩn* (49k/tháng), *VIP* (149k/tháng); Tính năng đẩy tin (Promote); Mô phỏng thanh toán cổng VNPay / Momo. |
| **FR-08** | **Admin Panel** | Duyệt/từ chối tin đăng Pending kèm lý do; Quản trị người dùng (khóa/mở); Thống kê doanh thu & biểu đồ phân tích (tin đăng, lượt xem, hợp đồng, khu vực hot). |
| **FR-09** | **Đa ngôn ngữ & Đa tiền tệ** | Chuyển đổi ngôn ngữ Tiếng Việt (mặc định) ↔ Tiếng Anh; Đổi đơn vị tiền tệ VND (mặc định) ↔ USD theo tỉ giá. |

---

## 2. Cấu trúc Dự án (Repository Structure)

```
ChoThueNha/
├── docs/
│   ├── rental-prd-v1.md              # File PRD gốc (được bảo mật trong .gitignore)
│   ├── architecture.md               # Sơ đồ kiến trúc Clean Architecture & Data Flow
│   └── implementation_plan.md        # Bản kế hoạch triển khai chi tiết
├── package.json                      # Node.js dependencies (express, cors, jsonwebtoken, socket.io)
├── .gitignore                        # Cấu hình bỏ qua node_modules, .env, rental-prd-v1.md
├── README.md                         # Tài liệu hướng dẫn cài đặt, tài khoản test & API
├── server/
│   ├── server.js                     # Entry point Express + Socket.io + Static Server + SEO pre-render
│   ├── config/
│   │   └── constants.js              # Hằng số trạng thái tin, vai trò, gói cước, tỉ giá
│   ├── data/
│   │   ├── seedData.js               # Mock seed data phong phú (Villa, Căn hộ cao cấp, Phòng trọ...)
│   │   └── db.js                     # In-memory database store hỗ trợ CRUD đầy đủ & bảo mật PII
│   ├── middleware/
│   │   └── authMiddleware.js         # Xác thực JWT & phân quyền vai trò (Admin/Landlord/Renter)
│   ├── controllers/
│   │   ├── authController.js         # Đăng ký, đăng nhập, đổi vai trò
│   │   ├── propertyController.js     # Lọc nâng cao, toggle Luxury, multi-select Villa, wizard CRUD
│   │   ├── bookingController.js      # Đặt lịch, duyệt lịch hẹn
│   │   ├── chatController.js         # Chat 1-1, đính kèm thẻ tin đăng
│   │   ├── contractController.js     # Tạo và ký hợp đồng số
│   │   ├── adminController.js        # Thống kê, duyệt tin, quản lý user
│   │   └── paymentController.js      # Gói dịch vụ & Đẩy tin VIP
│   ├── routes/
│   │   └── apiRoutes.js              # REST API Router
│   └── tests/
│       └── api.test.js               # Test suite tự động 7/7 test cases
└── public/
    ├── css/
    │   ├── base.css                  # Biến màu HSL, typography Plus Jakarta Sans, CSS Reset
    │   ├── layout.css                # Header sticky, navigation bar, footer, container
    │   ├── components.css            # Buttons, Badges (Luxury/VIP), Villa tags, Cards, Modals, Forms
    │   ├── slideshow.css             # Hero carousel auto-play, Touch-swipe gestures, Lightbox
    │   └── responsive.css            # Media queries responsive cho Mobile / Tablet / Desktop
    ├── js/
    │   ├── api.js                    # Fetch API client wrapper
    │   ├── auth.js                   # Quản lý auth state, token & role
    │   ├── i18n.js                   # Đa ngôn ngữ VI/EN & Đa tiền tệ VND/USD
    │   ├── slideshow.js              # Core Slideshow Engine (Auto-play, Drag/Swipe, Lightbox)
    │   ├── filter.js                 # Bộ lọc tìm kiếm, toggle Luxury, multi-select Villa
    │   ├── wizard.js                 # Form wizard 8 bước đăng tin
    │   ├── booking.js                # Đặt & quản lý lịch hẹn
    │   ├── chat.js                   # Realtime chat 1-1 Socket.io
    │   ├── contract.js               # Hợp đồng điện tử & In PDF
    │   ├── admin.js                  # Bảng điều khiển Admin & duyệt bài
    │   └── main.js                   # Script khởi tạo chung, mobile menu, toast
    ├── index.html                    # Trang chủ (Hero Slideshow, Section Căn hộ cao cấp, Section Villa)
    ├── search.html                   # Trang tìm kiếm + Bộ lọc đa chiều + Bản đồ Leaflet
    ├── detail.html                   # Trang chi tiết phòng + Slideshow ảnh đa điểm chạm
    ├── post-property.html            # Trang đăng tin wizard 8 bước
    ├── booking.html                  # Quản lý lịch hẹn xem phòng
    ├── chat.html                     # Chat trực tiếp 1-1 kèm thẻ bất động sản
    ├── contract.html                 # Hợp đồng thuê điện tử
    ├── pricing.html                  # Bảng giá gói đăng tin & đẩy tin
    ├── dashboard.html                # Dashboard dành cho Chủ nhà & Người thuê
    ├── admin.html                    # Admin Panel quản trị & duyệt tin
    └── login.html                    # Đăng nhập & Đăng ký phân quyền
```

---

## 3. Lộ trình Thực thi Tiếp theo

1. **Bước 1 (Đã xong)**: Thiết lập cấu trúc repo, Git remote `BiM1406/Home`, các branch (`main`, `develop`, `feature/*`), Backend Core & Database Store, 7/7 API Tests, CSS Design System & Slideshow CSS.
2. **Bước 2**: Hoàn thiện các module JavaScript phía client (`slideshow.js`, `filter.js`, `wizard.js`, `booking.js`, `chat.js`, `contract.js`, `i18n.js`).
3. **Bước 3**: Dựng toàn bộ các trang HTML Semantic (`index.html`, `search.html`, `detail.html`, `post-property.html`, `dashboard.html`, `admin.html`...).
4. **Bước 4**: Chạy dev server `npm run dev` và mở trực tiếp tab mới trên trình duyệt đang chạy của anh để nghiệm thu toàn diện.
