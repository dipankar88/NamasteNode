const express = require('express');
const app = express();

const {connectDB} = require("./config/database");
const User = require('./module/user');
app.use(express.json());

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
  const user = new User(req.body);
  try{
    await user.save();
    res.send("User data saved successfully!!");
  }catch (err) {
    res.status(400).send('Error saving the user data : '+ err.message);
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
