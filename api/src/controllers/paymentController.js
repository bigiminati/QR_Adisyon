// api/src/controllers/paymentController.js

// Ödeme alınmıyor; siparişi doğrudan "paid" olarak işaretle
const Order = require('../models/Order');

exports.payOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ error: 'Sipariş bulunamadı' });
    order.status = 'paid';
    await order.save();
    res.json({ success: true, status: order.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
