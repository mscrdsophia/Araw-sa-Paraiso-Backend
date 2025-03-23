const router = require("express").Router();
const Review = require("../models/reviews.model");

router.get("/reviews", async (req, res, next) => {
    try {
      const reviews = await Review.find();
      res.json(reviews);
    } catch (error) {
      console.error(error);
    }
  });
  
  router.post("/reviews", async (req, res, next) => {
    try {
      const review = await Review.create(req.body);
      res.json(review);
    }
    catch (error) {
      console.error(error);
    }
  })
  
  router.put("/reviews/:id", async (req, res, next) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id,req.body, {new: true});
      res.json(review);
      } 
      catch (error) {
        console.error(error);
      }
  })
  
  router.delete("/reviews/:id", async (req, res, next) => {
      try {
          const review = await Review.findByIdAndDelete(req.params.id);
          res.json(review);
      } catch (error) {
          console.error(error);
      }
  })
  router.get("/reviews/:id", async (req, res) => {
    try {
      // user {} or null
      const review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      } else {
        res.json(review);
      }
    } catch (error) {
      console.error(error);
    }
  });
  module.exports = router;