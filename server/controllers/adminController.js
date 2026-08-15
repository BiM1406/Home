const db = require('../data/db');
const { PROPERTY_STATUS } = require('../config/constants');

exports.getStats = (req, res) => {
  try {
    const properties = db.getProperties({ status: 'ALL' });
    const users = db.users;
    const bookings = db.bookings;
    const contracts = db.contracts;
    const transactions = db.getTransactions();

    const activeCount = properties.filter(p => p.status === PROPERTY_STATUS.ACTIVE).length;
    const pendingCount = properties.filter(p => p.status === PROPERTY_STATUS.PENDING).length;
    const totalViews = properties.reduce((acc, cur) => acc + (cur.viewsCount || 0), 0);
    const totalRevenue = transactions.reduce((acc, cur) => acc + (cur.amount || 0), 0) + 1850000; // Mock base rev

    // Khu vực tìm kiếm nhiều nhất
    const topLocations = [
      { name: 'Thành phố Thủ Đức (TP.HCM)', count: 48 },
      { name: 'Quận Cầu Giấy (Hà Nội)', count: 35 },
      { name: 'Quận Bình Thạnh (TP.HCM)', count: 29 },
      { name: 'Quận Tây Hồ (Hà Nội)', count: 22 },
      { name: 'Quận Sơn Trà (Đà Nẵng)', count: 18 }
    ];

    return res.json({
      success: true,
      data: {
        totalUsers: users.length,
        totalProperties: properties.length,
        activeProperties: activeCount,
        pendingProperties: pendingCount,
        totalBookings: bookings.length,
        totalContracts: contracts.length,
        totalViews,
        totalRevenue,
        topLocations
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPendingProperties = (req, res) => {
  try {
    const pending = db.getProperties({ status: PROPERTY_STATUS.PENDING });
    return res.json({ success: true, count: pending.length, data: pending });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.approveProperty = (req, res) => {
  try {
    const { id } = req.params;
    const updated = db.updateProperty(id, { 
      status: PROPERTY_STATUS.ACTIVE,
      verifiedListing: true 
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy tin đăng' });
    }
    return res.json({ success: true, message: 'Đã phê duyệt tin đăng thành công! Tin đã hiển thị công khai.', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.rejectProperty = (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const updated = db.updateProperty(id, { 
      status: PROPERTY_STATUS.REJECTED,
      rejectionReason: reason || 'Hình ảnh hoặc nội dung không đạt tiêu chuẩn kiểm duyệt.'
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy tin đăng' });
    }
    return res.json({ success: true, message: 'Đã từ chối tin đăng', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUsers = (req, res) => {
  try {
    const users = db.users.map(u => {
      const { password: _, ...safe } = u;
      return safe;
    });
    return res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleUserLock = (req, res) => {
  try {
    const { id } = req.params;
    const user = db.findUserById(id);
    if (!user) return res.status(404).json({ success: false, message: 'User không tồn tại' });
    
    user.isLocked = !user.isLocked;
    return res.json({
      success: true,
      message: `Đã ${user.isLocked ? 'khóa' : 'mở khóa'} tài khoản ${user.email}`,
      data: { isLocked: user.isLocked }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
