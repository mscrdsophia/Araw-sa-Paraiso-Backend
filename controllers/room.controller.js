const Room = require("../models/room.model");
const Booking = require("../models/booking.model");
const mongoose = require("mongoose");

const bookRoom = async (req, res) => {
  const userId = req.payload._id;
  const session = await mongoose.startSession();
  session.startTransaction();
console.log(req.body);
console.log(userId);
  try {
    const { roomId, checkinDate, checkoutDate, request} = req.body;
    const newCheckin = new Date(checkinDate);
    const newCheckout = new Date(checkoutDate);

    // Validate dates
    if (newCheckout <= newCheckin) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Checkout must be after checkin" });
    }

    // Check if room exists
    const room = await Room.findById(roomId).session(session);
    if (!room) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Room not found" });
    }

    // Check for overlapping bookings
    const isBooked = await Room.exists({
      _id: roomId,
      isAvailable: false,
      $nor: [
        { checkoutDate: { $lte: newCheckin } }, // Existing booking ends before new checkin
        { checkinDate: { $gte: newCheckout } },  // Existing booking starts after new checkout
      ],
    }).session(session);

    if (isBooked) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Room already booked for these dates" });
    }

    // Update room status
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        isAvailable: false,
        checkinDate: newCheckin,
        checkoutDate: newCheckout,
      },
      { new: true, session }
    );
    const createBooking = await Booking.create(
      {
        roomId,
        userId,
        request,
        checkinDate: newCheckin,
        checkoutDate: newCheckout,
      });

    await session.commitTransaction();
    res.status(200).json(updatedRoom);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }

};


module.exports = { bookRoom };