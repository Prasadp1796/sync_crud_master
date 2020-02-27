const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const userSchema = mongoose.Schema({
   first_name: String,
   last_name: String,
   email: {type: String, unique: true},
   contact: {type: String, unique: true}
});

module.exports = mongoose.model("users", userSchema);