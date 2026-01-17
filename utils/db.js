const fs = require('fs/promises');

const FILEPATH = 'db.json';

const DB = {
  loadDB: async () => {
    try {
      const db = await fs.readFile(FILEPATH, 'utf-8');
      return JSON.parse(db);
    } catch (error) {
      return null;
    }
  },
  saveToDB: async (updatedDB) => {
    try {
      await fs.writeFile(FILEPATH, JSON.stringify(updatedDB));
      return true;
    } catch (error) {
      return null;
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
  getUserByEmail: async function (email) {
    try {
      const res = await this.loadDB();
      if (!res) throw Error('Unable to get data');
      return res.usersDB.find((u) => u.email.toLowerCase() === email);
    } catch (error) {
      return error.message;
    }
  },
};

module.exports = DB;
