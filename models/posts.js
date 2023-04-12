const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
uuid();

const postsSchema = new mongoose.Schema({
  p_id: {
    type: String,
    required: true,
  },
  p_detail: {
    type: String,
    required: true,
  },
  mentor: {
    type: String,
    required: true,
  },
  mentor_username: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", postsSchema);

module.exports = Post;
