const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vehicle'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    actualReturnDate: {
        type: Date
    },
    totalPrice: {
        type: Number,
        required: true
    },
    penaltyAmount: {
        type: Number,
        default: 0
    },
    refundAmount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'PickedUp', 'Active', 'Returned', 'Cancelled', 'Completed'],
        default: 'Pending'
    },
    pickupLocation: {
        lat: Number,
        lng: Number,
        address: String
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
