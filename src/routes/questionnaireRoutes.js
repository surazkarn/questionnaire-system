const express = require('express');
const questionnaireController = require('../controllers/questionnaireController.');
const router = express.Router();

// Submit test endpoint
router.post('/submit-test', questionnaireController.submitTest);

module.exports = router;
