const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Cafe = require('./Cafe');

const Category = sequelize.define('categories', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cafe_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false }
}, { tableName: 'categories' });

Category.belongsTo(Cafe, { foreignKey: 'cafe_id' });
Cafe.hasMany(Category, { foreignKey: 'cafe_id' });

module.exports = Category;
