/**
 * Admin View Module (Bảng Điều Khiển Quản Trị Viên)
 */
export function renderAdminView(container) {
  container.innerHTML = `
    <section class="container" style="padding-block: 2rem;">
      <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1.5rem;">⚙️ Quản Trị Hệ Thống (Admin)</h2>
      <p style="color: var(--text-muted);">Khung sườn duyệt tin đăng, quản lý người dùng và theo dõi doanh thu.</p>
    </section>
  `;
}
