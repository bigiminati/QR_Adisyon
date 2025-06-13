const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Table = require('./Table');
const Cafe = require('./Cafe');

const Order = sequelize.define('orders', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cafe_id: { type: DataTypes.INTEGER, allowNull: false },
  table_id: { type: DataTypes.INTEGER, allowNull: false },
  total_price: { type: DataTypes.NUMERIC(10,2), defaultValue: 0 },
  status: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'pending' },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'orders', createdAt: 'created_at', updatedAt: false });

Order.belongsTo(Table, { foreignKey: 'table_id' });
Table.hasMany(Order, { foreignKey: 'table_id' });
Order.belongsTo(Cafe, { foreignKey: 'cafe_id' });
Cafe.hasMany(Order, { foreignKey: 'cafe_id' });

module.exports = Order;
