const express = require('express');
const router = express.Router();
const { addBookingItems, getMyBookings, getAllBookings, updateBookingStatus, cancelBooking, updateBookingDates } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, addBookingItems).get(protect, admin, getAllBookings);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/:id/status').patch(protect, admin, updateBookingStatus);
router.route('/:id').delete(protect, cancelBooking).put(protect, updateBookingDates);

module.exports = router;
