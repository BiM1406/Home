/**
 * RoomRent - Seamless Client-side Router (PJAX)
 * Keeps Header & Footer persistent, smoothly replaces main content without full page reload.
 */
(function () {
  'use strict';

  // Check if browser supports fetch & history API
  if (!window.fetch || !window.history || !window.history.pushState) {
    return;
  }

  // Intercept all local link clicks
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href) return;

    // Ignore hash only, external links, mailto, tel, downloads, or target="_blank"
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      link.hasAttribute('download') ||
      link.getAttribute('target') === '_blank' ||
      link.origin !== window.location.origin
    ) {
      return;
    }

    // Only process .html or internal paths
    var isHtmlRoute = href.endsWith('.html') || href.includes('.html?') || href.includes('.html#') || href.startsWith('/');
    if (!isHtmlRoute) return;

    e.preventDefault();
    navigateTo(link.href);
  });

  // Handle browser Back / Forward buttons
  window.addEventListener('popstate', function () {
    loadPage(window.location.href, false);
  });

  function navigateTo(url) {
    if (url === window.location.href) return;
    loadPage(url, true);
  }

  function loadPage(url, push) {
    var mainEl = document.getElementById('main-content');
    if (!mainEl) {
      window.location.href = url;
      return;
    }

    // Visual loading state / fade out
    mainEl.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    mainEl.style.opacity = '0.4';
    mainEl.style.transform = 'translateY(4px)';

    fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error('Page load error');
        return response.text();
      })
      .then(function (html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        // Update Title
        if (doc.title) {
          document.title = doc.title;
        }

        // Replace main content
        var newMain = doc.getElementById('main-content');
        if (newMain) {
          mainEl.innerHTML = newMain.innerHTML;
          // Copy any classes or data attributes
          mainEl.className = newMain.className;
        } else {
          // Fallback if target has no #main-content
          window.location.href = url;
          return;
        }

        // Update URL
        if (push) {
          window.history.pushState({}, '', url);
        }

        // Update Header Active Links
        updateActiveNavLinks(url);

        // Scroll to top or target hash
        if (url.includes('#')) {
          var hash = url.split('#')[1];
          var targetEl = document.getElementById(hash);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }

        // Fade in
        setTimeout(function () {
          mainEl.style.opacity = '1';
          mainEl.style.transform = 'translateY(0)';
        }, 30);

        // Re-execute page scripts if needed
        dispatchPageLoadEvent(url);
      })
      .catch(function (err) {
        console.error('[Router] Fallback navigation:', err);
        window.location.href = url;
      });
  }

  function updateActiveNavLinks(url) {
    var navLinks = document.querySelectorAll('.nav-link');
    var pathName = new URL(url).pathname.split('/').pop() || 'index.html';

    navLinks.forEach(function (link) {
      var linkPath = link.getAttribute('href').split('?')[0].split('#')[0];
      if (linkPath === pathName || (pathName === '' && linkPath === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    // Close mobile menu if open
    var mobileMenu = document.getElementById('main-nav-links');
    var backdrop = document.getElementById('mobile-menu-backdrop');
    if (mobileMenu && mobileMenu.classList.contains('is-open')) {
      mobileMenu.classList.remove('is-open');
    }
    if (backdrop && backdrop.classList.contains('is-open')) {
      backdrop.classList.remove('is-open');
    }
  }

  function dispatchPageLoadEvent(url) {
    var event = new CustomEvent('spa:navigated', { detail: { url: url } });
    document.dispatchEvent(event);
  }

  // Export helper for programmatic navigation
  window.RoomRentRouter = {
    navigate: navigateTo
  };
})();
