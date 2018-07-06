var express = require('express').Router()

const visualizar = ((req, res, next) => {
  res.render('about', { nome: (req.user ? req.user.nome_completo : '') })
})


module.exports = {
  visualizar
}
