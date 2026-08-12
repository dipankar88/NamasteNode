const jwt = require("jsonwebtoken");
const User = require('../module/user');

const userAuth = async (req, res, next) => {

    try {
        const cookies = req.cookies;
        const { token } = cookies;
        
        if(!token) throw new Error("Invalid token!!!");
        
        const decodedData = await jwt.verify(token, "SECRET@123");
        const { _id } = decodedData;
        const user = await User.findById(_id);

        if(!user) throw new Error("User not found.");
        
        req.user = user;
        next();
    } catch(error) {
        res.status(404).send("Error: " + error.message);
    }
}

module.exports = {
    userAuth
};