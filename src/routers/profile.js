const express = require('express');
const profileRouter = express.Router();

const {userAuth} = require('../middlewares/auth');

// profile API - User profile
profileRouter.get('/profile', userAuth, async (req, res)=>{
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

module.exports = profileRouter;