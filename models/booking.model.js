const { Schema , model } = require('mongoose');

const bookingSchema = new Schema({
    bookingDate:{ type: Date, default: Date.now },
    checkinDate:{ type: Date, required: false },
    checkoutDate:{ type: Date, required: true },
    totalPrice:{ type: Number},
    request: { type: String},
    adultGuest:{ type: Number, required: true },
    childrenGuest:{ type: Number, required: true },
    userId:{ type: Schema.Types.ObjectId, ref: 'User'},
    roomId:[{ type: Schema.Types.ObjectId, ref: 'Room', required: true }],
});

const Booking = model('Booking', bookingSchema);
module.exports = Booking;