const jwt = require('jsonwebtoken');

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN || 'pro-manage.js';

/**
 * Authentication middleware - Verify JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error();
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET_TOKEN);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = checkAuth;
