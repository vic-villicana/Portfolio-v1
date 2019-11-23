let mongoose = require("mongoose");

let messageSchema = new mongoose.Schema({
  name:String,
  email:String,
  message:String
});

module.exports = mongoose.model("message", messageSchema);