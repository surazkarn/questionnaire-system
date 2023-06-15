const Test = require('../models/test');
const Response = require('../models/response');

exports.submitTest = async (req, res) => {
  try {
    const { userId, testId, responses } = req.body;

    // Check if the user has already taken the test
    const existingResponse = await Response.findOne({ user: userId, test: testId });
    if (existingResponse) {
      return res.status(400).json({ success: false, message: 'User has already taken the test' });
    }

    // Get the test from the database
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    // Calculate the score
    let score = 0;
    for (const question of test.questions) {
      const { id: questionId, correctOptions } = question;
      const selectedOptions = responses
        .filter((response) => response.questionId === questionId)
        .map((response) => response.optionId);

      if (
        selectedOptions.length === correctOptions.length &&
        selectedOptions.every((optionId) => correctOptions.includes(optionId))
      ) {
        score++;
      }
    }

    // Save the response
    const newResponse = new Response({
      user: userId,
      test: testId,
      answers: responses,
      score,
    });
    await newResponse.save();

    res.status(200).json({ success: true, message: 'Test submitted successfully', score });
  } catch (error) {
    console.error('Error in submitTest:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
