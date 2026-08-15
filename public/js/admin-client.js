/* ========================================================
   RoomRent — Admin Client Logic (admin.html)
   ======================================================== */
window.approveItem = function (btn) {
  var row = btn.closest('tr');
  if (row) {
    row.style.transition = 'opacity 0.3s ease';
    row.style.opacity = '0';
    setTimeout(function () {
      row.parentNode.removeChild(row);
      alert('🎉 Đã duyệt tin đăng thành công! Tin đã chuyển sang trạng thái Active.');
    }, 300);
  }
};

window.rejectItem = function (btn) {
  var row = btn.closest('tr');
  if (row) {
    row.style.transition = 'opacity 0.3s ease';
    row.style.opacity = '0';
    setTimeout(function () {
      row.parentNode.removeChild(row);
      alert('❌ Đã từ chối tin đăng.');
    }, 300);
  }
};
