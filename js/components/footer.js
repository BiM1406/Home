/**
 * Footer Component
 */
export function renderFooter() {
  const container = document.getElementById('footer-container');
  if (!container) return;

  container.innerHTML = `
    <footer class="site-footer">
      <div class="container" style="text-align: center; color: var(--text-muted); font-size: 0.875rem;">
        <p>© 2026 RoomRent Platform. Nền tảng cho thuê phòng trọ, căn hộ và villa trực tiếp.</p>
      </div>
    </footer>
  `;
}
