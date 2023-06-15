const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true
  },
  answers: {
    type: Map,
    of: [String],
    required: true
  },
  score: {
    type: Number,
    default: 0
  }
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
