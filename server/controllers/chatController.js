const db = require('../data/db');

exports.getMessages = (req, res) => {
  try {
    const { propertyId, otherUserId } = req.query;
    if (!propertyId || !otherUserId) {
      return res.status(400).json({ success: false, message: 'Cần propertyId và otherUserId' });
    }

    const messages = db.getChats(propertyId, req.user.id, otherUserId);
    const property = db.getPropertyById(propertyId);
    const otherUser = db.findUserById(otherUserId);

    return res.json({
      success: true,
      data: {
        property: property ? {
          id: property.id,
          title: property.title,
          price: property.price,
          image: property.images[0],
          address: property.location.address
        } : null,
        otherUser: otherUser ? {
          id: otherUser.id,
          name: otherUser.name,
          avatar: otherUser.avatar,
          role: otherUser.role
        } : null,
        messages
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.sendMessage = (req, res) => {
  try {
    const { propertyId, receiverId, message } = req.body;
    if (!propertyId || !receiverId || !message) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đủ thông tin tin nhắn' });
    }

    const newMsg = db.createChatMessage({
      propertyId,
      senderId: req.user.id,
      receiverId,
      message
    });

    return res.status(201).json({
      success: true,
      message: 'Gửi tin nhắn thành công',
      data: newMsg
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
