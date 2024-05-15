const mongoose = require('mongoose');

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
    }
});
module.exports = mongoose.model('User', userSchema, 'users');