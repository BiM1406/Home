const { PROPERTY_TYPES, PROPERTY_STATUS, ROLES, BOOKING_STATUS } = require('../config/constants');

const seedUsers = [
  {
    id: 'usr_admin',
    name: 'Quản trị viên RoomRent',
    email: 'admin@roomrent.vn',
    password: 'admin123', // In real system hashed
    role: ROLES.ADMIN,
    phone: '0988000111',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true,
    createdAt: '2026-01-01T08:00:00Z'
  },
  {
    id: 'usr_landlord_1',
    name: 'Nguyễn Văn Hùng (Chủ Nhà Phố & Villa)',
    email: 'landlord@roomrent.vn',
    password: 'landlord123',
    role: ROLES.LANDLORD,
    phone: '0912345678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    package: 'vip',
    createdAt: '2026-01-15T09:30:00Z'
  },
  {
    id: 'usr_landlord_2',
    name: 'Trần Thị Thuỷ (Chung Cư Cao Cấp)',
    email: 'thuytran@roomrent.vn',
    password: 'landlord123',
    role: ROLES.LANDLORD,
    phone: '0909876543',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    verified: true,
    package: 'standard',
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'usr_renter_1',
    name: 'Lê Hoàng Nam (Sinh viên/Kỹ sư)',
    email: 'renter@roomrent.vn',
    password: 'renter123',
    role: ROLES.RENTER,
    phone: '0933123456',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verified: true,
    createdAt: '2026-02-10T14:20:00Z'
  }
];

