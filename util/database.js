const Sequelize = require('sequelize');

const sequelize = new Sequelize('player', 'root' , 'Kautilya@1', {dialect: 'mysql' , host: 'localhost'});

module.exports = sequelize;