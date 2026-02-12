const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String, // Car, Bike
        required: true,
        enum: ['Car', 'Bike']
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    extraChargePerHour: {
        type: Number,
        required: true,
        default: 0
    },
    pickupLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    address: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    // Optional/Legacy fields kept for compatibility or richness
    transmission: { type: String, default: 'Automatic' },
    fuelType: { type: String, default: 'Petrol' },
    capacity: { type: String, default: '4 Persons' },
    description: { type: String, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

vehicleSchema.virtual('image').get(function() {
    return this.images && this.images.length > 0 ? this.images[0] : null;
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
