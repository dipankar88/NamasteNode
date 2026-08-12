const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        require: true,
        maxLength: 50,
        minLength: 4
    },
    lastName : {
        type: String
    },
    email : {
        type: String,
        require: true
    },
    password : {
        type: String,
        require: true
    },
    age : {
        type: Number
    },
    gender : {
        type: String
    }
}); 

userSchema.methods.getJWT = async function () {
    // Always use function instead of arrow function, as 'this' will work differently in arrow function
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "SECRET@123", { expiresIn: '1d' });
    return token;
};

userSchema.methods.validateUserPassword = async function(inputPasswordFromUser) {
    const user = this;
    const userHashPassword = user.password;
    const isPasswordValid = await bcrypt.compare(inputPasswordFromUser, userHashPassword);
    return isPasswordValid;
};

const User = mongoose.model('User', userSchema);

module.exports = User;