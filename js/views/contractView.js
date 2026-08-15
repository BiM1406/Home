/**
 * Digital Contract View Module (Hợp Đồng Thuê Nhà Điện Tử & Ký Online)
 * Standard Legal Template with HTML5 Canvas Signature Pad & Printable PDF Output
 */
import { Store } from '../services/store.js';
import { AuthService } from '../services/auth.js';

export function renderContractView(container) {
  const hash = window.location.hash || '';
  const queryString = hash.includes('?') ? hash.split('?')[1] : '';
  const params = new URLSearchParams(queryString);
  const propertyId = params.get('propertyId') || 'villa-01';

  const allProperties = Store.getProperties();
  const property = Store.getPropertyById(propertyId) || allProperties[0];
  const currentUser = AuthService.getCurrentUser();

  const contractCode = 'HD-' + property.id.toUpperCase() + '-2026';
  const today = new Date();
  const todayFormatted = `Ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`;
  const priceFormatted = AuthService.formatPrice(property.price, property.priceUsd);

  let isSigned = false;

  container.innerHTML = `
    <div class="contract-page-wrapper">
      <div class="container">
        
        <!-- Contract Toolbar (Switch Property & Actions) -->
        <div class="contract-toolbar">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <label style="font-weight: 800; font-size: 0.88rem; color: var(--text-main);">
              BẤT ĐỘNG SẢN ÁP DỤNG:
            </label>
            <select id="contract-property-select" class="sort-select" style="min-width: 320px;">
              ${allProperties.map(p => `
                <option value="${p.id}" ${p.id === property.id ? 'selected' : ''}>
                  ${p.type}: ${p.title.slice(0, 42)}...
                </option>
              `).join('')}
            </select>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button id="btn-print-contract" class="btn btn-outline" style="padding: 0.6rem 1.4rem; font-size: 0.9rem;">
              <span>In / Xuất PDF</span>
            </button>
            <a href="#/detail?id=${property.id}" class="btn btn-white" style="padding: 0.6rem 1.4rem; font-size: 0.9rem;">
              <span>Quay Lại Chi Tiết</span>
            </a>
          </div>
        </div>

        <!-- A4 Standard Legal Paper Document -->
        <article class="contract-paper-a4" id="printable-contract-paper">
          
          <!-- National Header -->
          <div class="contract-national-header">
            <div style="font-size: 1.15rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </div>
            <div style="font-size: 1.02rem; font-style: italic; margin-top: 0.25rem;">
              Độc lập - Tự do - Hạnh phúc
            </div>
            <div style="margin-top: 0.4rem; font-size: 0.85rem; color: #666;">
              ------o0o------
            </div>

            <h1 class="contract-main-title">HỢP ĐỒNG THUÊ NHÀ Ở ĐIỆN TỬ</h1>
            <div class="contract-meta-info">
              Mã số hợp đồng: <strong>${contractCode}</strong> • Lập tại: Hệ thống trực tuyến RoomRent • ${todayFormatted}
            </div>
          </div>

          <!-- Preamble -->
          <p style="margin-bottom: 1.25rem;">
            Căn cứ Bộ luật Dân sự số 91/2015/QH13 và Luật Nhà ở số 65/2014/QH13 của Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam;
          </p>
          <p style="margin-bottom: 1.5rem;">
            Hôm nay, ${todayFormatted}, tại nền tảng RoomRent, hai bên chúng tôi gồm có:
          </p>

          <!-- Bên A (Chủ Nhà) -->
          <div class="contract-party-box">
            <div class="contract-party-title">BÊN CHO THUÊ (BÊN A):</div>
            <div>Họ và tên: <strong>${property.landlord?.name || 'Trần Văn B'}</strong></div>
            <div>Số CCCD/CMND: <strong>079088******</strong> (Đã xác minh định danh điện tử)</div>
            <div>Số điện thoại liên hệ: <strong>${property.landlord?.phone || '0903***888'}</strong></div>
            <div>Tư cách pháp lý: <strong>Chủ sở hữu hợp pháp của bất động sản</strong></div>
          </div>

          <!-- Bên B (Khách Thuê) -->
          <div class="contract-party-box">
            <div class="contract-party-title">BÊN THUÊ NHÀ (BÊN B):</div>
            <div>Họ và tên: <strong>${currentUser.name || 'Nguyễn Đạt'}</strong></div>
            <div>Số CCCD/CMND: <strong>001201******</strong></div>
            <div>Email / Tài khoản: <strong>${currentUser.email || 'nguyendat@roomrent.vn'}</strong></div>
            <div>Vai trò: <strong>Khách thuê trực tiếp</strong></div>
          </div>

          <p style="font-style: italic; margin-bottom: 1.5rem;">
            Sau khi thỏa thuận và thống nhất trên tinh thần tự nguyện, hai bên nhất trí ký kết hợp đồng thuê nhà với các điều khoản chi tiết như sau:
          </p>

          <!-- Điều 1 -->
          <div class="contract-clause-heading">ĐIỀU 1: ĐỐI TƯỢNG VÀ THÔNG TIN BẤT ĐỘNG SẢN CHO THUÊ</div>
          <p>
            1.1. Bên A đồng ý cho Bên B thuê toàn quyền sử dụng bất động sản tại địa chỉ: <strong>${property.location.address}</strong>.
          </p>
          <p>
            1.2. Loại hình: <strong>${property.type}</strong>. Diện tích sử dụng: <strong>${property.area} m²</strong> (gồm ${property.bedrooms} phòng ngủ, ${property.bathrooms} phòng tắm).
          </p>
          <p>
            1.3. Mục đích thuê: <strong>Dùng để ở và sinh hoạt gia đình/cá nhân hợp pháp</strong>.
          </p>

          <!-- Điều 2 -->
          <div class="contract-clause-heading">ĐIỀU 2: GIÁ THUÊ, TIỀN ĐẶT CỌC VÀ PHƯƠNG THỨC THANH TOÁN</div>
          <p>
            2.1. Giá thuê bất động sản là: <strong>${priceFormatted}</strong> (Cố định trong suốt thời hạn hợp đồng).
          </p>
          <p>
            2.2. Tiền đặt cọc bảo đảm: <strong>01 tháng tiền thuê</strong>. Khoản tiền cọc sẽ được Bên A hoàn trả đầy đủ 100% cho Bên B khi thanh lý hợp đồng đúng cam kết.
          </p>
          <p>
            2.3. Phương thức thanh toán: Chuyển khoản ngân hàng trực tiếp vào ngày <strong>05 hàng tháng</strong>.
          </p>

          <!-- Điều 3 -->
          <div class="contract-clause-heading">ĐIỀU 3: THỜI HẠN THUÊ VÀ GIA HẠN HỢP ĐỒNG</div>
          <p>
            3.1. Thời hạn thuê là <strong>12 tháng</strong>, tính từ ${todayFormatted}.
          </p>
          <p>
            3.2. Khi hết hạn hợp đồng, nếu Bên B có nhu cầu tiếp tục thuê thì được quyền ưu tiên gia hạn hợp đồng mới trước 30 ngày.
          </p>

          <!-- Điều 4 -->
          <div class="contract-clause-heading">ĐIỀU 4: CAM KẾT CHUNG VÀ GIÁ TRỊ PHÁP LÝ</div>
          <p>
            4.1. Hợp đồng điện tử này có giá trị pháp lý tương đương văn bản giấy theo Luật Giao dịch điện tử số 51/2005/QH11.
          </p>
          <p>
            4.2. Hai bên cam kết thực hiện đúng mọi điều khoản đã ghi trong hợp đồng.
          </p>

          <!-- Signature Section -->
          <div class="contract-signatures-grid">
            
            <!-- Column 1: Landlord Signature -->
            <div class="signature-column">
              <div class="signature-role-title">ĐẠI DIỆN BÊN CHO THUÊ (BÊN A)</div>
              <div class="signature-sub-note">(Ký số & xác thực điện tử)</div>
              
              <div class="signature-canvas-wrapper" style="display: flex; align-items: center; justify-content: center; background: #faf8f5;">
                <div style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 2.2rem; color: #1a237e; transform: rotate(-6deg);">
                  ${property.landlord?.name || 'Trần Văn B'}
                </div>
                <div class="signed-verified-stamp">✓ ĐÃ KÝ ĐIỆN TỬ</div>
              </div>
              <div style="font-weight: bold; margin-top: 0.5rem;">${property.landlord?.name || 'Trần Văn B'}</div>
            </div>

            <!-- Column 2: Renter Signature -->
            <div class="signature-column">
              <div class="signature-role-title">ĐẠI DIỆN BÊN THUÊ (BÊN B)</div>
              <div class="signature-sub-note" id="renter-sign-note">(Vẽ chữ ký của bạn vào khung bên dưới)</div>
              
              <div class="signature-canvas-wrapper" id="canvas-container">
                <canvas id="renter-signature-canvas" class="signature-canvas"></canvas>
                <div class="signed-verified-stamp" id="renter-signed-stamp" style="display: none;">✓ ĐÃ KÝ THÀNH CÔNG</div>
              </div>

              <!-- Sign Action Controls -->
              <div class="btn-sign-actions" id="sign-controls" style="display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; justify-content: center;">
                <button type="button" class="btn btn-outline" id="btn-clear-sig" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;">
                  <span>Xóa Ký Lại</span>
                </button>
                <button type="button" class="btn btn-outline" id="btn-auto-sig" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;">
                  <span>Ký Mẫu 1 Chạm</span>
                </button>
                <button type="button" class="btn btn-accent" id="btn-confirm-sign" style="padding: 0.45rem 1.15rem; font-size: 0.85rem;">
                  <span>Xác Nhận Ký Hợp Đồng</span>
                </button>
              </div>

              <div style="font-weight: bold; margin-top: 0.75rem;">${currentUser.name || 'Nguyễn Đạt'}</div>
            </div>

          </div>

        </article>

      </div>
    </div>
  `;

  setupContractEvents(property);
}

