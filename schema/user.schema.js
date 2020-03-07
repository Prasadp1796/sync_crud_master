const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {type: String, unique: true},
    contact: {type: String, unique: true},
    departmentId: {type: mongoose.Schema.Types.ObjectId, ref: 'departments'}
});

module.exports = mongoose.model("users", userSchema);