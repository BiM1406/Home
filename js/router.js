/**
 * Vanilla SPA Hash Router
 * Listens to hashchange events and mounts view modules dynamically
 */
import { renderHomeView } from './views/homeView.js';
import { renderSearchView } from './views/searchView.js';
import { renderDetailView } from './views/detailView.js';
import { renderPostPropertyView } from './views/postPropertyView.js';
import { renderChatView } from './views/chatView.js';
import { renderContractView } from './views/contractView.js';
import { renderDashboardView } from './views/dashboardView.js';
import { renderAdminView } from './views/adminView.js';

// Route definition mapping
const routes = {
  '': renderHomeView,
  '#/': renderHomeView,
  '#/search': renderSearchView,
  '#/detail': renderDetailView,
  '#/post-property': renderPostPropertyView,
  '#/chat': renderChatView,
  '#/contract': renderContractView,
  '#/dashboard': renderDashboardView,
  '#/admin': renderAdminView
};

/**
 * Handle route changes
 */
export function handleRoute() {
  const hash = window.location.hash.split('?')[0] || '';
  const appContainer = document.getElementById('app');

  if (!appContainer) return;

  const viewHandler = routes[hash] || routes[''];
  
  // Clear and render new view
  appContainer.innerHTML = '';
  const viewElement = document.createElement('div');
  viewElement.className = 'view-transition';
  appContainer.appendChild(viewElement);

  if (typeof viewHandler === 'function') {
    viewHandler(viewElement);
  }

  // Scroll to top upon navigation
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/**
 * Initialize Router listeners
 */
export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  // Initial load
  handleRoute();
}

/**
 * Programmatic navigation helper
 * @param {string} path - e.g. '#/search' or '#/detail?id=1'
 */
export function navigateTo(path) {
  window.location.hash = path;
}
