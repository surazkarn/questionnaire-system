const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
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
});

module.exports = mongoose.model('Question', questionSchema);
