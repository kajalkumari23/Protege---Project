const mongoose = require("mongoose");
const mentorSchema = new mongoose.Schema({
  m_id: {
    type: String,
    required: true,
  },
  m_pass: {
    type: String,
    required: true,
  },
  m_name: {
    type: String,
    required: true,
  },
  m_email: {
    type: String,
    required: true,
  },
  m_username: {
    type: String,
    required: true,
  },
  m_year: {
    type: Number,
    required: true,
  },
  m_linkedin: {
    type: String,
  },
  m_github: {
    type: String,
  },
  m_domain1: {
    type: String,
  },
  m_domain2: {
    type: String,
  },
  m_domain3: {
    type: String,
  },
  m_loggedIn: {
    type: Boolean,
  },
  m_desc: {
    type: String,
  },
});
const Mentor = mongoose.model("Mentor", mentorSchema);
module.exports = Mentor;
