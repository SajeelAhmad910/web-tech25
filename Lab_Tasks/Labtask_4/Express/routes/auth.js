const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user');

// Show register page
router.get('/register', (req, res) => {
  res.render('auth/register');
});

// Show login page
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Handle register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log('REGISTER BODY:', req.body); // 👈 log request body

  if (!username || !password) {
    console.log('Missing fields');
    return res.send('Missing fields');
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    console.log('User already exists');
    return res.send('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });

  try {
    await newUser.save();
    console.log('User registered successfully');
    res.redirect('/auth/login');
  } catch (err) {
    console.error('Registration error:', err);
    res.send('Error saving user');
  }
});

// Handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('LOGIN BODY:', req.body);

  const user = await User.findOne({ username });
  if (!user) return res.send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send('Incorrect password');

  req.session.user = user;
  res.redirect('/');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
