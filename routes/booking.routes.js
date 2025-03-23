const router = require("express").Router();
const Booking = require("../models/booking.model");

router.get("/bookings", async (req, res, next) => {
    try {
      const bookings = await Booking.find();
      res.json(bookings);
    } catch (error) {
      console.error(error);
    }
  });
  
  router.post("/bookings", async (req, res, next) => {
    try {
      const booking = await Booking.create(req.body);
      res.json(booking);
    }
    catch (error) {
      console.error(error);
    }
  })
  
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
  module.exports = router;