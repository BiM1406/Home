# Requirements Document — RoomRent

## Intent Analysis Summary

| Attribute | Value |
|-----------|-------|
| **User Request** | Xây dựng nền tảng cho thuê phòng/nhà trực tuyến cho sinh viên và người đi làm |
| **Request Type** | New Project (Greenfield) |
| **Scope Estimate** | System-wide — full platform với 3 vai trò, đăng tin, tìm kiếm, đặt lịch xem, hợp đồng |
| **Complexity Estimate** | Moderate — hệ thống đa vai trò, bản đồ, chat, hợp đồng số, song ngữ |
| **Requirements Depth** | Standard |

---

## 1. Tổng quan dự án

### 1.1. Mục tiêu
Xây dựng nền tảng web giúp người có phòng trống cho thuê (Chủ nhà) và người đang tìm chỗ ở (Người thuê) kết nối trực tiếp, bao gồm:
- Chủ nhà đăng tin cho thuê phòng/nhà với hình ảnh, giá, vị trí
- Người thuê tìm kiếm, lọc, so sánh phòng phù hợp
- Đặt lịch xem phòng trực tiếp qua app
- Chat giữa 2 bên, hợp đồng cho thuê số cơ bản
- Admin quản lý tin đăng, duyệt bài, xem báo cáo

### 1.2. Phạm vi hệ thống (Phiên bản 1)
- **Bao gồm**: Quản lý tài khoản (3 vai trò), đăng tin cho thuê, tìm kiếm + lọc + bản đồ, chi tiết phòng, yêu thích, đặt lịch xem, chat, hợp đồng số đơn giản, thanh toán phí đăng tin, admin panel, báo cáo, song ngữ VI/EN
- **Không bao gồm**: Thanh toán tiền thuê hàng tháng online, hợp đồng điện tử có chữ ký pháp lý (chỉ template + lưu trữ), VR tour 360°, đánh giá xác minh danh tính sâu

---

## 2. Functional Requirements

### FR-01: Quản lý người dùng và phân quyền

#### FR-01.1: Vai trò hệ thống
| Vai trò | Mô tả | Quyền hạn chính |
|---------|--------|-----------------|
| Admin | Quản trị hệ thống | Duyệt tin đăng, quản lý user, xử lý báo cáo vi phạm, xem báo cáo |
| Landlord (Chủ nhà) | Người cho thuê | Đăng tin, quản lý tin, quản lý lịch xem, trả lời chat, soạn hợp đồng |
| Renter (Người thuê) | Người tìm thuê | Tìm kiếm, lọc, yêu thích, đặt lịch xem, chat, nhận hợp đồng |

#### FR-01.2: Xác thực (Authentication)
- Đăng ký / đăng nhập bằng Email + Mật khẩu
- Đăng nhập bằng Google
- Đăng nhập bằng Facebook
- Quên mật khẩu / đặt lại qua email
- Xác thực email khi đăng ký
- Chọn vai trò khi đăng ký (Chủ nhà / Người thuê), có thể đổi về sau

#### FR-01.3: Quản lý tài khoản
- Xem và chỉnh sửa thông tin cá nhân
- Đổi mật khẩu
- Upload avatar
- Xác minh danh tính (số điện thoại, định danh cơ bản — tùy chọn, tăng uy tín tin đăng)

---

### FR-02: Đăng tin cho thuê (Landlord)

#### FR-02.1: Luồng đăng tin
Wizard nhiều bước, chia nhỏ để không quá tải:
1. **Loại hình**: Phòng trọ / Chung cư mini / Căn hộ / Căn hộ cao cấp / Nhà nguyên căn / Villa
2. **Thông tin cơ bản**: Diện tích (m²), số phòng, số tầng, nội thất có sẵn
3. **Điều kiện riêng (chỉ Villa / Căn hộ cao cấp)**: hồ bơi, sân vườn, bảo vệ 24/7, chỗ đỗ xe, camera an ninh, nội thất cao cấp
4. **Giá**: Tiền thuê/tháng, tiền cọc, tiền điện/nước/mạng (riêng hay gộp)
5. **Vị trí**: Chọn trên bản đồ (lat/lng) + nhập địa chỉ + khu vực (quận/huyện, TP)
6. **Hình ảnh**: Tối đa 10 ảnh, video tùy chọn
7. **Mô tả**: Mô tả ngắn + tiện ích (multi-select: điều hòa, máy giặt, bếp, chỗ để xe...)
8. **Chính sách**: Số người tối đa, cho nuôi thú cưng?, hút thuốc?, giờ giấc

