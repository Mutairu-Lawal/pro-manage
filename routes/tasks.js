const express = require('express');
const { query, body } = require('express-validator');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks for a project
 *     description: Retrieve all tasks for a specific project with optional status filter
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: query
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pending, completed, in-progress]
 *         description: Task status filter
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input
 *   post:
 *     summary: Create a new task
 *     description: Create a new task in a project
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - projectId
 *               - assignedTo
 *             properties:
 *               title:
 *                 type: string
 *                 example: Implement login feature
 *                 minLength: 3
 *               description:
 *                 type: string
 *                 example: Create user authentication flow
 *                 minLength: 3
 *               status:
 *                 type: string
 *                 enum: [pending, completed, in-progress]
 *                 default: pending
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 default: medium
 *               projectId:
 *                 type: integer
 *                 example: 1
 *               assignedTo:
 *                 type: integer
 *                 example: 1
 *               attachments:
 *                 type: array
 *                 description: Task attachments
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input or validation error
 */
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

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update an existing task with new information
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, completed, in-progress]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               projectId:
 *                 type: integer
 *               assignedTo:
 *                 type: integer
 *               attachments:
 *                 type: array
 *     responses:
 *       202:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input or task ID
 *   delete:
 *     summary: Delete a task
 *     description: Delete a task by ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       400:
 *         description: Invalid task ID
 */
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
