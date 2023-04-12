const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
uuid();

const Post = require("../models/posts");

mongoose
  .connect("mongodb://127.0.0.1:27017/protege")
  .then(() => {
    console.log("CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log(err);
  });

Post.insertMany([
  {
    p_id: uuid(),
    p_detail: `Microsoft hiring for Interns, Make Sure to Apply in the same!!
    Eligibility : 3rd Year Student pursuing Bachelor's Degree.`,
    mentor: "Helen Brownie",
    mentor_username: "helenbrownie",
  },
  {
    p_id: uuid(),
    p_detail: `JPMC Code For Good Applications out now!!
    Eligibility : 3rd Year Student pursuing Bachelor's Degree.`,
    mentor: "Karishma Seth",
    mentor_username: "karishmaseth",
  },
]);
