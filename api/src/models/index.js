// api/src/models/index.js
const sequelize  = require('../config/db');
const Table      = require('./Table');
const Category   = require('./Category');
const Product    = require('./Product');
const Order      = require('./Order');
const OrderItem  = require('./OrderItem');
const Payment    = require('./Payment');

// İlişkileri burada kesinlikle kurun
Table.hasMany(Order,    { foreignKey: 'table_id' });
Order.belongsTo(Table,  { foreignKey: 'table_id' });
// ...
// diğer ilişkilendirmeler

module.exports = { sequelize, Table, Category, Product, Order, OrderItem, Payment };
