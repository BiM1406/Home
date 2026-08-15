/* ========================================================
   RoomRent — Filter & Search Client Logic (search.html)
   ======================================================== */
(function () {
  'use strict';

  var allProperties = [];

  function fetchProperties() {
    fetch('/api/properties')
      .then(function (res) { return res.json(); })
      .then(function (res) {
        if (res.success && Array.isArray(res.data)) {
          allProperties = res.data;
          // Parse query string if present
          applyFilters();
        }
      })
      .catch(function (err) {
        console.error('Lỗi tải danh sách BĐS:', err);
      });
  }

  function formatMoney(amount) {
    if (!amount) return '0 VND';
    return amount.toLocaleString('vi-VN') + ' VND/tháng';
  }

  function applyFilters() {
    var locationInput = document.getElementById('filter-location');
    var typeSelect = document.getElementById('filter-type');
    var priceRange = document.getElementById('filter-price-range');
    var chkPool = document.getElementById('chk-pool');
    var chkGarden = document.getElementById('chk-garden');
    var chkSecurity = document.getElementById('chk-security');
    var chkGarage = document.getElementById('chk-garage');
    var chkVerified = document.getElementById('chk-verified');
    var sortSelect = document.getElementById('sort-select');

    var locVal = locationInput ? locationInput.value.toLowerCase().trim() : '';
    var typeVal = typeSelect ? typeSelect.value : 'all';
    var maxPrice = priceRange ? parseInt(priceRange.value, 10) : 100000000;
    var reqVerified = chkVerified ? chkVerified.checked : false;

    var selectedAmenities = [];
    if (chkPool && chkPool.checked) selectedAmenities.push('Hồ bơi');
    if (chkGarden && chkGarden.checked) selectedAmenities.push('Sân vườn');
    if (chkSecurity && chkSecurity.checked) selectedAmenities.push('Bảo vệ 24/7');
    if (chkGarage && chkGarage.checked) selectedAmenities.push('Gara ô tô');

    var filtered = allProperties.filter(function (item) {
      // Type filter
      if (typeVal !== 'all' && item.type !== typeVal) return false;
      
      // Price filter
      if (item.price > maxPrice) return false;

      // Location filter
      if (locVal) {
        var fullLoc = (item.title + ' ' + item.address + ' ' + (item.location || '')).toLowerCase();
        if (fullLoc.indexOf(locVal) === -1) return false;
      }

      // Verified filter
      if (reqVerified && (!item.landlord || !item.landlord.isVerified)) return false;

      // Multi-select amenities filter
      if (selectedAmenities.length > 0) {
        var itemAmenities = item.amenities || [];
        var hasAll = selectedAmenities.every(function (am) {
          return itemAmenities.some(function (ia) { return ia.indexOf(am) !== -1; });
        });
        if (!hasAll) return false;
      }

      return true;
    });

    // Sorting
    if (sortSelect) {
      var sortVal = sortSelect.value;
      if (sortVal === 'price-asc') {
        filtered.sort(function (a, b) { return a.price - b.price; });
      } else if (sortVal === 'price-desc') {
        filtered.sort(function (a, b) { return b.price - a.price; });
      }
    }

    renderProperties(filtered);
  }

  function renderProperties(list) {
    var grid = document.getElementById('search-property-grid');
    var countEl = document.getElementById('results-count');
    if (!grid) return;

    if (countEl) countEl.textContent = list.length;

    if (list.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 48px; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1;">' +
        '<h3 style="font-size: 1.1rem; color: #475569; margin-bottom: 8px;">Không tìm thấy bất động sản nào</h3>' +
        '<p style="color: #94a3b8; font-size: 0.9rem;">Thử nới lỏng khoảng giá hoặc bỏ bớt các điều kiện lọc nâng cao.</p>' +
        '</div>';
      return;
    }

    var html = list.map(function (item) {
      var imgUrl = (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800';
      var isVerified = item.landlord && item.landlord.isVerified;

      return '<article class="card" style="background:#fff; border-radius:16px; overflow:hidden; border:1px solid #e2e8f0; box-shadow:var(--shadow-sm);">' +
        '<div style="position:relative; height:220px; overflow:hidden;">' +
          '<img src="' + imgUrl + '" alt="' + item.title + '" style="width:100%; height:100%; object-fit:cover;">' +
          '<span class="card-badge" style="position:absolute; top:12px; left:12px; background:rgba(15,23,42,0.75); backdrop-filter:blur(6px); color:#fff; padding:4px 10px; border-radius:999px; font-size:0.75rem; font-weight:700; text-transform:uppercase;">' +
            (item.type === 'villa' ? 'Villa / Biệt Thự' : (item.type === 'luxury' ? 'Căn Hộ Cao Cấp' : 'Nhà Nguyên Căn')) +
          '</span>' +
          (isVerified ? '<span style="position:absolute; top:12px; right:12px; background:#dcfce7; color:#166534; font-size:0.72rem; font-weight:700; padding:4px 8px; border-radius:999px;">✓ Đã xác minh</span>' : '') +
        '</div>' +
        '<div style="padding:20px;">' +
          '<h3 style="font-size:1.1rem; font-weight:700; margin-bottom:8px; line-height:1.3;"><a href="detail.html?id=' + item.id + '" style="color:var(--text-main);">' + item.title + '</a></h3>' +
          '<p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px; display:flex; align-items:center; gap:4px;"><svg class="icon"><use href="#icon-pin"/></svg> ' + item.address + '</p>' +
          '<div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #f1f5f9; padding-top:12px; margin-top:12px;">' +
            '<span style="font-size:1.15rem; font-weight:800; color:var(--primary-600);">' + formatMoney(item.price) + '</span>' +
            '<a href="detail.html?id=' + item.id + '" class="btn-hero-primary" style="padding:8px 16px; font-size:0.8rem; border-radius:8px;">Chi tiết</a>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');

    grid.innerHTML = html;
  }

  function bindEvents() {
    var priceRange = document.getElementById('filter-price-range');
    var priceDisplay = document.getElementById('price-value-display');
    if (priceRange && priceDisplay) {
      priceRange.addEventListener('input', function () {
        var val = parseInt(priceRange.value, 10) / 1000000;
        priceDisplay.textContent = val + ' Triệu VND';
      });
    }

    var btnApply = document.getElementById('btn-apply-filter');
    if (btnApply) {
      btnApply.addEventListener('click', applyFilters);
    }

    var sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', applyFilters);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindEvents();
    fetchProperties();
  });
})();
