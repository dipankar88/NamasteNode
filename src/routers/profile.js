const express = require('express');
const profileRouter = express.Router();

const {userAuth} = require('../middlewares/auth');
const { validateRequestedProfileData } = require('../utils/validation');

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

// update profile API
profileRouter.patch('/profile/edit', userAuth, async (req, res)=>{
  try {
    if(!validateRequestedProfileData(req)) throw new Error("Invalid Edit request!!!");
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
        loggedInUser[key] = req.body[key]
    });
    await loggedInUser.save();
    res.json({
        message : `${loggedInUser.firstName}, your profile updated successfully!!!`,
        data: loggedInUser
    });
    // res.send(loggedInUser);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;