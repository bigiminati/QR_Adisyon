const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

exports.createOrder = async (req, res) => {
  const { cafeId } = req.params;
  const { table_id, items } = req.body;
  const order = await Order.create({ cafe_id: cafeId, table_id, total_price: 0 });
  let total = 0;
  for (let it of items) {
    await OrderItem.create({
      order_id: order.id,
      product_id: it.id || it.product_id,
      quantity: it.quantity,
      unit_price: it.price || it.unit_price
    });
    total += (it.price || it.unit_price) * it.quantity;
  }
  order.total_price = total;
  await order.save();
  return res.json({ id: order.id, status: order.status });
};

exports.getOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findByPk(orderId, { include: OrderItem });
  return res.json(order);
};

