const router = require("express").Router();
const Booking = require("../models/booking.model");

const {bookRoom} = require("../controllers/room.controller");

router.get("/bookings", async (req, res, next) => {
    try {
      const bookings = await Booking.find();
      res.json(bookings);
    } catch (error) {
      console.error(error);
    }
  });
  
 

  router.post("/bookings", bookRoom);
  
  router.put("/bookings/:id", async (req, res, next) => {
    try {
      const booking = await booking.findByIdAndUpdate(req.params.id,req.body, {new: true});
      res.json(booking);
      } 
      catch (error) {
        console.error(error);
      }
  })
  
  router.delete("/bookings/:id", async (req, res, next) => {
      try {
          const booking = await Booking.findByIdAndDelete(req.params.id);
          res.json(booking);
      } catch (error) {
          console.error(error);
      }
  })

  router.get("/bookings/:id", async (req, res) => {
    try {
      // user {} or null
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      } else {
        res.json(booking);
      }
    } catch (error) {
      console.error(error);
    }
  });

  router.get('/bookings/user/:userId', async (req, res) => {
    try {
      console.log("Request received for /bookings/user/:userId");
      console.log("Request params:", req.params); // Log request parameters

      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const bookings = await Booking.find({ userId });
      console.log("Bookings found:", bookings); // Log the bookings

      if (!bookings.length) {
        return res.status(404).json({ message: "No bookings found for this user" });
      }

      res.json(bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err); // Log the error
      res.status(500).json({ message: "Error fetching bookings" });
    }
  });

  module.exports = router;