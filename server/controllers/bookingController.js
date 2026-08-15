const db = require('../data/db');
const { BOOKING_STATUS, ROLES } = require('../config/constants');

exports.getBookings = (req, res) => {
  try {
    const filter = {};
    if (req.user.role === ROLES.LANDLORD) {
      filter.landlordId = req.user.id;
    } else if (req.user.role === ROLES.RENTER) {
      filter.renterId = req.user.id;
    }

    const bookings = db.getBookings(filter).map(b => {
      const property = db.getPropertyById(b.propertyId);
      const renter = db.findUserById(b.renterId);
      const landlord = db.findUserById(b.landlordId);
      return {
        ...b,
        propertyTitle: property ? property.title : 'Bất động sản',
        propertyImage: property && property.images ? property.images[0] : '',
        renterName: renter ? renter.name : 'Người thuê',
        renterPhone: renter ? renter.phone : '',
        landlordName: landlord ? landlord.name : 'Chủ nhà'
      };
    });

    return res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createBooking = (req, res) => {
  try {
    const { propertyId, viewingDate, timeSlot, note } = req.body;
    if (!propertyId || !viewingDate || !timeSlot) {
      return res.status(400).json({ success: false, message: 'Vui lòng chọn bất động sản, ngày hẹn và khung giờ' });
    }

    const property = db.getPropertyById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy thông tin phòng cần xem' });
    }

    const newBooking = db.createBooking({
      propertyId,
      renterId: req.user.id,
      landlordId: property.landlordId,
      viewingDate,
      timeSlot,
      note: note || '',
      status: BOOKING_STATUS.PENDING
    });

    return res.status(201).json({
      success: true,
      message: 'Gửi yêu cầu đặt lịch xem phòng thành công! Chủ nhà sẽ sớm phản hồi cho bạn.',
      data: newBooking
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBookingStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!Object.values(BOOKING_STATUS).includes(status)) {
      return res.status(400).json({ success: false, message: 'Trạng thái lịch hẹn không hợp lệ' });
    }

    const updated = db.updateBookingStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy lịch hẹn' });
    }

    return res.json({
      success: true,
      message: `Đã cập nhật trạng thái lịch hẹn: ${status}`,
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
