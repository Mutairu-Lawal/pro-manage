const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get projects for a team
 *     description: Retrieve all projects for a specific team
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: query
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Team ID
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid team ID
 *   post:
 *     summary: Create a new project
 *     description: Create a new project within a team
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - teamId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Website Redesign
 *                 minLength: 3
 *               teamId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid input or validation error
 */
router.get('/', (req, res) => {
  const { teamId } = req.query;

  if (!teamId) {
    return res.json({ data: [] });
  }

  if (isNaN(teamId)) {
    return res.status(400).json('Invalid TeamId');
  }

  res.json({ data: `query projects for teamId ${teamId}` });
});

router.post(
  '/',
  body('name').trim().notEmpty().toLowerCase().isLength({ min: 3 }),
  body('teamId').trim().notEmpty().isInt({ gt: 0 }),
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        throw error;
      }

      const { name, teamId } = req.body;

      const data = {
        id: 1,
        name,
        teamId,
        createdBy: 'UserId',
        createdAt: new Date(),
      };

      res.json({ data });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
);

module.exports = router;
