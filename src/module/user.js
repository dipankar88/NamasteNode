const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = User;