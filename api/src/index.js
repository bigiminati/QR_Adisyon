// api/src/index.js

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { sequelize } = require('./models');

const menuRoutes  = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const payRoutes   = require('./routes/payments'); // artık stripe yerine mock pay

const app = express();
app.use(cors());
app.use(express.json());

// API rotaları
app.use('/api', menuRoutes);
app.use('/api', orderRoutes);
app.use('/api', payRoutes);

// Veritabanı senkronizasyonu ve sunucu başlatma
sequelize.sync().then(() => {
  console.log('✅ Veritabanı senkronize edildi');
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
  });
}).catch(err => {
  console.error('❌ Senkronizasyon hatası:', err);
});
