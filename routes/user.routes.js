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
      const user = await User.findByIdAndUpdate(req.params.id,req.body, {new: true});
      res.json(user);
      } 
      catch (error) {
        console.error(error);
      }
  })
  
  router.delete("/users/:id", async (req, res, next) => {
      try {
          const user = await User.findByIdAndDelete(req.params.id);
          res.json(user);
      } catch (error) {
          console.error(error);
      }
  })

  router.get("/users/:id", async (req, res) => {
    try {
      // user {} or null
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error(error);
    }
  });
  module.exports = router;