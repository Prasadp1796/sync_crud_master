const mongoose = require('mongoose');

let departmentSchema = mongoose.Schema({
   departmentName: {type: String, unique: true}
});

module.exports = mongoose.model('departments', departmentSchema);