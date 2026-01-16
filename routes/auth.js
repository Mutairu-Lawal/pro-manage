const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// route for registering user
//@desc password input must be min=8 , and must contain upperCase,lowercase,numeric and special characters
router.post(
  '/register',
  body('email').trim().notEmpty().toLowerCase(),
  body('name').trim().notEmpty().isLength({ min: 3 }).toLowerCase().escape(),
  body('password').trim().notEmpty().isStrongPassword(),
  body('role').default('member').toLowerCase().isIn(['member, admin, manager']),
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) throw error;
      res.status(201).json({ ...req.body, id: 'love' });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// login route
router.post('/login', (req, res) => {
  res.json({ message: 'Welcome to login end point' });
});

// user profile routh
router.get('/profile', (req, res) => {
  res.json({ message: 'Welcome to user profile end point' });
});

module.exports = router;
