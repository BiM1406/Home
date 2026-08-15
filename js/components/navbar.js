/**
 * Navigation Bar Component
 */
import { AuthService } from '../services/auth.js';

export function renderNavbar() {
  const container = document.getElementById('header-container');
  if (!container) return;

  const currentUser = AuthService.getCurrentUser();

  container.innerHTML = `
    <header class="site-header">
      <div class="container navbar">
        <a href="#/" class="logo" style="font-size: 1.25rem; font-weight: 800; color: var(--primary);">
          🏠 RoomRent
        </a>

        <nav>
          <ul class="nav-links">
            <li><a href="#/" class="nav-link">Trang Chủ</a></li>
            <li><a href="#/search" class="nav-link">Tìm Kiếm</a></li>
            <li><a href="#/post-property" class="nav-link">Đăng Tin</a></li>
            <li><a href="#/chat" class="nav-link">Tin Nhắn</a></li>
            <li><a href="#/dashboard" class="nav-link">Quản Lý</a></li>
            <li><a href="#/admin" class="nav-link">Admin</a></li>
          </ul>
        </nav>

        <div class="nav-actions" style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">Vai trò: <strong>${currentUser.role}</strong></span>
        </div>
      </div>
    </header>
  `;
}
