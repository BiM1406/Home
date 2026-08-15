/**
 * RoomRent Application Entry Point
 */
import { initRouter } from './router.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render layout components
  renderNavbar();
  renderFooter();

  // 2. Initialize SPA Router
  initRouter();
});
