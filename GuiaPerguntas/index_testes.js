const express = require('express');
const app = express();

//diz ao Express usar o EJS como view engine de HTML (html deve estar na past views obrigatoriamente)
app.set('view engine', 'ejs');
//diz ao Express que serão servidos arquivos estáticos na pasta public (css, imagens etc..)
app.use(express.static('public'));

app.get('/:nome/:lang', (req, res) => {
  var nome = req.params.nome;
  var lang = req.params.lang;
  var exibirMsg = false;

  var produtos = [
    { nome: 'Doritos', preco: 3.14 },
    { nome: 'Coca-cola', preco: 5 },
    { nome: 'Leite', preco: 1.45 },
    { nome: 'Carne', preco: 58 },
    { nome: 'Nescau', preco: 6 },
  ];

  res.render('index', {
    nome: nome,
    lang: lang,
    empresa: 'Guia do programador',
    inscritos: 8000,
    msg: exibirMsg,
    produtos: produtos,
  });
});

//inicia o sevidor
app.listen(3000, () => {
  console.log('App rodando!');
});