#### FR-02.2: Trạng thái tin đăng
| Trạng thái | Mô tả |
|-----------|-------|
| Draft | Lưu nháp, chưa gửi duyệt |
| Pending | Đã gửi, chờ Admin duyệt |
| Active | Đang hiển thị công khai |
| Inactive | Chủ nhà tạm ẩn tin |
| Expired | Hết hạn đăng (VD 30 ngày) |
| Rejected | Bị Admin từ chối (kèm lý do) |

#### FR-02.3: Quản lý tin của Landlord
- CRUD tin đăng
- Gia hạn tin hết hạn (trả phí hoặc free theo gói)
- Xem số lượt xem / lượt yêu thích của từng tin
- Bật/tắt tin Active/Inactive
- Tự động ẩn tin khi đã cho thuê (đánh dấu "Đã cho thuê")

---

### FR-03: Tìm kiếm & Lọc (Renter)

#### FR-03.1: Tìm kiếm
- Tìm theo từ khóa (tên đường, khu vực, tên chung cư)
- Tìm trên bản đồ (drag map để đổi kết quả)
- Sắp xếp: Mới nhất / Giá thấp→cao / Giá cao→thấp / Diện tích

#### FR-03.2: Bộ lọc
| Tiêu chí | Kiểu |
|----------|------|
| Loại hình | Multi-select (phòng trọ / chung cư mini / nhà nguyên căn / căn hộ) |
| Khoảng giá/tháng | Range (VND) |
| Diện tích | Range (m²) |
| Số người tối đa | Select |
| Nội thất | Multi-select (điều hòa, máy giặt, bếp...) |
| Tiện ích khu vực | Multi-select (gần trường, gần chợ, gần bến xe...) |
| Thú cưng | Toggle (cho nuôi thú cưng) |
| Nguồn tin | Tin đã xác minh / Tin mới |
| Căn hộ cao cấp | Toggle (chỉ hiện căn hộ cao cấp) |
| Điều kiện Villa | Multi-select (hồ bơi, sân vườn, bảo vệ 24/7, chỗ đỗ xe, camera an ninh) |

#### FR-03.3: Kết quả & Chi tiết
- Card tin: ảnh, giá, diện tích, quận, trạng thái đã xác minh
- Trang chi tiết: **slideshow ảnh (carousel)** — auto-play, nút điều hướng, vuốt được trên mobile, hỗ trợ tối đa 10+ ảnh, thumbnail xem trước
- Trang chi tiết: thông tin đầy đủ (gồm cả điều kiện riêng của Villa / căn hộ cao cấp), bản đồ vị trí, tin tương tự
- Nút "Yêu thích" (lưu vào danh sách)
- Nút "Liên hệ / Đặt lịch xem"

#### FR-03.4: Trang chủ & Slideshow
- **Hero slideshow** quay vòng tự động (banner khuyến mãi, tin nổi bật), chuyển slide bằng nút hoặc vuốt, có dots/chỉ số slide
- Danh mục nhanh: Phòng trọ / Căn hộ / Căn hộ cao cấp / Villa
- **Section "Căn hộ cao cấp"**: danh sách căn hộ cao cấp nổi bật (filter riêng, hiển thị badge)
- **Section "Villa"**: danh sách villa kèm điều kiện riêng (hồ bơi, sân vườn, bảo vệ...) hiển thị như tag trên card
- Tin mới nhất, khu vực được tìm kiếm nhiều

---

### FR-04: Đặt lịch xem phòng (Viewing)

#### FR-04.1: Renter
- Chọn khung giờ có sẵn từ lịch của Landlord
- Gửi yêu cầu xem phòng (kèm ghi chú tùy chọn)
- Xem trạng thái: Chờ xác nhận / Đã xác nhận / Đã hủy / Đã xem xong
- Hủy lịch trước giờ hẹn (thông báo cho Landlord)

