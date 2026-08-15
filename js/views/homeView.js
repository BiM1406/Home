/**
 * Home View Module (Trang Chủ)
 * Tông màu Warm Linen & Deep Espresso + Floating Island Capsule Search Bar + Ảnh nền bãi biển + Banner Chủ Nhà + 55 Đốm Sáng Vàng Kim
 * Hỗ trợ chuyển đổi đa tiền tệ (VNĐ ↔ USD) tự động
 */
import { HERO_SLIDES } from '../data/mockData.js';
import { AuthService } from '../services/auth.js';

let heroSlideTimer = null;
let sparksAnimationId = null;

export function renderHomeView(container) {
  if (sparksAnimationId) cancelAnimationFrame(sparksAnimationId);

  const priceVilla = AuthService.formatPriceRange(45000000, 45000000, true);
  const priceApt = AuthService.formatPriceRange(18500000, 18500000, true);
  const priceRoom = AuthService.formatPriceRange(3200000, 4800000, false);
  const priceStudio = AuthService.formatPriceRange(9500000, 12000000, false);

  container.innerHTML = `
    <div class="homepage-wrapper">
      <!-- =================================================================
           1. HERO SECTION (Editorial Luxury Resort)
           ================================================================= -->
      <section class="hero-section" id="hero-carousel">
        <!-- Background Slider Layers -->
        <div class="hero-bg-slider" id="hero-bg-track">
          ${HERO_SLIDES.map((slide, index) => `
            <div class="hero-bg-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${slide.image}');" data-index="${index}"></div>
          `).join('')}
        </div>

        <!-- Dynamic Warm Dark Gradient Overlay -->
        <div class="hero-overlay"></div>

        <!-- Hero Content -->
        <div class="container hero-content">
          <div class="hero-pill-badge">
            <span>Rich & Cozy • Cho Thuê Trực Tiếp 0% Trung Gian</span>
          </div>
          <h1 class="hero-title">
            Tìm Kiếm Không Gian Sống <span style="font-style: italic; font-weight: 400; color: var(--gold-light);">Tiện Nghi & Đẳng Cấp</span>
          </h1>
          <p class="hero-subtitle">
            Hàng ngàn phòng trọ, căn hộ và biệt thự villa chính chủ — Kết nối trực tiếp Chủ nhà & Khách thuê, ký hợp đồng điện tử chuẩn mực.
          </p>

          <!-- Floating Island Capsule Search Bar -->
          <div class="hero-search-wrapper">
            <!-- Segmented Pill Tabs Control (Viên Thuốc Nổi) -->
            <div class="search-pills-bar" id="search-tabs">
              <button type="button" class="search-pill-btn active" data-category="all">
                <span>✦ Tất Cả</span>
              </button>
              <button type="button" class="search-pill-btn" data-category="villa">
                <span>Villa Nghỉ Dưỡng</span>
              </button>
              <button type="button" class="search-pill-btn" data-category="apartment">
                <span>Căn Hộ Cao Cấp</span>
              </button>
              <button type="button" class="search-pill-btn" data-category="room">
                <span>Phòng Trọ Tiện Nghi</span>
              </button>
              <button type="button" class="search-pill-btn" data-category="studio">
                <span>Studio Dịch Vụ</span>
              </button>
            </div>

            <!-- Form Body: 3 Interactive Field Cells + CTA Button -->
            <form class="search-cells-grid" id="quick-search-form">
              <!-- Field Cell 1: Location -->
              <div class="search-interactive-cell">
                <span class="cell-label">KHU VỰC / THÀNH PHỐ</span>
                <div class="cell-select-box">
                  <select id="search-city" name="city">
                    <option value="">Tất cả thành phố</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                  </select>
                </div>
              </div>

              <!-- Field Cell 2: Price Range -->
              <div class="search-interactive-cell">
                <span class="cell-label">KHOẢNG GIÁ DỰ KIẾN</span>
                <div class="cell-select-box">
                  <select id="search-price" name="price">
                    <option value="">Tất cả mức giá</option>
                    <option value="under-3m">Dưới 3 triệu / $120</option>
                    <option value="3m-7m">3 - 7 triệu / $120 - $280</option>
                    <option value="7m-15m">7 - 15 triệu / $280 - $600</option>
                    <option value="above-15m">Trên 15 triệu / Trên $600</option>
                  </select>
                </div>
              </div>

              <!-- Field Cell 3: Amenity / Feature -->
              <div class="search-interactive-cell">
                <span class="cell-label">TIỆN ÍCH ƯU TIÊN</span>
                <div class="cell-select-box">
                  <select id="search-amenity" name="amenity">
                    <option value="">Tất cả tiện ích</option>
                    <option value="pool">Hồ bơi riêng</option>
                    <option value="mezzanine">Có gác lửng</option>
                    <option value="security">An ninh 24/7</option>
                    <option value="furnished">Full nội thất</option>
                  </select>
                </div>
              </div>

              <!-- Submit Button Capsule -->
              <div>
                <button type="submit" class="btn-search-pill">
                  <span>Tìm Kiếm &rsaquo;</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- =================================================================
           2. FULL-WIDTH SHOWCASE WRAPPER
           Với 55 Đốm Sáng Vàng Kim Phát Sáng Lơ Lửng (Tinh Tế & Thoáng Đãng)
           ================================================================= -->
      <section class="showcase-wrapper-outer" id="showcase-section">
        <canvas id="gold-sparks-canvas" class="gold-sparks-canvas"></canvas>

        <div class="ambient-glow-left"></div>
        <div class="ambient-glow-right"></div>

        <div class="visual-showcase-container">
          
          <!-- BLOCK 1: VILLA NGHỈ DƯỠNG (Nội dung TRÁI - Stat Phải) -->
          <div class="visual-category-block">
            <div class="border-beam-glow"></div>
            <div class="visual-block-inner" style="background-image: url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85');">
              <div class="visual-block-overlay"></div>
              
              <!-- Content Left -->
              <div class="visual-block-content">
                <span class="visual-block-badge">Bất Động Sản Nghỉ Dưỡng Cao Cấp</span>
                <h2 class="visual-block-title">Biệt Thự & Villa Nghỉ Dưỡng</h2>
                <p class="visual-block-desc">
                  Không gian sống đẳng cấp biệt lập với hồ bơi riêng, sân vườn thoáng mát, thiết kế mở và hệ thống an ninh 24/7.
                </p>
                <div class="visual-block-features">
                  <span class="visual-feature-tag">Hồ bơi riêng</span>
                  <span class="visual-feature-tag">Sân vườn BBQ</span>
                  <span class="visual-feature-tag">Gara đỗ ô tô</span>
                  <span class="visual-feature-tag">An ninh 24/7</span>
                </div>
                <a href="#/search?category=villa" class="visual-block-cta">
                  <span>Khám phá danh sách Villa &rsaquo;</span>
                </a>
              </div>

              <!-- Floating Glass Stats Right -->
              <div class="visual-block-side-stats">
                <div class="glass-stat-capsule">
                  <div class="stat-item">
                    <span class="stat-label">Diện tích phổ biến</span>
                    <span class="stat-value">300 - 500 m²</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Mức giá thuê</span>
                    <span class="stat-value highlight">${priceVilla}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Độ tin cậy</span>
                    <span class="stat-value badge-pill">100% Chủ nhà xác thực</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Số lượng có sẵn</span>
                    <span class="stat-value">18+ Biệt thự</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- BLOCK 2: CĂN HỘ CAO CẤP & SKY VILLA (Nội dung PHẢI - Stat Trái) -->
          <div class="visual-category-block alt-reverse">
            <div class="border-beam-glow"></div>
            <div class="visual-block-inner" style="background-image: url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1800&q=85');">
              <div class="visual-block-overlay"></div>
              
              <!-- Content Right -->
              <div class="visual-block-content">
                <span class="visual-block-badge">Căn Hộ View Panorama Toàn Cảnh</span>
                <h2 class="visual-block-title">Căn Hộ Cao Cấp & Duplex</h2>
                <p class="visual-block-desc">
                  Tầm nhìn bao trọn cảnh quan thành phố và sông nước, nội thất nhập khẩu sang trọng, liền kề trung tâm tài chính và thương mại.
                </p>
                <div class="visual-block-features">
                  <span class="visual-feature-tag">View sông & thành phố</span>
                  <span class="visual-feature-tag">Hồ bơi vô cực</span>
                  <span class="visual-feature-tag">Phòng Gym & Yoga</span>
                  <span class="visual-feature-tag">Thang máy thẻ từ</span>
                </div>
                <a href="#/search?category=apartment" class="visual-block-cta">
                  <span>Khám phá danh sách Căn hộ &rsaquo;</span>
                </a>
              </div>

              <!-- Floating Glass Stats Left -->
              <div class="visual-block-side-stats">
                <div class="glass-stat-capsule">
                  <div class="stat-item">
                    <span class="stat-label">Tầm nhìn không gian</span>
                    <span class="stat-value">View Sông & Skyline</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Mức giá thuê</span>
                    <span class="stat-value highlight">${priceApt}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Tiêu chuẩn</span>
                    <span class="stat-value badge-pill">Hạng A Cao Cấp</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Số lượng có sẵn</span>
                    <span class="stat-value">35+ Căn hộ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- BLOCK 3: PHÒNG TRỌ TIỆN NGHI GIÁ TỐT (Nội dung TRÁI - Stat Phải) -->
          <div class="visual-category-block">
            <div class="border-beam-glow"></div>
            <div class="visual-block-inner" style="background-image: url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1800&q=85');">
              <div class="visual-block-overlay"></div>
              
              <!-- Content Left -->
              <div class="visual-block-content">
                <span class="visual-block-badge">Chính Chủ Cho Thuê Trực Tiếp</span>
                <h2 class="visual-block-title">Phòng Trọ Tiện Nghi Giá Tốt</h2>
                <p class="visual-block-desc">
                  Chính chủ cho thuê, phòng mới xây sạch đẹp, có gác lửng thoáng mát, giờ giấc tự do, gần các trường đại học và trục giao thông huyết mạch.
                </p>
                <div class="visual-block-features">
                  <span class="visual-feature-tag">Không chung chủ</span>
                  <span class="visual-feature-tag">Giờ giấc tự do</span>
                  <span class="visual-feature-tag">Khóa vân tay</span>
                  <span class="visual-feature-tag">Chi phí hợp lý</span>
                </div>
                <a href="#/search?category=room" class="visual-block-cta">
                  <span>Khám phá danh sách Phòng trọ &rsaquo;</span>
                </a>
              </div>

              <!-- Floating Glass Stats Right -->
              <div class="visual-block-side-stats">
                <div class="glass-stat-capsule">
                  <div class="stat-item">
                    <span class="stat-label">Diện tích</span>
                    <span class="stat-value">25 - 35 m²</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Mức giá thuê</span>
                    <span class="stat-value highlight">${priceRoom}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Phí môi giới</span>
                    <span class="stat-value badge-pill">0% Miễn Phí</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Số lượng có sẵn</span>
                    <span class="stat-value">120+ Phòng mới</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- BLOCK 4: STUDIO & CĂN HỘ DỊCH VỤ (Nội dung PHẢI - Stat Trái) -->
          <div class="visual-category-block alt-reverse">
            <div class="border-beam-glow"></div>
            <div class="visual-block-inner" style="background-image: url('https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1800&q=85');">
              <div class="visual-block-overlay"></div>
              
              <!-- Content Right -->
              <div class="visual-block-content">
                <span class="visual-block-badge">Full Nội Thất • Dọn Vào Ở Ngay</span>
                <h2 class="visual-block-title">Studio & Căn Hộ Dịch Vụ</h2>
                <p class="visual-block-desc">
                  Đầy đủ tiện nghi bếp, máy giặt, điều hòa, dịch vụ dọn phòng định kỳ — Chỉ việc xách vali vào ở, giải pháp lý tưởng cho người đi làm và chuyên gia.
                </p>
                <div class="visual-block-features">
                  <span class="visual-feature-tag">Full nội thất</span>
                  <span class="visual-feature-tag">Dọn phòng 2 lần/tuần</span>
                  <span class="visual-feature-tag">Bếp nấu tiện nghi</span>
                  <span class="visual-feature-tag">Wifi tốc độ cao</span>
                </div>
                <a href="#/search?category=studio" class="visual-block-cta">
                  <span>Khám phá danh sách Studio &rsaquo;</span>
                </a>
              </div>

              <!-- Floating Glass Stats Left -->
              <div class="visual-block-side-stats">
                <div class="glass-stat-capsule">
                  <div class="stat-item">
                    <span class="stat-label">Gói dịch vụ</span>
                    <span class="stat-value">Trọn gói điện nước</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Mức giá thuê</span>
                    <span class="stat-value highlight">${priceStudio}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Tình trạng</span>
                    <span class="stat-value badge-pill">Dọn vào ngay</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Số lượng có sẵn</span>
                    <span class="stat-value">42+ Căn studio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- =================================================================
           3. VALUE PROPOSITIONS & TRUST (Nền Bãi Biển Resort Toàn Cảnh)
           ================================================================= -->
      <section class="value-props-section">
        <div class="value-props-overlay"></div>

        <div class="container">
          <div class="value-props-header">
            <span class="value-props-tag">Cam Kết Giá Trị Độc Bản</span>
            <h2 class="value-props-title">
              Tại Sao Nên Thuê Nhà Trên <span style="font-style: italic; font-weight: 400; color: var(--gold-light);">RoomRent?</span>
            </h2>
            <p class="value-props-desc">
              Trải nghiệm thuê nhà trực tiếp thế hệ mới — Loại bỏ toàn bộ rủi ro, tối ưu chi phí và minh bạch pháp lý.
            </p>
          </div>

          <div class="props-grid">
            <div class="prop-card">
              <div class="prop-number">01</div>
              <h3>0% Chi Phí Môi Giới</h3>
              <p>
                Làm việc và thương lượng trực tiếp với Chủ nhà. Tiết kiệm ngay từ 50% - 100% tiền thuê tháng đầu tiên.
              </p>
            </div>

            <div class="prop-card">
              <div class="prop-number">02</div>
              <h3>Hợp Đồng Ký Điện Tử</h3>
              <p>
                Mẫu hợp đồng pháp lý chuẩn mực tự động tạo lập, ký online trên điện thoại nhanh chóng và xuất file PDF lưu trữ.
              </p>
            </div>

            <div class="prop-card">
              <div class="prop-number">03</div>
              <h3>Bảo Mật Thông Tin & <span class="nowrap">Chat 1-1</span></h3>
              <p>
                Hệ thống chat nội bộ tự động che số điện thoại cá nhân (PII), bảo vệ sự riêng tư tuyệt đối và tránh bị làm phiền.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- =================================================================
           4. LANDLORD CALL TO ACTION - Biệt Thự Hoàng Hôn & 55 Đốm Sáng Vàng Kim
           ================================================================= -->
      <section class="cta-banner-section" id="cta-section">
        <canvas id="cta-sparks-canvas" class="cta-sparks-canvas"></canvas>

        <div class="cta-banner-container">
          <div class="cta-banner-card">
            <div class="border-beam-glow"></div>
            
            <div class="cta-banner-inner">
              <div class="cta-banner-overlay"></div>
              
              <div class="cta-banner-content">
                <span class="cta-banner-tag">Đặc Quyền Dành Riêng Cho Chủ Nhà</span>
                <h2 class="cta-banner-title">
                  Bạn Đang Có Bất Động Sản <span style="font-style: italic; font-weight: 400; color: var(--gold-light);">Cần Cho Thuê?</span>
                </h2>
                <p class="cta-banner-desc">
                  Tiếp cận hơn 50,000+ khách thuê tiềm năng mỗi tháng. Đăng tin trực tiếp nhanh chóng trong 3 phút, tối ưu hiệu suất cho thuê phòng trống với bộ công cụ quản trị thông minh.
                </p>
                
                <div class="cta-banner-badges">
                  <span class="cta-mini-chip">0% Phí Niêm Yết</span>
                  <span class="cta-mini-chip">Hợp Đồng Mẫu Miễn Phí</span>
                  <span class="cta-mini-chip">Bảo Mật SĐT Chủ Nhà</span>
                </div>
              </div>

              <div class="cta-banner-actions">
                <a href="#/post-property" class="btn btn-white" style="padding: 1.1rem 2.5rem; font-size: 1.05rem;">
                  <span>Đăng Tin Cho Thuê Ngay</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Attach interactive engines
  initHeroSlideshow();
  initSearchTabs();
  initGoldSparksEngines();
}

/**
 * Hero Background Image Carousel Timer
 */
function initHeroSlideshow() {
  if (heroSlideTimer) clearInterval(heroSlideTimer);

  const slides = document.querySelectorAll('.hero-bg-slide');
  if (slides.length <= 1) return;

  let currentIdx = 0;

  heroSlideTimer = setInterval(() => {
    slides[currentIdx].classList.remove('active');
    currentIdx = (currentIdx + 1) % slides.length;
    slides[currentIdx].classList.add('active');
  }, 5000);
}

/**
 * Search Tabs Segmented Pill Controls switching logic
 */
function initSearchTabs() {
  const tabs = document.querySelectorAll('.search-pill-btn');
  let selectedCategory = 'all';

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedCategory = tab.dataset.category;
    });
  });

  const form = document.getElementById('quick-search-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const city = document.getElementById('search-city')?.value || '';
      const price = document.getElementById('search-price')?.value || '';
      const amenity = document.getElementById('search-amenity')?.value || '';

      const queryParams = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'all') queryParams.set('category', selectedCategory);
      if (city) queryParams.set('city', city);
      if (price) queryParams.set('price', price);
      if (amenity) queryParams.set('amenity', amenity);

      window.location.hash = `#/search?${queryParams.toString()}`;
    });
  }
}

