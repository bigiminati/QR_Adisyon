const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');

const Product = sequelize.define('products', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category_id: { type: DataTypes.INTEGER, allowNull: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  description: DataTypes.TEXT,
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  image_url: DataTypes.TEXT
});

// İlişki
Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product;
