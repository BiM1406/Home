/**
 * Footer Component - Warm Espresso Editorial
 */
export function renderFooter() {
  const container = document.getElementById('footer-container');
  if (!container) return;

  container.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Col 1: Brand & Slogan -->
          <div class="footer-column">
            <div class="nav-brand" style="color: #ffffff; margin-bottom: 1rem;">
              <span>RoomRent</span>
            </div>
            <p style="font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem; color: #a4978e;">
              Nền tảng công nghệ kết nối trực tiếp Chủ nhà và Khách thuê. Loại bỏ 100% chi phí trung gian môi giới, mang đến hợp đồng điện tử minh bạch và bảo mật.
            </p>
          </div>

          <!-- Col 2: Danh Mục -->
          <div class="footer-column">
            <h4>Danh Mục Cho Thuê</h4>
            <ul class="footer-links">
              <li><a href="#/search?category=villa">Villa & Biệt Thự Nghỉ Dưỡng</a></li>
              <li><a href="#/search?category=apartment">Căn Hộ Cao Cấp & Duplex</a></li>
              <li><a href="#/search?category=room">Phòng Trọ Tiện Nghi</a></li>
              <li><a href="#/search?category=studio">Studio & Căn Hộ Dịch Vụ</a></li>
            </ul>
          </div>

          <!-- Col 3: Dành Cho Người Dùng -->
          <div class="footer-column">
            <h4>Dành Cho Người Dùng</h4>
            <ul class="footer-links">
              <li><a href="#/post-property">Đăng Tin Cho Thuê Nhà</a></li>
              <li><a href="#/contract">Hợp Đồng Thuê Nhà Mẫu</a></li>
              <li><a href="#/dashboard">Quản Lý Lịch Xem Phòng</a></li>
              <li><a href="#/chat">Hộp Thư Trao Đổi 1-1</a></li>
            </ul>
          </div>

          <!-- Col 4: Hỗ Trợ & Liên Hệ -->
          <div class="footer-column">
            <h4>Hỗ Trợ Khách Hàng</h4>
            <p style="font-size: 0.875rem; margin-bottom: 0.5rem; color: #ded6cc;">Hotline: <strong style="color: #ffffff;">1900 8888 (8:00 - 21:00)</strong></p>
            <p style="font-size: 0.875rem; margin-bottom: 1rem; color: #ded6cc;">Email: <span style="color: #ffffff;">hotro@roomrent.vn</span></p>
            <p style="font-size: 0.875rem; color: #a4978e;">Văn phòng: Tòa nhà Landmark 81, 208 Nguyễn Hữu Cảnh, TP.HCM</p>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <p>© 2026 RoomRent Platform. Bản quyền thuộc về RoomRent.vn - Giữ toàn quyền.</p>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#/">Điều khoản sử dụng</a>
            <a href="#/">Chính sách bảo mật</a>
            <a href="#/">Quy chế hoạt động</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
