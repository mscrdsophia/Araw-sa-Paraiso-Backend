
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const router = require("express").Router();

const { isAuthenticated } = require("../middleware/middleware");

const saltRounds = 10;

router.post("/signup", (req, res, next) => {
    const  { email, password, firstName, lastName, phoneNumber, role} = req.body;
 
  // Check if the email or password or name is provided as an empty string 
  if (email === '' || password === '' || firstName === '' || lastName === '' || phoneNumber === '' || role === '') {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
 
  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }
  
  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }
 
 
  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
 
      // If the email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds); // 4898[yf9wh2b[ebf2f0fh]]
      const hashedPassword = bcrypt.hashSync(password, salt); // 4898[yf9wh2b[ebf2f0fh]]ugciuurybliuebfaybdlieuyb
 
      // Create a new user in the database
      // We return a pending promise, which allows us to chain another `then` 
      return User.create({ firstName, lastName, email, password: hashedPassword, phoneNumber, role });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { firstName, lastName, email, password, phoneNumber, role } = createdUser;
    
      // Create a new object that doesn't expose the password
      const user = { firstName, lastName, email, password, phoneNumber, role};
 
      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" })
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
 
  // Check if email or password are provided as empty string 
  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }
 
  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
    console.log("foundUser",foundUser);
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." })
        return;
      }
 
      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email,  firstName, lastName } = foundUser;
        
        // Create an object that will be set as the token payload
        const payload = { _id, email, firstName , lastName };
 
        // Create and sign the token
        const authToken = jwt.sign( 
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        );
        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
 
    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
})
    // Get the token string from the authorization

   


module.exports = router;
