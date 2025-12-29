const { getAllUsers, updateUserStatus, getPublishers } = require('../services/userService');

const listUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json({ data: users });
  } catch (error) {
    next(error);
  }
};

const changeUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const user = await updateUserStatus(req.params.id, status);
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};

const listPublishers = async (req, res, next) => {
  try {
    const publishers = await getPublishers();
    const filtered =
      req.user && req.user.role === 'school'
        ? publishers.filter((publisher) => publisher.status === 'approved')
        : publishers.filter((publisher) => publisher.status === 'approved'); // Public endpoint shows only approved
    res.json({ data: filtered });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listUsers,
  changeUserStatus,
  listPublishers,
};

