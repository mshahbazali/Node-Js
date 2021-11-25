const mongoose = require("mongoose")
const authSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        trim: true,

    },
    email: {
        type: String,
        unique: false,
        trim: true,

    },
    password: {
        type: String,
        unique: false,
        trim: true,

    },
    token: {
        type: String,
        unique: false,
    },
    country: {
        type: Object,
        unique: false,
    },
    otp: {
        type: String,
        unique: false,
    },
    profileImg: {
        type: String,
        unique: false,
    },
    product: {
        type: Object,
        unique: false,
    }

})

const auth = new mongoose.model("auth", authSchema)

module.exports = auth