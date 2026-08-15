/**
 * Navigation Bar Component - Warm Linen Editorial Resort Style
 * With 2 Experiential Roles (Khách Thuê & Chủ Nhà) and Dual Currency Switcher (VNĐ ↔ USD)
 */
import { AuthService } from '../services/auth.js';

export function renderNavbar() {
  const container = document.getElementById('header-container');
  if (!container) return;

  const currentUser = AuthService.getCurrentUser();
  const prefs = AuthService.getPreferences();
  const currentHash = window.location.hash || '#/';

  const roleLabels = {
    Renter: 'Khách Thuê',
    Landlord: 'Chủ Nhà'
  };

  // Safe fallback if role was Admin before
  const displayRoleName = roleLabels[currentUser.role] || 'Khách Thuê';

  container.innerHTML = `
    <header class="site-header" id="main-header">
      <!-- Flock of 7 Flying Seagulls Flight Arena -->
      <div class="birds-flight-container" aria-hidden="true">
        <!-- Đàn chim 3 con bay từ trái sang phải -->
        <div class="flying-bird bird-path-1">
          <svg viewBox="0 0 32 20">
            <path class="bird-wing-left" d="M16,14 C12,6 4,2 0,4 C5,10 12,14 16,14 Z"/>
            <path class="bird-wing-right" d="M16,14 C20,6 28,2 32,4 C27,10 20,14 16,14 Z"/>
            <circle cx="16" cy="14" r="1.5"/>
          </svg>
        </div>
        <div class="flying-bird bird-path-2">
          <svg viewBox="0 0 32 20">
            <path class="bird-wing-left" d="M16,14 C12,6 4,2 0,4 C5,10 12,14 16,14 Z"/>
            <path class="bird-wing-right" d="M16,14 C20,6 28,2 32,4 C27,10 20,14 16,14 Z"/>
            <circle cx="16" cy="14" r="1.5"/>
          </svg>
        </div>
        <div class="flying-bird bird-path-3">
          <svg viewBox="0 0 32 20">
            <path class="bird-wing-left" d="M16,14 C12,6 4,2 0,4 C5,10 12,14 16,14 Z"/>
            <path class="bird-wing-right" d="M16,14 C20,6 28,2 32,4 C27,10 20,14 16,14 Z"/>
            <circle cx="16" cy="14" r="1.5"/>
          </svg>
        </div>

        <!-- 2 chim bay từ phải sang trái -->
        <div class="flying-bird bird-path-4">
          <svg viewBox="0 0 32 20">
            <path class="bird-wing-left" d="M16,14 C12,6 4,2 0,4 C5,10 12,14 16,14 Z"/>
            <path class="bird-wing-right" d="M16,14 C20,6 28,2 32,4 C27,10 20,14 16,14 Z"/>
            <circle cx="16" cy="14" r="1.5"/>
          </svg>
        </div>
        <div class="flying-bird bird-path-5">
          <svg viewBox="0 0 32 20">
            <path class="bird-wing-left" d="M16,14 C12,6 4,2 0,4 C5,10 12,14 16,14 Z"/>
            <path class="bird-wing-right" d="M16,14 C20,6 28,2 32,4 C27,10 20,14 16,14 Z"/>
            <circle cx="16" cy="14" r="1.5"/>
          </svg>
        </div>

        <!-- Chim sải cánh lớn lướt tầm thấp & Chim đỉnh cao -->
        <div class="flying-bird bird-path-6">
          <svg viewBox="0 0 32 20">
            <path class="bird-wing-left" d="M16,14 C12,6 4,2 0,4 C5,10 12,14 16,14 Z"/>
            <path class="bird-wing-right" d="M16,14 C20,6 28,2 32,4 C27,10 20,14 16,14 Z"/>
            <circle cx="16" cy="14" r="1.5"/>
          </svg>
        </div>
        <div class="flying-bird bird-path-7">
          <svg viewBox="0 0 32 20">
            <path class="bird-wing-left" d="M16,14 C12,6 4,2 0,4 C5,10 12,14 16,14 Z"/>
            <path class="bird-wing-right" d="M16,14 C20,6 28,2 32,4 C27,10 20,14 16,14 Z"/>
            <circle cx="16" cy="14" r="1.5"/>
          </svg>
        </div>
      </div>

      <div class="container navbar">
        <!-- Logo -->
        <a href="#/" class="nav-brand">
          <span>RoomRent</span>
        </a>

        <!-- Navigation Links -->
        <nav>
          <ul class="nav-menu">
            <li><a href="#/" class="nav-link ${currentHash === '#/' || currentHash === '' ? 'active' : ''}">Trang Chủ</a></li>
            <li><a href="#/search" class="nav-link ${currentHash.startsWith('#/search') ? 'active' : ''}">Tìm Phòng</a></li>
            <li><a href="#/post-property" class="nav-link ${currentHash.startsWith('#/post-property') ? 'active' : ''}">Đăng Tin</a></li>
            <li><a href="#/chat" class="nav-link ${currentHash.startsWith('#/chat') ? 'active' : ''}">Tin Nhắn</a></li>
            <li><a href="#/dashboard" class="nav-link ${currentHash.startsWith('#/dashboard') ? 'active' : ''}">Quản Lý</a></li>
          </ul>
        </nav>

        <!-- Right Controls: Currency & 2 Roles Switcher -->
        <div class="nav-controls">
          <!-- Segmented Currency Pill Switcher (VNĐ | USD) -->
          <div class="currency-segmented-pill" id="currency-segmented-box" title="Chọn đơn vị tiền tệ hiển thị">
            <button class="currency-pill-opt ${prefs.currency === 'VND' ? 'active' : ''}" data-currency="VND">VNĐ</button>
            <button class="currency-pill-opt ${prefs.currency === 'USD' ? 'active' : ''}" data-currency="USD">USD</button>
          </div>

          <!-- Role Switcher Dropdown (Chỉ gồm Khách Thuê & Chủ Nhà) -->
          <div class="role-switcher-dropdown">
            <button id="role-dropdown-btn" class="role-badge-btn" style="display: inline-flex; align-items: center; gap: 0.4rem;">
              <span>${displayRoleName}</span>
              <span style="font-size: 0.65rem; color: var(--gold);">▾</span>
            </button>

            <div id="role-menu" class="role-menu-popup">
              <div style="padding: 0.45rem 0.85rem 0.25rem; font-size: 0.72rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">
                CHỌN VAI TRÒ TRẢI NGHIỆM:
              </div>
              <button class="role-menu-item ${currentUser.role === 'Renter' ? 'active' : ''}" data-role="Renter">
                <span>Khách Thuê (Renter)</span>
                ${currentUser.role === 'Renter' ? '✓' : ''}
              </button>
              <button class="role-menu-item ${currentUser.role === 'Landlord' ? 'active' : ''}" data-role="Landlord">
                <span>Chủ Nhà (Landlord)</span>
                ${currentUser.role === 'Landlord' ? '✓' : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;

  setupNavbarEvents();
}

function setupNavbarEvents() {
  const roleBtn = document.getElementById('role-dropdown-btn');
  const roleMenu = document.getElementById('role-menu');

  if (roleBtn && roleMenu) {
    roleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      roleMenu.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      roleMenu.classList.remove('open');
    });

    roleMenu.querySelectorAll('.role-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        const selectedRole = item.dataset.role;
        AuthService.switchRole(selectedRole);
      });
    });
  }

  // Segmented Currency Pill Switcher Events
  const currencyBox = document.getElementById('currency-segmented-box');
  if (currencyBox) {
    currencyBox.querySelectorAll('.currency-pill-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const curr = btn.dataset.currency;
        const currentPrefs = AuthService.getPreferences();
        if (currentPrefs.currency !== curr) {
          AuthService.setCurrency(curr);
        }
      });
    });
  }
}
