const express = require('express');
const router = express.Router();
const db = require('../db/connect');

/* GET users listing. */
const produto  = async (req, res, next) => {
  let result = await db.query('SELECT * FROM usuarios')
  res.render('produto',{nome:(req.user ?req.user.nome_completo : ''),
  pessoas: result.rowCount > 0 ? result.rows : null})
});
router.get('/grao', async (req, res, next) => {
  let result = await db.query('SELECT * FROM produto')
  let graos = result.rows.filter(function(v){
    return v.categoriaid === 1
  })
  res.render('../views/produto_grao', {
    nome: req.user.nome_completo,
    id:req.user.id,
    produto:graos,
    nome:(req.user ?req.user.nome_completo : '')
  })

})
router.get('/adubo', async (req, res, next) => {
  let result = await db.query('SELECT * FROM produto');
  let adubo = result.rows.filter(function(v){
    return v.categoriaid === 2
  });
  res.render('produto_adubo',{tipo:'Adubo',nome:(req.user ?req.user.nome_completo : ''),
  nome: req.user.nome_completo,
  id:req.user.id,
  produto: adubo,
  nome:(req.user ?req.user.nome_completo : '')
});
});
router.get('/maquinas', async (req, res, next)=> {
  let result = await db.query('SELECT * FROM produto');
  let maquina = result.rows.filter(function(v){
    return v.categoriaid === 3
  })
  res.render('produto_maquinas',{title:'Máquinas',nome:(req.user ?req.user.nome_completo : ''),
  id:req.user.id,
  nome: req.user.nome_completo,
  produto: maquina,
  nome:(req.user ?req.user.nome_completo : '')
  });
});
router.get('/cadastro', async (req, res, next) => {
  let produto = {}

  if (req.params.id && req.params.id > 0) {
    var result = await db.query('SELECT * FROM produto WHERE id = $1', [req.params.id])

    if (result.rowCount > 0) {
      produto = result.rows[0]
    }
  }
  res.render('../views/produtocadastro', {
    nome: req.user.nome_completo,
  })
})
router.post('/cadastro', async (req, res, next) => {
  let produto = req.body
  let params = []
  let sql = ''
  sql = `
  INSERT INTO produto (produtonome, produtopreco, produtoqt,categoriaid,empresa,local,url,cadastro,unidade) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9)
  `
  params = [produto.nome, produto.preco, produto.qt, produto.categoria,produto.empresa,produto.local,produto.url,req.user.id,produto.unidade]

  let result = await db.query(sql, params)

  if (result.rowCount > 0) {
    return res.redirect('/produto/')
  }

  return res.render('../views/produtocadastro', {
    title: 'Cadastro de Pessoa',
    nome: 'Ocorreu algum erro',
    produto:produto
  })
})
router.post('/delete', async (req, res, next)=> {
  let id = req.body.id
  let sql = `
  DELETE FROM usuarios WHERE id = $1
  `
  var result = await db.query(sql, [id])

  if (result.rowCount === 0) {
    return res.json({excluiu: false, err: 'Ocorreu um erro desconhecido!'})
  }

  return res.json({excluiu: true})
})

module.exports = {
  router,
  produto

}
