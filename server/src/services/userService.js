const { pool } = require('../config/db');

const mapUser = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: row.role,
  status: row.status,
  createdAt: row.created_at,
});

const findAuthByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
};

const findUserById = async (id) => {
  const [rows] = await pool.query(
    'SELECT id, name, email, role, status, created_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0] ? mapUser(rows[0]) : null;
};

const createUser = async ({ name, email, password, role, organizationName, phone, status }) => {
  const [result] = await pool.query(
    `INSERT INTO users (name, email, password, role, organization_name, phone, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, password, role, organizationName || null, phone || null, status || 'pending']
  );
  return findUserById(result.insertId);
};

const getAllUsers = async () => {
  const [rows] = await pool.query(
    'SELECT id, name, email, role, status, created_at FROM users ORDER BY created_at DESC'
  );
  return rows.map(mapUser);
};

const updateUserStatus = async (id, status) => {
  await pool.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
  return findUserById(id);
};

module.exports = {
  findAuthByEmail,
  findUserById,
  createUser,
  getAllUsers,
  updateUserStatus,
};

