const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', (req, res) => {
  const { teamId } = req.query;

  if (!teamId) return res.json({ data: [] });

  if (isNaN(teamId)) return res.status(400).json('Invalid  TeamId');

  res.json({ data: `query projects for teamId ${teamId}` });
});

router.post(
  '/',
  body('name').trim().notEmpty().toLowerCase().isLength({ min: 3 }),
  body('teamId').trim().notEmpty().isInt({ gt: 0 }),
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) throw error;

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
