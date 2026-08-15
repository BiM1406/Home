/**
 * Authentication & Role Management Service
 * Roles: 'Admin' | 'Landlord' | 'Renter'
 */

const AUTH_KEY = 'roomrent_auth_user';

export const AuthService = {
  /**
   * Get currently logged-in user
   */
  getCurrentUser() {
    const user = localStorage.getItem(AUTH_KEY);
    return user ? JSON.parse(user) : { role: 'Renter', name: 'Khách Thuê Mẫu' };
  },

  /**
   * Switch active role for demo/testing
   */
  switchRole(role) {
    const user = { role, name: `Người dùng (${role})` };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    window.location.reload();
  }
};
