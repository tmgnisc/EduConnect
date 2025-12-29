const express = require('express');
const { listUsers, changeUserStatus, listPublishers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Public endpoint for publishers (for landing page)
router.get('/publishers/public', listPublishers);

// Protected endpoint for publishers (for authenticated users)
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

