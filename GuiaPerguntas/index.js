const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
//com esse import, executa o model Pergunta e cria a tabela no DB
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

//Database
connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com o banco de dados!!');
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

//diz ao Express usar o EJS como view engine de HTML (html deve estar na past views obrigatoriamente)
app.set('view engine', 'ejs');
//diz ao Express que serão servidos arquivos estáticos na pasta public (css, imagens etc..)
app.use(express.static('public'));

//decodifica os dados de formulários para uma estrutura JS
app.use(bodyParser.urlencoded({ extended: false }));
//permite que seja lido dados enviados via Json (opcional)
app.use(bodyParser.json());

//rotas
app.get('/', (req, res) => {
  //o raw:true faz com que seja listado somente as colunas da tabela
  Pergunta.findAll({ raw: true, order: [['id', 'DESC']] }).then((perguntas) => {
    res.render('index', {
      perguntas: perguntas,
    });
  });
});

app.get('/perguntar', (req, res) => {
  res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect('/');
  });
});

app.get('/pergunta/:id', (req, res) => {
  const id = req.params.id;
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      //pergunta encontrada

      //busca as respostas
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [['id', 'DESC']],
      }).then((respostas) => {
        res.render('pergunta', {
          pergunta: pergunta,
          respostas: respostas,
        });
      });
    } else {
      //pergunta não encontrada, redireciona para a home
      res.redirect('/');
    }
  });
});

app.post('/responder', (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId,
  }).then(() => {
    res.redirect('/pergunta/' + perguntaId);
  });
});

//inicia o sevidor
app.listen(8080, () => {
  console.log('App rodando!');
});
