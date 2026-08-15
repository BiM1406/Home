/**
 * Chat View Module (Nhắn Tin 1-1 Khách Thuê & Chủ Nhà)
 */
export function renderChatView(container) {
  container.innerHTML = `
    <section class="container" style="padding-block: 2rem;">
      <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1.5rem;">💬 Tin Nhắn Trực Tiếp</h2>
      <p style="color: var(--text-muted);">Khung sườn giao diện hộp thoại trò chuyện trực tiếp và bảo mật số điện thoại.</p>
    </section>
  `;
}
