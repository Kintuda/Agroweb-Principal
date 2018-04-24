const express = require('express')
const router = express.Router()


router.get('/', function(req, res, next) {
  res.render('home',{nome:(req.user ?req.user.nome_completo : '')})
});
router.post('/',function(req,res,next){
  var mensagem = req.body
  res.redirect('/')
})
router.get('/produto',produto.produto)
module.exports = router;
