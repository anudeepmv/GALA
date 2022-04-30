///Documentation for organization to join schema
///mongoose is a modelling library
///it provides methods and statics
const mongoose = require("mongoose");
const CollegeSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true, unique: true },
    created_date: { type: Date }
});
module.exports = mongoose.model('organization', CollegeSchema);