/**
 * Dashboard View Module (Quản Lý Tin Đăng & Lịch Hẹn)
 */
export function renderDashboardView(container) {
  container.innerHTML = `
    <section class="container" style="padding-block: 2rem;">
      <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1.5rem;">📊 Bảng Quản Lý Cá Nhân</h2>
      <p style="color: var(--text-muted);">Khung sườn quản lý danh sách tin đăng, lịch xem phòng và trạng thái hợp đồng.</p>
    </section>
  `;
}
