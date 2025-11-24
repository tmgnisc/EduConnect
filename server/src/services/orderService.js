const { pool } = require('../config/db');

const mapOrder = (row) => ({
  id: row.id,
  schoolId: row.school_id,
  schoolName: row.school_name,
  total: row.total,
  status: row.status,
  paymentStatus: row.payment_status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const getAllOrders = async () => {
  const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  return rows.map(mapOrder);
};

const getOrdersBySchool = async (schoolId) => {
  const [rows] = await pool.query('SELECT * FROM orders WHERE school_id = ? ORDER BY created_at DESC', [
    schoolId,
  ]);
  return rows.map(mapOrder);
};

const getOrdersByPublisher = async (publisherId) => {
  const [rows] = await pool.query(
    `SELECT DISTINCT o.* 
     FROM orders o
     JOIN order_items oi ON o.id = oi.order_id
     JOIN books b ON oi.book_id = b.id
     WHERE b.publisher_id = ?
     ORDER BY o.created_at DESC`,
    [publisherId]
  );
  return rows.map(mapOrder);
};

const createOrder = async ({ schoolId, schoolName, total, status, paymentStatus, items }) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [orderResult] = await connection.query(
      `INSERT INTO orders (school_id, school_name, total, status, payment_status)
       VALUES (?, ?, ?, ?, ?)`,
      [schoolId, schoolName, total, status || 'pending', paymentStatus || 'pending']
    );

    const orderId = orderResult.insertId;

    if (Array.isArray(items)) {
      for (const item of items) {
        await connection.query(
          `INSERT INTO order_items (order_id, book_id, book_title, quantity, price)
           VALUES (?, ?, ?, ?, ?)`,
          [orderId, item.bookId, item.bookTitle, item.quantity, item.price]
        );
      }
    }

    await connection.commit();
    return mapOrder({
      id: orderId,
      school_id: schoolId,
      school_name: schoolName,
      total,
      status: status || 'pending',
      payment_status: paymentStatus || 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const updateOrderStatus = async (id, status, paymentStatus) => {
  await pool.query('UPDATE orders SET status = ?, payment_status = ? WHERE id = ?', [
    status,
    paymentStatus,
    id,
  ]);
  const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
  return rows[0] ? mapOrder(rows[0]) : null;
};

module.exports = {
  getAllOrders,
  getOrdersBySchool,
  getOrdersByPublisher,
  createOrder,
  updateOrderStatus,
};

