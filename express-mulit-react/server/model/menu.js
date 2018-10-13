const sequelize = require('sequelize');
const db = require('./db');

const Menu = db.define('Menu', {
  id: {
    primaryKey: true,
    type: sequelize.INTEGER,
    autoIncrement: true
  },
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  url: {
    type: sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  parent: {
    type: sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = Menu;
