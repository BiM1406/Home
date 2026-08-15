/**
 * Detail View Module (Trang Chi Tiết Bất Động Sản & Đặt Lịch Xem Phòng)
 * Editorial Luxury Theme with Asymmetrical Mosaic Gallery, Lightbox Modal, and Viewing Appointment Scheduler
 */
import { Store } from '../services/store.js';
import { AuthService } from '../services/auth.js';

let currentLightboxIndex = 0;
let currentPropertyImages = [];

export function renderDetailView(container) {
  // Parse Property ID from URL hash (#/detail?id=...)
  const hash = window.location.hash || '';
  const queryString = hash.includes('?') ? hash.split('?')[1] : '';
  const params = new URLSearchParams(queryString);
  const propertyId = params.get('id') || 'villa-01';

  const property = Store.getPropertyById(propertyId) || Store.getProperties()[0];
  if (!property) {
    container.innerHTML = `
      <div class="container" style="padding-block: 5rem; text-align: center;">
        <h2>Không tìm thấy bất động sản yêu cầu</h2>
        <a href="#/search" class="btn btn-accent" style="margin-top: 1rem;">Quay lại danh sách tìm kiếm</a>
      </div>
    `;
    return;
  }

  currentPropertyImages = property.images && property.images.length > 0 ? property.images : [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
  ];
  currentLightboxIndex = 0;

  const isFav = Store.isFavorite(property.id);
  const priceFormatted = AuthService.formatPrice(property.price, property.priceUsd);

  // Tomorrow date string for date picker default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  container.innerHTML = `
    <div class="detail-page-wrapper">
      <!-- Top Navigation & Breadcrumb -->
      <div class="container detail-top-nav">
        <nav class="breadcrumb-nav">
          <a href="#/">Trang Chủ</a>
          <span>/</span>
          <a href="#/search">Tìm Phòng</a>
          <span>/</span>
          <span style="color: var(--text-main); font-weight: 700;">${property.type}</span>
        </nav>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <button id="btn-share" class="btn btn-outline" style="padding: 0.45rem 1.1rem; font-size: 0.85rem;">
            <span>Chia Sẻ</span>
          </button>
          <button id="btn-detail-fav" class="btn btn-outline ${isFav ? 'active' : ''}" style="padding: 0.45rem 1.1rem; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.45rem;">
            <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: ${isFav ? '#e53935' : 'none'}; stroke: ${isFav ? '#e53935' : 'currentColor'}; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>${isFav ? 'Đã Lưu Tin' : 'Lưu Tin'}</span>
          </button>
        </div>
      </div>

      <!-- Detail Header Section -->
      <div class="container detail-header-section">
        <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
          ${property.isVip ? '<span class="badge badge-vip">VIP ĐẶC QUYỀN</span>' : ''}
          ${property.isVerified ? '<span class="badge badge-verified">✓ CHÍNH CHỦ XÁC THỰC</span>' : ''}
          <span class="badge" style="background: rgba(44, 31, 26, 0.1); color: var(--text-main);">${property.type}</span>
        </div>

        <h1 class="detail-title-main">${property.title}</h1>

        <div class="detail-location-bar">
          <div>
            <span>${property.location.address}</span>
          </div>
          <div style="font-size: 0.88rem; color: var(--text-muted);">
            <span>Mã tin: <strong>#${property.id.toUpperCase()}</strong></span>
          </div>
        </div>
      </div>

      <!-- Asymmetrical Mosaic Image Gallery -->
      <div class="container">
        <div class="detail-mosaic-gallery" id="mosaic-gallery">
          <!-- Hero Large Image -->
          <div class="gallery-photo-item hero-large" data-index="0">
            <img src="${currentPropertyImages[0]}" alt="${property.title} - Ảnh 1" />
          </div>

          <!-- Secondary Image 1 -->
          <div class="gallery-photo-item" data-index="${currentPropertyImages.length > 1 ? 1 : 0}">
            <img src="${currentPropertyImages.length > 1 ? currentPropertyImages[1] : currentPropertyImages[0]}" alt="${property.title} - Ảnh 2" />
          </div>

          <!-- Secondary Image 2 -->
          <div class="gallery-photo-item" data-index="${currentPropertyImages.length > 2 ? 2 : 0}">
            <img src="${currentPropertyImages.length > 2 ? currentPropertyImages[2] : currentPropertyImages[0]}" alt="${property.title} - Ảnh 3" />
          </div>

          <!-- Secondary Image 3 -->
          <div class="gallery-photo-item" data-index="${currentPropertyImages.length > 1 ? 1 : 0}">
            <img src="${currentPropertyImages.length > 1 ? currentPropertyImages[1] : currentPropertyImages[0]}" alt="${property.title} - Ảnh 4" />
          </div>

          <!-- Secondary Image 4 -->
          <div class="gallery-photo-item" data-index="${currentPropertyImages.length > 2 ? 2 : 0}">
            <img src="${currentPropertyImages.length > 2 ? currentPropertyImages[2] : currentPropertyImages[0]}" alt="${property.title} - Ảnh 5" />
          </div>

          <!-- View All Photos Floating Button -->
          <button class="btn-view-all-photos" id="btn-open-lightbox">
            <span>Xem Toàn Bộ Ảnh (${currentPropertyImages.length})</span>
          </button>
        </div>
      </div>

      <!-- Detail Main 2-Column Layout -->
      <div class="container detail-main-layout">
        
        <!-- Left Column: Specs & Detailed Content -->
        <div class="detail-left-content">
          
          <!-- Key Highlights -->
          <div class="detail-highlights-box">
            <div class="highlight-stat-cell">
              <span class="highlight-label">DIỆN TÍCH</span>
              <span class="highlight-val">${property.area} m²</span>
            </div>
            <div class="highlight-stat-cell">
              <span class="highlight-label">PHÒNG NGỦ</span>
              <span class="highlight-val">${property.bedrooms} Phòng</span>
            </div>
            <div class="highlight-stat-cell">
              <span class="highlight-label">PHÒNG TẮM</span>
              <span class="highlight-val">${property.bathrooms} Phòng</span>
            </div>
            <div class="highlight-stat-cell">
              <span class="highlight-label">TIỀN ĐẶT CỌC</span>
              <span class="highlight-val" style="color: var(--accent);">1 Tháng</span>
            </div>
          </div>

          <!-- Section 1: Detailed Description -->
          <section class="detail-content-section">
            <h2 class="detail-section-title">Mô Tả Chi Tiết Không Gian</h2>
            <p style="font-size: 1.02rem; line-height: 1.8; color: var(--text-main); margin-bottom: 1.25rem;">
              ${property.description}
            </p>
            <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-muted);">
              Căn hộ / Biệt thự được kiểm định thông tin chính chủ trực tiếp bởi hệ thống RoomRent. Toàn bộ hình ảnh thực tế 100%, khách thuê làm việc trực tiếp không qua môi giới hay phát sinh bất kỳ khoản phí trung gian nào.
            </p>
          </section>

          <!-- Section 2: Full Amenities List -->
          <section class="detail-content-section">
            <h2 class="detail-section-title">Tiện Ích & Dịch Vụ Đi Kèm</h2>
            <div class="amenities-full-grid">
              ${(property.amenities || ['Full nội thất', 'An ninh 24/7', 'Giờ giấc tự do', 'Wifi tốc độ cao']).map(amenity => `
                <div class="amenity-row-item">
                  <div class="amenity-icon-circle">✓</div>
                  <span>${amenity}</span>
                </div>
              `).join('')}
              <div class="amenity-row-item">
                <div class="amenity-icon-circle">✓</div>
                <span>Hợp đồng điện tử ký online</span>
              </div>
              <div class="amenity-row-item">
                <div class="amenity-icon-circle">✓</div>
                <span>Che số điện thoại bảo mật PII</span>
              </div>
            </div>
          </section>

          <!-- Section 3: Rental Policies & Guidelines -->
          <section class="detail-content-section">
            <h2 class="detail-section-title">Quy Định & Điều Khoản Thuê</h2>
            <ul style="list-style: disc; padding-left: 1.5rem; color: var(--text-muted); line-height: 1.9; font-size: 0.95rem;">
              <li>Thời hạn hợp đồng tối thiểu: <strong>06 tháng - 12 tháng</strong>.</li>
              <li>Hình thức thanh toán: <strong>Hàng tháng hoặc theo Quý</strong> (thương lượng trực tiếp với Chủ nhà).</li>
              <li>Chính sách đặt cọc: <strong>01 tháng tiền thuê</strong> (hoàn lại 100% khi thanh lý hợp đồng đúng cam kết).</li>
              <li>Giờ giấc: <strong>Tự do 24/7</strong>, có lối đi riêng hoặc thẻ từ an ninh.</li>
            </ul>
          </section>

        </div>

        <!-- Right Column: Sticky Booking Card & Landlord Profile -->
        <aside class="detail-sidebar-card">
          
          <!-- Booking Capsule Box -->
          <div class="booking-capsule-box">
            <div class="booking-price-header">
              <div>
                <span style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); display: block;">GIÁ THUÊ NIÊM YẾT</span>
                <span class="booking-big-price">${priceFormatted}</span>
              </div>
              <span class="badge badge-verified">0% Môi Giới</span>
            </div>

            <!-- Landlord Mini Profile -->
            <div class="landlord-mini-card" style="margin-bottom: 1.5rem;">
              <div class="landlord-avatar-circle">
                <img src="${property.landlord?.avatar}" alt="${property.landlord?.name}" />
              </div>
              <div style="flex: 1;">
                <div style="font-weight: 800; font-size: 0.98rem; color: var(--text-main);">
                  ${property.landlord?.name || 'Chủ Nhà'}
                </div>
                <div style="font-size: 0.8rem; color: #2e7d32; font-weight: 700;">
                  ✓ Đã xác minh danh tính
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">
                  Phản hồi: &lt; 5 phút
                </div>
              </div>
              <a href="#/chat" class="btn btn-outline" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;" title="Nhắn tin với chủ nhà">
                Nhắn Tin
              </a>
            </div>

            <!-- Viewing Appointment Form -->
            <form id="appointment-booking-form">
              <h3 style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem;">
                Đặt Lịch Hẹn Xem Phòng Trực Tiếp
              </h3>

              <!-- Date Picker -->
              <div style="margin-bottom: 1.1rem;">
                <label style="display: block; font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.35rem;">
                  CHỌN NGÀY XEM NHÀ
                </label>
                <input 
                  type="date" 
                  id="booking-date" 
                  class="range-input-box" 
                  style="width: 100%; cursor: pointer;" 
                  min="${tomorrowStr}" 
                  value="${tomorrowStr}" 
                  required 
                />
              </div>

              <!-- Time Slot Radio Chips -->
              <div style="margin-bottom: 1.1rem;">
                <label style="display: block; font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.45rem;">
                  KHUNG GIỜ THUẬN TIỆN
                </label>
                <div class="time-slots-group" id="time-slots-picker">
                  <label class="time-slot-chip active">
                    <input type="radio" name="time-slot" value="Sáng (09:00 - 11:30)" checked />
                    <span>Buổi Sáng (09:00 - 11:30)</span>
                  </label>
                  <label class="time-slot-chip">
                    <input type="radio" name="time-slot" value="Chiều (14:00 - 17:00)" />
                    <span>Buổi Chiều (14:00 - 17:00)</span>
                  </label>
                  <label class="time-slot-chip">
                    <input type="radio" name="time-slot" value="Tối (18:00 - 20:00)" />
                    <span>Buổi Tối (18:00 - 20:00)</span>
                  </label>
                </div>
              </div>

              <!-- Note textarea -->
              <div style="margin-bottom: 1.5rem;">
                <label style="display: block; font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.35rem;">
                  GHI CHÚ CHO CHỦ NHÀ (TÙY CHỌN)
                </label>
                <textarea 
                  id="booking-note" 
                  class="range-input-box" 
                  style="width: 100%; height: 75px; resize: none; font-family: inherit; font-size: 0.88rem;" 
                  placeholder="Ví dụ: Tôi muốn xem trực tiếp ban công và chỗ để xe..."
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn btn-accent" style="width: 100%; padding: 1rem; font-size: 1.05rem;">
                <span>Xác Nhận Đặt Lịch Xem Phòng</span>
              </button>
            </form>

            <div style="margin-top: 1.25rem; text-align: center; border-top: 1px dashed var(--border-color); padding-top: 1.25rem;">
              <a href="#/contract" style="font-size: 0.88rem; font-weight: 700; color: var(--accent); display: inline-flex; align-items: center; gap: 0.35rem;">
                <span>Ký Hợp Đồng Thuê Nhà Trực Tiếp &rsaquo;</span>
              </a>
            </div>
          </div>

        </aside>

      </div>

      <!-- =================================================================
           FULL-SCREEN GALLERY LIGHTBOX POPUP MODAL
           ================================================================= -->
      <div class="lightbox-modal" id="gallery-lightbox">
        <button class="lightbox-close-btn" id="btn-close-lightbox" title="Đóng (ESC)">✕</button>
        
        <button class="lightbox-nav-btn prev" id="btn-lightbox-prev" title="Ảnh trước (←)">❮</button>
        <button class="lightbox-nav-btn next" id="btn-lightbox-next" title="Ảnh tiếp theo (→)">❯</button>

        <div class="lightbox-image-container">
          <img src="${currentPropertyImages[0]}" alt="${property.title}" id="lightbox-img" class="lightbox-main-img" />
        </div>

        <div class="lightbox-counter" id="lightbox-counter">
          1 / ${currentPropertyImages.length}
        </div>
      </div>
    </div>
  `;

  attachDetailEvents(property);
}

function attachDetailEvents(property) {
  // 1. Lightbox Open & Navigation
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('btn-close-lightbox');
  const prevBtn = document.getElementById('btn-lightbox-prev');
  const nextBtn = document.getElementById('btn-lightbox-next');
  const viewAllBtn = document.getElementById('btn-open-lightbox');

  function updateLightbox() {
    if (!lightboxImg || !lightboxCounter) return;
    lightboxImg.src = currentPropertyImages[currentLightboxIndex];
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentPropertyImages.length}`;
  }

  function openLightbox(index = 0) {
    currentLightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => openLightbox(0));
  }

  document.querySelectorAll('.gallery-photo-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.index) || 0;
      openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentLightboxIndex = (currentLightboxIndex - 1 + currentPropertyImages.length) % currentPropertyImages.length;
      updateLightbox();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentLightboxIndex = (currentLightboxIndex + 1) % currentPropertyImages.length;
      updateLightbox();
    });
  }

  // Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });

  // 2. Favorite Toggle
  const favBtn = document.getElementById('btn-detail-fav');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      const isAdded = Store.toggleFavorite(property.id);
      favBtn.classList.toggle('active', isAdded);
      const svg = favBtn.querySelector('svg');
      if (svg) {
        svg.style.fill = isAdded ? '#e53935' : 'none';
        svg.style.stroke = isAdded ? '#e53935' : 'currentColor';
      }
      favBtn.querySelector('span').textContent = isAdded ? 'Đã Lưu Tin' : 'Lưu Tin';
      showToast(isAdded ? 'Đã lưu vào danh sách yêu thích!' : 'Đã bỏ lưu tin này.');
    });
  }

  // 3. Share Button
  const shareBtn = document.getElementById('btn-share');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast('Đã sao chép liên kết phòng vào bộ nhớ tạm!');
      } else {
        showToast('Địa chỉ: ' + window.location.href);
      }
    });
  }

  // 4. Time Slot Radio Chip styling
  const slotChips = document.querySelectorAll('.time-slot-chip');
  slotChips.forEach(chip => {
    chip.addEventListener('click', () => {
      slotChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // 5. Booking Form Submission
  const bookingForm = document.getElementById('appointment-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentUser = AuthService.getCurrentUser();
      const appointmentDate = document.getElementById('booking-date')?.value;
      const selectedSlot = document.querySelector('input[name="time-slot"]:checked')?.value || 'Sáng (09:00 - 11:30)';
      const note = document.getElementById('booking-note')?.value || '';

      const newBooking = Store.createBooking({
        propertyId: property.id,
        propertyTitle: property.title,
        propertyAddress: property.location.address,
        propertyPrice: property.price,
        propertyImage: property.images[0],
        renterName: currentUser.name,
        renterPhone: '0901***999',
        landlordName: property.landlord?.name || 'Chủ Nhà',
        appointmentDate,
        timeSlot: selectedSlot,
        note
      });

      showToast(`🎉 Đặt lịch xem phòng thành công! Ngày: ${appointmentDate} - ${selectedSlot}`);
      
      setTimeout(() => {
        window.location.hash = '#/dashboard';
      }, 1200);
    });
  }
}

/**
 * Lightweight Toast Notification helper
 */
function showToast(message) {
  let toastBox = document.getElementById('toast-box');
  if (!toastBox) {
    toastBox = document.createElement('div');
    toastBox.id = 'toast-box';
    toastBox.className = 'toast-container';
    document.body.appendChild(toastBox);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastBox.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
