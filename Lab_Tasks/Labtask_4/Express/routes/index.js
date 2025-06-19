const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Home Page
router.get('/', (req, res) => {
  res.render('pages/home');
});

// About Page
router.get('/about', (req, res) => {
  res.render('pages/about');
});

// Products Page
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('pages/products', { products });
  } catch (err) {
    res.send('Error fetching products');
  }
});

module.exports = router;