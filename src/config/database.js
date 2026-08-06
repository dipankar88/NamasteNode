// mongodb+srv://dgkgecece:<db_password>@cluster0.s5yjw.mongodb.net/

const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://dgkgecece:0cvri2rt7v0MVfP4@cluster0.s5yjw.mongodb.net/devTinder");
};

module.exports = {connectDB};