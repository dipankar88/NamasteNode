const express = require('express');
const bcrypt = require('bcrypt');
const { model } = require('mongoose');
const authRouter = express.Router();
const { validateSignUpData } = require('../utils/validation');
const saltRounds = 10;
const User = require('../module/user');

// POST : /signup API to save data in database

authRouter.post('/signup', async (req, res, next)=>{
  try{
    validateSignUpData(req);
    const {firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash
    });
    await user.save();
    res.send("User data saved successfully!!");
  }catch (err) {
    res.status(400).send('Error saving the user data : '+ err.message);
  }
});

// login API
authRouter.post('/login', async (req, res)=>{
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email});
      if(!user) throw new Error("Invalid user credentials!");
      const isValidPassword = await user.validateUserPassword(password);
      if(!isValidPassword) throw new Error("Invalid user credentials!");

      // const token = await jwt.sign({ _id: user._id }, "SECRET@123", { expiresIn: '0h'});
      const token = await user.getJWT();
      if(!token) throw new Error("Invalid token !!");

      res.cookie("token", token);
      res.send("User logged in successfully!!");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = authRouter;