const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            maxlength: 50
        },
        passwordHash: {
            type: String,
            required: true,
            maxlength: 200
        },
        info: {
            type: Object
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationString: {
            type: String
        }
    }
);


module.exports = mongoose.model('User', UserSchema)