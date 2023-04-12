const mongoose = require("mongoose");

const quesAnsSchema = new mongoose.Schema({
  q_id: {
    type: Number,
    required: true,
  },
  m_id: {
    type: String,
    required: true,
  },
  mentee_id: {
    type: String,
    required: true,
  },
  q_desc: {
    type: String,
  },
  a_desc: {
    type: String,
  },
  flag: {
    type: Boolean,
    required: true,
  },
});

const QuestionAnswer = mongoose.model("QuestionAnswer", quesAnsSchema);

module.exports = QuestionAnswer;
