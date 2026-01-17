const express = require('express');
const { body } = require('express-validator');
const DB = require('../utils/db');
const checkAuth = require('../middlewares/authHandler');
const { createUser, loginUser } = require('../controllers/auth.controller');

const router = express.Router();

// route for registering user
//@desc password input must be min=8 , and must contain upperCase,lowercase,numeric and special characters
router.post(
  '/register',
  body('email').trim().notEmpty().toLowerCase().normalizeEmail().isEmail(),
  body('name').trim().notEmpty().isLength({ min: 3 }).toLowerCase().escape(),
  body('password').trim().notEmpty().isStrongPassword(),
  body('role').default('member').trim().toLowerCase(),
  createUser
);

// login route
router.post(
  '/login',
  body('email').trim().notEmpty().toLowerCase().isEmail(),
  body('password').trim().notEmpty(),
  loginUser
);

// user profile routh
router.get('/profile', checkAuth, async (req, res) => {
  const currentUser = await DB.getUserByID(req.user._id);
  const { name, role, email, createdAt } = currentUser;
  res.json({ name, email, role, createdAt });
});

module.exports = router;
