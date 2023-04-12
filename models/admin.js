const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  a_id: {
    type: Number,
    required: true,
  },
  a_pass: {
    type: String,
    required: true,
  },
  a_name: {
    type: String,
    required: true,
  },
  a_email: {
    type: String,
    required: true,
  },
  a_username: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
