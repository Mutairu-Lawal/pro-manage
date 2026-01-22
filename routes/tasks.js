const express = require('express');
const { query, body } = require('express-validator');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

const router = express.Router();

router
  .route('/')
  .get(
    query('projectId').trim().notEmpty().isInt({ gt: 0 }),
    query('status')
      .trim()
      .notEmpty()
      .toLowerCase()
      .isIn(['pending', 'completed', 'in-progress']),
    getTasks,
  )
  .post(
    body('title').trim().notEmpty().toLowerCase().isLength({ min: 3 }),
    body('description').trim().notEmpty().toLowerCase().isLength({ min: 3 }),
    body('status')
      .trim()
      .default('pending')
      .isIn(['pending', 'completed', 'in-progress']),
    body('projectId').trim().notEmpty().isInt({ gt: 0 }),
    body('assignedTo').trim().notEmpty().isInt({ gt: 0 }),
    body('priority').trim().default('medium').isIn(['low', 'medium', 'high']),
    body('attachments').isArray().optional(),
    createTask,
  );

router
  .route('/:id')
  .put(
    body('title').trim().notEmpty().toLowerCase().isLength({ min: 3 }),
    body('description').trim().notEmpty().toLowerCase().isLength({ min: 3 }),
    body('status')
      .trim()
      .default('pending')
      .isIn(['pending', 'completed', 'in-progress']),
    body('projectId').trim().notEmpty().isInt({ gt: 0 }),
    body('assignedTo').trim().notEmpty().isInt({ gt: 0 }),
    body('priority').trim().default('medium').isIn(['low', 'medium', 'high']),
    body('attachments').isArray().optional(),
    updateTask,
  )
  .delete(deleteTask);

module.exports = router;