#### FR-04.2: Landlord
- Tạo khung giờ xem phòng (lặp lại theo ngày/tuần)
- Xác nhận / Từ chối / Đề nghị giờ khác
- Xem danh sách lịch hẹn sắp tới
- Nhận nhắc lịch qua email/notification

---

### FR-05: Chat giữa hai bên

#### FR-05.1: Tính năng
- Chat 1-1 giữa Renter và Landlord (gắn với tin đăng)
- Gửi text + hình ảnh
- Đính kèm "thẻ tin đăng" (click để xem chi tiết phòng)
- Xem trạng thái đã đọc / chưa đọc
- Lịch sử chat lưu vĩnh viễn cho từng tin

#### FR-05.2: An toàn
- Không hiển thị số điện thoại trực tiếp trong chat (tránh bỏ app)
- Báo cáo tin nhắn lạm dụng → Admin xử lý
- Chặn user (block) một chiều

---

### FR-06: Hợp đồng cho thuê số (cơ bản)

#### FR-06.1: Template hợp đồng
- Hệ thống sinh template chuẩn (thông tin 2 bên, địa chỉ, giá, cọc, thời hạn, điều khoản mặc định)
- Landlord chỉnh sửa thêm điều khoản tùy chọn
- Gửi cho Renter xem trước, xác nhận đồng ý trong app

#### FR-06.2: Ký & lưu trữ
- Xác nhận đồng ý bằng chữ ký số đơn giản (đánh dấu "Đã đồng ý" + timestamp) — không phải chữ ký điện tử pháp lý
- Bản PDF hợp đồng được tạo và lưu trữ trên cloud
- Cả 2 bên tải được bản copy
- Thông báo nhắc gia hạn khi sắp hết hạn hợp đồng

---

### FR-07: Thanh toán phí đăng tin (Monetization)

#### FR-07.1: Gói đăng tin
| Gói | Giá | Quyền lợi |
|-----|-----|-----------|
| Miễn phí | 0 | 1 tin Active, hết hạn 15 ngày, không có gì nổi bật |
| Tiêu chuẩn | VD 49k/tháng | 5 tin Active, hết hạn 30 ngày, vị trí ưu tiên trong tìm kiếm |
| VIP | VD 149k/tháng | 20 tin Active, badge VIP, đẩy tin lên đầu, thống kê nâng cao |

#### FR-07.2: Thanh toán
- Thanh toán qua VNPay / Momo (gateway tích hợp)
- Gói tự động gia hạn hoặc thủ công tùy chọn
- Hóa đơn/phiếu thu được lưu lại cho Landlord

#### FR-07.3: Đẩy tin (Promote)
- Landlord có thể trả phí đẩy 1 tin lên đầu danh sách theo ngày
- Hiển thị số lượt xem tăng khi được đẩy

---

### FR-08: Admin Panel

#### FR-08.1: Duyệt tin đăng
- Danh sách tin Pending → Duyệt / Từ chối (kèm lý do)
- Xem trước tin như user
- Quản lý tin bị báo cáo vi phạm → ẩn / khóa

#### FR-08.2: Quản lý người dùng
- Xem danh sách user (theo vai trò)
- Khóa/mở tài khoản
- Xem lịch sử hoạt động (tin đăng, chat, báo cáo)
- Xử lý báo cáo vi phạm từ chat/tin

#### FR-08.3: Quản lý thanh toán & gói
- Xem giao dịch đăng tin, doanh thu theo ngày/tuần/tháng
- Tạo/sửa gói (Miễn phí / Tiêu chuẩn / VIP)
- Hoàn tiền thủ công khi cần

#### FR-08.4: Báo cáo
- Số user đăng ký (theo ngày/tuần/tháng, theo vai trò)
- Số tin đăng / tin active / tin được duyệt
- Tỉ lệ duyệt/từ chối
- Số lượt xem, lượt yêu thích trung bình/tin
- Số lịch xem phòng, số hợp đồng tạo ra
- Top khu vực được tìm kiếm nhiều nhất

