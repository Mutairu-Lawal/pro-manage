const { validationResult } = require('express-validator');

const getTasks = async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) throw error;

    const { projectId, status } = req.query;

    res.json({
      data: `query tasks for projectId  ${projectId} with ${status} status`,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const createTask = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const {
    title,
    description,
    status,
    projectId,
    assignedTo,
    priority,
    attachments,
  } = req.body;

  // Placeholder for creating a new task
  res.status(201).json({
    data: {
      id: 1,
      title,
      description,
      status,
      projectId,
      assignedTo,
      priority,
      attachments,
      createdBy: 'UserId',
      createdAt: new Date(),
    },
  });
};

const updateTask = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { id } = req.params;

  if (isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({ errors: [{ msg: 'Invalid task ID' }] });
  }

  const {
    title,
    description,
    status,
    projectId,
    assignedTo,
    priority,
    attachments,
  } = req.body;

  // Placeholder for updating a task
  res.status(202).json({
    data: {
      id,
      title,
      description,
      status,
      projectId,
      assignedTo,
      priority,
      attachments,
      createdBy: 'UserId',
      createdAt: new Date(),
    },
  });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({ errors: [{ msg: 'Invalid task ID' }] });
  }

  // Placeholder for deleting a task
  res.status(204).json({ data: `Task with id ${id} deleted successfully` });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
