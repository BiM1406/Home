/**
 * Detail View Module (Chi Tiết Phòng / Villa)
 */
export function renderDetailView(container) {
  container.innerHTML = `
    <section class="container" style="padding-block: 2rem;">
      <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1.5rem;">🏡 Chi Tiết Bất Động Sản</h2>
      <p style="color: var(--text-muted);">Khung sườn hiển thị chi tiết phòng, hình ảnh, tiện ích và đặt lịch hẹn.</p>
    </section>
  `;
}
