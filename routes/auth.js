const express = require('express');
const { body } = require('express-validator');
const DB = require('../utils/db');
const checkAuth = require('../middlewares/authHandler');
const { createUser, loginUser } = require('../controllers/auth.controller');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with email, name, password, and optional role
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               name:
 *                 type: string
 *                 example: John Doe
 *                 minLength: 3
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Min 8 chars, must contain uppercase, lowercase, numeric and special characters
 *                 example: Password@123
 *               role:
 *                 type: string
 *                 enum: [member, manager, admin]
 *                 default: member
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created
 *       400:
 *         description: Invalid input or validation error
 */
router.post(
  '/register',
  body('email').trim().notEmpty().toLowerCase().normalizeEmail().isEmail(),
  body('name').trim().notEmpty().isLength({ min: 3 }).toLowerCase().escape(),
  body('password').trim().notEmpty().isStrongPassword(),
  body('role').default('member').trim().toLowerCase(),
  createUser,
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user with email and password, returns JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Invalid credentials
 */
router.post(
  '/login',
  body('email').trim().notEmpty().toLowerCase().isEmail(),
  body('password').trim().notEmpty(),
  loginUser,
);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve authenticated user's profile information
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */
router.get('/profile', checkAuth, async (req, res) => {
  const currentUser = await DB.getUserByID(req.user._id);
  const { name, role, email, createdAt } = currentUser;
  res.json({ name, email, role, createdAt });
});

module.exports = router;
