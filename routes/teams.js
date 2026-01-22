const express = require('express');
const { body } = require('express-validator');
const checkAuth = require('../middlewares/authHandler');
const {
  createTeams,
  getTeams,
  inviteUser,
} = require('../controllers/teams.controller');

const router = express.Router();

router.use(checkAuth);

/**
 * Get teams - GET /
 * Create team - POST /
 */
router
  .route('/')
  .get(getTeams)
  .post(
    body('name')
      .trim()
      .isLength({ min: 3 })
      .customSanitizer((value) => value.toLowerCase()),
    createTeams,
  );

/**
 * Invite user to team - POST /:id/invite
 */
router.post('/:id/invite', inviteUser);

module.exports = router;