function setupContractEvents(property) {
  // 1. Property Switcher
  const propSelect = document.getElementById('contract-property-select');
  if (propSelect) {
    propSelect.addEventListener('change', (e) => {
      window.location.hash = `#/contract?propertyId=${e.target.value}`;
    });
  }

  // 2. Print PDF Button
  const printBtn = document.getElementById('btn-print-contract');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 3. HTML5 Canvas Signature Pad
  const canvas = document.getElementById('renter-signature-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Set real canvas dimensions
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width || 320;
  canvas.height = rect.height || 140;

  ctx.strokeStyle = '#0d47a1';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  let isDrawing = false;
  let hasDrawn = false;

  function getPos(e) {
    const r = canvas.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      return {
        x: e.touches[0].clientX - r.left,
        y: e.touches[0].clientY - r.top
      };
    }
    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    };
  }

  function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    hasDrawn = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stopDrawing() {
    isDrawing = false;
  }

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', stopDrawing);

  canvas.addEventListener('touchstart', startDrawing, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  window.addEventListener('touchend', stopDrawing);

  // Clear Signature Button
  const clearBtn = document.getElementById('btn-clear-sig');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasDrawn = false;
    });
  }

  // Auto Sample Sign Button
  const autoSigBtn = document.getElementById('btn-auto-sig');
  if (autoSigBtn) {
    autoSigBtn.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.font = "italic 38px 'Brush Script MT', cursive, sans-serif";
      ctx.fillStyle = '#0d47a1';
      ctx.fillText(AuthService.getCurrentUser().name || 'Nguyen An', 35, 80);
      ctx.restore();
      hasDrawn = true;
    });
  }

  // Confirm Sign Button
  const confirmBtn = document.getElementById('btn-confirm-sign');
  const stamp = document.getElementById('renter-signed-stamp');
  const signControls = document.getElementById('sign-controls');
  const noteText = document.getElementById('renter-sign-note');

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (!hasDrawn) {
        showToast('Vui lòng vẽ chữ ký của bạn trước khi xác nhận!');
        return;
      }

      stamp.style.display = 'block';
      signControls.innerHTML = `
        <div style="font-size: 0.85rem; font-weight: 800; color: #2e7d32; display: flex; align-items: center; gap: 0.35rem;">
          <span>✓ ĐÃ XÁC THỰC KÝ THÀNH CÔNG VÀO HỆ THỐNG</span>
        </div>
      `;
      if (noteText) noteText.textContent = `(Đã ký vào ${new Date().toLocaleTimeString('vi-VN')} ngày ${new Date().toLocaleDateString('vi-VN')})`;

      showToast('🎉 Ký hợp đồng điện tử thành công! Bạn có thể nhấn In/Xuất PDF.');
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
