const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');
const Product = require('./Product');

const OrderItem = sequelize.define('order_items', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  order_id: { type: DataTypes.INTEGER, allowNull: false },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  unit_price: { type: DataTypes.NUMERIC(10,2), allowNull: false }
}, { tableName: 'order_items' });

OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(OrderItem, { foreignKey: 'product_id' });

module.exports = OrderItem;