const seedProperties = [
  // 1. VILLA NGHỈ DƯỠNG CAO CẤP
  {
    id: 'prop_001',
    title: 'Villa Nghỉ Dưỡng Thảo Điền 4PN — Hồ Bơi Riêng & Sân Vườn Nhiệt Đới',
    slug: 'villa-nghi-duong-thao-dien-4pn-ho-boi-rieng',
    type: PROPERTY_TYPES.VILLA,
    isLuxury: true,
    status: PROPERTY_STATUS.ACTIVE,
    isFeatured: true,
    isVip: true,
    landlordId: 'usr_landlord_1',
    price: 65000000, // 65 triệu / tháng
    deposit: 130000000,
    electricityPrice: 4000,
    waterPrice: 30000,
    internetPrice: 350000,
    area: 320,
    bedrooms: 4,
    bathrooms: 5,
    floors: 3,
    maxOccupants: 8,
    furniture: 'Full cao cấp nhập khẩu Ý',
    // Điều kiện riêng Villa chuẩn PRD:
    villaConditions: ['pool', 'garden', 'security247', 'garage', 'camera', 'luxury_furniture'],
    amenities: ['aircon', 'washer', 'kitchen', 'parking', 'balcony', 'fridge', 'tv', 'bathtub', 'elevator', 'gym'],
    policies: {
      petsAllowed: true,
      smokingAllowed: false,
      curfew: 'Tự do 24/24'
    },
    location: {
      address: 'Đường Nguyễn Văn Hưởng, Phường Thảo Điền',
      district: 'Thành phố Thủ Đức (Quận 2)',
      city: 'Hồ Chí Minh',
      lat: 10.8048,
      lng: 106.7388
    },
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Biệt thự phong cách Tropical Modern tại trung tâm Thảo Điền. Không gian xanh mát, hồ bơi tràn bờ riêng tư, khuôn viên sân vườn tiệc nướng BBQ, gara 2 ô tô và hệ thống camera an ninh tuần tra 24/7. Thích hợp cho chuyên gia nước ngoài và gia đình lưu trú dài hạn.',
    viewsCount: 1420,
    likesCount: 89,
    verifiedListing: true,
    createdAt: '2026-02-15T09:00:00Z'
  },

  // 2. CĂN HỘ CAO CẤP
  {
    id: 'prop_002',
    title: 'Penthouse Vinhomes Central Park Landmark 81 — View Trọn Sông Sài Gòn',
    slug: 'penthouse-vinhomes-central-park-landmark-81-view-song',
    type: PROPERTY_TYPES.LUXURY_APARTMENT,
    isLuxury: true,
    status: PROPERTY_STATUS.ACTIVE,
    isFeatured: true,
    isVip: true,
    landlordId: 'usr_landlord_2',
    price: 45000000,
    deposit: 90000000,
    electricityPrice: 3800,
    waterPrice: 28000,
    internetPrice: 300000,
    area: 145,
    bedrooms: 3,
    bathrooms: 3,
    floors: 1,
    maxOccupants: 5,
    furniture: 'Full Smart Home Masteri cao cấp',
    villaConditions: ['security247', 'garage', 'camera', 'luxury_furniture', 'concierge'],
    amenities: ['aircon', 'washer', 'kitchen', 'parking', 'balcony', 'fridge', 'tv', 'bathtub', 'elevator', 'gym', 'pool'],
    policies: {
      petsAllowed: true,
      smokingAllowed: false,
      curfew: 'Tự do 24/24'
    },
    location: {
      address: '208 Nguyễn Hữu Cảnh, Phường 22',
      district: 'Quận Bình Thạnh',
      city: 'Hồ Chí Minh',
      lat: 10.7951,
      lng: 106.7218
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Căn hộ thuộc phân khúc siêu sang tại Vinhomes Central Park. Ban công panorama ngắm trọn sông Sài Gòn và pháo hoa. Đầy đủ tiện ích 5 sao: sảnh lễ tân đón khách, thẻ từ thang máy riêng, hồ bơi vô cực trên cao, phòng gym hiện đại.',
    viewsCount: 2150,
    likesCount: 154,
    verifiedListing: true,
    createdAt: '2026-02-18T10:00:00Z'
  },

  // 3. VILLA HỒ TÂY HÀ NỘI
  {
    id: 'prop_003',
    title: 'Biệt Thự Đơn Lập Quảng An Tây Hồ — Sân Vườn Cây Xanh, Gara Ô Tô',
    slug: 'biet-thu-don-lap-quang-an-tay-ho-san-vuon-gara',
    type: PROPERTY_TYPES.VILLA,
    isLuxury: true,
    status: PROPERTY_STATUS.ACTIVE,
    isFeatured: true,
    isVip: true,
    landlordId: 'usr_landlord_1',
    price: 55000000,
    deposit: 110000000,
    electricityPrice: 4000,
    waterPrice: 30000,
    internetPrice: 300000,
    area: 280,
    bedrooms: 5,
    bathrooms: 5,
    floors: 4,
    maxOccupants: 10,
    furniture: 'Nội thất gỗ óc chó cao cấp',
    villaConditions: ['garden', 'security247', 'garage', 'camera', 'luxury_furniture'],
    amenities: ['aircon', 'washer', 'kitchen', 'parking', 'balcony', 'fridge', 'tv', 'bathtub'],
    policies: {
      petsAllowed: true,
      smokingAllowed: false,
      curfew: 'Tự do'
    },
    location: {
      address: 'Đường Đặng Thai Mai, Phường Quảng An',
      district: 'Quận Tây Hồ',
      city: 'Hà Nội',
      lat: 21.0628,
      lng: 105.8239
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Biệt thự sang trọng nằm trong khu dân cư yên tĩnh, văn minh cạnh Hồ Tây. Thiết kế mở ngập tràn ánh sáng tự nhiên, sân trước và sau trồng hoa thoáng đãng, bảo vệ khu vực 24/7.',
    viewsCount: 980,
    likesCount: 62,
    verifiedListing: true,
    createdAt: '2026-02-20T11:30:00Z'
  },

  // 4. CĂN HỘ CAO CẤP ĐÀ NẴNG
  {
    id: 'prop_004',
    title: 'Căn Hộ Nghỉ Dưỡng Hiyori Garden Tower — View Cầu Rồng & Biển Mỹ Khê',
    slug: 'can-ho-nghi-duong-hiyori-garden-tower-view-cau-rong',
    type: PROPERTY_TYPES.LUXURY_APARTMENT,
    isLuxury: true,
    status: PROPERTY_STATUS.ACTIVE,
    isFeatured: true,
    isVip: false,
    landlordId: 'usr_landlord_2',
    price: 22000000,
    deposit: 44000000,
    electricityPrice: 3500,
    waterPrice: 25000,
    internetPrice: 250000,
    area: 75,
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    maxOccupants: 4,
    furniture: 'Full phong cách Nhật Bản tối giản',
    villaConditions: ['security247', 'camera', 'luxury_furniture', 'garage'],
    amenities: ['aircon', 'washer', 'kitchen', 'parking', 'balcony', 'fridge', 'tv', 'elevator', 'pool', 'gym'],
    policies: {
      petsAllowed: false,
      smokingAllowed: false,
      curfew: 'Tự do 24/24'
    },
    location: {
      address: 'Đường Võ Văn Kiệt, Phường An Hải Đông',
      district: 'Quận Sơn Trà',
      city: 'Đà Nẵng',
      lat: 16.0617,
      lng: 108.2372
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Căn hộ tiêu chuẩn Nhật Bản cao cấp tại Đà Nẵng, chỉ cách biển Mỹ Khê 500m và cách Cầu Rồng 5 phút đi xe. Trang bị máy rửa bát, lọc nước trung tâm, công viên nội khu.',
    viewsCount: 1650,
    likesCount: 110,
    verifiedListing: true,
    createdAt: '2026-02-22T08:15:00Z'
  },

  // 5. CHUNG CƯ MINI
  {
    id: 'prop_005',
    title: 'Studio Chung Cư Mini Ban Công Thoáng — Full Nội Thất Gần ĐH Bách Khoa',
    slug: 'studio-chung-cu-mini-ban-cong-thoang-full-noi-that',
    type: PROPERTY_TYPES.MINI_APARTMENT,
    isLuxury: false,
    status: PROPERTY_STATUS.ACTIVE,
    isFeatured: false,
    isVip: false,
    landlordId: 'usr_landlord_2',
    price: 5200000,
    deposit: 5200000,
    electricityPrice: 3800,
    waterPrice: 100000, // trọn gói / người
    internetPrice: 100000,
    area: 32,
    bedrooms: 1,
    bathrooms: 1,
    floors: 1,
    maxOccupants: 2,
    furniture: 'Đầy đủ giường tủ, nệm, bàn học, tủ lạnh, bếp từ',
    villaConditions: [],
    amenities: ['aircon', 'washer', 'kitchen', 'parking', 'balcony', 'fridge', 'elevator'],
    policies: {
      petsAllowed: true,
      smokingAllowed: false,
      curfew: 'Cửa vân tay tự do 24/24'
    },
    location: {
      address: 'Ngõ 27 Đại Cồ Việt, Phường Bách Khoa',
      district: 'Quận Hai Bà Trưng',
      city: 'Hà Nội',
      lat: 21.0089,
      lng: 105.8488
    },
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Căn hộ mini thiết kế phong cách Hàn Quốc trẻ trung. Có cửa sổ lớn, ban công phơi đồ riêng, máy giặt chung tại tầng thượng. Không chung chủ, giờ giấc tự do.',
    viewsCount: 3410,
    likesCount: 230,
    verifiedListing: true,
    createdAt: '2026-02-25T14:00:00Z'
  },

  // 6. PHÒNG TRỌ SINH VIÊN
  {
    id: 'prop_006',
    title: 'Phòng Trọ Khép Kín Có Gác Lửng Đẹp — Gần ĐH Quốc Gia TP.HCM',
    slug: 'phong-tro-khep-kin-gac-lung-dep-lang-dai-hoc',
    type: PROPERTY_TYPES.ROOM,
    isLuxury: false,
    status: PROPERTY_STATUS.ACTIVE,
    isFeatured: false,
    isVip: false,
    landlordId: 'usr_landlord_1',
    price: 3200000,
    deposit: 3200000,
    electricityPrice: 3500,
    waterPrice: 80000,
    internetPrice: 80000,
    area: 25,
    bedrooms: 1,
    bathrooms: 1,
    floors: 1,
    maxOccupants: 3,
    furniture: 'Gác đúc, kệ bếp, máy lạnh, quạt trần',
    villaConditions: [],
    amenities: ['aircon', 'kitchen', 'parking', 'fridge'],
    policies: {
      petsAllowed: false,
      smokingAllowed: false,
      curfew: '23h đóng cổng hoặc mở khóa vân tay'
    },
    location: {
      address: 'Đường số 8, Phường Linh Trung',
      district: 'Thành phố Thủ Đức',
      city: 'Hồ Chí Minh',
      lat: 10.8659,
      lng: 106.7788
    },
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Phòng trọ mới xây sạch sẽ, gác lửng cao không đụng đầu. Khu an ninh có camera 24/24, gần trạm xe buýt và các trường đại học lớn.',
    viewsCount: 4200,
    likesCount: 310,
    verifiedListing: true,
    createdAt: '2026-02-28T09:40:00Z'
  },

  // 7. NHÀ NGUYÊN CĂN
  {
    id: 'prop_007',
    title: 'Nhà Nguyên Căn 3 Tầng 3PN Ngõ Ô Tô — Phù Hợp Vừa Ở Vừa Kinh Doanh',
    slug: 'nha-nguyen-can-3-tang-3pn-ngo-o-to',
    type: PROPERTY_TYPES.HOUSE,
    isLuxury: false,
    status: PROPERTY_STATUS.ACTIVE,
    isFeatured: false,
    isVip: false,
    landlordId: 'usr_landlord_1',
    price: 15000000,
    deposit: 30000000,
    electricityPrice: 3000,
    waterPrice: 20000,
    internetPrice: 250000,
    area: 90,
    bedrooms: 3,
    bathrooms: 3,
    floors: 3,
    maxOccupants: 6,
    furniture: 'Cơ bản (tủ bếp, 3 điều hòa, bình nóng lạnh)',
    villaConditions: [],
    amenities: ['aircon', 'kitchen', 'parking', 'balcony'],
    policies: {
      petsAllowed: true,
      smokingAllowed: true,
      curfew: 'Tự do 24/24'
    },
    location: {
      address: 'Ngõ 165 Cầu Giấy, Phường Dịch Vọng',
      district: 'Quận Cầu Giấy',
      city: 'Hà Nội',
      lat: 21.0333,
      lng: 105.7944
    },
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Nhà nguyên căn mặt ngõ rộng 5m ô tô tránh nhau. Thiết kế hiện đại tầng 1 thông sàn kinh doanh online/văn phòng, tầng 2-3 mỗi tầng 1 phòng ngủ khép kín.',
    viewsCount: 1890,
    likesCount: 95,
    verifiedListing: true,
    createdAt: '2026-03-01T15:20:00Z'
  },

  // 8. TIN CHỜ DUYỆT (PENDING - DÀNH CHO ADMIN DUYỆT TEST)
  {
    id: 'prop_pending_001',
    title: 'Căn Hộ Dịch Vụ Studio Cao Cấp Quận 1 — Đầy Đủ Bếp Nấu & Bồn Tắm',
    slug: 'can-ho-dich-vu-studio-cao-cap-quan-1',
    type: PROPERTY_TYPES.APARTMENT,
    isLuxury: true,
    status: PROPERTY_STATUS.PENDING,
    isFeatured: false,
    isVip: false,
    landlordId: 'usr_landlord_2',
    price: 12000000,
    deposit: 12000000,
    electricityPrice: 4000,
    waterPrice: 50000,
    internetPrice: 200000,
    area: 45,
    bedrooms: 1,
    bathrooms: 1,
    floors: 1,
    maxOccupants: 2,
    furniture: 'Full cao cấp theo chuẩn khách sạn',
    villaConditions: ['security247', 'camera', 'luxury_furniture'],
    amenities: ['aircon', 'washer', 'kitchen', 'parking', 'balcony', 'fridge', 'tv', 'bathtub', 'elevator'],
    policies: {
      petsAllowed: false,
      smokingAllowed: false,
      curfew: 'Tự do'
    },
    location: {
      address: 'Đường Nguyễn Thị Minh Khai, Phường Bến Thành',
      district: 'Quận 1',
      city: 'Hồ Chí Minh',
      lat: 10.7719,
      lng: 106.6917
    },
    images: [
      'https://images.unsplash.com/photo-1502005229762-ee152da915ba?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Tin đăng mới gửi duyệt từ Landlord. Căn hộ studio sang trọng ngay trung tâm Quận 1.',
    viewsCount: 12,
    likesCount: 2,
    verifiedListing: false,
    createdAt: '2026-03-05T08:00:00Z'
  }
];

const seedBookings = [
  {
    id: 'book_001',
    propertyId: 'prop_001',
    renterId: 'usr_renter_1',
    landlordId: 'usr_landlord_1',
    viewingDate: '2026-08-20',
    timeSlot: '09:00 - 10:00',
    note: 'Em muốn qua xem sân vườn và hồ bơi thực tế trước khi chốt thuê ạ.',
    status: BOOKING_STATUS.CONFIRMED,
    createdAt: '2026-08-14T10:00:00Z'
  },
  {
    id: 'book_002',
    propertyId: 'prop_002',
    renterId: 'usr_renter_1',
    landlordId: 'usr_landlord_2',
    viewingDate: '2026-08-22',
    timeSlot: '15:00 - 16:00',
    note: 'Khảo sát view tầng cao Landmark 81.',
    status: BOOKING_STATUS.PENDING,
    createdAt: '2026-08-15T08:30:00Z'
  }
];

const seedChats = [
  {
    id: 'chat_001',
    propertyId: 'prop_001',
    senderId: 'usr_renter_1',
    receiverId: 'usr_landlord_1',
    message: 'Chào anh Hùng, căn Villa Thảo Điền này hợp đồng tối thiểu bao nhiêu tháng vậy anh?',
    createdAt: '2026-08-14T09:15:00Z',
    isRead: true
  },
  {
    id: 'chat_002',
    propertyId: 'prop_001',
    senderId: 'usr_landlord_1',
    receiverId: 'usr_renter_1',
    message: 'Chào Nam nhé! Hợp đồng tối thiểu 12 tháng em nhé. Đã bao gồm phí dọn hồ bơi và chăm sóc sân vườn 2 lần/tuần.',
    createdAt: '2026-08-14T09:20:00Z',
    isRead: true
  }
];

const seedContracts = [
  {
    id: 'ctr_001',
    contractNumber: 'HD-2026-0801',
    propertyId: 'prop_001',
    landlordId: 'usr_landlord_1',
    renterId: 'usr_renter_1',
    startDate: '2026-09-01',
    endDate: '2027-08-31',
    monthlyRent: 65000000,
    depositAmount: 130000000,
    customClauses: 'Chủ nhà chịu trách nhiệm bảo trì hồ bơi, hệ thống lọc và cây xanh sân vườn định kỳ hàng tháng.',
    status: 'signed',
    landlordSigned: true,
    renterSigned: true,
    signedAt: '2026-08-14T16:00:00Z'
  }
];

module.exports = {
  seedUsers,
  seedProperties,
  seedBookings,
  seedChats,
  seedContracts
};
