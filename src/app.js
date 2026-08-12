const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const { validateSignUpData } = require('./utils/validation');
const { connectDB } = require("./config/database");
const User = require('./module/user');
const { userAuth } = require('./middlewares/auth');

app.use(express.json());
//express give a way to attach cookie 
app.use(cookieParser());

// GET user details using email
app.get("/user", async (req, res, next) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found!!");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong!: ", error.message);
  }
});

// GET any user findOne - if duplicate documents present in User model
app.get("/duplicate", async (req, res) => {
  const userEmail = req.body.email;
  try {
      const findOneUser = await User.findOne({ email: userEmail });
      res.send(findOneUser);
  } catch (error) {
    res.status(404).send("Something went wrong!!!");
  }
});

// GET any user findById - if duplicate documents present in User model
app.get("/userbyid/:id", async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).send("User not found");
      res.send(user);
  } catch (error) {
    res.status(404).send("Something went wrong!!!");
  }
});

// GET all users feed from database

app.get('/feed', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(404).send("Something went worng!!");
  }
})

// POST : /signup API to save data in database

app.post('/signup', async (req, res, next)=>{
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

// DELETE API to delete a user

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    if(!userId) return res.status(404).send("User not available!!!");
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully !!!");
  } catch (error) {
    res.status(404).send("Something went wrong.");
  }
});

// PATCH api - to update any properties of a specific user document

app.patch("/user", async (req, res) => {
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate(data.userId, data, { returnDocument: 'before' });
    console.log(user);
    res.send("Data updated successfully!!");
  } catch (error) {
    res.status(404).send("Something went wrong: " + error.message);
  }
});

// PATCH api - to update any properties of a specific user document using emailId

app.patch("/updateByEmail", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const user = await User.findOneAndUpdate(
      { email: data.email},
      { firstName: data.firstName },
      { 
        returnDocument: "before",
        new: true
      }
    );
    console.log(user);
    if(!user) return res.status(404).send("User not available!!!");
    res.send("Data updated successfully!!");
  } catch (error) {
    res.status(404).send("Something went wrong: " + error.message);
  }
});

// login API
app.post('/login', async (req, res)=>{
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email});
      if(!user) throw new Error("Invalid user credentials!");
      const isValidPassword = await bcrypt.compare(password, user.password);
      if(!isValidPassword) throw new Error("Invalid user credentials!");

      const token = await jwt.sign({ _id: user._id }, "SECRET@123");
      if(!token) throw new Error("Invalid token !!");

      res.cookie("token", token);
      res.send("User logged in successfully!!");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// profile API - User profile
app.get('/profile', userAuth, async (req, res)=>{
  try {
    // const cookies = req.cookies;
    // const { token } = cookies;
    // if(!token) throw new Error("Invalid Token!!!");
    // const decodedMessage = await jwt.verify(token, "SECRET@123")
    // const { _id } = decodedMessage;
    // const user = await User.findById(_id);
    
    res.send(req.user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

connectDB()
.then(() => {
  console.log("DB connection estublished!!");
  app.listen(7000, ()=>{
    console.log("Server is running on http://localhost:7000");
  });
})
.catch((err) => {
    console.error("Database connection failed:", err.message);
  });
