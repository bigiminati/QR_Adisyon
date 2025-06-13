const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');
const Cafe = require('./Cafe');

const Product = sequelize.define('products', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cafe_id: { type: DataTypes.INTEGER, allowNull: false },
  category_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.NUMERIC(10,2), allowNull: false },
  image_url: { type: DataTypes.TEXT }
}, { tableName: 'products' });

Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Cafe, { foreignKey: 'cafe_id' });
Cafe.hasMany(Product, { foreignKey: 'cafe_id' });

module.exports = Product;
