const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const propertyController = require('../controllers/propertyController');
const bookingController = require('../controllers/bookingController');
const chatController = require('../controllers/chatController');
const contractController = require('../controllers/contractController');
const adminController = require('../controllers/adminController');
const paymentController = require('../controllers/paymentController');

const { verifyToken, requireRole } = require('../middleware/authMiddleware');
const { ROLES } = require('../config/constants');

// --- AUTH ROUTES ---
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/profile', verifyToken, authController.getProfile);
router.post('/auth/switch-role', verifyToken, authController.switchRole);

// --- PROPERTY ROUTES ---
router.get('/properties', propertyController.getProperties);
router.get('/properties/my-listings', verifyToken, propertyController.getMyProperties);
router.get('/properties/:id', propertyController.getPropertyById);
router.post('/properties', verifyToken, propertyController.createProperty);
router.put('/properties/:id', verifyToken, propertyController.updateProperty);
router.delete('/properties/:id', verifyToken, propertyController.deleteProperty);

// --- BOOKING ROUTES ---
router.get('/bookings', verifyToken, bookingController.getBookings);
router.post('/bookings', verifyToken, bookingController.createBooking);
router.patch('/bookings/:id/status', verifyToken, bookingController.updateBookingStatus);

// --- CHAT ROUTES ---
router.get('/chat/messages', verifyToken, chatController.getMessages);
router.post('/chat/messages', verifyToken, chatController.sendMessage);

// --- CONTRACT ROUTES ---
router.get('/contracts', verifyToken, contractController.getContracts);
router.post('/contracts', verifyToken, contractController.createContract);
router.post('/contracts/:id/sign', verifyToken, contractController.signContract);

// --- PAYMENT & PACKAGES ROUTES ---
router.get('/packages', paymentController.getPackages);
router.post('/payments/buy-package', verifyToken, paymentController.buyPackage);
router.post('/payments/promote', verifyToken, paymentController.promoteProperty);

// --- ADMIN ROUTES ---
router.get('/admin/stats', verifyToken, requireRole(ROLES.ADMIN), adminController.getStats);
router.get('/admin/pending-properties', verifyToken, requireRole(ROLES.ADMIN), adminController.getPendingProperties);
router.post('/admin/properties/:id/approve', verifyToken, requireRole(ROLES.ADMIN), adminController.approveProperty);
router.post('/admin/properties/:id/reject', verifyToken, requireRole(ROLES.ADMIN), adminController.rejectProperty);
router.get('/admin/users', verifyToken, requireRole(ROLES.ADMIN), adminController.getUsers);
router.post('/admin/users/:id/toggle-lock', verifyToken, requireRole(ROLES.ADMIN), adminController.toggleUserLock);

module.exports = router;
