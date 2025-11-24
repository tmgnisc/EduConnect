const express = require('express');
const { listUsers, changeUserStatus, listPublishers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get(
  '/publishers',
  authMiddleware,
  roleMiddleware('admin', 'school'),
  listPublishers
);

router.use(authMiddleware, roleMiddleware('admin'));
router.get('/', listUsers);
router.patch('/:id/status', changeUserStatus);

module.exports = router;

