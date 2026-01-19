const app = require('./app');
const fs = require('fs/promises');
require('dotenv').config();

const PORT = process.env.PORT || 3030;

// check if the dummy data exist and if not create
(async () => {
  try {
    await fs.access('db.json');
  } catch (error) {
    await fs.writeFile('db.json', JSON.stringify({ usersDB: [], teamsDB: [] }));
  }
})();

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
