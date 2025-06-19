const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loakpage', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/loakpage' })
}));

// EJS setup
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('layout', 'layout');
app.set('views', path.join(__dirname, 'views'));

// Make session user available in all EJS files
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

const vehicleRoutes = require('./routes/vehicle');
app.use('/vehicle', vehicleRoutes);



// Start server
app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
