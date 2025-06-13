const Category = require('../models/Category');
const Product = require('../models/Product');

exports.getCategories = async (req, res) => {
  const { cafeId } = req.params;
  const cats = await Category.findAll({ where: { cafe_id: cafeId } });
  return res.json(cats);
};

exports.getProductsByCategory = async (req, res) => {
  const { cafeId } = req.params;
  const { category_id } = req.query;
  const prods = await Product.findAll({
    where: { cafe_id: cafeId, category_id }
  });
  return res.json(prods);
};
