
const mongoose = require("mongoose");
const joinSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref:"user" },
    activity_id: { type: mongoose.Schema.Types.ObjectId, ref:"activity" }
});
module.exports = mongoose.model('participant', joinSchema);