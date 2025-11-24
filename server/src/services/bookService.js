const { pool } = require('../config/db');

const mapBook = (row) => ({
  id: row.id,
  title: row.title,
  grade: row.grade,
  subject: row.subject,
  isbn: row.isbn,
  price: row.price,
  publisherId: row.publisher_id,
  publisherName: row.publisher_name,
  description: row.description,
  coverImage: row.cover_image,
  createdAt: row.created_at,
});

const getAllBooks = async () => {
  const [rows] = await pool.query('SELECT * FROM books ORDER BY created_at DESC');
  return rows.map(mapBook);
};

const getBookById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
  return rows[0] ? mapBook(rows[0]) : null;
};

const createBook = async ({
  title,
  grade,
  subject,
  isbn,
  price,
  publisherId,
  publisherName,
  description,
  coverImage,
}) => {
  const [result] = await pool.query(
    `INSERT INTO books (
      title, grade, subject, isbn, price, publisher_id, publisher_name, description, cover_image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, grade, subject, isbn, price, publisherId, publisherName, description || null, coverImage || null]
  );

  return getBookById(result.insertId);
};

const deleteBook = async (id) => {
  await pool.query('DELETE FROM books WHERE id = ?', [id]);
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
};

