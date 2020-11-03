const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {type: String},
    surname: {type: String},
    email: {type: String, required: true, unique: true},
    role: {type: String},
})
module.exports = mongoose.model('User', UserSchema);

