/**
 * Client Store Service (Mock Database & LocalStorage Sync)
 */
import { INITIAL_PROPERTIES } from '../data/mockData.js';

const STORAGE_KEYS = {
  PROPERTIES: 'roomrent_properties_v4',
  BOOKINGS: 'roomrent_bookings',
  FAVORITES: 'roomrent_favorites',
  CHATS: 'roomrent_chats',
  CONTRACTS: 'roomrent_contracts'
};

export const Store = {
  /**
   * Initialize store with default seed data if not present
   */
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.PROPERTIES)) {
      this.saveProperties(INITIAL_PROPERTIES);
    }
  },

  /**
   * Get all properties
   */
  getProperties() {
    this.init();
    const raw = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    return raw ? JSON.parse(raw) : INITIAL_PROPERTIES;
  },

  /**
   * Save properties list
   */
  saveProperties(properties) {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
  },

  /**
   * Get property by ID
   */
  getPropertyById(id) {
    const properties = this.getProperties();
    return properties.find(p => p.id === id) || null;
  },

  /**
   * Get properties by Category ('villa', 'apartment', 'room', 'studio')
   */
  getPropertiesByCategory(category) {
    const properties = this.getProperties();
    return properties.filter(p => p.category === category);
  },

  /**
   * Get VIP / Featured properties
   */
  getVipProperties() {
    const properties = this.getProperties();
    return properties.filter(p => p.isVip);
  },

  /**
   * Favorites management
   */
  getFavorites() {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : [];
  },

  toggleFavorite(propertyId) {
    let favorites = this.getFavorites();
    const index = favorites.indexOf(propertyId);
    let isAdded = false;

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(propertyId);
      isAdded = true;
    }

    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    return isAdded;
  },

  isFavorite(propertyId) {
    const favorites = this.getFavorites();
    return favorites.includes(propertyId);
  },

  /**
   * Viewing Appointments (Bookings) Management
   * States: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'
   */
  getBookings() {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return raw ? JSON.parse(raw) : [];
  },

  saveBookings(bookings) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  createBooking(data) {
    const bookings = this.getBookings();
    const newBooking = {
      id: 'bk-' + Date.now(),
      propertyId: data.propertyId,
      propertyTitle: data.propertyTitle,
      propertyAddress: data.propertyAddress,
      propertyPrice: data.propertyPrice,
      propertyImage: data.propertyImage,
      renterName: data.renterName,
      renterPhone: data.renterPhone,
      landlordName: data.landlordName,
      appointmentDate: data.appointmentDate,
      timeSlot: data.timeSlot,
      note: data.note || '',
      status: 'Pending', // Pending, Confirmed, Cancelled, Completed
      createdAt: new Date().toISOString()
    };
    bookings.unshift(newBooking);
    this.saveBookings(bookings);
    return newBooking;
  },

  updateBookingStatus(bookingId, newStatus) {
    const bookings = this.getBookings();
    const target = bookings.find(b => b.id === bookingId);
    if (target) {
      target.status = newStatus;
      this.saveBookings(bookings);
      return true;
    }
    return false;
  }
};
