const express = require('express');
const { listUsers, changeUserStatus } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware, roleMiddleware('admin'));
router.get('/', listUsers);
router.patch('/:id/status', changeUserStatus);

module.exports = router;

