const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true
  },
  testName: {
    type: String,
    required: true
  },
  questions: [
    {
      questionId: {
        type: String,
        required: true
      },
      questionText: {
        type: String,
        required: true
      },
      options: [
        {
          optionId: {
            type: String,
            required: true
          },
          optionText: {
            type: String,
            required: true
          },
          isCorrect: {
            type: Boolean,
            required: true
          }
        }
      ],
      correctOptions: [
        {
          type: String,
          required: true
        }
      ]
    }
  ]
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
