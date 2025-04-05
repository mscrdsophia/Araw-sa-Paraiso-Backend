require("dotenv").config();
require("./database"); // database connection
// require("./config")(app); // middlewares and config
require("./cron/index")

const {isAuthenticated} = require("./middleware/middleware");
const express = require("express"); 
const app = express(); 
require("./config")(app); // middlewares and config

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));


const roomRoutes = require("./routes/room.routes");
app.use("/api", roomRoutes);
const reviewRoutes = require("./routes/reviews.routes");
app.use("/api", reviewRoutes);
const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);
const authRoutes = require("./routes/auth.routes");
app.use("/auth/api", authRoutes);
const bookingRoutes = require("./routes/booking.routes");
app.use("/api",isAuthenticated, bookingRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
  
  module.exports = app; // Export of the app object.