const { seedUsers, seedProperties, seedBookings, seedChats, seedContracts } = require('./seedData');
const { PROPERTY_STATUS, ROLES } = require('../config/constants');

class DatabaseStore {
  constructor() {
    this.users = [...seedUsers];
    this.properties = [...seedProperties];
    this.bookings = [...seedBookings];
    this.chats = [...seedChats];
    this.contracts = [...seedContracts];
    this.transactions = [];
  }

  // --- USERS ---
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  createUser(user) {
    const newUser = {
      id: `usr_${Date.now()}`,
      verified: false,
      createdAt: new Date().toISOString(),
      ...user
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, data) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...data };
    return this.users[idx];
  }

  // --- PROPERTIES ---
  getProperties(filter = {}) {
    let result = [...this.properties];

    if (filter.status) {
      result = result.filter(p => p.status === filter.status);
    }

    if (filter.type) {
      result = result.filter(p => p.type === filter.type);
    }

    // Toggle Căn hộ cao cấp (FR-03.2)
    if (filter.isLuxury === 'true' || filter.isLuxury === true) {
      result = result.filter(p => p.isLuxury === true);
    }

    // Multi-select Điều kiện Villa (FR-03.2)
    if (filter.villaConditions && filter.villaConditions.length > 0) {
      const condList = Array.isArray(filter.villaConditions) 
        ? filter.villaConditions 
        : filter.villaConditions.split(',');
      result = result.filter(p => {
        if (!p.villaConditions || !Array.isArray(p.villaConditions)) return false;
        return condList.every(c => p.villaConditions.includes(c.trim()));
      });
    }

    // Keyword
    if (filter.keyword) {
      const q = filter.keyword.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.location.address.toLowerCase().includes(q) ||
        p.location.district.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q)
      );
    }

    // City / District
    if (filter.city) {
      result = result.filter(p => p.location.city.toLowerCase().includes(filter.city.toLowerCase()));
    }
    if (filter.district) {
      result = result.filter(p => p.location.district.toLowerCase().includes(filter.district.toLowerCase()));
    }

    // Price range
    if (filter.minPrice) {
      result = result.filter(p => p.price >= Number(filter.minPrice));
    }
    if (filter.maxPrice) {
      result = result.filter(p => p.price <= Number(filter.maxPrice));
    }

    // Area range
    if (filter.minArea) {
      result = result.filter(p => p.area >= Number(filter.minArea));
    }
    if (filter.maxArea) {
      result = result.filter(p => p.area <= Number(filter.maxArea));
    }

    // Pets allowed
    if (filter.petsAllowed === 'true' || filter.petsAllowed === true) {
      result = result.filter(p => p.policies && p.policies.petsAllowed === true);
    }

    // Sort
    if (filter.sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filter.sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filter.sortBy === 'area_desc') {
      result.sort((a, b) => b.area - a.area);
    } else {
      // Default: VIP first, then newest
      result.sort((a, b) => {
        if (a.isVip && !b.isVip) return -1;
        if (!a.isVip && b.isVip) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    return result;
  }

  getPropertyById(id) {
    const prop = this.properties.find(p => p.id === id);
    if (prop) {
      prop.viewsCount = (prop.viewsCount || 0) + 1;
    }
    return prop;
  }

  createProperty(data) {
    const newProp = {
      id: `prop_${Date.now()}`,
      status: PROPERTY_STATUS.PENDING, // Mặc định chờ duyệt theo PRD
      viewsCount: 0,
      likesCount: 0,
      verifiedListing: false,
      createdAt: new Date().toISOString(),
      ...data
    };
    this.properties.unshift(newProp);
    return newProp;
  }

  updateProperty(id, data) {
    const idx = this.properties.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.properties[idx] = { ...this.properties[idx], ...data };
    return this.properties[idx];
  }

  deleteProperty(id) {
    const idx = this.properties.findIndex(p => p.id === id);
    if (idx === -1) return false;
    this.properties.splice(idx, 1);
    return true;
  }

  // --- BOOKINGS ---
  getBookings(filter = {}) {
    let list = [...this.bookings];
    if (filter.landlordId) list = list.filter(b => b.landlordId === filter.landlordId);
    if (filter.renterId) list = list.filter(b => b.renterId === filter.renterId);
    if (filter.propertyId) list = list.filter(b => b.propertyId === filter.propertyId);
    return list;
  }

  createBooking(data) {
    const newBooking = {
      id: `book_${Date.now()}`,
      status: 'Chờ xác nhận',
      createdAt: new Date().toISOString(),
      ...data
    };
    this.bookings.unshift(newBooking);
    return newBooking;
  }

  updateBookingStatus(id, status) {
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      booking.status = status;
      return booking;
    }
    return null;
  }

  // --- CHATS ---
  getChats(propertyId, user1, user2) {
    return this.chats.filter(c => 
      c.propertyId === propertyId &&
      ((c.senderId === user1 && c.receiverId === user2) || (c.senderId === user2 && c.receiverId === user1))
    );
  }

  createChatMessage(data) {
    // Tự động ẩn số điện thoại trong tin nhắn để bảo mật (FR-05.2)
    let sanitizedMsg = (data.message || '').replace(/(0|\+84)[0-9]{8,10}/g, '[*** ĐÃ ẨN SĐT ***]');
    const newChat = {
      id: `chat_${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
      ...data,
      message: sanitizedMsg
    };
    this.chats.push(newChat);
    return newChat;
  }

  // --- CONTRACTS ---
  getContracts(userId) {
    return this.contracts.filter(c => c.landlordId === userId || c.renterId === userId);
  }

  createContract(data) {
    const newContract = {
      id: `ctr_${Date.now()}`,
      contractNumber: `HD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'draft',
      landlordSigned: false,
      renterSigned: false,
      createdAt: new Date().toISOString(),
      ...data
    };
    this.contracts.unshift(newContract);
    return newContract;
  }

  signContract(id, role) {
    const contract = this.contracts.find(c => c.id === id);
    if (!contract) return null;
    if (role === ROLES.LANDLORD) contract.landlordSigned = true;
    if (role === ROLES.RENTER) contract.renterSigned = true;
    if (contract.landlordSigned && contract.renterSigned) {
      contract.status = 'signed';
      contract.signedAt = new Date().toISOString();
    }
    return contract;
  }

  // --- TRANSACTIONS & PACKAGES ---
  createTransaction(data) {
    const tx = {
      id: `tx_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'success',
      ...data
    };
    this.transactions.unshift(tx);
    return tx;
  }

  getTransactions() {
    return this.transactions;
  }
}

const db = new DatabaseStore();
module.exports = db;
