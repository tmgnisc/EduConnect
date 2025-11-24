const express = require('express');
const multer = require('multer');
const { listBooks, fetchBook, addBook, editBook, removeBook } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', authMiddleware, listBooks);
router.get('/:id', authMiddleware, fetchBook);
router.post('/', authMiddleware, roleMiddleware('publisher', 'admin'), upload.single('cover'), addBook);
router.put('/:id', authMiddleware, roleMiddleware('publisher', 'admin'), upload.single('cover'), editBook);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), removeBook);

module.exports = router;

