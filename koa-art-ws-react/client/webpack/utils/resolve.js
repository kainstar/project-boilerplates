const path = require('path');

module.exports = function resolve(...ps) {
  return path.join(__dirname, '../../', ...ps);
};
