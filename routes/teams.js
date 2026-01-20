const express = require('express');
const checkAuth = require('../middlewares/authHandler');
const { body } = require('express-validator');
const {
  createTeams,
  getTeams,
  inviteUser,
} = require('../controllers/teams.controller');

const router = express.Router();

router.use(checkAuth);

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

router.post('/:id/invite', inviteUser);

module.exports = router;
