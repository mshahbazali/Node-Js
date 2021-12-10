const joi = require("joi")
const mongoose = require("mongoose")
const authSchema = mongoose.model("auth", mongoose.Schema({
    name: {type: String},
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    className: { type: String },
    mobile: { type: String },
    city: { type: String },
    country: { type: String },
    profileImg: { type: String },
    user: { type: String },
    token: {
        type: String,
        unique: false,
    },
    otp: {
        type: String,
        unique: false,
    },

}))

function validateUser(user) {
    const schema = joi.object({
        // name: joi.string().min(5).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(6).max(255).required()
    })
    return schema.validate(user);
}

exports.authSchema = authSchema;
exports.validate = validateUser;