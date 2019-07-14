const assets = require('./assets');
const resolve = require('./resolve');
const style = require('./style');

module.exports = {
  ...assets,
  resolve,
  ...style,
};
