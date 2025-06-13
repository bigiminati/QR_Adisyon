const Order = require('../models/Order');

exports.payOrder = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findByPk(orderId);
  order.status = 'paid';
  await order.save();
  return res.json({ success: true });
};
