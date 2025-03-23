const router = require("express").Router();
const Room = require("../models/room.model");
const fileUploader = require("../config/cloudinary.config");

router.get("/rooms", async (req, res, next) => {
    try {
      const rooms = await Room.find();
      res.json(rooms);
    } catch (error) {
      console.error(error);
    }
  });
  
  router.post("/rooms", async (req, res, next) => {
    try {
      console.log(req.body);
      const room = await Room.create(req.body);
      res.json(room);
    }
    catch (error) {
      console.error(error);
    }
  })
  
  router.put("/rooms/:id", async (req, res, next) => {
    try {
      const room = await Room.findByIdAndUpdate(req.params.id,req.body, {new: true});
      res.json(room);
      } 
      catch (error) {
        console.error(error);
      }
  })
  
  router.delete("/rooms/:id", async (req, res, next) => {
      try {
          const room = await Room.findByIdAndDelete(req.params.id);
          res.json(room);
      } catch (error) {
          console.error(error);
      }
  })

  router.get("/rooms/:id", async (req, res) => {
    try {
      // user {} or null
      const room = await Room.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      } else {
        res.json(room);
      }
    } catch (error) {
      console.error(error);
    }
  });

  router.post("/upload", fileUploader.array("image", 3), async (req, res, next) => {
    console.log(req.files);
    if (!req.files) {
      next(new Error("No file uploaded!"));
      return;
    }
   
    res.json({ secure_url: req.files.path });
  });
  module.exports = router;