/* ========================================================
   RoomRent — Post Property 8-Step Wizard Client Logic
   ======================================================== */
(function () {
  'use strict';

  var currentStep = 1;
  var totalSteps = 8;

  function updateWizardUI() {
    var nodes = document.querySelectorAll('.wizard-step-node');
    var contents = document.querySelectorAll('.wizard-step-content');
    var bar = document.getElementById('wizard-bar');
    var btnPrev = document.getElementById('btn-wz-prev');
    var btnNext = document.getElementById('btn-wz-next');

    // Progress bar width
    if (bar) {
      var pct = ((currentStep - 1) / (totalSteps - 1)) * 100;
      bar.style.width = pct + '%';
    }

    // Step nodes
    nodes.forEach(function (node) {
      var st = parseInt(node.dataset.step, 10);
      if (st <= currentStep) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });

    // Step contents
    contents.forEach(function (content) {
      var st = parseInt(content.dataset.step, 10);
      if (st === currentStep) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });

    // Buttons state
    if (btnPrev) btnPrev.disabled = (currentStep === 1);
    if (btnNext) {
      if (currentStep === totalSteps) {
        btnNext.textContent = 'GỬI ĐĂNG TIN NGAY';
        btnNext.style.background = 'var(--gold-gradient)';
        btnNext.style.color = '#78350f';
      } else {
        btnNext.textContent = 'TIẾP THEO';
        btnNext.style.background = 'var(--primary-600)';
        btnNext.style.color = '#ffffff';
      }
    }
  }

  function submitProperty() {
    var title = document.getElementById('wz-title').value;
    var desc = document.getElementById('wz-desc').value;
    var type = document.getElementById('wz-type').value;
    var address = document.getElementById('wz-address').value;
    var location = document.getElementById('wz-location').value;
    var price = parseInt(document.getElementById('wz-price').value, 10) || 0;
    var area = parseInt(document.getElementById('wz-area').value, 10) || 0;
    var bedrooms = parseInt(document.getElementById('wz-bedrooms').value, 10) || 1;
    var bathrooms = parseInt(document.getElementById('wz-bathrooms').value, 10) || 1;
    var imageUrl = document.getElementById('wz-image-url').value;

    var selectedAmenities = [];
    document.querySelectorAll('input[name="wz-amenities"]:checked').forEach(function (chk) {
      selectedAmenities.push(chk.value);
    });

    var payload = {
      title: title || 'Biệt Thự Thượng Lưu Đăng Mới',
      description: desc || 'Mô tả bất động sản...',
      type: type,
      address: address || 'Thảo Điền, TP. Thủ Đức',
      location: location || 'TP.HCM',
      price: price || 50000000,
      area: area || 300,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      amenities: selectedAmenities,
      images: [imageUrl || 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200']
    };

    fetch('/api/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (localStorage.getItem('token') || 'demo_token')
      },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json(); })
      .then(function (res) {
        alert('🎉 Đăng tin BĐS thành công! Tin đăng của bạn đang ở trạng thái Pending chờ Admin duyệt.');
        window.location.href = 'dashboard.html';
      })
      .catch(function (err) {
        alert('🎉 Đã mô phỏng đăng tin thành công! Chuyển hướng về Bảng Quản Lý...');
        window.location.href = 'dashboard.html';
      });
  }

  function bindEvents() {
    var btnPrev = document.getElementById('btn-wz-prev');
    var btnNext = document.getElementById('btn-wz-next');

    if (btnPrev) {
      btnPrev.addEventListener('click', function () {
        if (currentStep > 1) {
          currentStep--;
          updateWizardUI();
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', function () {
        if (currentStep < totalSteps) {
          currentStep++;
          updateWizardUI();
        } else {
          submitProperty();
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindEvents();
    updateWizardUI();
  });
})();
