const router = require('express').Router();
const ctrl = require('../controllers/menuController');

router.get('/:cafeId/categories', ctrl.getCategories);
router.get('/:cafeId/products', ctrl.getProductsByCategory);

module.exports = router;
