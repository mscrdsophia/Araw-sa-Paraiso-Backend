const router = require("express").Router();
const User = require("../models/user.model");

router.get("/users", async (req, res, next) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
    }
  });
  
  router.post("/users", async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    }
    catch (error) {
      console.error(error);
    }
  })
  
  router.put("/users/:id", async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { ...req.body }, // Ensure all fields, including phoneNumber, are updated
        { new: true }
      );
      res.json(user);
    } 
    catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
  
  router.delete("/users/:id", async (req, res, next) => {
    try {
      console.log("Deleting user with ID:", req.params.id); // Debug user ID
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error); // Log the error
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get("/users/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  module.exports = router;