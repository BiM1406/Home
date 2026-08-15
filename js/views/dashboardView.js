/**
 * Dashboard & Management Center Module (Bảng Quản Lý Cá Nhân)
 * Quản lý lịch hẹn xem phòng, hợp đồng điện tử, tin đã đăng và BĐS đã lưu
 * Hỗ trợ chuyển đổi vai trò (Khách Thuê ↔ Chủ Nhà) và tiền tệ tự động
 */
import { Store } from '../services/store.js';
import { AuthService } from '../services/auth.js';

export function renderDashboardView(container) {
  const currentUser = AuthService.getCurrentUser();
  const allProperties = Store.getProperties();
  const allBookings = Store.getBookings();
  const favoriteIds = Store.getFavorites();
  const favoriteProperties = allProperties.filter(p => favoriteIds.includes(p.id));

  // Seed sample bookings if none exist
  let userBookings = allBookings;
  if (userBookings.length === 0 && allProperties.length > 0) {
    const sampleBooking1 = Store.createBooking({
      propertyId: allProperties[0].id,
      propertyTitle: allProperties[0].title,
      propertyImage: allProperties[0].images[0],
      landlordName: allProperties[0].landlord?.name || 'Trần Văn B',
      renterName: 'Nguyễn Đạt',
      date: '2026-08-20',
      timeSlot: 'Buổi Sáng (09:00 - 11:30)',
      note: 'Tôi muốn kiểm tra chỗ đỗ ô tô và khuôn viên sân vườn.'
    });
    sampleBooking1.status = 'confirmed';
    Store.updateBookingStatus(sampleBooking1.id, 'confirmed');

    if (allProperties.length > 1) {
      Store.createBooking({
        propertyId: allProperties[1].id,
        propertyTitle: allProperties[1].title,
        propertyImage: allProperties[1].images[0],
        landlordName: allProperties[1].landlord?.name || 'Lê Thị C',
        renterName: 'Nguyễn Đạt',
        date: '2026-08-22',
        timeSlot: 'Buổi Chiều (14:00 - 17:00)',
        note: 'Cần xem nội thất phòng khách và phòng ngủ chính.'
      });
    }
    userBookings = Store.getBookings();
  }

  // Active Tab state (default to appointments)
  let activeTab = 'appointments';
  let bookingFilterStatus = 'all';

  function render() {
    const isLandlord = currentUser.role === 'Landlord';
    const landlordListings = allProperties.filter(p => p.landlord?.name === currentUser.name || p.id.startsWith('my-') || isLandlord);

    // Filter bookings
    const filteredBookings = bookingFilterStatus === 'all' 
      ? userBookings 
      : userBookings.filter(b => b.status === bookingFilterStatus);

    container.innerHTML = `
      <div class="dashboard-page-wrapper">
        <div class="dashboard-container">
          
          <!-- Top Header Bar -->
          <div class="dashboard-header-bar">
            <div>
              <h1 class="dashboard-user-greeting">
                Xin chào, ${currentUser.name}
              </h1>
              <p style="font-size: 0.95rem; color: var(--text-muted);">
                Trung tâm quản lý hoạt động thuê phòng, lịch xem nhà và hợp đồng pháp lý trực tiếp.
              </p>
            </div>

            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <a href="#/post-property" class="btn btn-accent" style="padding: 0.75rem 1.65rem; font-size: 0.9rem;">
                <span>+ Đăng Tin Mới</span>
              </a>
              <a href="#/chat" class="btn btn-outline" style="padding: 0.75rem 1.4rem; font-size: 0.9rem;">
                <span>Hộp Thư Chat</span>
              </a>
            </div>
          </div>

          <!-- 4 Overview Stat Cards -->
          <div class="dashboard-stats-grid">
            <div class="dashboard-stat-card">
              <span class="stat-card-title">LỊCH HẸN XEM NHÀ</span>
              <span class="stat-card-number">${userBookings.length}</span>
              <span class="stat-card-sub">${userBookings.filter(b => b.status === 'confirmed').length} lịch đã xác nhận</span>
            </div>

            <div class="dashboard-stat-card">
              <span class="stat-card-title">HỢP ĐỒNG ĐIỆN TỬ</span>
              <span class="stat-card-number">1</span>
              <span class="stat-card-sub">Hiệu lực pháp lý 100%</span>
            </div>

            <div class="dashboard-stat-card">
              <span class="stat-card-title">BĐS ĐANG ĐĂNG TẢI</span>
              <span class="stat-card-number">${isLandlord ? landlordListings.length : 0}</span>
              <span class="stat-card-sub">${isLandlord ? 'Chính chủ niêm yết' : 'Dành cho Chủ Nhà'}</span>
            </div>

            <div class="dashboard-stat-card">
              <span class="stat-card-title">BĐS ĐÃ LƯU YÊU THÍCH</span>
              <span class="stat-card-number">${favoriteProperties.length}</span>
              <span class="stat-card-sub">Sẵn sàng liên hệ</span>
            </div>
          </div>

          <!-- Navigation Tab Bar -->
          <div class="dashboard-tabs-nav">
            <button class="dashboard-tab-btn ${activeTab === 'appointments' ? 'active' : ''}" data-tab="appointments">
              Lịch Hẹn Xem Phòng (${userBookings.length})
            </button>
            <button class="dashboard-tab-btn ${activeTab === 'contracts' ? 'active' : ''}" data-tab="contracts">
              Hợp Đồng Điện Tử (1)
            </button>
            ${isLandlord ? `
              <button class="dashboard-tab-btn ${activeTab === 'listings' ? 'active' : ''}" data-tab="listings">
                Quản Lý BĐS Đã Đăng (${landlordListings.length})
              </button>
            ` : ''}
            <button class="dashboard-tab-btn ${activeTab === 'favorites' ? 'active' : ''}" data-tab="favorites">
              BĐS Yêu Thích (${favoriteProperties.length})
            </button>
          </div>

          <!-- TAB CONTENT BODY -->
          <div class="dashboard-tab-content" id="dashboard-tab-content-body">
            ${renderActiveTabContent(isLandlord, landlordListings, filteredBookings)}
          </div>

        </div>
      </div>
    `;

    attachEvents();
  }

  function renderActiveTabContent(isLandlord, landlordListings, filteredBookings) {
    // ----------------------------------------------------
    // TAB 1: APPOINTMENTS
    // ----------------------------------------------------
    if (activeTab === 'appointments') {
      return `
        <div>
          <!-- Appointment Filter Sub-bar -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button class="filter-pill-item ${bookingFilterStatus === 'all' ? 'active' : ''}" data-booking-filter="all">Tất cả (${userBookings.length})</button>
              <button class="filter-pill-item ${bookingFilterStatus === 'pending' ? 'active' : ''}" data-booking-filter="pending">Chờ xác nhận (${userBookings.filter(b => b.status === 'pending').length})</button>
              <button class="filter-pill-item ${bookingFilterStatus === 'confirmed' ? 'active' : ''}" data-booking-filter="confirmed">Đã xác nhận (${userBookings.filter(b => b.status === 'confirmed').length})</button>
              <button class="filter-pill-item ${bookingFilterStatus === 'completed' ? 'active' : ''}" data-booking-filter="completed">Đã hoàn thành</button>
              <button class="filter-pill-item ${bookingFilterStatus === 'cancelled' ? 'active' : ''}" data-booking-filter="cancelled">Đã hủy</button>
            </div>
          </div>

          <!-- Appointment Cards Feed -->
          ${filteredBookings.length > 0 ? `
            <div class="appointment-list-grid">
              ${filteredBookings.map(b => {
                const statusMap = {
                  pending: { label: 'Chờ Xác Nhận', cls: 'status-pending' },
                  confirmed: { label: 'Đã Xác Nhận', cls: 'status-confirmed' },
                  cancelled: { label: 'Đã Hủy Lịch', cls: 'status-cancelled' },
                  completed: { label: 'Đã Hoàn Thành', cls: 'status-completed' }
                };
                const currentStatus = statusMap[b.status] || statusMap.pending;

                return `
                  <div class="appointment-item-card" data-booking-id="${b.id}">
                    <div class="appointment-thumb">
                      <img src="${b.propertyImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80'}" alt="${b.propertyTitle}" />
                    </div>

                    <div>
                      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.35rem;">
                        <span class="appointment-status-badge ${currentStatus.cls}">${currentStatus.label}</span>
                        <span style="font-size: 0.82rem; color: var(--text-muted);">Mã lịch: #${b.id.slice(-6).toUpperCase()}</span>
                      </div>

                      <a href="#/detail?id=${b.propertyId}" style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); display: block; margin-bottom: 0.45rem; text-decoration: none;">
                        ${b.propertyTitle}
                      </a>

                      <div style="display: flex; gap: 1.5rem; font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                        <span>Ngày xem: <strong style="color: var(--text-main);">${b.date}</strong></span>
                        <span>Khung giờ: <strong style="color: var(--accent);">${b.timeSlot}</strong></span>
                        <span>Đối tác: <strong style="color: var(--text-main);">${b.landlordName}</strong></span>
                      </div>

                      ${b.note ? `
                        <div style="font-size: 0.84rem; color: var(--text-muted); background: var(--bg-surface-alt); padding: 0.5rem 0.85rem; border-radius: var(--border-radius-sm); border-left: 3px solid var(--gold);">
                          Ghi chú: "${b.note}"
                        </div>
                      ` : ''}
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem; min-width: 140px;">
                      ${b.status === 'pending' ? `
                        <button class="btn btn-accent btn-update-status" data-id="${b.id}" data-status="confirmed" style="padding: 0.5rem 1rem; font-size: 0.82rem;">
                          Xác Nhận Lịch
                        </button>
                        <button class="btn btn-outline btn-update-status" data-id="${b.id}" data-status="cancelled" style="padding: 0.5rem 1rem; font-size: 0.82rem;">
                          Hủy Lịch Hẹn
                        </button>
                      ` : b.status === 'confirmed' ? `
                        <button class="btn btn-outline btn-update-status" data-id="${b.id}" data-status="completed" style="padding: 0.5rem 1rem; font-size: 0.82rem;">
                          Đã Xem Xong
                        </button>
                        <a href="#/contract?propertyId=${b.propertyId}" class="btn btn-accent" style="padding: 0.5rem 1rem; font-size: 0.82rem; text-align: center;">
                          Ký Hợp Đồng
                        </a>
                      ` : `
                        <a href="#/detail?id=${b.propertyId}" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.82rem; text-align: center;">
                          Xem Lại BĐS
                        </a>
                      `}
                      <a href="#/chat" class="btn btn-outline" style="padding: 0.45rem 1rem; font-size: 0.8rem; text-align: center;">
                        Nhắn Tin
                      </a>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          ` : `
            <div class="empty-results-box">
              <h3 style="font-family: var(--font-serif); font-size: 1.4rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">
                Không có lịch hẹn nào ở trạng thái này
              </h3>
              <p style="color: var(--text-muted); margin-bottom: 1.25rem;">
                Hãy tìm kiếm phòng ưng ý và đặt lịch xem phòng trực tiếp để hẹn gặp chủ nhà.
              </p>
              <a href="#/search" class="btn btn-accent" style="padding: 0.75rem 1.6rem;">
                <span>Khám Phá Phòng Cho Thuê</span>
              </a>
            </div>
          `}
        </div>
      `;
    }

    // ----------------------------------------------------
    // TAB 2: CONTRACTS
    // ----------------------------------------------------
    if (activeTab === 'contracts') {
      const activeProperty = allProperties[0];
      const priceFormatted = AuthService.formatPrice(activeProperty.price, activeProperty.priceUsd);

      return `
        <div>
          <div class="contract-row-card">
            <div>
              <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.4rem;">
                <span class="badge" style="background: rgba(46, 125, 50, 0.15); color: #2e7d32; font-weight: 800;">
                  ✓ ĐÃ KÝ THÀNH CÔNG
                </span>
                <span style="font-size: 0.85rem; color: var(--text-muted);">Mã hợp đồng: <strong>#HD-2026-RR01</strong></span>
              </div>

              <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                Hợp Đồng Thuê Nhà: ${activeProperty.title}
              </h3>

              <div style="display: flex; gap: 1.5rem; font-size: 0.9rem; color: var(--text-muted);">
                <span>Bên Cho Thuê: <strong>${activeProperty.landlord?.name || 'Trần Văn B'}</strong></span>
                <span>Bên Thuê: <strong>Nguyễn Đạt</strong></span>
                <span>Giá thuê: <strong style="color: var(--accent);">${priceFormatted}</strong></span>
                <span>Thời hạn: <strong>12 Tháng</strong></span>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <a href="#/contract?propertyId=${activeProperty.id}" class="btn btn-accent" style="padding: 0.65rem 1.4rem; font-size: 0.88rem;">
                <span>Xem Văn Bản Ký</span>
              </a>
              <button class="btn btn-outline" onclick="window.print()" style="padding: 0.65rem 1.4rem; font-size: 0.88rem;">
                <span>In / Tải PDF</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // ----------------------------------------------------
    // TAB 3: LANDLORD LISTINGS (Chủ Nhà)
    // ----------------------------------------------------
    if (activeTab === 'listings') {
      return `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <p style="color: var(--text-muted); font-size: 0.95rem;">
              Danh sách các bất động sản bạn đang quản lý và niêm yết công khai trên hệ thống RoomRent.
            </p>
            <a href="#/post-property" class="btn btn-accent" style="padding: 0.65rem 1.4rem; font-size: 0.88rem;">
              + Thêm Bất Động Sản
            </a>
          </div>

          <div class="landlord-listings-grid">
            ${landlordListings.map(prop => {
              const priceFormatted = AuthService.formatPrice(prop.price, prop.priceUsd);

              return `
                <article class="property-card" style="margin-bottom: 0;">
                  <div class="card-image-wrapper">
                    <img src="${prop.images[0]}" alt="${prop.title}" />
                    <div class="card-badges-floating">
                      ${prop.isVip ? '<span class="badge badge-vip">VIP</span>' : ''}
                      <span class="badge badge-verified">✓ Chính Chủ</span>
                      <span class="badge" style="background: rgba(27, 18, 14, 0.75); color: #fff;">${prop.type}</span>
                    </div>
                  </div>

                  <div class="card-content-body">
                    <div class="card-location-meta">
                      <span>${prop.location.district}, ${prop.location.city}</span>
                    </div>

                    <a href="#/detail?id=${prop.id}" class="card-property-title">
                      ${prop.title}
                    </a>

                    <div class="card-specs-row">
                      <span>${prop.area} m²</span>
                      <span>•</span>
                      <span>${prop.bedrooms} PN</span>
                      <span>•</span>
                      <span>${prop.bathrooms} WC</span>
                    </div>

                    <div class="card-footer-row">
                      <div>
                        <span style="display: block; font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">GIÁ THUÊ</span>
                        <span class="card-price-val">${priceFormatted}</span>
                      </div>
                      <div style="display: flex; gap: 0.5rem;">
                        <a href="#/detail?id=${prop.id}" class="btn btn-outline" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;">
                          Xem
                        </a>
                        <button class="btn btn-white" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;" onclick="alert('Tính năng chỉnh sửa tin đăng đã được lưu.')">
                          Sửa
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // ----------------------------------------------------
    // TAB 4: FAVORITES
    // ----------------------------------------------------
    if (activeTab === 'favorites') {
      return `
        <div>
          ${favoriteProperties.length > 0 ? `
            <div class="property-cards-grid">
              ${favoriteProperties.map(prop => {
                const priceFormatted = AuthService.formatPrice(prop.price, prop.priceUsd);

                return `
                  <article class="property-card" data-id="${prop.id}">
                    <div class="card-image-wrapper">
                      <img src="${prop.images[0]}" alt="${prop.title}" />
                      <div class="card-badges-floating">
                        ${prop.isVip ? '<span class="badge badge-vip">VIP</span>' : ''}
                        <span class="badge badge-verified">✓ Chính Chủ</span>
                        <span class="badge" style="background: rgba(27, 18, 14, 0.75); color: #fff;">${prop.type}</span>
                      </div>
                      <button class="card-fav-btn active" data-id="${prop.id}" title="Bỏ lưu yêu thích">
                        <svg viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>

                    <div class="card-content-body">
                      <div class="card-location-meta">
                        <span>${prop.location.district}, ${prop.location.city}</span>
                      </div>

                      <a href="#/detail?id=${prop.id}" class="card-property-title">
                        ${prop.title}
                      </a>

                      <div class="card-specs-row">
                        <span>${prop.area} m²</span>
                        <span>•</span>
                        <span>${prop.bedrooms} Phòng Ngủ</span>
                        <span>•</span>
                        <span>${prop.bathrooms} WC</span>
                      </div>

                      <div class="card-footer-row">
                        <div>
                          <span style="display: block; font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">GIÁ THUÊ</span>
                          <span class="card-price-val">${priceFormatted}</span>
                        </div>
                        <a href="#/detail?id=${prop.id}" class="card-detail-cta">
                          <span>Chi Tiết &rsaquo;</span>
                        </a>
                      </div>
                    </div>
                  </article>
                `;
              }).join('')}
            </div>
          ` : `
            <div class="empty-results-box">
              <h3 style="font-family: var(--font-serif); font-size: 1.4rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">
                Bạn chưa lưu bất động sản nào
              </h3>
              <p style="color: var(--text-muted); margin-bottom: 1.25rem;">
                Khi duyệt danh sách phòng, bấm nút "Lưu" để tập hợp các căn hộ ưng ý vào đây.
              </p>
              <a href="#/search" class="btn btn-accent" style="padding: 0.75rem 1.6rem;">
                <span>Tìm Phòng Ngay</span>
              </a>
            </div>
          `}
        </div>
      `;
    }

    return '';
  }

  function attachEvents() {
    // Tab switching
    container.querySelectorAll('.dashboard-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        render();
      });
    });

    // Booking filter pills
    container.querySelectorAll('[data-booking-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        bookingFilterStatus = btn.dataset.bookingFilter;
        render();
      });
    });

    // Update appointment status buttons
    container.querySelectorAll('.btn-update-status').forEach(btn => {
      btn.addEventListener('click', () => {
        const bId = btn.dataset.id;
        const newStatus = btn.dataset.status;
        Store.updateBookingStatus(bId, newStatus);
        userBookings = Store.getBookings();
        render();
      });
    });

    // Fav button toggling inside favorites tab
    container.querySelectorAll('.card-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const pId = btn.dataset.id;
        Store.toggleFavorite(pId);
        renderDashboardView(container);
      });
    });
  }

  render();
}
