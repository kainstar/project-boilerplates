const path = require('path');
const fs = require('fs');
const db = require('../model/db');

const modelDir = path.join(__dirname, '../model');
const modelFiles = fs.readdirSync(modelDir).filter(model => model !== 'db.js');
const syncOption = {
  force: false
};

async function syncMysqlTable() {
  for (const modelFile in modelFiles) {
    if (modelFiles.hasOwnProperty(modelFile)) {
      const model = require(path.join(modelDir, modelFile));
      await model.sync(syncOption);
    }
  }
  await db.close();
}

syncMysqlTable();
