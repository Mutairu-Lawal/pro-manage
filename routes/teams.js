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
 * @swagger
 * /teams:
 *   get:
 *     summary: Get user teams
 *     description: Retrieve all teams that the authenticated user belongs to
 *     tags:
 *       - Teams
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *   post:
 *     summary: Create a new team
 *     description: Create a new team with the provided name
 *     tags:
 *       - Teams
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Engineering Team
 *                 minLength: 3
 *     responses:
 *       201:
 *         description: Team created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Team Created
 *       400:
 *         description: Invalid input or validation error
 *       401:
 *         description: Unauthorized - Missing or invalid token
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
 * @swagger
 * /teams/{id}/invite:
 *   post:
 *     summary: Invite user to team
 *     description: Send an invitation to a user to join a team
 *     tags:
 *       - Teams
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Team ID
 *     responses:
 *       200:
 *         description: Invitation sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid team ID
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */
router.post('/:id/invite', inviteUser);

module.exports = router;
