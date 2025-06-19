// middleware/auth.js

// Check if user is logged in
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/auth/login');
}

// Check if user is admin
function ensureAdmin(req, res, next) {
  if (req.session.user && req.session.user.isAdmin) {
    return next();
  }
  res.status(403).send('Access Denied (Admins only)');
}

module.exports = {
  ensureAuthenticated,
  ensureAdmin
};
