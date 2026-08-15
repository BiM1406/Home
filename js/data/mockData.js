/**
 * RoomRent Mock Database Seed Data
 * Rich property listings with high-resolution Unsplash images, generic NPC names and minimalist SVG Monogram avatars
 */

// Helper to generate elegant vector monogram avatars without human photos
export function generateSvgAvatar(name, bgColor = '#2c1f1a', textColor = '#e0b445') {
  const parts = (name || 'RR').trim().split(' ');
  const initials = parts.length >= 2 
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (name || 'RR').slice(0, 2).toUpperCase();

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'><rect width='128' height='128' rx='64' fill='${bgColor}'/><text x='50%' y='54%' font-family='Segoe UI, Arial, sans-serif' font-weight='bold' font-size='46' fill='${textColor}' text-anchor='middle' dominant-baseline='middle'>${initials}</text></svg>`;

  try {
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
  } catch (e) {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }
}

export const INITIAL_PROPERTIES = [
  // --- VILLAS & BIỆT THỰ NGHỈ DƯỠNG ---
  {
    id: 'villa-01',
    title: 'Villa Nghỉ Dưỡng Biển Mỹ Khê - Hồ Bơi Vô Cực & Sân Vườn',
    category: 'villa',
    type: 'Villa Biệt Thự',
    price: 45000000,
    priceUsd: 1800,
    area: 350,
    bedrooms: 4,
    bathrooms: 5,
    location: {
      city: 'Đà Nẵng',
      district: 'Sơn Trà',
      address: 'Võ Nguyên Giáp, P. Phước Mỹ, Q. Sơn Trà'
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    isVip: true,
    isVerified: true,
    amenities: ['Hồ bơi riêng', 'Sân vườn BBQ', 'Gara 2 ô tô', 'An ninh 24/7', 'Full nội thất cao cấp'],
    landlord: {
      name: 'Trần Văn B',
      avatar: generateSvgAvatar('Trần Văn B', '#2c1f1a', '#e0b445'),
      phone: '0905***123',
      verified: true
    },
    description: 'Biệt thự view biển tuyệt đẹp, thiết kế hiện đại mở đón gió tự nhiên. Hồ bơi riêng nước mặn, sân vườn rộng rãi thích hợp tiệc BBQ ngoài trời.'
  },
  {
    id: 'villa-02',
    title: 'Biệt Thự Đơn Lập Thảo Điền - Phong Cách Nhiệt Đới Hiện Đại',
    category: 'villa',
    type: 'Villa Biệt Thự',
    price: 65000000,
    priceUsd: 2600,
    area: 420,
    bedrooms: 5,
    bathrooms: 6,
    location: {
      city: 'TP. Hồ Chí Minh',
      district: 'TP. Thủ Đức',
      address: 'Nguyễn Văn Hưởng, Thảo Điền, TP. Thủ Đức'
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    isVip: true,
    isVerified: true,
    amenities: ['Hồ bơi nước tràn', 'Phòng xông hơi', 'Sân vườn xanh', 'Smart home', 'Bảo vệ 24/7'],
    landlord: {
      name: 'Trần Văn B',
      avatar: generateSvgAvatar('Trần Văn B', '#1a237e', '#ffffff'),
      phone: '0912***888',
      verified: true
    },
    description: 'Nằm trong khu compound an ninh tuyệt đối tại Thảo Điền. Nội thất nhập khẩu Ý, có hồ bơi riêng và phòng tập gym mini.'
  },
  {
    id: 'villa-03',
    title: 'Villa Sinh Thái Ciputra Tây Hồ - Sân Vườn Thoáng Mát',
    category: 'villa',
    type: 'Villa Biệt Thự',
    price: 55000000,
    priceUsd: 2200,
    area: 300,
    bedrooms: 4,
    bathrooms: 4,
    location: {
      city: 'Hà Nội',
      district: 'Tây Hồ',
      address: 'Khu Đô Thị Ciputra, Q. Tây Hồ'
    },
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    isVip: true,
    isVerified: true,
    amenities: ['Sân vườn rộng', 'Gara ô tô', 'Sân chơi trẻ em', 'Gần trường quốc tế', 'An ninh 3 lớp'],
    landlord: {
      name: 'Lê Thị C',
      avatar: generateSvgAvatar('Lê Thị C', '#2e7d32', '#ffffff'),
      phone: '0988***999',
      verified: true
    },
    description: 'Biệt thự Ciputra không gian xanh thoáng mát, yên tĩnh, phong thủy tốt. Rất phù hợp cho chuyên gia nước ngoài và gia đình lưu trú dài hạn.'
  },

  // --- CĂN HỘ CAO CẤP & SKY VILLA ---
  {
    id: 'apt-01',
    title: 'Căn Hộ Duplex Panorama Landmark 81 - View Sông Trực Diện',
    category: 'apartment',
    type: 'Căn Hộ Cao Cấp',
    price: 32000000,
    priceUsd: 1280,
    area: 125,
    bedrooms: 3,
    bathrooms: 3,
    location: {
      city: 'TP. Hồ Chí Minh',
      district: 'Bình Thạnh',
      address: 'Vinhomes Central Park, Q. Bình Thạnh'
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    isVip: true,
    isVerified: true,
    amenities: ['Ban công view Landmark 81', 'Phòng gym 5 sao', 'Hồ bơi vô cực', 'Thang máy thẻ từ', 'Full nội thất hạng sang'],
    landlord: {
      name: 'Phạm Văn D',
      avatar: generateSvgAvatar('Phạm Văn D', '#c36e22', '#ffffff'),
      phone: '0903***555',
      verified: true
    },
    description: 'Căn hộ Duplex thông tầng trần cao 6m view sông Sài Gòn tuyệt mỹ. Nội thất bàn giao full tiêu chuẩn khách sạn 5 sao quốc tế.'
  },
  {
    id: 'apt-02',
    title: 'Căn Hộ Nghỉ Dưỡng Sun Grand City Ancora - View Sông Hồng',
    category: 'apartment',
    type: 'Căn Hộ Cao Cấp',
    price: 24000000,
    priceUsd: 960,
    area: 98,
    bedrooms: 2,
    bathrooms: 2,
    location: {
      city: 'Hà Nội',
      district: 'Hai Bà Trưng',
      address: 'Số 3 Lương Yên, P. Bạch Đằng, Q. Hai Bà Trưng'
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee1b2b8ab00f?auto=format&fit=crop&w=1200&q=80'
    ],
    isVip: true,
    isVerified: true,
    amenities: ['View sông Hồng', 'Bể bơi 4 mùa', 'TTTM dưới chân tòa nhà', 'Khóa cửa nhận diện vân tay', 'Chỗ đậu ô tô định danh'],
    landlord: {
      name: 'Hoàng Văn E',
      avatar: generateSvgAvatar('Hoàng Văn E', '#4a148c', '#ffffff'),
      phone: '0977***444',
      verified: true
    },
    description: 'Vị trí đắc địa cách Hồ Gươm 5 phút lái xe. Thiết kế phong cách Bắc Âu ấm cúng, đón trọn ánh sáng tự nhiên cả ngày.'
  },
  {
    id: 'apt-03',
    title: 'Căn Hộ Sơn Trà Ocean View - Ban Công Ngắm Trọn Bán Đảo',
    category: 'apartment',
    type: 'Căn Hộ Cao Cấp',
    price: 18000000,
    priceUsd: 720,
    area: 85,
    bedrooms: 2,
    bathrooms: 2,
    location: {
      city: 'Đà Nẵng',
      district: 'Sơn Trà',
      address: 'Ngô Quyền, P. Thọ Quang, Q. Sơn Trà'
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80'
    ],
    isVip: false,
    isVerified: true,
    amenities: ['View biển & núi Sơn Trà', 'Hồ bơi Sky Pool', 'Khu BBQ sân thượng', 'Bãi đậu xe thông minh'],
    landlord: {
      name: 'Vũ Thị F',
      avatar: generateSvgAvatar('Vũ Thị F', '#00695c', '#ffffff'),
      phone: '0935***777',
      verified: true
    },
    description: 'Căn hộ góc 2 ban công ngắm trọn biển và núi Sơn Trà. Không gian trong lành, yên tĩnh tuyệt đối cho người làm việc sáng tạo.'
  },

  // --- PHÒNG TRỌ CAO CẤP & TIỆN NGHI ---
  {
    id: 'room-01',
    title: 'Phòng Trọ Gác Lửng Cao Cấp - Khóa Cửa Vân Tay & Giờ Tự Do',
    category: 'room',
    type: 'Phòng Trọ',
    price: 4500000,
    priceUsd: 180,
    area: 28,
    bedrooms: 1,
    bathrooms: 1,
    location: {
      city: 'Hà Nội',
      district: 'Cầu Giấy',
      address: 'Ngõ 20 Hồ Tùng Mậu, P. Mai Dịch, Q. Cầu Giấy'
    },
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80'
    ],
    isVip: false,
    isVerified: true,
    amenities: ['Gác lửng đúc cao không đụng đầu', 'Khóa cổng vân tay', 'Máy giặt chung', 'Wifi tốc độ cao 500Mbps', 'Giờ giấc tự do 24/7'],
    landlord: {
      name: 'Đỗ Văn G',
      avatar: generateSvgAvatar('Đỗ Văn G', '#b71c1c', '#ffffff'),
      phone: '0966***333',
      verified: true
    },
    description: 'Tòa nhà mới xây 100%, trang bị thang máy thẻ từ, camera an ninh từng tầng. Không chung chủ, bạn bè đến chơi thoải mái.'
  },
  {
    id: 'room-02',
    title: 'Phòng Trọ Studio Ban Công Nắng - Khu Dân Cư Bình Thạnh',
    category: 'room',
    type: 'Phòng Trọ',
    price: 5200000,
    priceUsd: 208,
    area: 32,
    bedrooms: 1,
    bathrooms: 1,
    location: {
      city: 'TP. Hồ Chí Minh',
      district: 'Bình Thạnh',
      address: 'Đường D2 (Nguyễn Gia Trí), P. 25, Q. Bình Thạnh'
    },
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    isVip: false,
    isVerified: true,
    amenities: ['Ban công riêng trồng cây', 'Kệ bếp nấu ăn riêng', 'Tủ lạnh Inverter', 'Máy lạnh Daikin', 'Bảo vệ giữ xe 24/24'],
    landlord: {
      name: 'Bùi Thị H',
      avatar: generateSvgAvatar('Bùi Thị H', '#e65100', '#ffffff'),
      phone: '0908***666',
      verified: true
    },
    description: 'Ngay trung tâm sầm uất Bình Thạnh, sát các trường ĐH HUTECH, Ngoại Thương, Giao Thông Vận Tải. Có ban công đón nắng gió mát rượi.'
  },
  {
    id: 'room-03',
    title: 'Phòng Trọ Khép Kín Gần Đại Học Bách Khoa Đà Nẵng',
    category: 'room',
    type: 'Phòng Trọ',
    price: 3200000,
    priceUsd: 128,
    area: 25,
    bedrooms: 1,
    bathrooms: 1,
    location: {
      city: 'Đà Nẵng',
      district: 'Liên Chiểu',
      address: 'Ngô Sĩ Liên, P. Hòa Khánh Bắc, Q. Liên Chiểu'
    },
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ],
    isVip: false,
    isVerified: true,
    amenities: ['Vệ sinh khép kín', 'Nóng lạnh Ariston', 'Gác lửng gỗ', 'Camera 24/7', 'Khu để xe có mái che'],
    landlord: {
      name: 'Ngô Văn K',
      avatar: generateSvgAvatar('Ngô Văn K', '#37474f', '#ffffff'),
      phone: '0914***222',
      verified: true
    },
    description: 'Khu vực an ninh tốt, gần chợ Hòa Khánh và các trường đại học. Điện nước tính theo đồng hồ giá nhà nước cực rẻ.'
  },

  // --- STUDIO & CĂN HỘ DỊCH VỤ ---
  {
    id: 'studio-01',
    title: 'Studio Phong Cách Indochine Đông Dương - Trung Tâm Quận 1',
    category: 'studio',
    type: 'Studio Dịch Vụ',
    price: 12500000,
    priceUsd: 500,
    area: 45,
    bedrooms: 1,
    bathrooms: 1,
    location: {
      city: 'TP. Hồ Chí Minh',
      district: 'Quận 1',
      address: 'Lê Thánh Tôn, P. Bến Thành, Quận 1'
    },
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    ],
    isVip: true,
    isVerified: true,
    amenities: ['Dịch vụ dọn phòng 2 lần/tuần', 'Bồn tắm nằm ngâm thảo dược', 'Full đồ bếp sang trọng', 'Smart TV 55 inch Netflix', 'Miễn phí giặt sấy'],
    landlord: {
      name: 'Đặng Thị M',
      avatar: generateSvgAvatar('Đặng Thị M', '#880e4f', '#ffffff'),
      phone: '0909***111',
      verified: true
    },
    description: 'Căn hộ Studio thiết kế phong cách Đông Dương cổ điển sang trọng. Đi bộ 3 phút ra chợ Bến Thành và ga Metro số 1.'
  },
  {
    id: 'studio-02',
    title: 'Studio Hiện Đại Phong Cách Japandi - Phố Cổ Hoàn Kiếm',
    category: 'studio',
    type: 'Studio Dịch Vụ',
    price: 11000000,
    priceUsd: 440,
    area: 40,
    bedrooms: 1,
    bathrooms: 1,
    location: {
      city: 'Hà Nội',
      district: 'Hoàn Kiếm',
      address: 'Hàng Bè, P. Hàng Bạc, Q. Hoàn Kiếm'
    },
    images: [
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1200&q=80'
    ],
    isVip: true,
    isVerified: true,
    amenities: ['Nội thất gỗ sồi Japandi', 'Dọn phòng thay drap hàng tuần', 'Máy pha cafe Espresso', 'Không gian yên tĩnh giữa phố cổ', 'Thang máy'],
    landlord: {
      name: 'Trần Văn B',
      avatar: generateSvgAvatar('Trần Văn B', '#1a237e', '#ffffff'),
      phone: '0983***000',
      verified: true
    },
    description: 'Nằm tại vị trí trung tâm Phố Cổ Hà Nội, không gian gỗ ấm cúng tối giản giúp tái tạo năng lượng sau một ngày làm việc.'
  }
];

