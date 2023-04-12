const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  f_id: {
    type: Number,
    required: true,
  },
  u_id: {
    type: Number,
    required: true,
  },
  f_detail: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
