const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    language: { // Add the language preference field
        type: String,
        default: 'English',  // Default language is English
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;