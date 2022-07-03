const Sequelize = require('sequelize');

//guiaperguntas é o nome do schema no MySQL
const connection = new Sequelize('guiaperguntas', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connection;
