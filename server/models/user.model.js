"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        tim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
var User = mongoose_1.model('User', userSchema);
exports.default = User;
