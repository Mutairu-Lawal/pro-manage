const { validationResult } = require('express-validator');
const teamsDB = require('../utils/teams');

const createTeams = async (req, res) => {
  try {
    const error = validationResult(req);

    //   checking if validator has error
    if (!error.isEmpty()) throw error;

    const { name } = req.body;
    const { _id: userID } = req.user;

    const teams = await teamsDB.getTeamsDB();

    // constructing the ID
    let lastIndexID = teams.at(-1)?.id;

    //   const creating teams
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

    // save to data
    const updatedTeamsDB = [...teams, newTeam];

    await teamsDB.saveToDB(updatedTeamsDB);

    res.status(201).json({ message: 'Team Created' });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getTeams = async (req, res) => {
  try {
    const { _id: userID } = req.user;
    const userTeams = await teamsDB.getUserTeams(userID);
    res.json(userTeams);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTeams, getTeams };
