const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Adjust path if needed

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    console.log('Fetched products:', products); // Make sure this logs data
    res.render('pages/products', { products }); // or 'products' if not in pages/
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
