const fs = require('fs/promises');

const FILEPATH = 'db.json';

const teamsDB = {
  loadDB: async () => {
    try {
      const db = await fs.readFile('db.json', 'utf-8');
      return JSON.parse(db);
    } catch (error) {
      console.log(error);
    }
  },

  getTeamsDB: async function (params) {
    try {
      const jsondb = await this.loadDB();
      return jsondb.teamsDB;
    } catch (error) {}
  },

  saveToDB: async function (updatedTeamsDB) {
    try {
      const db = await this.loadDB();
      const updatedDB = { ...db, teamsDB: updatedTeamsDB };
      await fs.writeFile(FILEPATH, JSON.stringify(updatedDB));
      return null;
    } catch (error) {
      return error;
    }
  },

  getUserTeams: async function (id) {
    const res = await this.getTeamsDB();
    return res.filter((team) => team.owner === Number(id));
  },
};

module.exports = teamsDB;
