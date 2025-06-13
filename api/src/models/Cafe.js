const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cafe = sequelize.define('cafes', {
  id:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  domain: { type: DataTypes.STRING(255), allowNull: true }
}, { tableName: 'cafes' });

module.exports = Cafe;
