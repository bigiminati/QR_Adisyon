const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');

const Payment = sequelize.define('payments', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  order_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.NUMERIC(10,2), allowNull: false },
  method: { type: DataTypes.STRING(50), allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'payments', createdAt: 'created_at', updatedAt: false });

Payment.belongsTo(Order, { foreignKey: 'order_id' });
Order.hasMany(Payment, { foreignKey: 'order_id' });

module.exports = Payment;
