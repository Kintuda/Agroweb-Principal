const router = require('express').Router()
const perfil = require('./perfil')
const about = require('./about')

router.get('/', (req, res, next) => {
  res.render('home', { nome: (req.user ? req.user.nome_completo : '') })
})

router.post('/', (req, res, next) => {
  let mensagem = req.body
  res.redirect('/')
})

router.get('/about', about.visualizar)
router.get('/perfil', perfil.visualizar)

module.exports = router
