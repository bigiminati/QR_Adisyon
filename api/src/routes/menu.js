const router = require('express').Router();
const menuCtrl = require('../controllers/menuController');

router.get('/categories', menuCtrl.getCategories);
router.get('/products',   menuCtrl.getProductsByCategory);

module.exports = router;
