const Order     = require('../models/Order');
const OrderItem = require('../models/OrderItem');

// Yeni sipariş oluştur
exports.createOrder = async (req, res) => {
  const { table_id, items } = req.body;
  try {
    // 1. Order kaydı
    const order = await Order.create({ table_id, total_price: 0 });

    // 2. Kalemleri kaydet + toplam fiyatı hesapla
    let total = 0;
    for (const it of items) {
      const { product_id, quantity, unit_price } = it;
      total += quantity * unit_price;
      await OrderItem.create({
        order_id: order.id,
        product_id,
        quantity,
        unit_price
      });
    }

    // 3. Order'ı güncelle
    order.total_price = total;
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Sipariş durumu sorgula
exports.getOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Sipariş bulunamadı' });
    res.json({ status: order.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