---

### FR-09: Đa ngôn ngữ & Đa tiền tệ

#### FR-09.1: Ngôn ngữ
- Tiếng Việt (mặc định)
- Tiếng Anh
- Chuyển đổi ngôn ngữ bất kỳ lúc nào
- Mô tả tin đăng do Landlord nhập (không auto-translate)

#### FR-09.2: Tiền tệ
- VND (mặc định)
- USD
- Chuyển đổi hiển thị theo tỉ giá (cập nhật thủ công hoặc qua API tỉ giá)

---

## 3. Non-Functional Requirements

### NFR-01: Hiệu năng
- Trang tìm kiếm load dưới 2 giây (kể cả với 10.000+ tin active)
- API response time trung bình dưới 500ms
- Tìm kiếm trên bản đồ mượt (không lag khi pan/zoom)
- Hỗ trợ 100.000+ tin đăng trong DB, 10.000+ người dùng đồng thời

### NFR-02: Bảo mật
- Xác thực JWT với refresh token
- Mã hóa mật khẩu (bcrypt)
- HTTPS bắt buộc
- Input validation + sanitization (đặc biệt với HTML trong mô tả tin)
- Rate limiting trên API (chống spam chat, spam đăng tin)
- CORS configuration
- Ẩn thông tin cá nhân (số điện thoại) khỏi public API trừ khi được phép

### NFR-03: Khả năng mở rộng
- Backend API tách riêng khỏi Frontend
- Kiến trúc modular theo domain
- Database schema extensible
- API versioning (v1, v2...)
- Search dùng full-text hoặc vector search để scale được

### NFR-04: Khả năng bảo trì
- TypeScript end-to-end (type-safe)
- API documentation (OpenAPI/Swagger)
- Structured logging
- Error tracking (Sentry hoặc tương đương)

### NFR-05: Triển khai
| Giai đoạn | Cách deploy |
|-----------|-------------|
| MVP | Vercel (Frontend) + Railway (Backend + DB) |
| Growth | Docker + VPS (DigitalOcean / AWS) |

- Environment separation: dev / staging / production
- Environment variables qua `.env` files
- CI/CD pipeline cơ bản (GitHub Actions)

### NFR-06: SEO
- Frontend HTML/CSS/JS thuần: SEO qua pre-render tĩnh từ backend (backend sinh sẵn HTML/JSON cho từng tin)
- Meta tags, Open Graph cho link chia sẻ tin
- Sitemap tự động (backend sinh) cho tất cả tin active

### NFR-07: Accessibility
- WCAG 2.1 AA cơ bản
- Keyboard navigation
- Screen reader friendly

---

## 4. Technical Decisions

### 4.1. Tech Stack
| Layer | Technology | Lý do |
|-------|-----------|-------|
| **Frontend** | HTML + CSS + JavaScript (template thuần) | Nhẹ, nhanh, dễ tùy chỉnh, responsive thuần CSS (media queries) + JS |
| **Backend** | Node.js + TypeScript + Fastify | Tách riêng, scale độc lập, type-safe |
| **Database** | PostgreSQL + Prisma ORM | Migration dễ, type-safe, PostGIS cho tọa độ bản đồ |
| **Search** | PostgreSQL full-text → sau nâng lên Meilisearch/Elasticsearch | Tìm kiếm + lọc nhanh, mở rộng sau |
| **Bản đồ** | Mapbox (hoặc Leaflet) | Interactive map, marker, phủ sóng VN tốt |
| **Realtime chat** | Socket.io (hoặc Firebase Realtime) | Chat 2 chiều real-time, dễ deploy |
| **Auth** | Better Auth | OAuth sẵn có, không build từ đầu |
| **Storage** | Cloudinary | Ảnh tin đăng, resize tự động |
| **Payment** | VNPay + Momo SDK | Target user VN, phổ biến |
| **Email** | Resend | Developer-friendly, rẻ |
| **Deploy MVP** | Vercel + Railway | Nhanh, rẻ |
| **Deploy Growth** | Docker + VPS | Tự kiểm soát |

