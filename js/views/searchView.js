/**
 * Search View Module (Trang Tìm Kiếm & Bộ Lọc Nâng Cao)
 * Editorial Luxury Theme with Centered Header, Real-time Multi-Faceted Filters & Dual Currency Sync
 */
import { Store } from '../services/store.js';
import { AuthService } from '../services/auth.js';

export function renderSearchView(container) {
  // Parse URL search params
  const hash = window.location.hash || '';
  const queryString = hash.includes('?') ? hash.split('?')[1] : '';
  const params = new URLSearchParams(queryString);

  // State
  const filterState = {
    keyword: params.get('q') || '',
    category: params.get('category') || 'all',
    city: params.get('city') || 'all',
    priceRange: params.get('price') || 'all',
    amenity: params.get('amenity') || 'all',
    onlyVerified: false,
    onlyVip: false,
    sortBy: 'default'
  };

  function getFilteredProperties() {
    let list = Store.getProperties();

    // 1. Keyword search (title, address, district, city)
    if (filterState.keyword.trim()) {
      const q = filterState.keyword.toLowerCase().trim();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.location.address.toLowerCase().includes(q) ||
        p.location.district.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q)
      );
    }

    // 2. Category
    if (filterState.category !== 'all') {
      list = list.filter(p => p.category === filterState.category);
    }

    // 3. City
    if (filterState.city !== 'all') {
      list = list.filter(p => p.location.city.toLowerCase() === filterState.city.toLowerCase());
    }

    // 4. Price Preset
    if (filterState.priceRange !== 'all') {
      if (filterState.priceRange === 'under-3m') list = list.filter(p => p.price < 3000000);
      else if (filterState.priceRange === '3m-7m') list = list.filter(p => p.price >= 3000000 && p.price <= 7000000);
      else if (filterState.priceRange === '7m-15m') list = list.filter(p => p.price > 7000000 && p.price <= 15000000);
      else if (filterState.priceRange === 'above-15m') list = list.filter(p => p.price > 15000000);
    }

    // 5. Amenity
    if (filterState.amenity !== 'all') {
      const am = filterState.amenity.toLowerCase();
      list = list.filter(p => {
        const joined = (p.amenities || []).join(' ').toLowerCase();
        if (am === 'pool') return joined.includes('hồ bơi');
        if (am === 'mezzanine') return joined.includes('gác lửng');
        if (am === 'security') return joined.includes('an ninh') || joined.includes('bảo vệ');
        if (am === 'furnished') return joined.includes('full nội thất') || joined.includes('nội thất');
        return true;
      });
    }

    // 6. Verified
    if (filterState.onlyVerified) {
      list = list.filter(p => p.isVerified);
    }

    // 7. VIP
    if (filterState.onlyVip) {
      list = list.filter(p => p.isVip);
    }

    // Sort
    if (filterState.sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (filterState.sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (filterState.sortBy === 'area-desc') {
      list.sort((a, b) => b.area - a.area);
    }

    return list;
  }

  function render() {
    const properties = getFilteredProperties();

    container.innerHTML = `
      <div class="search-page-wrapper">
        <!-- Search Page Header (Centered Luxury Editorial) -->
        <header class="search-page-header">
          <div class="header-overlay"></div>
          
          <div class="container search-header-content">
            <span class="badge badge-vip">DANH MỤC TRỰC TIẾP CHỦ NHÀ</span>
            
            <h1 class="search-header-title">
              Tìm Kiếm Không Gian Cho Thuê <span style="font-style: italic; color: var(--gold-light); font-weight: 400;">Lý Tưởng</span>
            </h1>
            
            <p class="search-header-subtitle">
              Khám phá phòng trọ, căn hộ cao cấp và biệt thự nghỉ dưỡng — Kết nối trực tiếp Chủ nhà, ký hợp đồng điện tử 0% chi phí môi giới.
            </p>

            <!-- Search Bar Input Centered -->
            <div class="search-bar-unified">
              <input 
                type="text" 
                id="search-input-field" 
                placeholder="Nhập tên đường, quận, thành phố hoặc tiện ích cần tìm..." 
                value="${filterState.keyword}"
              />
              <button class="btn btn-accent" id="btn-search-exec" style="padding: 0.75rem 1.85rem;">
                <span>Tìm Kiếm</span>
              </button>
            </div>
          </div>
        </header>

        <!-- Main Search Layout (Centered 1440px Container) -->
        <div class="search-layout-wrapper">
          <!-- Filter Sidebar -->
          <aside class="filter-sidebar">
            <div class="filter-sidebar-header">
              <h3 style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 700; color: var(--text-main);">
                Bộ Lọc Nâng Cao
              </h3>
              <button id="btn-reset-filters" style="background: none; border: none; font-size: 0.82rem; font-weight: 700; color: var(--accent); cursor: pointer; text-decoration: underline;">
                Thiết lập lại
              </button>
            </div>

            <!-- Filter: Category -->
            <div class="filter-group">
              <div class="filter-group-title">LOẠI HÌNH BẤT ĐỘNG SẢN</div>
              <div class="filter-pill-grid">
                <button class="filter-pill-item ${filterState.category === 'all' ? 'active' : ''}" data-category="all">Tất cả</button>
                <button class="filter-pill-item ${filterState.category === 'villa' ? 'active' : ''}" data-category="villa">Villa</button>
                <button class="filter-pill-item ${filterState.category === 'apartment' ? 'active' : ''}" data-category="apartment">Căn hộ</button>
                <button class="filter-pill-item ${filterState.category === 'room' ? 'active' : ''}" data-category="room">Phòng trọ</button>
                <button class="filter-pill-item ${filterState.category === 'studio' ? 'active' : ''}" data-category="studio">Studio</button>
              </div>
            </div>

            <!-- Filter: City -->
            <div class="filter-group">
              <div class="filter-group-title">KHU VỰC / THÀNH PHỐ</div>
              <div class="filter-pill-grid">
                <button class="filter-pill-item ${filterState.city === 'all' ? 'active' : ''}" data-city="all">Tất cả</button>
                <button class="filter-pill-item ${filterState.city === 'Hà Nội' ? 'active' : ''}" data-city="Hà Nội">Hà Nội</button>
                <button class="filter-pill-item ${filterState.city === 'TP. Hồ Chí Minh' ? 'active' : ''}" data-city="TP. Hồ Chí Minh">TP. HCM</button>
                <button class="filter-pill-item ${filterState.city === 'Đà Nẵng' ? 'active' : ''}" data-city="Đà Nẵng">Đà Nẵng</button>
              </div>
            </div>

            <!-- Filter: Price Range Presets -->
            <div class="filter-group">
              <div class="filter-group-title">KHOẢNG GIÁ DỰ KIẾN</div>
              <div class="filter-pill-grid">
                <button class="filter-pill-item ${filterState.priceRange === 'all' ? 'active' : ''}" data-price="all">Tất cả</button>
                <button class="filter-pill-item ${filterState.priceRange === 'under-3m' ? 'active' : ''}" data-price="under-3m">&lt; 3 triệu</button>
                <button class="filter-pill-item ${filterState.priceRange === '3m-7m' ? 'active' : ''}" data-price="3m-7m">3 - 7 triệu</button>
                <button class="filter-pill-item ${filterState.priceRange === '7m-15m' ? 'active' : ''}" data-price="7m-15m">7 - 15 triệu</button>
                <button class="filter-pill-item ${filterState.priceRange === 'above-15m' ? 'active' : ''}" data-price="above-15m">&gt; 15 triệu</button>
              </div>
            </div>

            <!-- Filter: Special Amenity Priority -->
            <div class="filter-group">
              <div class="filter-group-title">TIỆN ÍCH NỔI BẬT</div>
              <div class="filter-pill-grid">
                <button class="filter-pill-item ${filterState.amenity === 'all' ? 'active' : ''}" data-amenity="all">Tất cả</button>
                <button class="filter-pill-item ${filterState.amenity === 'pool' ? 'active' : ''}" data-amenity="pool">Hồ bơi</button>
                <button class="filter-pill-item ${filterState.amenity === 'mezzanine' ? 'active' : ''}" data-amenity="mezzanine">Gác lửng</button>
                <button class="filter-pill-item ${filterState.amenity === 'security' ? 'active' : ''}" data-amenity="security">An ninh 24/7</button>
                <button class="filter-pill-item ${filterState.amenity === 'furnished' ? 'active' : ''}" data-amenity="furnished">Full nội thất</button>
              </div>
            </div>

            <!-- Filter: Trust & Verification Checkboxes -->
            <div class="filter-group">
              <div class="filter-group-title">TIÊU CHUẨN XÁC THỰC</div>
              <label class="filter-checkbox-item">
                <input type="checkbox" id="chk-verified" ${filterState.onlyVerified ? 'checked' : ''} />
                <span>Chính chủ đã xác thực</span>
              </label>
              <label class="filter-checkbox-item">
                <input type="checkbox" id="chk-vip" ${filterState.onlyVip ? 'checked' : ''} />
                <span>Bất động sản VIP / Cao cấp</span>
              </label>
            </div>
          </aside>

          <!-- Search Results Area -->
          <main class="search-results-area">
            <!-- Topbar Results Count & Sorting -->
            <div class="search-results-topbar">
              <div class="results-count-text">
                Tìm thấy <span style="color: var(--accent); font-weight: 800;">${properties.length}</span> bất động sản phù hợp
              </div>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <label style="font-size: 0.88rem; font-weight: 700; color: var(--text-muted);">Sắp xếp:</label>
                <select id="sort-select-box" class="sort-select">
                  <option value="default" ${filterState.sortBy === 'default' ? 'selected' : ''}>Mới nhất</option>
                  <option value="price-asc" ${filterState.sortBy === 'price-asc' ? 'selected' : ''}>Giá thấp đến cao</option>
                  <option value="price-desc" ${filterState.sortBy === 'price-desc' ? 'selected' : ''}>Giá cao đến thấp</option>
                  <option value="area-desc" ${filterState.sortBy === 'area-desc' ? 'selected' : ''}>Diện tích lớn nhất</option>
                </select>
              </div>
            </div>

            <!-- Property Cards Grid (2 Columns, Balanced & Spacious) -->
            <div class="property-cards-grid">
              ${properties.length > 0 ? properties.map(property => {
                const isFav = Store.isFavorite(property.id);
                const priceFormatted = AuthService.formatPrice(property.price, property.priceUsd);

                return `
                  <article class="property-card" data-id="${property.id}">
                    <!-- Card Image with Badges & Fav Heart -->
                    <div class="card-image-wrapper">
                      <img src="${property.images[0]}" alt="${property.title}" loading="lazy" />
                      
                      <div class="card-badges-floating">
                        ${property.isVip ? '<span class="badge badge-vip">VIP</span>' : ''}
                        ${property.isVerified ? '<span class="badge badge-verified">✓ Chính Chủ</span>' : ''}
                        <span class="badge" style="background: rgba(27, 18, 14, 0.75); color: #fff;">${property.type}</span>
                      </div>

                      <button class="card-fav-btn ${isFav ? 'active' : ''}" data-id="${property.id}" title="${isFav ? 'Bỏ lưu yêu thích' : 'Lưu yêu thích'}">
                        <svg viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>

                    <!-- Card Body -->
                    <div class="card-content-body">
                      <div class="card-location-meta">
                        <span>${property.location.district}, ${property.location.city}</span>
                      </div>

                      <a href="#/detail?id=${property.id}" class="card-property-title">
                        ${property.title}
                      </a>

                      <div class="card-specs-row">
                        <span>${property.area} m²</span>
                        <span>•</span>
                        <span>${property.bedrooms} Phòng Ngủ</span>
                        <span>•</span>
                        <span>${property.bathrooms} WC</span>
                      </div>

                      <div class="card-footer-row">
                        <div>
                          <span style="display: block; font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">GIÁ THUÊ</span>
                          <span class="card-price-val">${priceFormatted}</span>
                        </div>
                        <a href="#/detail?id=${property.id}" class="card-detail-cta">
                          <span>Chi Tiết &rsaquo;</span>
                        </a>
                      </div>
                    </div>
                  </article>
                `;
              }).join('') : `
                <div class="empty-results-box">
                  <h3 style="font-family: var(--font-serif); font-size: 1.5rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">
                    Không tìm thấy bất động sản phù hợp
                  </h3>
                  <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem;">
                    Hãy thử xóa bớt bộ lọc hoặc tìm kiếm theo từ khóa khu vực khác để khám phá thêm nhiều lựa chọn.
                  </p>
                  <button class="btn btn-accent" id="btn-empty-reset">
                    <span>Xóa Tất Cả Bộ Lọc</span>
                  </button>
                </div>
              `}
            </div>
          </main>
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    // 1. Keyword search
    const input = document.getElementById('search-input-field');
    const searchBtn = document.getElementById('btn-search-exec');
    if (input && searchBtn) {
      const executeSearch = () => {
        filterState.keyword = input.value;
        render();
      };
      searchBtn.addEventListener('click', executeSearch);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') executeSearch();
      });
    }

    // 2. Category pills
    container.querySelectorAll('[data-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        filterState.category = btn.dataset.category;
        render();
      });
    });

    // 3. City pills
    container.querySelectorAll('[data-city]').forEach(btn => {
      btn.addEventListener('click', () => {
        filterState.city = btn.dataset.city;
        render();
      });
    });

    // 4. Price range pills
    container.querySelectorAll('[data-price]').forEach(btn => {
      btn.addEventListener('click', () => {
        filterState.priceRange = btn.dataset.price;
        render();
      });
    });

    // 5. Amenity pills
    container.querySelectorAll('[data-amenity]').forEach(btn => {
      btn.addEventListener('click', () => {
        filterState.amenity = btn.dataset.amenity;
        render();
      });
    });

    // 6. Checkboxes
    const chkVerified = document.getElementById('chk-verified');
    if (chkVerified) {
      chkVerified.addEventListener('change', (e) => {
        filterState.onlyVerified = e.target.checked;
        render();
      });
    }

    const chkVip = document.getElementById('chk-vip');
    if (chkVip) {
      chkVip.addEventListener('change', (e) => {
        filterState.onlyVip = e.target.checked;
        render();
      });
    }

    // 7. Sort
    const sortSelect = document.getElementById('sort-select-box');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        filterState.sortBy = e.target.value;
        render();
      });
    }

    // 8. Favorite Heart Button
    container.querySelectorAll('.card-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.dataset.id;
        const isAdded = Store.toggleFavorite(id);
        btn.classList.toggle('active', isAdded);
      });
    });

    // 9. Reset button
    const resetBtn = document.getElementById('btn-reset-filters');
    const emptyResetBtn = document.getElementById('btn-empty-reset');
    const doReset = () => {
      filterState.keyword = '';
      filterState.category = 'all';
      filterState.city = 'all';
      filterState.priceRange = 'all';
      filterState.amenity = 'all';
      filterState.onlyVerified = false;
      filterState.onlyVip = false;
      filterState.sortBy = 'default';
      render();
    };

    if (resetBtn) resetBtn.addEventListener('click', doReset);
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', doReset);
  }

  render();
}
