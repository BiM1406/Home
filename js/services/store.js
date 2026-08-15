/**
 * Client Store Service (Mock Database & LocalStorage Sync)
 */

const STORAGE_KEYS = {
  PROPERTIES: 'roomrent_properties',
  BOOKINGS: 'roomrent_bookings',
  CHATS: 'roomrent_chats'
};

export const Store = {
  /**
   * Get all properties
   */
  getProperties() {
    const raw = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    return raw ? JSON.parse(raw) : [];
  },

  /**
   * Save properties list
   */
  saveProperties(properties) {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
  }
};
