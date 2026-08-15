/**
 * Post Property View Module (Bộ Wizard 8 Bước Đăng Tin Dành Cho Chủ Nhà)
 * 8-Step Interactive Flow with Live Preview, Dynamic Validation & LocalStorage Persistence
 */
import { Store } from '../services/store.js';
import { AuthService } from '../services/auth.js';

export function renderPostPropertyView(container) {
  let currentStep = 1;

  // Wizard Data Model
  const formData = {
    category: 'villa',
    type: 'Villa Biệt Thự',
    title: 'Biệt Thự Nghỉ Dưỡng Sang Trọng - Hồ Bơi Riêng & Sân Vườn',
    city: 'Đà Nẵng',
    district: 'Sơn Trà',
    address: 'Đường Võ Nguyên Giáp, P. Phước Mỹ, Q. Sơn Trà',
    area: 320,
    bedrooms: 4,
    bathrooms: 4,
    amenities: ['Hồ bơi riêng', 'Sân vườn BBQ', 'Gara ô tô', 'An ninh 24/7', 'Full nội thất'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    price: 45000000,
    depositMonths: 1,
    description: 'Biệt thự view biển thoáng mát, hồ bơi nước tràn, khuôn viên sân vườn BBQ ngoài trời thích hợp nghỉ dưỡng và làm việc từ xa.',
    package: 'vip'
  };

  const stepsMeta = [
    { step: 1, title: 'Loại Hình' },
    { step: 2, title: 'Địa Chỉ' },
    { step: 3, title: 'Thông Số' },
    { step: 4, title: 'Tiện Ích' },
    { step: 5, title: 'Hình Ảnh' },
    { step: 6, title: 'Giá Thuê' },
    { step: 7, title: 'Nội Dung' },
    { step: 8, title: 'Xem Trước' }
  ];

  function renderWizard() {
    const progressPercent = Math.round(((currentStep - 1) / (stepsMeta.length - 1)) * 100);

    container.innerHTML = `
      <div class="post-wizard-wrapper">
        <div class="post-wizard-container">
          
          <!-- Progress Bar Box -->
          <div class="wizard-progress-bar-box">
            <div class="wizard-steps-track">
              ${stepsMeta.map(s => `
                <div class="wizard-step-node ${s.step === currentStep ? 'active' : ''} ${s.step < currentStep ? 'completed' : ''}">
                  <div class="step-node-circle">
                    ${s.step < currentStep ? '✓' : s.step}
                  </div>
                  <span class="step-node-title">${s.title}</span>
                </div>
              `).join('')}
            </div>

            <div class="wizard-fill-line">
              <div class="wizard-fill-progress" style="width: ${progressPercent}%;"></div>
            </div>
          </div>

          <!-- Wizard Step Content Card -->
          <div class="wizard-card-body">
            ${renderStepBody()}
            
            <!-- Footer Navigation -->
            <div class="wizard-footer-nav">
              <button type="button" class="btn btn-outline" id="btn-wizard-prev" ${currentStep === 1 ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''}>
                <span>&lsaquo; Quay Lại</span>
              </button>

              <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted);">
                Bước ${currentStep} / ${stepsMeta.length}
              </div>

              ${currentStep < 8 ? `
                <button type="button" class="btn btn-accent" id="btn-wizard-next">
                  <span>Tiếp Tục &rsaquo;</span>
                </button>
              ` : `
                <button type="button" class="btn btn-accent" id="btn-wizard-publish" style="padding-inline: 2.5rem;">
                  <span>Xuất Bản Đăng Tin Ngay</span>
                </button>
              `}
            </div>
          </div>

        </div>
      </div>
    `;

    attachWizardEvents();
  }

  function renderStepBody() {
    switch (currentStep) {
      // 1. LOẠI HÌNH BẤT ĐỘNG SẢN
      case 1:
        return `
          <div class="wizard-step-header">
            <h2 class="wizard-step-title">Bước 1: Chọn Loại Hình Bất Động Sản</h2>
            <p class="wizard-step-desc">Lựa chọn danh mục chính xác giúp khách thuê dễ dàng tìm thấy bất động sản của bạn.</p>
          </div>

          <div class="category-selection-grid">
            <!-- 1. Villa -->
            <div class="category-select-card ${formData.category === 'villa' ? 'active' : ''}" data-cat="villa" data-type="Villa Biệt Thự" style="background-image: url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80');">
              <div class="category-card-check-badge">${formData.category === 'villa' ? '✓' : ''}</div>
              <div class="category-card-inner-content">
                <div class="category-card-title">Biệt Thự & Villa Nghỉ Dưỡng</div>
                <div class="category-card-desc">Hồ bơi riêng, khuôn viên sân vườn biệt lập, an ninh 24/7.</div>
              </div>
            </div>

            <!-- 2. Apartment -->
            <div class="category-select-card ${formData.category === 'apartment' ? 'active' : ''}" data-cat="apartment" data-type="Căn Hộ Cao Cấp" style="background-image: url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80');">
              <div class="category-card-check-badge">${formData.category === 'apartment' ? '✓' : ''}</div>
              <div class="category-card-inner-content">
                <div class="category-card-title">Căn Hộ & Chung Cư Cao Cấp</div>
                <div class="category-card-desc">View panorama toàn cảnh, tòa nhà hạng A, thang máy thẻ từ.</div>
              </div>
            </div>

            <!-- 3. Room -->
            <div class="category-select-card ${formData.category === 'room' ? 'active' : ''}" data-cat="room" data-type="Phòng Trọ" style="background-image: url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80');">
              <div class="category-card-check-badge">${formData.category === 'room' ? '✓' : ''}</div>
              <div class="category-card-inner-content">
                <div class="category-card-title">Phòng Trọ & Nhà Trọ Tiện Nghi</div>
                <div class="category-card-desc">Chính chủ cho thuê, gác lửng thoáng mát, giờ giấc tự do.</div>
              </div>
            </div>

            <!-- 4. Studio -->
            <div class="category-select-card ${formData.category === 'studio' ? 'active' : ''}" data-cat="studio" data-type="Studio Dịch Vụ" style="background-image: url('https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80');">
              <div class="category-card-check-badge">${formData.category === 'studio' ? '✓' : ''}</div>
              <div class="category-card-inner-content">
                <div class="category-card-title">Studio & Căn Hộ Dịch Vụ</div>
                <div class="category-card-desc">Full nội thất cao cấp, dịch vụ dọn phòng trọn gói, dọn vào ngay.</div>
              </div>
            </div>
          </div>
        `;

      // 2. ĐỊA CHỈ & VỊ TRÍ
      case 2:
        return `
          <div class="wizard-step-header">
            <h2 class="wizard-step-title">Bước 2: Địa Chỉ & Vị Trí Bất Động Sản</h2>
            <p class="wizard-step-desc">Cung cấp địa chỉ chính xác để định vị trên bản đồ và tăng độ tin cậy cho khách thuê.</p>
          </div>

          <div class="form-input-grid-2">
            <div class="form-field-unit">
              <label class="form-field-label">TỈNH / THÀNH PHỐ</label>
              <select id="inp-city" class="form-field-input">
                <option value="Đà Nẵng" ${formData.city === 'Đà Nẵng' ? 'selected' : ''}>Đà Nẵng</option>
                <option value="Hà Nội" ${formData.city === 'Hà Nội' ? 'selected' : ''}>Hà Nội</option>
                <option value="TP. Hồ Chí Minh" ${formData.city === 'TP. Hồ Chí Minh' ? 'selected' : ''}>TP. Hồ Chí Minh</option>
              </select>
            </div>

            <div class="form-field-unit">
              <label class="form-field-label">QUẬN / HUYỆN</label>
              <input type="text" id="inp-district" class="form-field-input" value="${formData.district}" placeholder="Ví dụ: Sơn Trà, Cầu Giấy..." />
            </div>
          </div>

          <div class="form-field-unit">
            <label class="form-field-label">ĐỊA CHỈ CHI TIẾT (SỐ NHÀ, TÊN ĐƯỜNG, PHƯỜNG)</label>
            <input type="text" id="inp-address" class="form-field-input" value="${formData.address}" placeholder="Ví dụ: 120 Võ Nguyên Giáp, P. Phước Mỹ" />
          </div>
        `;

      // 3. DIỆN TÍCH & THÔNG SỐ
      case 3:
        return `
          <div class="wizard-step-header">
            <h2 class="wizard-step-title">Bước 3: Diện Tích & Kết Cấu Không Gian</h2>
            <p class="wizard-step-desc">Điền các thông số vật lý của căn hộ/phòng cho thuê.</p>
          </div>

          <div class="form-input-grid-2">
            <div class="form-field-unit">
              <label class="form-field-label">DIỆN TÍCH SỬ DỤNG (M²)</label>
              <input type="number" id="inp-area" class="form-field-input" value="${formData.area}" min="10" max="2000" />
            </div>

            <div class="form-field-unit">
              <label class="form-field-label">SỐ PHÒNG NGỦ</label>
              <input type="number" id="inp-bedrooms" class="form-field-input" value="${formData.bedrooms}" min="1" max="20" />
            </div>
          </div>

          <div class="form-input-grid-2">
            <div class="form-field-unit">
              <label class="form-field-label">SỐ PHÒNG TẮM / WC</label>
              <input type="number" id="inp-bathrooms" class="form-field-input" value="${formData.bathrooms}" min="1" max="20" />
            </div>

            <div class="form-field-unit">
              <label class="form-field-label">TIỀN ĐẶT CỌC (SỐ THÁNG)</label>
              <select id="inp-deposit" class="form-field-input">
                <option value="1" ${formData.depositMonths === 1 ? 'selected' : ''}>01 Tháng tiền nhà</option>
                <option value="2" ${formData.depositMonths === 2 ? 'selected' : ''}>02 Tháng tiền nhà</option>
                <option value="0" ${formData.depositMonths === 0 ? 'selected' : ''}>Không cần đặt cọc</option>
              </select>
            </div>
          </div>
        `;

      // 4. TIỆN ÍCH ĐẶC QUYỀN
      case 4:
        const availableAmenities = [
          'Hồ bơi riêng', 'Sân vườn BBQ', 'Gara ô tô', 'An ninh 24/7',
          'Full nội thất', 'Gác lửng cao', 'Khóa vân tay', 'Thang máy',
          'Máy giặt riêng', 'Điều hòa Inverter', 'Ban công thoáng', 'Cho nuôi thú cưng'
        ];

        return `
          <div class="wizard-step-header">
            <h2 class="wizard-step-title">Bước 4: Tiện Ích & Trang Thiết Bị Đi Kèm</h2>
            <p class="wizard-step-desc">Chọn các tiện ích nổi bật có sẵn tại bất động sản để thu hút khách thuê tiềm năng.</p>
          </div>

          <div class="amenities-multi-grid">
            ${availableAmenities.map(am => `
              <div class="amenity-chip-option ${formData.amenities.includes(am) ? 'active' : ''}" data-amenity="${am}">
                <span>${formData.amenities.includes(am) ? '✓' : '＋'}</span>
                <span>${am}</span>
              </div>
            `).join('')}
          </div>
        `;

      // 5. HÌNH ẢNH THỰC TẾ
      case 5:
        return `
          <div class="wizard-step-header">
            <h2 class="wizard-step-title">Bước 5: Hình Ảnh Thực Tế Bất Động Sản</h2>
            <p class="wizard-step-desc">Hình ảnh sắc nét và chân thực tăng cơ hội cho thuê lên tới 85%.</p>
          </div>

          <div class="image-upload-dropzone" id="img-dropzone">
            <strong style="font-size: 1.15rem; color: var(--text-main); display: block; margin-bottom: 0.35rem;">Kéo thả ảnh hoặc nhấn vào đây để tải lên</strong>
            <span style="font-size: 0.88rem; color: var(--text-muted);">Hỗ trợ định dạng JPG, PNG, WEBP (Tối đa 10 ảnh chất lượng cao)</span>
          </div>

          <div class="image-preview-mosaic">
            ${formData.images.map((img, idx) => `
              <div class="preview-thumb-box">
                <img src="${img}" alt="Ảnh ${idx + 1}" />
                <button type="button" class="thumb-remove-btn" data-img-idx="${idx}">✕</button>
              </div>
            `).join('')}
          </div>
        `;

      // 6. GIÁ THUÊ & CHI PHÍ
      case 6:
        const priceFormatted = AuthService.formatPrice(formData.price);

        return `
          <div class="wizard-step-header">
            <h2 class="wizard-step-title">Bước 6: Giá Thuê Niêm Yết Hàng Tháng</h2>
            <p class="wizard-step-desc">Đặt mức giá hợp lý và cạnh tranh để nhanh chóng tìm được người thuê phù hợp.</p>
          </div>

          <div class="form-field-unit" style="margin-bottom: 1.5rem;">
            <label class="form-field-label">MỨC GIÁ THUÊ HÀNG THÁNG (VNĐ)</label>
            <input type="number" id="inp-price" class="form-field-input" value="${formData.price}" step="500000" min="1000000" style="font-size: 1.3rem; font-weight: 800; color: var(--accent);" />
            <span style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.35rem;">
              Quy đổi hiển thị: <strong style="color: var(--accent);">${priceFormatted}</strong>
            </span>
          </div>
        `;

      // 7. TIÊU ĐỀ & MÔ TẢ
      case 7:
        return `
          <div class="wizard-step-header">
            <h2 class="wizard-step-title">Bước 7: Tiêu Đề Bài Đăng & Mô Tả Chi Tiết</h2>
            <p class="wizard-step-desc">Mô tả hấp dẫn về không gian, lối sống và các quy định cần lưu ý.</p>
          </div>

          <div class="form-field-unit" style="margin-bottom: 1.5rem;">
            <label class="form-field-label">TIÊU ĐỀ BÀI ĐĂNG (TỐI THIỂU 30 KÝ TỰ)</label>
            <input type="text" id="inp-title" class="form-field-input" value="${formData.title}" placeholder="Ví dụ: Căn hộ cao cấp view sông, đầy đủ tiện nghi..." />
          </div>

          <div class="form-field-unit">
            <label class="form-field-label">MÔ TẢ CHI TIẾT KHÔNG GIAN</label>
            <textarea id="inp-desc" class="form-field-input" style="height: 140px; resize: vertical; font-family: inherit;">${formData.description}</textarea>
          </div>
        `;

      // 8. GÓI ĐĂNG TIN & XEM TRƯỚC (PREVIEW)
      case 8:
        return `
          <div class="wizard-step-header">
            <h2 class="wizard-step-title">Bước 8: Chọn Gói Đăng Tin & Xem Trước (Preview)</h2>
            <p class="wizard-step-desc">Kiểm tra lại toàn bộ thông tin trước khi chính thức xuất bản tin cho thuê.</p>
          </div>

          <!-- Packages Grid -->
          <div class="packages-pricing-grid">
            <div class="package-card ${formData.package === 'free' ? 'active' : ''}" data-package="free">
              <strong style="font-size: 1.1rem; color: var(--text-main);">Gói Cơ Bản</strong>
              <div class="package-price-tag">0 đ</div>
              <p style="font-size: 0.85rem; color: var(--text-muted);">Hiển thị danh mục thường trong 30 ngày.</p>
            </div>

            <div class="package-card ${formData.package === 'standard' ? 'active' : ''}" data-package="standard">
              <span class="badge" style="background: var(--primary); color: #fff; margin: 0 auto;">NỔI BẬT</span>
              <strong style="font-size: 1.1rem; color: var(--text-main); margin-top: 0.35rem;">Gói Standard</strong>
              <div class="package-price-tag">49.000 đ</div>
              <p style="font-size: 0.85rem; color: var(--text-muted);">Ưu tiên hiển thị trên kết quả tìm kiếm.</p>
            </div>

            <div class="package-card ${formData.package === 'vip' ? 'active' : ''}" data-package="vip">
              <span class="badge badge-vip" style="margin: 0 auto;">VIP ĐẶC QUYỀN</span>
              <strong style="font-size: 1.1rem; color: var(--text-main); margin-top: 0.35rem;">Gói VIP Kim Cương</strong>
              <div class="package-price-tag">149.000 đ</div>
              <p style="font-size: 0.85rem; color: var(--text-muted);">Ghim đầu trang chủ, tiếp cận 50.000+ khách.</p>
            </div>
          </div>

          <!-- Real-time Live Preview Card -->
          <div style="background: var(--bg-surface-alt); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 1.5rem;">
            <div style="font-weight: 800; font-size: 0.82rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 1rem;">
              XEM TRƯỚC THẺ BÀI ĐĂNG (PREVIEW):
            </div>

            <div class="property-card" style="max-width: 480px; margin: 0 auto;">
              <div class="card-image-wrapper">
                <img src="${formData.images[0]}" alt="${formData.title}" />
                <div class="card-badges-floating">
                  ${formData.package === 'vip' ? '<span class="badge badge-vip">VIP</span>' : ''}
                  <span class="badge badge-verified">✓ Chính Chủ</span>
                  <span class="badge" style="background: rgba(27, 18, 14, 0.75); color: #fff;">${formData.type}</span>
                </div>
              </div>
              <div class="card-content-body">
                <div class="card-location-meta">
                  <span>${formData.district}, ${formData.city}</span>
                </div>
                <div class="card-property-title">
                  ${formData.title}
                </div>
                <div class="card-specs-row">
                  <span>${formData.area} m²</span>
                  <span>•</span>
                  <span>${formData.bedrooms} Phòng Ngủ</span>
                  <span>•</span>
                  <span>${formData.bathrooms} WC</span>
                </div>
                <div class="card-footer-row">
                  <div>
                    <span style="display: block; font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">GIÁ THUÊ</span>
                    <span class="card-price-val">${AuthService.formatPrice(formData.price)}</span>
                  </div>
                  <span class="badge" style="background: rgba(46, 125, 50, 0.15); color: #2e7d32; font-weight: 800;">
                    Sẵn sàng cho thuê
                  </span>
                </div>
              </div>
            </div>
          </div>
        `;

      default:
        return '';
    }
  }

  function saveCurrentStepInputs() {
    if (currentStep === 2) {
      formData.city = document.getElementById('inp-city')?.value || formData.city;
      formData.district = document.getElementById('inp-district')?.value || formData.district;
      formData.address = document.getElementById('inp-address')?.value || formData.address;
    } else if (currentStep === 3) {
      formData.area = parseInt(document.getElementById('inp-area')?.value) || formData.area;
      formData.bedrooms = parseInt(document.getElementById('inp-bedrooms')?.value) || formData.bedrooms;
      formData.bathrooms = parseInt(document.getElementById('inp-bathrooms')?.value) || formData.bathrooms;
      formData.depositMonths = parseInt(document.getElementById('inp-deposit')?.value) || formData.depositMonths;
    } else if (currentStep === 6) {
      formData.price = parseInt(document.getElementById('inp-price')?.value) || formData.price;
    } else if (currentStep === 7) {
      formData.title = document.getElementById('inp-title')?.value || formData.title;
      formData.description = document.getElementById('inp-desc')?.value || formData.description;
    }
  }

  function attachWizardEvents() {
    // Next Step Button
    const nextBtn = document.getElementById('btn-wizard-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        saveCurrentStepInputs();
        if (currentStep < 8) {
          currentStep++;
          renderWizard();
        }
      });
    }

    // Prev Step Button
    const prevBtn = document.getElementById('btn-wizard-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        saveCurrentStepInputs();
        if (currentStep > 1) {
          currentStep--;
          renderWizard();
        }
      });
    }

    // Step 1: Category Cards (Chọn thẻ nhưng không tự nhảy bước, chờ bấm Tiếp Tục)
    container.querySelectorAll('.category-select-card').forEach(card => {
      card.addEventListener('click', () => {
        formData.category = card.dataset.cat;
        formData.type = card.dataset.type;
        container.querySelectorAll('.category-select-card').forEach(c => {
          c.classList.remove('active');
          const badge = c.querySelector('.category-card-check-badge');
          if (badge) badge.textContent = '';
        });
        card.classList.add('active');
        const activeBadge = card.querySelector('.category-card-check-badge');
        if (activeBadge) activeBadge.textContent = '✓';
      });
    });

    // Step 4: Amenities Multi-Select
    container.querySelectorAll('.amenity-chip-option').forEach(chip => {
      chip.addEventListener('click', () => {
        const am = chip.dataset.amenity;
        const idx = formData.amenities.indexOf(am);
        if (idx > -1) {
          formData.amenities.splice(idx, 1);
        } else {
          formData.amenities.push(am);
        }
        renderWizard();
      });
    });

    // Step 5: Remove Image Thumbnail
    container.querySelectorAll('.thumb-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.imgIdx);
        if (formData.images.length > 1) {
          formData.images.splice(idx, 1);
          renderWizard();
        } else {
          showToast('Bài đăng cần có tối thiểu 1 hình ảnh!');
        }
      });
    });

    // Step 5: Dropzone Add Mock Photos
    const dropzone = document.getElementById('img-dropzone');
    if (dropzone) {
      dropzone.addEventListener('click', () => {
        const extraPhotos = [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
        ];
        const nextImg = extraPhotos[formData.images.length % extraPhotos.length];
        formData.images.push(nextImg);
        showToast('Đã thêm 1 hình ảnh chất lượng cao vào bộ sưu tập!');
        renderWizard();
      });
    }

    // Step 8: Package Selection
    container.querySelectorAll('.package-card').forEach(pCard => {
      pCard.addEventListener('click', () => {
        formData.package = pCard.dataset.package;
        renderWizard();
      });
    });

    // Publish Button
    const publishBtn = document.getElementById('btn-wizard-publish');
    if (publishBtn) {
      publishBtn.addEventListener('click', () => {
        const currentUser = AuthService.getCurrentUser();
        const newPropertyId = 'prop-' + Date.now();

        const newProp = {
          id: newPropertyId,
          title: formData.title,
          category: formData.category,
          type: formData.type,
          price: formData.price,
          priceUsd: Math.round(formData.price / 25000),
          area: formData.area,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          location: {
            city: formData.city,
            district: formData.district,
            address: formData.address
          },
          images: formData.images,
          isVip: formData.package === 'vip',
          isVerified: true,
          amenities: formData.amenities,
          landlord: {
            name: currentUser.name || 'Chủ Nhà Trần Minh',
            avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            phone: '0903***888',
            verified: true
          },
          description: formData.description
        };

        const list = Store.getProperties();
        list.unshift(newProp);
        Store.saveProperties(list);

        showToast('🎉 Đăng tin cho thuê thành công! Đang chuyển hướng sang bài đăng...');

        setTimeout(() => {
          window.location.hash = `#/detail?id=${newPropertyId}`;
        }, 1200);
      });
    }
  }

  renderWizard();
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
