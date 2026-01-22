const { validationResult } = require('express-validator');
const teamsDB = require('../utils/teams');

/**
 * Create a new team
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createTeams = async (req, res) => {
  try {
    const error = validationResult(req);

    // Check if validator has error
    if (!error.isEmpty()) {
      throw error;
    }

    const { name } = req.body;
    const { _id: userID } = req.user;

    const teams = await teamsDB.getTeamsDB();

    // Construct the ID
    const lastIndexID = teams.at(-1)?.id;

    // Create new team
    const newTeam = {
      id: lastIndexID ? (lastIndexID += 1) : 1,
      name,
      owner: userID,
      member: [
        {
          [userID]: 'admin',
        },
      ],
      createdAt: new Date(),
    };

    // Save to database
    const updatedTeamsDB = [...teams, newTeam];

    await teamsDB.saveToDB(updatedTeamsDB);

    res.status(201).json({ message: 'Team Created' });
  } catch (error) {
    res.status(400).json(error);
  }
};

/**
 * Get user teams
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTeams = async (req, res) => {
  try {
    const { _id: userID } = req.user;
    const userTeams = await teamsDB.getUserTeams(userID);
    res.json(userTeams);
  } catch (error) {
    res.status(400).json(error);
  }
};

/**
 * Invite user to team
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const inviteUser = async (req, res) => {
  const { id } = req.params;

  // Check the invite id
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: 'Invalid team ID' });
  }

  // Invitation logic goes here
  res.status(200).json({ message: `Invitation sent for user ID: ${id}` });
};

module.exports = { createTeams, getTeams, inviteUser };
