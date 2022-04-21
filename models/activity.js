
const mongoose = require("mongoose");
const AcitivtySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    property: { type : Array , "default" : [] },
    created_date: { type: Date },
    org_id: { type: String },
    news: { type: String },
    summaryStatus:{type:Boolean, "default" : false},
    summary: { type: String },
    products: { type : Array , "default" : [] },
    duration: { type : Array , "default" : [] },
    participant: [{ type: mongoose.Schema.Types.ObjectId, ref:"participant" }],
});
module.exports = mongoose.model('activity', AcitivtySchema);