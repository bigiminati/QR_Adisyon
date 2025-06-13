const router = require('express').Router();
const ctrl = require('../controllers/paymentController');

router.post('/:cafeId/pay', ctrl.payOrder);

module.exports = router;
