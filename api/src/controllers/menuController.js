const Category = require('../models/Category');
const Product  = require('../models/Product');

// Kategorileri getir
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Belirli kategoriye ait ürünleri getir
exports.getProductsByCategory = async (req, res) => {
  const { category_id } = req.query;
  try {
    const products = await Product.findAll({ where: { category_id } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
