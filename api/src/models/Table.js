// api/src/models/Table.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Burada 'tables' model adını veriyoruz ve tableName olarak da 'tables' kullanıyoruz
const Table = sequelize.define('tables', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  qr_code: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  timestamps: false,
  underscored: true,
  tableName: 'tables'
});

// Burada mutlaka modeli (Table nesnesini) dışa aktar
module.exports = Table;
