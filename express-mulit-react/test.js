const glob = require('glob');
const path = require('path');

function test(globPath) {
  const entryFiles = glob.sync(globPath);
  const entryMap = {};
  entryFiles.forEach(filePath => {
    const basename = path.basename(filePath);
    entryMap[basename] = filePath;
  });
  return entryMap;
}

console.log(test('./src/pages/*'));
