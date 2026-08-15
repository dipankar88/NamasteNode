const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if(!firstName || !lastName){
        throw new Error("Please enter a valid Name!");
    } else if(firstName.length < 4 || firstName.length > 50){
        throw new Error("Please enter a valid firstName.")
    } else if(!validator.isEmail(email)){
        throw new Error("Please enter a valid email address.")
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password!!!");
    }
};
const validateRequestedProfileData = (req) => {
    const allowedFieldsForUpdate = ['firstName', 'lastName', 'age', 'gender'];
    const isValidFields = Object.keys(req.body).every((key) => allowedFieldsForUpdate.includes(key));
    return isValidFields;
};
module.exports = {
    validateSignUpData,
    validateRequestedProfileData
};