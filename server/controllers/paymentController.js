const db = require('../data/db');
const { PACKAGES } = require('../config/constants');

exports.getPackages = (req, res) => {
  return res.json({ success: true, data: Object.values(PACKAGES) });
};

exports.buyPackage = (req, res) => {
  try {
    const { packageId, paymentMethod } = req.body;
    const pkg = Object.values(PACKAGES).find(p => p.id === packageId);
    if (!pkg) {
      return res.status(400).json({ success: false, message: 'Gói dịch vụ không hợp lệ' });
    }

    // Cập nhật gói cho user
    db.updateUser(req.user.id, { package: packageId });

    // Tạo giao dịch
    const tx = db.createTransaction({
      userId: req.user.id,
      packageId,
      amount: pkg.price,
      paymentMethod: paymentMethod || 'MOMO',
      type: 'PACKAGE_PURCHASE',
      description: `Đăng ký gói ${pkg.name}`
    });

    return res.json({
      success: true,
      message: `Thanh toán thành công qua ${paymentMethod || 'Momo'}! Gói ${pkg.name} đã được kích hoạt.`,
      data: { transaction: tx, package: pkg }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.promoteProperty = (req, res) => {
  try {
    const { propertyId, days = 7, paymentMethod = 'VNPAY' } = req.body;
    const prop = db.getPropertyById(propertyId);
    if (!prop) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy tin đăng' });
    }

    const cost = days * 20000; // 20k/ngày
    db.updateProperty(propertyId, { isVip: true, isFeatured: true });

    const tx = db.createTransaction({
      userId: req.user.id,
      propertyId,
      amount: cost,
      paymentMethod,
      type: 'PROMOTE_PROPERTY',
      description: `Đẩy tin VIP ${prop.title.substring(0, 30)}... (${days} ngày)`
    });

    return res.json({
      success: true,
      message: `Đẩy tin lên đầu trang thành công trong ${days} ngày!`,
      data: { transaction: tx }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
