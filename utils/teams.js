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

  getUserByID: async function (id) {
    try {
      const res = await this.loadDB();
      if (!res) throw Error('Unable to get data');
      return res.usersDB.find((u) => u.id === Number(id));
    } catch (error) {
      return error.message;
    }
  },
};

module.exports = teamsDB;
