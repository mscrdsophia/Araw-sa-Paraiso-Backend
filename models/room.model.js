const { Schema , model } = require('mongoose');

const roomSchema = new Schema({
    roomName:{ type: String, required: true },
    roomType:{ type: String, required: true },
    roomPrice:{ type: Number, required: true },
    roomDescription:{ type: String, required: true },
    image:[ String ],
    maxGuest:{ type: Number, required: true },
    isAvailable:{ type: Boolean, default:true },
    roomNumber:{ type: Number, required: true },
    checkinDate:{ type: Date},
    checkoutDate:{ type: Date}
    
});

const Room = model('Room', roomSchema);

module.exports = Room;