const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');

// Show all vehicles (read-only for users)
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.render('pages/vehicle', { vehicles });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
