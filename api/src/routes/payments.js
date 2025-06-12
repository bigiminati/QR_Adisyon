// api/src/routes/payments.js

// **Express**'in Router'ını aldığımızdan emin olalım:
const router    = require('express').Router();
const payCtrl   = require('../controllers/paymentController');

// POST /api/pay ile mock ödeme
router.post('/pay', payCtrl.payOrder);

module.exports = router;
