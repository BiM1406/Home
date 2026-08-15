/* ========================================================
   RoomRent — Slideshow Engine  (FR-03.3 & FR-03.4)
   --------------------------------------------------------
   • Hero Carousel:   autoplay, arrows, dots, touch swipe
   • Detail Gallery:  thumbnail strip, counter, Lightbox
   • Seamless infinite loop (clone technique)
   • Vanilla JS · ES6 · Zero dependencies · Mobile-first
   ======================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------
     Configuration & small helpers
     ------------------------------------------------------ */
  var CONFIG = {
    interval: 5000,       // default autoplay delay (ms)
    swipeThreshold: 48,   // minimum px to commit a swipe
    swipeRatio: 0.2,      // or 20% of viewport width
    dragResist: 0.4,      // resistance when dragging past an edge (non-loop)
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
  };

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function debounce(fn, ms) {
    var timer;
    return function () {
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(null, args); }, ms);
    };
  }

  /* ======================================================
     Slideshow class
     ====================================================== */
  function Slideshow(container, options) {
    this.container = container;
    this.track = container.querySelector('.hero-slide-track, .detail-slide-track');
    this.isGallery = !!container.querySelector('.detail-slide-track');
    if (!this.track) return null;

    this.items = Array.prototype.slice.call(this.track.children);
    if (this.items.length < 1) return null;

    var d = container.dataset;
    var modeDefaults = this.isGallery
      ? { loop: false, autoplay: false, interval: 0, label: 'Thư viện ảnh phòng' }
      : { loop: true, autoplay: true, interval: CONFIG.interval, label: 'Băng chuyền tin nổi bật' };

    this.loop = d.loop !== undefined ? d.loop !== 'false' : modeDefaults.loop;
    this.autoplay = d.autoplay !== undefined ? d.autoplay !== 'false' : modeDefaults.autoplay;
    this.interval = parseInt(d.interval, 10) || modeDefaults.interval || CONFIG.interval;
    this.label = d.label || modeDefaults.label;

    this.index = 0;
    this.width = 0;
    this.trackIndex = 0;
    this.baseTransition = this.track.style.transition
      || getComputedStyle(this.track).transition
      || 'transform 0.4s ease';

    this.dots = [];
    this.dotsContainer = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.counter = null;
    this.thumbsContainer = null;
    this.thumbs = [];
    this.lightboxModal = null;
    this.lightboxIndex = 0;

    this.isDragging = false;
    this.hasMoved = false;
    this.suppressClick = false;
    this.pointerId = null;
    this.startX = 0;
    this.startY = 0;
    this.deltaX = 0;
    this.autoplayTimer = null;
    this.focusedBeforeLightbox = null;

    this._init();
  }

  /* ---------- init ---------- */
  Slideshow.prototype._init = function () {
    this._setAria();
    this._buildClones();
    this._buildArrows();
    this._buildDots();
    this._buildCounter();
    this._buildThumbs();
    this._buildLightbox();
    this._measure();
    this._bindEvents();
    this._render(false);
    this._autoplayStart();
  };

  Slideshow.prototype._setAria = function () {
    if (!this.container.hasAttribute('role')) {
      this.container.setAttribute('role', 'region');
      this.container.setAttribute('aria-roledescription', 'carousel');
      this.container.setAttribute('aria-label', this.label);
    }
    if (!this.container.hasAttribute('tabindex')) {
      this.container.setAttribute('tabindex', '0');
    }
  };

  /* ---------- seamless loop clones ---------- */
  Slideshow.prototype._buildClones = function () {
    if (!this.loop || this.items.length < 2) {
      this.trackIndex = 0;
      return;
    }
    var first = this.items[0].cloneNode(true);
    var last = this.items[this.items.length - 1].cloneNode(true);
    first.setAttribute('aria-hidden', 'true');
    last.setAttribute('aria-hidden', 'true');
    this.track.appendChild(first);
    this.track.insertBefore(last, this.track.firstChild);
    this.trackIndex = 1;
  };

  /* ---------- arrows ---------- */
  Slideshow.prototype._buildArrows = function () {
    var self = this;
    if (!this.isGallery && this.container.querySelector('.slide-arrow')) return;

    var mk = function (cls, label, action) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'slide-arrow ' + cls;
      btn.setAttribute('aria-label', label);
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        self._step(action);
      });
      self.container.appendChild(btn);
      return btn;
    };

    if (this.items.length > 1) {
      this.prevBtn = mk('slide-arrow-prev', 'Slide trước', -1);
      this.nextBtn = mk('slide-arrow-next', 'Slide sau', 1);
    }
  };

  /* ---------- dots ---------- */
  Slideshow.prototype._buildDots = function () {
    var self = this;
    if (this.isGallery || this.container.querySelector('.slide-dots')) return;
    if (this.items.length < 2) return;

    this.dotsContainer = document.createElement('div');
    this.dotsContainer.className = 'slide-dots';
    this.items.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slide-dot';
      dot.setAttribute('aria-label', 'Đi tới slide ' + (i + 1));
      dot.addEventListener('click', function () { self.goTo(i); });
      self.dotsContainer.appendChild(dot);
    });
    this.container.appendChild(this.dotsContainer);
    this.dots = Array.prototype.slice.call(this.dotsContainer.children);
  };

  /* ---------- counter ---------- */
  Slideshow.prototype._buildCounter = function () {
    if (!this.isGallery) return;
    if (this.container.querySelector('.gallery-counter-badge')) return;
    this.counter = document.createElement('span');
    this.counter.className = 'gallery-counter-badge';
    this.counter.setAttribute('aria-live', 'polite');
    this.container.appendChild(this.counter);
  };

  /* ---------- thumbnails ---------- */
  Slideshow.prototype._buildThumbs = function () {
    var self = this;
    if (!this.isGallery) return;

    this.thumbsContainer = this.container.querySelector('.detail-thumb-strip');
    if (this.thumbsContainer) {
      this.thumbs = Array.prototype.slice.call(
        this.thumbsContainer.querySelectorAll('.detail-thumb-item')
      );
      this.thumbs.forEach(function (thumb, i) {
        thumb.addEventListener('click', function () { self.goTo(i); });
      });
      return;
    }

    this.thumbsContainer = document.createElement('div');
    this.thumbsContainer.className = 'detail-thumb-strip';
    this.items.forEach(function (item, i) {
      var img = item.tagName === 'IMG' ? item : item.querySelector('img');
      var thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'detail-thumb-item';
      thumb.setAttribute('aria-label', 'Xem ảnh ' + (i + 1));
      var t = document.createElement('img');
      if (img) {
        t.src = img.currentSrc || img.getAttribute('src') || '';
        t.alt = img.alt || '';
      }
      thumb.appendChild(t);
      thumb.addEventListener('click', function () { self.goTo(i); });
      self.thumbsContainer.appendChild(thumb);
      self.thumbs.push(thumb);
    });
    var wrap = this.container.closest('.detail-gallery-container') || this.container;
    wrap.appendChild(this.thumbsContainer);
  };

  /* ---------- lightbox ---------- */
  Slideshow.prototype._buildLightbox = function () {
    var self = this;
    if (!this.isGallery) return;

    var modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Xem ảnh phòng');
    modal.innerHTML =
      '<button type="button" class="slide-arrow slide-arrow-prev lightbox-prev" aria-label="Ảnh trước">&#8249;</button>' +
      '<div class="lightbox-img-wrap" data-lightbox-stage><img src="" alt="Ảnh phòng"></div>' +
      '<button type="button" class="slide-arrow slide-arrow-next lightbox-next" aria-label="Ảnh sau">&#8250;</button>' +
      '<button type="button" class="lightbox-close-btn" aria-label="Đóng">&#10005;</button>' +
      '<span class="gallery-counter-badge lightbox-counter" aria-live="polite"></span>';
    document.body.appendChild(modal);
    this.lightboxModal = modal;
    this.lightboxStage = modal.querySelector('[data-lightbox-stage]');
    this.lightboxImg = modal.querySelector('img');
    this.lightboxCounter = modal.querySelector('.lightbox-counter');

    modal.querySelector('.lightbox-close-btn').addEventListener('click', function () {
      self.closeLightbox();
    });
    modal.querySelector('.lightbox-prev').addEventListener('click', function () {
      self._lightboxStep(-1);
    });
    modal.querySelector('.lightbox-next').addEventListener('click', function () {
      self._lightboxStep(1);
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) self.closeLightbox();
    });
  };

  Slideshow.prototype.openLightbox = function (index) {
    if (!this.lightboxModal) return;
    this.focusedBeforeLightbox = document.activeElement;
    this.lightboxIndex = index != null ? index : this.index;
    this._lightboxShow(this.lightboxIndex, false);
    this.lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    var close = this.lightboxModal.querySelector('.lightbox-close-btn');
    if (close) close.focus();
  };

  Slideshow.prototype.closeLightbox = function () {
    if (!this.lightboxModal) return;
    this.lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
    if (this.focusedBeforeLightbox && this.focusedBeforeLightbox.focus) {
      this.focusedBeforeLightbox.focus();
    }
    this.focusedBeforeLightbox = null;
  };

  Slideshow.prototype._lightboxStep = function (dir) {
    var n = this.items.length;
    this.lightboxIndex = (this.lightboxIndex + dir + n) % n;
    this._lightboxShow(this.lightboxIndex, true);
  };

  Slideshow.prototype._lightboxShow = function (i, animate) {
    var img = this.items[i];
    var src = img.tagName === 'IMG' ? (img.currentSrc || img.getAttribute('src')) : null;
    if (!src) {
      var inner = img.querySelector('img');
      src = inner ? (inner.currentSrc || inner.getAttribute('src')) : '';
    }
    this.lightboxImg.setAttribute('src', src || '');
    this.lightboxImg.setAttribute('alt', img.getAttribute('alt') || 'Ảnh phòng');
    this.lightboxCounter.textContent = (i + 1) + ' / ' + this.items.length;

    if (animate && !CONFIG.reducedMotion.matches) {
      this.lightboxStage.style.transition = 'opacity 0.18s ease';
      this.lightboxStage.style.opacity = '0.3';
      var self = this;
      window.setTimeout(function () {
        self.lightboxStage.style.opacity = '1';
      }, 40);
    }
  };

  /* ---------- measurement & render ---------- */
  Slideshow.prototype._measure = function () {
    this.width = this.container.clientWidth || this.track.clientWidth || 1;
  };

  Slideshow.prototype._getTrackIndex = function () {
    return this.loop ? this.index + 1 : this.index;
  };

  Slideshow.prototype._render = function (animate) {
    var reduced = CONFIG.reducedMotion.matches;
    this.track.style.transition = (animate && !reduced) ? this.baseTransition : 'none';
    this.track.style.transform =
      'translate3d(' + (-this._getTrackIndex() * this.width) + 'px, 0, 0)';
    this._updateDots();
    this._updateThumbs();
    this._updateCounter();
  };

  Slideshow.prototype._updateDots = function () {
    this.dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === this.index);
      if (i === this.index) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    }, this);
  };

  Slideshow.prototype._updateThumbs = function () {
    this.thumbs.forEach(function (thumb, i) {
      thumb.classList.toggle('active', i === this.index);
    }, this);
  };

  Slideshow.prototype._updateCounter = function () {
    if (this.counter) {
      this.counter.textContent = (this.index + 1) + ' / ' + this.items.length;
    }
  };

  /* ---------- navigation ---------- */
  Slideshow.prototype.goTo = function (i) {
    var n = this.items.length;
    i = clamp(i, 0, n - 1);
    var diff = i - this.index;
    var forward = (diff + n) % n;
    var back = (n - forward) % n;
    var dir = forward <= back ? forward : -back;
    this.trackIndex += dir;
    this.index = i;
    this._render(true);
    this._resetAutoplay();
  };

  Slideshow.prototype._step = function (dir) {
    var n = this.items.length;
    if (!this.loop) {
      if (this.index + dir < 0 || this.index + dir > n - 1) {
        this._render(true);
        return;
      }
    }
    this.trackIndex += dir;
    this.index = (this.index + dir + n) % n;
    this._render(true);
    this._resetAutoplay();
  };

  Slideshow.prototype._onTransitionEnd = function (e) {
    if (e.target !== this.track || this.isDragging || !this.loop) return;
    var n = this.items.length;
    if (this.trackIndex === n + 1) {
      this.trackIndex = 1;
      this._render(false);
    } else if (this.trackIndex === 0) {
      this.trackIndex = n;
      this._render(false);
    }
  };

  /* ---------- autoplay ---------- */
  Slideshow.prototype._autoplayStart = function () {
    var self = this;
    this._autoplayStop();
    if (!this.autoplay || this.items.length < 2) return;
    if (CONFIG.reducedMotion.matches) return;
    this.autoplayTimer = window.setInterval(function () {
      self._step(1);
    }, this.interval);
  };

  Slideshow.prototype._autoplayStop = function () {
    if (this.autoplayTimer) {
      window.clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  };

  Slideshow.prototype._resetAutoplay = function () {
    if (this.autoplay && !CONFIG.reducedMotion.matches) {
      this._autoplayStart();
    }
  };

  /* ---------- drag / swipe (pointer events) ---------- */
  Slideshow.prototype._bindDrag = function () {
    var self = this;
    this.track.addEventListener('pointerdown', function (e) { self._onPointerDown(e); });
    this.track.addEventListener('pointermove', function (e) { self._onPointerMove(e); });
    this.track.addEventListener('pointerup', function (e) { self._onPointerUp(e); });
    this.track.addEventListener('pointercancel', function (e) { self._onPointerUp(e); });
  };

  Slideshow.prototype._onPointerDown = function (e) {
    if (this.isDragging) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.target.closest('button, a')) return;

    this._autoplayStop();
    this.isDragging = true;
    this.hasMoved = false;
    this.suppressClick = false;
    this.pointerId = e.pointerId;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.deltaX = 0;
    this.track.style.transition = 'none';
    if (this.track.setPointerCapture) {
      try { this.track.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
    }
  };

  Slideshow.prototype._onPointerMove = function (e) {
    if (!this.isDragging || e.pointerId !== this.pointerId) return;
    var dx = e.clientX - this.startX;
    var dy = e.clientY - this.startY;

    if (!this.hasMoved) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6) {
        this._endDrag();
        this._render(true);
        return;
      }
      if (Math.abs(dx) < 6) return;
      this.hasMoved = true;
    }

    this.deltaX = dx;
    this.suppressClick = true;
    this._applyDragTransform();
  };

  Slideshow.prototype._onPointerUp = function (e) {
    if (!this.isDragging || e.pointerId !== this.pointerId) return;
    var dx = this.deltaX;
    var width = this.width;
    var threshold = Math.min(CONFIG.swipeThreshold, width * CONFIG.swipeRatio);

    if (this.hasMoved) {
      if (dx <= -threshold) {
        this._step(1);
      } else if (dx >= threshold) {
        this._step(-1);
      } else {
        this._render(true);
      }
    } else {
      this._render(true);
    }
    this._endDrag();
    this._resetAutoplay();
  };

  Slideshow.prototype._applyDragTransform = function () {
    var base = -this._getTrackIndex() * this.width;
    var dx = this.deltaX;
    if (!this.loop) {
      var n = this.items.length;
      if (this.index === 0 && dx > 0) dx = dx * CONFIG.dragResist;
      if (this.index === n - 1 && dx < 0) dx = dx * CONFIG.dragResist;
    }
    this.track.style.transform = 'translate3d(' + (base + dx) + 'px, 0, 0)';
  };

  Slideshow.prototype._endDrag = function () {
    this.isDragging = false;
    this.hasMoved = false;
    if (this.pointerId != null && this.track.releasePointerCapture) {
      try { this.track.releasePointerCapture(this.pointerId); } catch (err) { /* noop */ }
    }
    this.pointerId = null;
  };

  Slideshow.prototype._suppressClick = function (e) {
    if (this.suppressClick) {
      e.preventDefault();
      e.stopPropagation();
      this.suppressClick = false;
    }
  };

  /* ---------- lightbox swipe ---------- */
  Slideshow.prototype._bindLightboxDrag = function () {
    var self = this;
    var startX = 0;
    var startY = 0;
    var deltaX = 0;
    var active = false;
    var id = null;

    this.lightboxStage.style.touchAction = 'pan-y';
    this.lightboxStage.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button, a')) return;
      active = true;
      id = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      deltaX = 0;
      self.lightboxStage.style.transition = 'none';
      if (self.lightboxStage.setPointerCapture) {
        try { self.lightboxStage.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
      }
    });

    this.lightboxStage.addEventListener('pointermove', function (e) {
      if (!active || e.pointerId !== id) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6) {
        active = false;
        self.lightboxStage.style.transform = '';
        self.lightboxStage.style.opacity = '';
        return;
      }
      deltaX = dx;
      self.lightboxStage.style.transform = 'translate3d(' + dx + 'px, 0, 0)';
      self.lightboxStage.style.opacity = String(clamp(1 - Math.abs(dx) / (self.width * 0.6), 0.3, 1));
    });

    this.lightboxStage.addEventListener('pointerup', function (e) {
      if (!active || e.pointerId !== id) return;
      active = false;
      var threshold = Math.min(CONFIG.swipeThreshold, self.width * CONFIG.swipeRatio);
      self.lightboxStage.style.transition = '';
      self.lightboxStage.style.transform = '';
      self.lightboxStage.style.opacity = '1';
      if (deltaX <= -threshold) self._lightboxStep(1);
      else if (deltaX >= threshold) self._lightboxStep(-1);
    });
  };

  /* ---------- keyboard & resize ---------- */
  Slideshow.prototype._onKeyDown = function (e) {
    if (this.lightboxModal && this.lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this._lightboxStep(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this._lightboxStep(1);
      }
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this._step(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this._step(1);
    }
  };

  Slideshow.prototype._onVisibility = function () {
    if (document.hidden) {
      this._autoplayStop();
    } else {
      this._resetAutoplay();
    }
  };

  Slideshow.prototype._bindEvents = function () {
    var self = this;
    this._bindDrag();

    if (this.lightboxStage) {
      this._bindLightboxDrag();
      this.track.addEventListener('click', function (e) {
        if (self.suppressClick) return;
        var img = e.target.closest('.detail-slide-img');
        if (img) {
          e.preventDefault();
          self.openLightbox(self.index);
        }
      });
    }

    this.container.addEventListener('click', function (e) { self._suppressClick(e); });
    this.container.addEventListener('keydown', function (e) { self._onKeyDown(e); });

    this.track.addEventListener('transitionend', function (e) { self._onTransitionEnd(e); });

    this._onResize = debounce(function () {
      self._measure();
      self._render(false);
    }, 150);
    window.addEventListener('resize', this._onResize);

    document.addEventListener('visibilitychange', this._onVisibilityBound = function () {
      self._onVisibility();
    });

    this._reduceChange = function (e) {
      if (e.matches) self._autoplayStop();
      else self._resetAutoplay();
    };
    CONFIG.reducedMotion.addEventListener('change', this._reduceChange);

    if (!this.isGallery) {
      // Giữ autoplay tự động chạy liên tục không bị dừng khi di chuột
    }

    this.track.addEventListener('click', function (e) { self._suppressClick(e); });
  };

  /* ---------- destroy ---------- */
  Slideshow.prototype.destroy = function () {
    this._autoplayStop();
    if (this._onResize) window.removeEventListener('resize', this._onResize);
    if (this._onVisibilityBound) {
      document.removeEventListener('visibilitychange', this._onVisibilityBound);
    }
    if (this._reduceChange) {
      CONFIG.reducedMotion.removeEventListener('change', this._reduceChange);
    }
    if (this.lightboxModal && this.lightboxModal.parentNode) {
      this.lightboxModal.parentNode.removeChild(this.lightboxModal);
    }
    delete this.container.__slideshow;
  };

  /* ======================================================
     Public API & auto-init
     ====================================================== */
  function createSlideshow(el) {
    if (!el || el.__slideshow) return el && el.__slideshow;
    if (el.dataset.slideshow === 'disabled') return null;
    var instance = new Slideshow(el);
    if (instance) {
      el.__slideshow = instance;
      return instance;
    }
    return null;
  }

  function initAll(root) {
    root = root || document;
    var instances = [];
    var selectors = ['.hero-slideshow-container', '.detail-main-viewport', '[data-slideshow]'];
    selectors.forEach(function (selector) {
      root.querySelectorAll(selector).forEach(function (el) {
        var inst = createSlideshow(el);
        if (inst) instances.push(inst);
      });
    });
    return instances;
  }

  function initMobileMenuNav() {
    var toggleBtn = document.getElementById('mobile-menu-toggle-btn');
    var navLinks = document.getElementById('main-nav-links');
    var backdrop = document.getElementById('mobile-menu-backdrop');
    if (!toggleBtn || !navLinks) return;

    function openMenu() {
      navLinks.classList.add('show');
      if (backdrop) backdrop.classList.add('show');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      navLinks.classList.remove('show');
      if (backdrop) backdrop.classList.remove('show');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', function(e) {
      if (e) e.stopPropagation();
      var isOpen = navLinks.classList.contains('show');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }

    var links = navLinks.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', closeMenu);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('show')) {
        closeMenu();
      }
    });
  }

  function bootstrap() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        initAll();
        initMobileMenuNav();
      });
    } else {
      initAll();
      initMobileMenuNav();
    }
  }

  window.RoomRentSlideshow = {
    Slideshow: Slideshow,
    init: initAll,
    initMobileNav: initMobileMenuNav,
    destroy: function (el) {
      if (el && el.__slideshow) el.__slideshow.destroy();
    }
  };

  bootstrap();
})();