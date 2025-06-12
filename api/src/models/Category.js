const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('categories', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(50), allowNull: false }
});

module.exports = Category;
