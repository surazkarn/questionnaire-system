const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
      selectedOptions: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Response', responseSchema);
