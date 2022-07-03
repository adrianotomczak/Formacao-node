const Sequelize = require('sequelize');
const connection = require('./database');

//definição do model "Pergunta" que criará a tabela "perguntas" no DB
const Pergunta = connection.define('perguntas', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

//Executa a criação da tabela no banco caso não exista
//o force: false é para não recriar a tabela caso exista
Pergunta.sync({ force: false }).then(() => {});

//exporta o module de perguntas para usar na rota /salvarpergunta
module.exports = Pergunta;
