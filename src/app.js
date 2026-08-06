const express = require('express');

const app = express();

const {connectDB} = require("./config/database");
const User = require('./module/user')

app.post('/signup', async (req, res, next)=>{
  const user = new User({
    firstName: 'Spandita',
    lastName: "pal",
    email: 'spandita@pal.com',
    password: 'cde@123',
    age: 34,
    gender: 'Female'
  });

  try{
    await User.save();
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