/**
 * Rich Floating Glowing Gold Sparks Canvas Engines (55 Particles Each)
 */
function initGoldSparksEngines() {
  const showcaseCanvas = document.getElementById('gold-sparks-canvas');
  const ctaCanvas = document.getElementById('cta-sparks-canvas');
  const showcaseSection = document.getElementById('showcase-section');
  const ctaSection = document.getElementById('cta-section');

  if (!showcaseCanvas || !ctaCanvas || !showcaseSection || !ctaSection) return;

  const ctx1 = showcaseCanvas.getContext('2d');
  const ctx2 = ctaCanvas.getContext('2d');

  function resize() {
    showcaseCanvas.width = showcaseSection.clientWidth;
    showcaseCanvas.height = showcaseSection.clientHeight;
    ctaCanvas.width = ctaSection.clientWidth;
    ctaCanvas.height = ctaSection.clientHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  const particles1 = createParticleArray(55, showcaseCanvas.width, showcaseCanvas.height);
  const particles2 = createParticleArray(55, ctaCanvas.width, ctaCanvas.height);

  function createParticleArray(count, w, h) {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 3.2 + 1.4,
        alpha: Math.random() * 0.45 + 0.3,
        speedY: Math.random() * 0.45 + 0.2,
        amplitude: Math.random() * 25 + 12,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: Math.random() * 0.022 + 0.01,
        hue: Math.random() > 0.4 ? '#e0b445' : '#f59e0b'
      });
    }
    return arr;
  }

  function render() {
    ctx1.clearRect(0, 0, showcaseCanvas.width, showcaseCanvas.height);
    renderParticleList(ctx1, particles1, showcaseCanvas.width, showcaseCanvas.height);

    ctx2.clearRect(0, 0, ctaCanvas.width, ctaCanvas.height);
    renderParticleList(ctx2, particles2, ctaCanvas.width, ctaCanvas.height);

    sparksAnimationId = requestAnimationFrame(render);
  }

  function renderParticleList(ctx, list, w, h) {
    for (let i = 0; i < list.length; i++) {
      const p = list[i];
      p.y -= p.speedY;
      p.angle += p.angleSpeed;
      p.alpha += Math.sin(p.angle * 2.5) * 0.008;

      if (p.y < -10) {
        p.y = h + 10;
        p.x = Math.random() * w;
      }

      const drawX = p.x + Math.sin(p.angle) * p.amplitude;
      const currentAlpha = Math.max(0.18, Math.min(0.85, p.alpha));

      ctx.save();
      ctx.beginPath();
      ctx.arc(drawX, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224, 180, 69, ${currentAlpha})`;
      ctx.shadowBlur = 14;
      ctx.shadowColor = p.hue;
      ctx.fill();
      ctx.restore();
    }
  }

  render();
}