export const INITIAL_HERO_SLIDES = [
  {
    id: 1,
    title: 'Biệt Thự & Căn Hộ Nghỉ Dưỡng Trực Tiếp Chủ Nhà',
    subtitle: 'Hệ sinh thái cho thuê trực tiếp 0% chi phí môi giới, ký hợp đồng điện tử pháp lý và bảo mật thông tin tuyệt đối.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85',
    ctaText: 'Khám Phá Ngay',
    ctaLink: '#/search'
  },
  {
    id: 2,
    title: 'Không Gian Sống Tiêu Chuẩn Cao Cấp & Đầy Đủ Tiện Nghi',
    subtitle: 'Hơn 10.000+ phòng trọ, studio và căn hộ cao cấp đã được kiểm định chính chủ trên toàn quốc.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1920&q=85',
    ctaText: 'Tìm Phòng Ngay',
    ctaLink: '#/search'
  },
  {
    id: 3,
    title: 'Đăng Tin Cho Thuê Nhanh Chóng & Tiếp Cận Khách Thuê Uy Tín',
    subtitle: 'Công cụ quản lý lịch hẹn thông minh, kết nối khách thuê chất lượng cao không qua trung gian.',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1920&q=85',
    ctaText: 'Đăng Tin Ngay',
    ctaLink: '#/post-property'
  }
];

export const HERO_SLIDES = INITIAL_HERO_SLIDES;
