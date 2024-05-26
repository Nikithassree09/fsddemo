const mongoose = require('mongoose');
const { isAdmin } = require('../middleware/auth');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    passwordHash: String,
    location: {
        type: String,
        default: 'Unknown'
    },
    role: {
         type: String,
         enum: ['user', 'admin'],
         default: 'user'
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    Seennotifications:{
        type: Array,
        default: [],
    },
    Unseennotifications:{
        type: Array,
        default: [],
    },
});
module.exports = mongoose.model('User', userSchema, 'users');