require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const sequelize = require('./config/db');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const payRoutes   = require('./routes/payments');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', menuRoutes);
app.use('/api', orderRoutes);
app.use('/api', payRoutes);

sequelize.sync().then(() => {
  app.listen(4000, () => console.log('API running on port 4000'));
});
