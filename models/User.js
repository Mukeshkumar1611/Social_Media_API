const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 2,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);