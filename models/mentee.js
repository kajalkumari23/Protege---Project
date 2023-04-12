const mongoose = require("mongoose");

const menteeSchema = new mongoose.Schema({
  mentee_id: {
    type: String,
    required: true,
  },
  mentee_name: {
    type: String,
    required: true,
  },
  mentee_college_email: {
    type: String,
    required: true,
  },
  mentee_username: {
    type: String,
    required: true,
  },
  mentee_pass: {
    type: String,
    required: true,
  },
  mentee_year: {
    type: Number,
    required: true,
  },
  mentee_linkedin: {
    type: String,
  },
  mentee_github: {
    type: String,
  },
  mentee_smartcard_id: {
    type: String,
    required: true,
  },
  mentee_loggedIn: {
    type: Boolean,
    required: true,
  },
});
const Mentee = mongoose.model("Mentee", menteeSchema);
module.exports = Mentee;
