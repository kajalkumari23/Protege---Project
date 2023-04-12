const mongoose = require("mongoose");

const { v4: uuid } = require("uuid");
uuid();

const domainSchema = new mongoose.Schema({
  d_id: {
    type: String,
    required: true,
  },
  d_name: {
    type: String,
    required: true,
  },
});
const Domain = mongoose.model("Domain", domainSchema);
module.exports = Domain;
Domain.insertMany([
  {
    d_id: uuid(),
    d_name: "Web Development",
  },
  {
    d_id: uuid(),
    d_name: "App Development",
  },
  {
    d_id: uuid(),
    d_name: "Artificial Intelligence",
  },
  {
    d_id: uuid(),
    d_name: "Machine Learning",
  },
  {
    d_id: uuid(),
    d_name: "Data Structure & Algorithm",
  },
  {
    d_id: uuid(),
    d_name: "Open Source & Web3",
  },
]);
