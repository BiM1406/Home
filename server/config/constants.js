module.exports = {
  ROLES: {
    ADMIN: 'admin',
    LANDLORD: 'landlord',
    RENTER: 'renter'
  },
  PROPERTY_TYPES: {
    ROOM: 'phong_tro',
    MINI_APARTMENT: 'chung_cu_mini',
    APARTMENT: 'can_ho',
    LUXURY_APARTMENT: 'can_ho_cao_cap',
    HOUSE: 'nha_nguyen_can',
    VILLA: 'villa'
  },
  PROPERTY_STATUS: {
    DRAFT: 'Draft',
    PENDING: 'Pending',
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    EXPIRED: 'Expired',
    REJECTED: 'Rejected'
  },
  BOOKING_STATUS: {
    PENDING: 'Chờ xác nhận',
    CONFIRMED: 'Đã xác nhận',
    CANCELLED: 'Đã hủy',
    COMPLETED: 'Đã xem xong'
  },
  PACKAGES: {
    FREE: {
      id: 'free',
      name: 'Miễn phí',
      price: 0,
      maxActive: 1,
      durationDays: 15,
      features: ['1 tin Active', 'Hết hạn 15 ngày', 'Hiển thị cơ bản']
    },
    STANDARD: {
      id: 'standard',
      name: 'Tiêu chuẩn',
      price: 49000,
      maxActive: 5,
      durationDays: 30,
      features: ['5 tin Active', 'Hết hạn 30 ngày', 'Vị trí ưu tiên trong tìm kiếm', 'Thống kê lượt xem']
    },
    VIP: {
      id: 'vip',
      name: 'VIP Nổi bật',
      price: 149000,
      maxActive: 20,
      durationDays: 30,
      features: ['20 tin Active', 'Badge VIP nổi bật', 'Đẩy tin lên đầu trang chủ & tìm kiếm', 'Thống kê phân tích chuyên sâu']
    }
  },
  EXCHANGE_RATE: {
    USD_TO_VND: 25400
  }
};
