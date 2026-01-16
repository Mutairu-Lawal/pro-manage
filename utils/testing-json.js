const path = require('path');
const fs = require('fs/promises');

const datapath = path.join('.', '/utils', 'kk.js');

const createUserJson = async () => {
  try {
    const rawData = await fs.readFile(datapath, 'utf-8');
    const jsondata = JSON.parse(rawData);
    console.log(jsondata);

    // await fs.writeFile('./kk.json', JSON.stringify({}));
    console.log('lol');
  } catch (error) {
    console.log(error);
  }
};

createUserJson();
