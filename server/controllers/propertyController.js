const db = require('../data/db');
const { PROPERTY_STATUS, ROLES } = require('../config/constants');

exports.getProperties = (req, res) => {
  try {
    const {
      status,
      type,
      isLuxury,
      villaConditions,
      keyword,
      city,
      district,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      petsAllowed,
      sortBy
    } = req.query;

    // Mặc định chỉ lấy tin Active nếu không chỉ định status
    const filterStatus = status || PROPERTY_STATUS.ACTIVE;

    const properties = db.getProperties({
      status: filterStatus === 'ALL' ? undefined : filterStatus,
      type,
      isLuxury,
      villaConditions,
      keyword,
      city,
      district,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      petsAllowed,
      sortBy
    });

    return res.json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPropertyById = (req, res) => {
  try {
    const { id } = req.params;
    const property = db.getPropertyById(id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy thông tin bất động sản' });
    }

    const landlord = db.findUserById(property.landlordId);
    const landlordSafe = landlord ? {
      id: landlord.id,
      name: landlord.name,
      phone: landlord.phone,
      avatar: landlord.avatar,
      verified: landlord.verified
    } : null;

    // Lấy tin tương tự
    const similar = db.getProperties({ type: property.type, status: PROPERTY_STATUS.ACTIVE })
      .filter(p => p.id !== property.id)
      .slice(0, 3);

    return res.json({
      success: true,
      data: {
        ...property,
        landlord: landlordSafe,
        similar
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProperty = (req, res) => {
  try {
    const body = req.body;
    if (!body.title || !body.price || !body.type || !body.area) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ tiêu đề, giá thuê, loại hình và diện tích' });
    }

    const newProperty = db.createProperty({
      ...body,
      landlordId: req.user ? req.user.id : 'usr_landlord_1',
      price: Number(body.price),
      area: Number(body.area),
      deposit: Number(body.deposit || body.price),
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images : [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80'
      ],
      villaConditions: Array.isArray(body.villaConditions) ? body.villaConditions : []
    });

    return res.status(201).json({
      success: true,
      message: 'Đăng tin thành công! Tin đăng đang chờ Quản trị viên phê duyệt.',
      data: newProperty
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProperty = (req, res) => {
  try {
    const { id } = req.params;
    const property = db.getPropertyById(id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy tin đăng' });
    }

    if (req.user.role !== ROLES.ADMIN && property.landlordId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Bạn không có quyền chỉnh sửa tin đăng này' });
    }

    const updated = db.updateProperty(id, req.body);
    return res.json({
      success: true,
      message: 'Cập nhật tin đăng thành công',
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProperty = (req, res) => {
  try {
    const { id } = req.params;
    const property = db.getPropertyById(id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy tin đăng' });
    }

    if (req.user.role !== ROLES.ADMIN && property.landlordId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Bạn không có quyền xóa tin đăng này' });
    }

    db.deleteProperty(id);
    return res.json({ success: true, message: 'Đã xóa tin đăng thành công' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyProperties = (req, res) => {
  try {
    const properties = db.getProperties({ status: 'ALL' })
      .filter(p => p.landlordId === req.user.id);

    return res.json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
