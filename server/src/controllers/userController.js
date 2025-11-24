const { getAllUsers, updateUserStatus } = require('../services/userService');

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

module.exports = {
  listUsers,
  changeUserStatus,
};

