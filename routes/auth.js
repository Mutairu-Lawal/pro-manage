const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const router = express.Router();
// route for registering user
//@desc password input must be min=8 , and must contain upperCase,lowercase,numeric and special characters
router.post(
  '/register',
  body('email').trim().notEmpty().toLowerCase(),
  body('name').trim().notEmpty().isLength({ min: 3 }).toLowerCase().escape(),
  body('password').trim().notEmpty().isStrongPassword(),
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) throw error;
      const { password, email, role, name } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: 1,
        name,
        email,
        role: role ? role.trim() : 'member',
        password: hashedPassword,
      };
      res.status(201).json(newUser);
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
