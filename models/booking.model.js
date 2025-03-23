const { Schema , model } = require('mongoose');

const bookingSchema = new Schema({
    bookingDate:{ type: Date, default: Date.now },
    checkinDate:{ type: Date, required: true },
    checkoutDate:{ type: Date, required: true },
    totalPrice:{ type: Number},
    request: { type: String, required: true },
    userId:{ type: Schema.Types.ObjectId, ref: 'User', required: true },
    roomId:[{ type: Schema.Types.ObjectId, ref: 'Room', required: true }],
});

const Booking = model('Booking', bookingSchema);

module.exports = Booking;