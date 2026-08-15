const db = require('../data/db');
const { ROLES } = require('../config/constants');

exports.getContracts = (req, res) => {
  try {
    const contracts = db.getContracts(req.user.id).map(c => {
      const property = db.getPropertyById(c.propertyId);
      const landlord = db.findUserById(c.landlordId);
      const renter = db.findUserById(c.renterId);
      return {
        ...c,
        propertyTitle: property ? property.title : 'Bất động sản',
        propertyAddress: property ? property.location.address : '',
        landlordName: landlord ? landlord.name : 'Chủ nhà',
        renterName: renter ? renter.name : 'Người thuê'
      };
    });

    return res.json({ success: true, data: contracts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createContract = (req, res) => {
  try {
    const { propertyId, renterId, startDate, endDate, monthlyRent, depositAmount, customClauses } = req.body;
    if (!propertyId || !renterId || !startDate || !endDate || !monthlyRent) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ thông tin hợp đồng' });
    }

    const newContract = db.createContract({
      propertyId,
      landlordId: req.user.id,
      renterId,
      startDate,
      endDate,
      monthlyRent: Number(monthlyRent),
      depositAmount: Number(depositAmount || monthlyRent),
      customClauses: customClauses || 'Hai bên cam kết tuân thủ các quy định của pháp luật hiện hành và thỏa thuận trong hợp đồng.'
    });

    return res.status(201).json({
      success: true,
      message: 'Tạo hợp đồng mẫu thành công! Đã gửi đến Người thuê để xác nhận ký số.',
      data: newContract
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.signContract = (req, res) => {
  try {
    const { id } = req.params;
    const contract = db.signContract(id, req.user.role);
    if (!contract) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy hợp đồng' });
    }

    return res.json({
      success: true,
      message: 'Xác nhận ký hợp đồng điện tử thành công!',
      data: contract
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
