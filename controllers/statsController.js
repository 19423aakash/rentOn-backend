const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

// @desc    Get admin dashboard stats
// @route   GET /api/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalVehicles = await Vehicle.countDocuments();
        const totalBookings = await Booking.countDocuments();

        const revenueData = await Booking.aggregate([
            {
                $match: {
                    status: { $nin: ['Cancelled'] }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' }
                }
            }
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        // Breakdown by status
        const bookingStatus = await Booking.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            totalUsers,
            totalVehicles,
            totalBookings,
            totalRevenue,
            bookingStatus
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboardStats
};
