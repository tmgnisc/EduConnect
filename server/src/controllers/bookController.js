const { getAllBooks, createBook, getBookById, updateBook, deleteBook } = require('../services/bookService');
const { uploadImage } = require('../services/cloudinaryService');

const listBooks = async (req, res, next) => {
  try {
    const books = await getAllBooks();
    res.json({ data: books });
  } catch (error) {
    next(error);
  }
};

const fetchBook = async (req, res, next) => {
  try {
    const book = await getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ data: book });
  } catch (error) {
    next(error);
  }
};

const addBook = async (req, res, next) => {
  try {
    const { title, grade, subject, isbn, price, description } = req.body;

    if (!title || !grade || !subject || !isbn || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let coverImage;
    if (req.file) {
      const uploaded = await uploadImage(req.file.buffer);
      coverImage = uploaded.secure_url;
    }

    const book = await createBook({
      title,
      grade,
      subject,
      isbn,
      price,
      description,
      coverImage,
      publisherId: req.user.id,
      publisherName: req.user.email,
    });

    res.status(201).json({ data: book });
  } catch (error) {
    next(error);
  }
};

const editBook = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      const uploaded = await uploadImage(req.file.buffer);
      updates.coverImage = uploaded.secure_url;
    }

    const book = await updateBook(req.params.id, updates);
    res.json({ data: book });
  } catch (error) {
    next(error);
  }
};

const removeBook = async (req, res, next) => {
  try {
    await deleteBook(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listBooks,
  fetchBook,
  addBook,
  editBook,
  removeBook,
};

