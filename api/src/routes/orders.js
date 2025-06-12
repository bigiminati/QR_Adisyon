const router    = require('express').Router();
const orderCtrl = require('../controllers/orderController');

router.post('/orders',       orderCtrl.createOrder);
router.get('/orders/:id',    orderCtrl.getOrderStatus);

module.exports = router;
