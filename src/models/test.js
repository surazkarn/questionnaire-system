const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      id: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      options: [
        {
          id: {
            type: String,
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
        },
      ],
      correctOptions: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Test', testSchema);
