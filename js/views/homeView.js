/**
 * Home View Module (Trang Chủ)
 */
export function renderHomeView(container) {
  container.innerHTML = `
    <section class="container" style="padding-block: 3rem;">
      <div style="text-align: center; max-width: 700px; margin: 0 auto 3rem;">
        <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 1rem;">
          Tìm Phòng Trọ, Căn Hộ & Villa Cho Thuê Trực Tiếp
        </h1>
        <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 2rem;">
          Kết nối trực tiếp giữa Chủ nhà và Khách thuê - Không trung gian môi giới.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <a href="#/search" class="btn btn-primary">🔍 Khám Phá Ngay</a>
          <a href="#/post-property" class="btn btn-outline">📝 Đăng Tin Cho Thuê</a>
        </div>
      </div>
    </section>
  `;
}
