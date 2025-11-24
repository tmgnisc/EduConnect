const express = require('express');
const { createIntent } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/intent', authMiddleware, createIntent);

module.exports = router;

