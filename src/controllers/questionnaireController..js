const Response = require("../models/response");
const Test = require("../models/test");

const submitTest = async (req, res) => {
  try {
    const { userId, testId, answers } = req.body;

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ success: false, message: "Test not found" });
    }

    // Check if the user has already taken the test
    const previousResponse = await Response.findOne({ user: userId, test: testId });
    if (previousResponse) {
      return res.status(400).json({ success: false, message: "You have already taken this test" });
    }

    let score = 0;

    for (const question of test.questions) {
      const selectedOptions = answers[question.questionId];

      if (!selectedOptions || !Array.isArray(selectedOptions)) {
        return res.status(400).json({ success: false, message: "Invalid answer format" });
      }

      const correctOptions = question.correctOptions;

      // Check if all selected options are correct
      const isCorrect = selectedOptions.every((option) => correctOptions.includes(option));

      if (isCorrect) {
        score += 1;
      }
    }

    const response = new Response({
      user: userId,
      test: testId,
      answers,
      score
    });

    // Save the response to the database or perform any other required operations
    await response.save();

    return res.json({ success: true, message: "Test submitted successfully", userId, testId, score });
  } catch (error) {
    console.log("Error in submitTest:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  submitTest
};
