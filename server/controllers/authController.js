const db = require('../data/db');
const { generateToken } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');

exports.register = (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ tên, email và mật khẩu' });
    }

    const existing = db.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email này đã được đăng ký trong hệ thống' });
    }

    const userRole = (role === ROLES.LANDLORD || role === ROLES.RENTER) ? role : ROLES.RENTER;
    const newUser = db.createUser({
      name,
      email,
      password,
      role: userRole,
      phone: phone || '',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`
    });

    const token = generateToken(newUser);
    const { password: _, ...userSafe } = newUser;

    return res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công',
      data: { user: userSafe, token }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp email và mật khẩu' });
    }

    const user = db.findUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không chính xác' });
    }

    if (user.isLocked) {
      return res.status(403).json({ success: false, message: 'Tài khoản đã bị tạm khóa bởi Quản trị viên' });
    }

    const token = generateToken(user);
    const { password: _, ...userSafe } = user;

    return res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: { user: userSafe, token }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProfile = (req, res) => {
  const { password: _, ...userSafe } = req.user;
  return res.json({ success: true, data: userSafe });
};

exports.switchRole = (req, res) => {
  const { role } = req.body;
  if (![ROLES.LANDLORD, ROLES.RENTER].includes(role)) {
    return res.status(400).json({ success: false, message: 'Vai trò chuyển đổi không hợp lệ' });
  }

  const updated = db.updateUser(req.user.id, { role });
  const token = generateToken(updated);
  const { password: _, ...userSafe } = updated;

  return res.json({
    success: true,
    message: `Đã chuyển đổi sang vai trò ${role === ROLES.LANDLORD ? 'Chủ nhà' : 'Người thuê'}`,
    data: { user: userSafe, token }
  });
};
