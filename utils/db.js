const fs = require('fs/promises');

const DB = {
  loadDB: async () => {
    try {
      const db = await fs.readFile('dist/users.json', 'utf-8');
      return JSON.parse(db);
    } catch (error) {
      return null;
    }
  },
  saveToDB: async (updatedDB) => {
    try {
      await fs.writeFile('dist/users.json', JSON.stringify(updatedDB));
      return true;
    } catch (error) {
      return null;
    }
  },

  getUser: async function (email) {
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
