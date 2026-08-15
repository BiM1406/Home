/**
 * Authentication & Preferences Service
 * Roles: 'Landlord' | 'Renter' (and Admin for system route)
 * Currency: 'VND' | 'USD'
 * Exchange rate: 1 USD ≈ 25,000 VND
 */
import { generateSvgAvatar } from '../data/mockData.js';

const AUTH_KEY = 'roomrent_auth_user_v2';
const PREFS_KEY = 'roomrent_preferences';

export const AuthService = {
  /**
   * Get currently logged-in user
   */
  getCurrentUser() {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      const user = JSON.parse(raw);
      if (user.role === 'Renter' && (!user.name || user.name.includes('An') || user.name.includes('Văn A'))) {
        user.name = 'Nguyễn Đạt';
        user.avatar = generateSvgAvatar('Nguyễn Đạt', '#2c1f1a', '#e0b445');
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      }
      return user;
    }
    const defaultUser = {
      id: 'usr-01',
      name: 'Nguyễn Đạt',
      role: 'Renter', // Default role
      avatar: generateSvgAvatar('Nguyễn Đạt', '#2c1f1a', '#e0b445'),
      email: 'nguyendat@roomrent.vn'
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  },

  /**
   * Switch active role ('Renter' | 'Landlord')
   */
  switchRole(role) {
    const current = this.getCurrentUser();
    const isLandlord = role === 'Landlord';
    const name = isLandlord ? 'Trần Văn B' : 'Nguyễn Đạt';
    const avatar = isLandlord 
      ? generateSvgAvatar('Trần Văn B', '#1a237e', '#ffffff')
      : generateSvgAvatar('Nguyễn Đạt', '#2c1f1a', '#e0b445');

    const updated = {
      ...current,
      role,
      name,
      avatar,
      email: isLandlord ? 'tranvanb@roomrent.vn' : 'nguyendat@roomrent.vn'
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
    window.location.reload();
  },

  /**
   * Preferences (Currency: VND | USD)
   */
  getPreferences() {
    const prefs = localStorage.getItem(PREFS_KEY);
    return prefs ? JSON.parse(prefs) : { currency: 'VND', lang: 'vi' };
  },

  setCurrency(currency) {
    const prefs = this.getPreferences();
    prefs.currency = currency;
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    window.location.reload();
  },

  /**
   * Currency formatter helper for any VND amount
   */
  formatPrice(priceVnd, priceUsd = null) {
    const { currency } = this.getPreferences();
    if (currency === 'USD') {
      const usd = priceUsd !== null ? priceUsd : Math.round(priceVnd / 25000);
      return `$${usd.toLocaleString('en-US')}/tháng`;
    }
    if (priceVnd >= 1000000) {
      return `${(priceVnd / 1000000).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} triệu/tháng`;
    }
    return `${priceVnd.toLocaleString('vi-VN')} đ/tháng`;
  },

  /**
   * Format stat range string dynamically based on active currency
   */
  formatPriceRange(minVnd, maxVnd, isStartingFrom = false) {
    const { currency } = this.getPreferences();
    if (currency === 'USD') {
      const minUsd = Math.round(minVnd / 25000);
      if (isStartingFrom) {
        return `Từ $${minUsd.toLocaleString('en-US')}/tháng`;
      }
      const maxUsd = Math.round(maxVnd / 25000);
      return `$${minUsd} - $${maxUsd}/tháng`;
    }

    // Default VND
    const minTr = (minVnd / 1000000).toLocaleString('vi-VN', { maximumFractionDigits: 1 });
    if (isStartingFrom) {
      return `Từ ${minTr} triệu/tháng`;
    }
    const maxTr = (maxVnd / 1000000).toLocaleString('vi-VN', { maximumFractionDigits: 1 });
    return `${minTr} - ${maxTr} triệu/tháng`;
  }
};
