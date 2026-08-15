/**
 * Admin Panel Module (Bảng Quản Trị Hệ Thống)
 * Quản lý kiểm duyệt tin đăng, phê duyệt BĐS, quản lý người dùng và theo dõi doanh thu
 */
import { Store } from '../services/store.js';
import { AuthService } from '../services/auth.js';

export function renderAdminView(container) {
  const properties = Store.getProperties();

  // Mock moderation queue
  let pendingQueue = [
    {
      id: 'mod-01',
      title: 'Studio Gác Lửng Ban Công Cây Xanh Cầu Giấy',
      type: 'Phòng Studio',
      landlordName: 'Hoàng Văn E',
      price: 6800000,
      area: 32,
      location: 'Cầu Giấy, Hà Nội',
      submittedDate: 'Hôm nay, 14:20',
      status: 'pending'
    },
    {
      id: 'mod-02',
      title: 'Căn Hộ Cao Cấp 2PN View Biển Mỹ Khê',
      type: 'Căn Hộ Luxury',
      landlordName: 'Vũ Thị F',
      price: 16000000,
      area: 75,
      location: 'Sơn Trà, Đà Nẵng',
      submittedDate: 'Hôm qua, 09:15',
      status: 'pending'
    },
    {
      id: 'mod-03',
      title: 'Villa Nghỉ Dưỡng Sân Vườn Hồ Bơi Thảo Điền',
      type: 'Villa Biệt Thự',
      landlordName: 'Đỗ Văn G',
      price: 65000000,
      area: 450,
      location: 'Quận 2, TP. Hồ Chí Minh',
      submittedDate: '12/08/2026',
      status: 'pending'
    }
  ];

  let adminTab = 'moderation'; // moderation | listings | users

  function render() {
    container.innerHTML = `
      <div class="dashboard-page-wrapper">
        <div class="dashboard-container">
          
          <!-- Admin Header -->
          <div class="dashboard-header-bar">
            <div>
              <div style="display: inline-block; padding: 0.2rem 0.65rem; background: rgba(195, 110, 34, 0.15); color: var(--accent); border-radius: var(--border-radius-sm); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.4rem;">
                HỆ THỐNG QUẢN TRỊ TRUNG TÂM
              </div>
              <h1 class="dashboard-user-greeting">
                Bảng Điều Khiển Quản Trị Viên (Admin)
              </h1>
              <p style="font-size: 0.95rem; color: var(--text-muted);">
                Kiểm duyệt chất lượng tin đăng, quản lý danh sách người dùng và theo dõi hoạt động nền tảng RoomRent.
              </p>
            </div>

            <div style="display: flex; gap: 0.75rem;">
              <a href="#/dashboard" class="btn btn-outline" style="padding: 0.75rem 1.4rem; font-size: 0.9rem;">
                Về Quản Lý Cá Nhân
              </a>
            </div>
          </div>

          <!-- 4 Admin Stat Cards -->
          <div class="dashboard-stats-grid">
            <div class="dashboard-stat-card">
              <span class="stat-card-title">TIN CHỜ KIỂM DUYỆT</span>
              <span class="stat-card-number">${pendingQueue.filter(q => q.status === 'pending').length}</span>
              <span class="stat-card-sub" style="color: var(--accent);">Cần xử lý trong ngày</span>
            </div>

            <div class="dashboard-stat-card">
              <span class="stat-card-title">TỔNG BĐS ĐANG HOẠT ĐỘNG</span>
              <span class="stat-card-number">${properties.length}</span>
              <span class="stat-card-sub">100% Chính chủ</span>
            </div>

            <div class="dashboard-stat-card">
              <span class="stat-card-title">DOANH THU GÓI ĐĂNG TIN</span>
              <span class="stat-card-number">${AuthService.formatPrice(18950000)}</span>
              <span class="stat-card-sub">+24.5% so với tháng trước</span>
            </div>

            <div class="dashboard-stat-card">
              <span class="stat-card-title">TỔNG THÀNH VIÊN</span>
              <span class="stat-card-number">1.280</span>
              <span class="stat-card-sub">Chủ nhà & Khách thuê</span>
            </div>
          </div>

          <!-- Admin Tabs -->
          <div class="dashboard-tabs-nav">
            <button class="dashboard-tab-btn ${adminTab === 'moderation' ? 'active' : ''}" data-admin-tab="moderation">
              Hàng Đợi Kiểm Duyệt (${pendingQueue.filter(q => q.status === 'pending').length})
            </button>
            <button class="dashboard-tab-btn ${adminTab === 'listings' ? 'active' : ''}" data-admin-tab="listings">
              Tất Cả BĐS Trên Hệ Thống (${properties.length})
            </button>
            <button class="dashboard-tab-btn ${adminTab === 'users' ? 'active' : ''}" data-admin-tab="users">
              Quản Lý Người Dùng (10)
            </button>
          </div>

          <!-- TAB CONTENT -->
          <div id="admin-tab-content">
            ${renderTabContent()}
          </div>

        </div>
      </div>
    `;

    attachEvents();
  }

  function renderTabContent() {
    // 1. MODERATION QUEUE
    if (adminTab === 'moderation') {
      const pendingItems = pendingQueue.filter(q => q.status === 'pending');

      return `
        <div style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--border-radius-xl); overflow: hidden; box-shadow: var(--shadow-sm);">
          <div style="padding: 1.5rem 2rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main);">
              Danh Sách Bất Động Sản Chờ Phê Duyệt
            </h3>
            <span style="font-size: 0.85rem; color: var(--text-muted);">
              Tự động quét PII và chứng nhận chính chủ
            </span>
          </div>

          ${pendingItems.length > 0 ? `
            <div style="display: flex; flex-direction: column;">
              ${pendingItems.map(item => `
                <div style="padding: 1.75rem 2rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; gap: 2rem;">
                  <div>
                    <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.35rem;">
                      <span class="badge" style="background: rgba(195, 110, 34, 0.15); color: var(--accent); font-weight: 800;">
                        CHỜ DUYỆT
                      </span>
                      <span style="font-size: 0.82rem; color: var(--text-muted);">${item.submittedDate}</span>
                      <span style="font-size: 0.82rem; color: var(--text-muted);">•</span>
                      <span style="font-size: 0.82rem; color: var(--text-muted);">Chủ nhà: <strong>${item.landlordName}</strong></span>
                    </div>

                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                      ${item.title}
                    </h4>

                    <div style="display: flex; gap: 1.25rem; font-size: 0.88rem; color: var(--text-muted);">
                      <span>Loại: <strong>${item.type}</strong></span>
                      <span>Khu vực: <strong>${item.location}</strong></span>
                      <span>Diện tích: <strong>${item.area} m²</strong></span>
                      <span>Giá: <strong style="color: var(--accent);">${AuthService.formatPrice(item.price)}</strong></span>
                    </div>
                  </div>

                  <div style="display: flex; gap: 0.65rem;">
                    <button class="btn btn-accent btn-mod-approve" data-id="${item.id}" style="padding: 0.55rem 1.25rem; font-size: 0.85rem;">
                      Duyệt Xuất Bản
                    </button>
                    <button class="btn btn-outline btn-mod-reject" data-id="${item.id}" style="padding: 0.55rem 1.25rem; font-size: 0.85rem;">
                      Từ Chối
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div style="padding: 3rem; text-align: center;">
              <h4 style="font-size: 1.2rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">
                Hàng đợi kiểm duyệt trống
              </h4>
              <p style="color: var(--text-muted);">Tất cả các tin đăng mới đã được kiểm tra và xuất bản thành công.</p>
            </div>
          `}
        </div>
      `;
    }

    // 2. ALL LISTINGS
    if (adminTab === 'listings') {
      return `
        <div style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--border-radius-xl); overflow: hidden; box-shadow: var(--shadow-sm);">
          <div style="padding: 1.5rem 2rem; border-bottom: 1px solid var(--border-color);">
            <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main);">
              Toàn Bộ Bất Động Sản Đang Hoạt Động (${properties.length})
            </h3>
          </div>

          <div style="display: flex; flex-direction: column;">
            ${properties.map(p => `
              <div style="padding: 1.25rem 2rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 1.25rem;">
                  <img src="${p.images[0]}" alt="${p.title}" style="width: 70px; height: 50px; border-radius: var(--border-radius-sm); object-fit: cover;" />
                  <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                      ${p.isVip ? '<span class="badge badge-vip">VIP</span>' : ''}
                      ${p.isVerified ? '<span class="badge badge-verified">Chính Chủ</span>' : ''}
                      <span style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">${p.title}</span>
                    </div>
                    <div style="font-size: 0.82rem; color: var(--text-muted);">
                      ${p.type} • ${p.location.district}, ${p.location.city} • Chủ nhà: <strong>${p.landlord?.name || 'Trần Văn B'}</strong>
                    </div>
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 1.5rem;">
                  <span style="font-weight: 800; color: var(--accent); font-size: 0.95rem;">
                    ${AuthService.formatPrice(p.price, p.priceUsd)}
                  </span>
                  <a href="#/detail?id=${p.id}" class="btn btn-outline" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;">
                    Xem Chi Tiết
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 3. USER MANAGEMENT
    if (adminTab === 'users') {
      const mockUsers = [
        { name: 'Nguyễn Đạt', role: 'Khách Thuê', email: 'nguyendat@gmail.com', status: 'Hoạt động', joined: '01/08/2026' },
        { name: 'Trần Văn B', role: 'Chủ Nhà', email: 'tranvanb@gmail.com', status: 'Đã xác thực', joined: '15/07/2026' },
        { name: 'Lê Thị C', role: 'Chủ Nhà', email: 'lethic@gmail.com', status: 'Đã xác thực', joined: '20/07/2026' },
        { name: 'Phạm Văn D', role: 'Chủ Nhà', email: 'phamvand@gmail.com', status: 'Đã xác thực', joined: '25/07/2026' },
        { name: 'Hoàng Văn E', role: 'Chủ Nhà', email: 'hoangvane@gmail.com', status: 'Chờ duyệt', joined: '14/08/2026' },
        { name: 'Vũ Thị F', role: 'Chủ Nhà', email: 'vuthif@gmail.com', status: 'Chờ duyệt', joined: '14/08/2026' },
        { name: 'Đỗ Văn G', role: 'Chủ Nhà', email: 'dovang@gmail.com', status: 'Đã xác thực', joined: '05/08/2026' }
      ];

      return `
        <div style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--border-radius-xl); overflow: hidden; box-shadow: var(--shadow-sm);">
          <div style="padding: 1.5rem 2rem; border-bottom: 1px solid var(--border-color);">
            <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main);">
              Danh Sách Thành Viên Nền Tảng
            </h3>
          </div>

          <div style="display: flex; flex-direction: column;">
            ${mockUsers.map(u => `
              <div style="padding: 1.25rem 2rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-main); margin-bottom: 0.2rem;">
                    ${u.name}
                  </div>
                  <div style="font-size: 0.82rem; color: var(--text-muted);">
                    ${u.email} • Ngày tham gia: ${u.joined}
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 1rem;">
                  <span class="badge" style="background: var(--bg-surface-alt); color: var(--text-main); font-weight: 700;">
                    ${u.role}
                  </span>
                  <span class="badge ${u.status === 'Đã xác thực' ? 'badge-verified' : ''}" style="font-weight: 700;">
                    ${u.status}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    return '';
  }

  function attachEvents() {
    // Admin tabs
    container.querySelectorAll('[data-admin-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        adminTab = btn.dataset.adminTab;
        render();
      });
    });

    // Approve moderation item
    container.querySelectorAll('.btn-mod-approve').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = pendingQueue.find(q => q.id === id);
        if (item) {
          item.status = 'approved';
          alert(`Đã phê duyệt và xuất bản bài đăng "${item.title}" thành công!`);
          render();
        }
      });
    });

    // Reject moderation item
    container.querySelectorAll('.btn-mod-reject').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = pendingQueue.find(q => q.id === id);
        if (item) {
          item.status = 'rejected';
          alert(`Đã từ chối bài đăng "${item.title}".`);
          render();
        }
      });
    });
  }

  render();
}
