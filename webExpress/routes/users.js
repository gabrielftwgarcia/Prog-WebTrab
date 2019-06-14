var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

// Referenciando o model de usuário
let User = require('../model/user');

// Registrando formulário
router.get('/registerUser', function (req, res) {
  // Renderizando para a view register  
  res.render('registerUser');
});

// Processo de cadastro
router.post('/registerUser', function (req, res) {
  const email = req.body.email;
  const login = req.body.login;
  const senha = req.body.senha;

  // A verificação dos erros é feita em registerUser.hbs (o ideal era verificar aqui)
  // Se tudo estiver ok, crio um novo usuário
  let novoUsuario = new User({
    email: email,
    login: login,
    senha: senha
  });

  // TODO: verificar se o email já existe no banco
  User.find({ email: email.email }, function (error, docs) {
    if (docs.length) {
      alert("Email já cadastrado!!");
    } else {
      novoUsuario.save(function (err) {
        if (err) {
          console.log(err);
          return;
        } else {
          // alert("É pra redirecionar pra algum lugar")
          res.redirect('/')
        }
      });
    }
  })


});

module.exports = router;