### 4.2. Platform
- Web responsive (ưu tiên mobile-first vì target là sinh viên/người đi làm trẻ)

### 4.3. Monetization Architecture
- Freemium: gói miễn phí để có lượng tin, upsell gói trả phí
- Thanh toán qua gateway (VNPay/Momo) — không giữ tiền
- Đẩy tin (Promote) là tính năng phụ trả phí riêng
- Về sau: tính phí % giao dịch nếu mở thanh toán tiền thuê online

---

## 5. User Flow

### Luồng Renter (Người thuê)
```
[Đăng ký / Đăng nhập (vai trò Renter)]
        ↓
[Tìm kiếm: từ khóa / bản đồ / bộ lọc]
        ↓
[Xem chi tiết phòng + yêu thích]
        ↓
[Đặt lịch xem phòng theo khung giờ]
        ↓
[Chat với Landlord] ←────┐
        ↓                 │
[Landlord xác nhận lịch]  │
        ↓                 │
[Xem phòng thực tế]       │
        ↓                 │
[Đồng ý thuê → Xem & xác nhận hợp đồng số]
        ↓
[Nhận hợp đồng PDF + chuyển tiền cọc ngoài app]
```

### Luồng Landlord (Chủ nhà)
```
[Đăng ký / Đăng nhập (vai trò Landlord)]
        ↓
[Đăng tin (wizard 8 bước) → Pending]
        ↓
[Admin duyệt → Active]
        ↓
[Tạo khung giờ xem phòng]
        ↓
[Nhận yêu cầu lịch → Xác nhận]
        ↓
[Chat với Renter]
        ↓
[Đồng ý cho thuê → Soạn hợp đồng → Gửi]
        ↓
[Quản lý hợp đồng + gia hạn]
```

---

## 6. Constraints & Assumptions

### Constraints
- Phiên bản 1 không hỗ trợ thanh toán tiền thuê hàng tháng online
- Hợp đồng số chỉ là template + xác nhận đồng ý, không có giá trị chữ ký điện tử pháp lý
- Không có xác minh danh tính bắt buộc (chỉ khuyến khích)
- Tỉ giá cập nhật thủ công hoặc qua API (không real-time)

### Assumptions
- Có nguồn dữ liệu tin đăng ban đầu (tự đăng thử, thuê người đăng, hoặc từ nhóm FB/phòng trọ)
- Đăng ký tài khoản merchant với VNPay/Momo trước khi launch
- User chủ yếu truy cập qua mobile browser
- Cạnh tranh chính: Chợ Tốt, Facebook groups — nền tảng phải có UX tốt hơn

---

## 7. Success Metrics (MVP — 3 tháng đầu)
- 300 Landlord đăng tin, 1.000 tin active
- 3.000 Renter đăng ký
- 500 lịch xem phòng được tạo
- 30% tin đăng được liên hệ trong 7 ngày đầu
- Tỉ lệ free → gói trả phí ≥ 5%
- Thời gian trung bình trên app ≥ 4 phút/session

---

## 8. Out of Scope (Phiên bản sau)
- Thanh toán tiền thuê hàng tháng online (autopay)
- Hợp đồng điện tử có giá trị pháp lý (eKYC, chữ ký số)
- VR tour 360° / video walkthrough
- Trả lương / chấm điểm uy tín 2 chiều nâng cao
- Mở rộng sang cho thuê xe / cho thuê đồ
- App native (iOS/Android)
- Đa ngôn ngữ thêm (Trung, Hàn...)
- Tính năng roommate matching (ghép ở ghép)

---

## 9. Open Questions
- [ ] Tên app chính thức ("RoomRent" là placeholder)
- [ ] Mô hình phí: đăng tin trả phí ngay từ đầu hay free hoàn toàn để lấy lượng?
- [ ] Cần xác minh danh tính bắt buộc (để chống tin ảo) hay để tự nguyện?
- [ ] Có cần staging environment ngay từ MVP không?
- [ ] Dữ liệu tin đăng ban đầu lấy từ đâu khi launch?
- [ ] Hợp đồng số có cần sự tư vấn pháp lý trước khi đưa template vào không?