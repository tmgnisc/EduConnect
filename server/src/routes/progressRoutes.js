const express = require('express');
const { listEntries, addEntry, editEntry, removeEntry } = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware, roleMiddleware('school'));
router.get('/', listEntries);
router.post('/', addEntry);
router.put('/:id', editEntry);
router.delete('/:id', removeEntry);

module.exports = router;

