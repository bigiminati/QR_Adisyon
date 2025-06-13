const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Cafe = require('./Cafe');

const Table = sequelize.define('tables', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cafe_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(50), allowNull: false },
  qr_code: { type: DataTypes.STRING(255), allowNull: false }
}, { tableName: 'tables' });

Table.belongsTo(Cafe, { foreignKey: 'cafe_id' });
Cafe.hasMany(Table, { foreignKey: 'cafe_id' });

module.exports = Table;
