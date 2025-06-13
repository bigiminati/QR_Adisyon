const router = require('express').Router();
const ctrl = require('../controllers/orderController');

router.post('/:cafeId/orders', ctrl.createOrder);
router.get('/:cafeId/orders/:orderId', ctrl.getOrder);

module.exports = router;
