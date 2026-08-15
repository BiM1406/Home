/* ========================================================
   RoomRent — Chat Client Logic (chat.html - PII Protection)
   ======================================================== */
(function () {
  'use strict';

  function maskPhoneNumber(text) {
    if (!text) return '';
    // Mask Vietnamese phone numbers e.g. 0987123456 -> 0987***456
    return text.replace(/(0[3|5|7|8|9]\d{2})\d{3}(\d{3})/g, '$1***$2');
  }

  function appendMessage(text, isSent) {
    var box = document.getElementById('chat-box');
    if (!box) return;

    var maskedText = maskPhoneNumber(text);
    var div = document.createElement('div');
    div.className = 'chat-bubble ' + (isSent ? 'sent' : 'received');
    div.textContent = maskedText;

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function bindEvents() {
    var form = document.getElementById('chat-form');
    var input = document.getElementById('chat-input');

    if (form && input) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var val = input.value.trim();
        if (!val) return;

        appendMessage(val, true);
        input.value = '';

        // Auto reply simulation after 1.2s
        setTimeout(function () {
          appendMessage('Cảm ơn bạn đã nhắn tin! Anh đã nhận được và sẽ sắp xếp cho bạn xem nhà ngay.', false);
        }, 1200);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', bindEvents);
})();
