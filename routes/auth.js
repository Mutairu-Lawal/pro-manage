const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DB = require('../utils/db');

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN || 'pro-manage.js';

const router = express.Router();

// route for registering user
//@desc password input must be min=8 , and must contain upperCase,lowercase,numeric and special characters
router.post(
  '/register',
  body('email').trim().notEmpty().toLowerCase().normalizeEmail().isEmail(),
  body('name').trim().notEmpty().isLength({ min: 3 }).toLowerCase().escape(),
  body('password').trim().notEmpty().isStrongPassword(),
  body('role').default('member').trim().toLowerCase(),
  async (req, res) => {
    try {
      const error = validationResult(req);
      const ROLES = ['member', 'admin', 'manager'];
      const { password, email, role, name } = req.body;

      // checking if validator has error
      if (!error.isEmpty()) throw error;

      // check if the role exist
      if (!ROLES.includes(role)) throw new Error('Invalid Role');

      // check if user already exists
      const userExists = await DB.getUser(email);
      if (userExists instanceof Object) throw new Error('User already exists');

      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // laod db
      const db = await DB.loadDB();

      // constructing the ID
      let lastIndexID = db.usersDB.at(-1)?.id;

      const newUser = {
        id: lastIndexID ? (lastIndexID += 1) : 1,
        name,
        email,
        role: role ? role.trim() : 'member',
        password: hashedPassword,
      };

      // store into the db
      const updatedDB = { ...db, usersDB: [...db.usersDB, newUser] };

      await DB.saveToDB(updatedDB);

      res.status(201).json({ message: 'User created' });
    } catch (error) {
      const errorMessage = error.message || error;
      res.status(400).json(errorMessage);
    }
  }
);

// login route
router.post(
  '/login',
  body('email').trim().notEmpty().toLowerCase().isEmail(),
  body('password').trim().notEmpty(),
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) throw new Error('Invalid Inputs');

      const { email, password } = req.body;

      const user = await DB.getUser(email);
      if (!user) throw new Error('Invalid Credentials');

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) throw new Error('Invalid Credentials');

      // create token
      const token = jwt.sign(
        {
          _id: user.id,
        },
        JWT_SECRET_TOKEN,
        {
          expiresIn: '1m',
        }
      );

      // return token
      res.json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// user profile routh
router.get('/profile', (req, res) => {
  res.json({ message: 'Welcome to user profile end point' });
});

module.exports = router;
