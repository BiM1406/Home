const assert = require('assert');
const db = require('../data/db');
const { ROLES, PROPERTY_STATUS } = require('../config/constants');
const { generateToken } = require('../middleware/authMiddleware');

console.log('🧪 Bắt đầu chạy kiểm thử tự động hệ thống API RoomRent...');

try {
  // Test 1: Tìm kiếm & Lọc căn hộ cao cấp
  const luxuryProps = db.getProperties({ isLuxury: true, status: PROPERTY_STATUS.ACTIVE });
  assert(luxuryProps.length > 0, 'Phải có ít nhất 1 căn hộ/villa cao cấp');
  assert(luxuryProps.every(p => p.isLuxury === true), 'Tất cả kết quả phải có isLuxury = true');
  console.log('✅ Test 1 Passed: Bộ lọc Căn hộ cao cấp (FR-03.2)');

  // Test 2: Bộ lọc multi-select điều kiện Villa (hồ bơi + sân vườn)
  const poolGardenProps = db.getProperties({ villaConditions: ['pool', 'garden'], status: PROPERTY_STATUS.ACTIVE });
  assert(poolGardenProps.length > 0, 'Phải tìm thấy Villa có hồ bơi và sân vườn');
  poolGardenProps.forEach(p => {
    assert(p.villaConditions.includes('pool') && p.villaConditions.includes('garden'), 'Villa phải có cả hồ bơi và sân vườn');
  });
  console.log('✅ Test 2 Passed: Multi-select điều kiện Villa (FR-03.2)');

  // Test 3: Đăng tin mới (Wizard)
  const newProp = db.createProperty({
    title: 'Biệt thự kiểm thử tự động',
    type: 'villa',
    isLuxury: true,
    price: 40000000,
    area: 250,
    landlordId: 'usr_landlord_1',
    villaConditions: ['pool', 'security247'],
    location: { address: 'Đà Nẵng', district: 'Sơn Trà', city: 'Đà Nẵng' }
  });
  assert.strictEqual(newProp.status, PROPERTY_STATUS.PENDING, 'Tin đăng mới phải ở trạng thái Pending');
  console.log('✅ Test 3 Passed: Wizard đăng tin trạng thái Pending (FR-02)');

  // Test 4: Admin duyệt tin
  const approved = db.updateProperty(newProp.id, { status: PROPERTY_STATUS.ACTIVE, verifiedListing: true });
  assert.strictEqual(approved.status, PROPERTY_STATUS.ACTIVE, 'Tin sau khi duyệt phải Active');
  assert.strictEqual(approved.verifiedListing, true, 'Tin sau khi duyệt phải có verified badge');
  console.log('✅ Test 4 Passed: Admin duyệt tin đăng Active (FR-08)');

  // Test 5: Tạo lịch hẹn xem phòng
  const booking = db.createBooking({
    propertyId: approved.id,
    renterId: 'usr_renter_1',
    landlordId: 'usr_landlord_1',
    viewingDate: '2026-08-25',
    timeSlot: '10:00 - 11:00'
  });
  assert(booking.id.startsWith('book_'), 'ID lịch hẹn phải hợp lệ');
  console.log('✅ Test 5 Passed: Đặt lịch xem phòng (FR-04)');

  // Test 6: Chat bảo mật ẩn số điện thoại
  const chat = db.createChatMessage({
    propertyId: approved.id,
    senderId: 'usr_renter_1',
    receiverId: 'usr_landlord_1',
    message: 'Alo anh ơi số em là 0912345678 anh gọi lại em nhé'
  });
  assert(!chat.message.includes('0912345678'), 'Số điện thoại trong chat phải được ẩn bảo mật');
  assert(chat.message.includes('[*** ĐÃ ẨN SĐT ***]'), 'Phải thay thế bằng ký hiệu bảo mật');
  console.log('✅ Test 6 Passed: Chat 1-1 & Bảo mật ẩn SĐT (FR-05.2)');

  // Test 7: Hợp đồng số & Ký số 2 bên
  const contract = db.createContract({
    propertyId: approved.id,
    landlordId: 'usr_landlord_1',
    renterId: 'usr_renter_1',
    startDate: '2026-09-01',
    endDate: '2027-08-31',
    monthlyRent: 40000000
  });
  db.signContract(contract.id, ROLES.LANDLORD);
  db.signContract(contract.id, ROLES.RENTER);
  const signedContract = db.contracts.find(c => c.id === contract.id);
  assert.strictEqual(signedContract.status, 'signed', 'Hợp đồng phải chuyển sang trạng thái signed khi cả 2 bên đã ký');
  console.log('✅ Test 7 Passed: Hợp đồng số & Ký điện tử 2 bên (FR-06)');

  console.log('🎉 TOÀN BỘ 7/7 KIỂM THỬ ĐÃ VƯỢT QUA XUẤT SẮC!');
} catch (error) {
  console.error('❌ Kiểm thử thất bại:', error);
  process.exit(1);
}
