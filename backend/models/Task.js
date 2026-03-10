const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    default: "pending"
  },
  priority:{
    type:String,
    required:false
  },
  duedate:{
    type:Date,
    required:false
  }
});

module.exports = mongoose.model("Task", taskSchema);