const {
  getAllOrders,
  getOrdersBySchool,
  getOrdersByPublisher,
  createOrder,
  updateOrderStatus,
} = require('../services/orderService');

const listOrders = async (req, res, next) => {
  try {
    let orders;
    if (req.user.role === 'school') {
      orders = await getOrdersBySchool(req.user.id);
    } else if (req.user.role === 'publisher') {
      orders = await getOrdersByPublisher(req.user.id);
    } else {
      orders = await getAllOrders();
    }
    res.json({ data: orders });
  } catch (error) {
    next(error);
  }
};

const createNewOrder = async (req, res, next) => {
  try {
    const { items, total, paymentStatus } = req.body;

    if (!Array.isArray(items) || !items.length) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    const order = await createOrder({
      schoolId: req.user.id,
      schoolName: req.user.email,
      total,
      items,
      paymentStatus,
    });

    res.status(201).json({ data: order });
  } catch (error) {
    next(error);
  }
};

const changeOrderStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await updateOrderStatus(req.params.id, status, paymentStatus);
    res.json({ data: order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listOrders,
  createNewOrder,
  changeOrderStatus,
};

