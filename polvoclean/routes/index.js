const express = require('express');
const router = express.Router();
const db = require('../util/db')
const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
  destination: function(req,res,cb){
    cb(null,"uploads/")
  },
    filename: function(req,file,cb){
      cb(null,file.originalname  + path.extname(file.originalname));
  }
})
const upload = multer({storage: storage})
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/listar',function(req,res){
  db.query('SELECT * FROM produtos',[],function(erro,resultado){
    if(erro){
      res.status(200).send(erro)
    }
    res.render('lista',{produto: resultado})
  
  })
  
})
router.get('/add', function(req, res) {
  res.render('form',{produto:{}});
});




router.post('/add',upload.single('imagem'),function(req, res)  {
  db.query('INSERT INTO produtos(nome,descricao,preco,marca,imagem,tag) VALUES(?,?,?,?,?,?)',
  [req.body.nome,req.body.descricao,req.body.preco,req.body.marca,`./polvoclean/uploads/${req.file.originalname + path.extname(req.file.originalname)}`,req.body.tag],
 
  function(erro){
    if(erro){
      res.status(200).send('Erro ao adicionar o produto')
    }
  

    res.redirect('listar')
    

  }); 
  }
  

  )



//editar

router.get('/edit/:id', function(req,res){
  db.query('SELECT * FROM produtos WHERE id = ?',[req.params.id],
  function(erro,resultado){
    if(erro){
      res.status(200).send('Erro:' + erro)
    }
    res.render('form',{produto:resultado[0]})
  })
})

//rota ediçao post

router.get('/edit/:id', function(req, res) {
  res.render('form',{produto:{}});
});
router.post('/edit/:id', upload.single('imagem'),function(req, res) {
  db.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ?, marca = ?, tag = ? WHERE id = ?',
  [req.body.nome,req.body.descricao,req.body.preco,req.body.marca,req.body.tag,req.params.id],

  function(erro){
    if(erro){
      res.status(200).send('Erro ao atualizar o produto' + erro)
    }
    res.redirect('/listar')
  }
  )
})


//delete
router.delete('/delete/:id', function(req, res) {
  db.query('DELETE FROM produtos WHERE id = ?',
  [req.params.id],
  function(erro){
    if(erro){
      res.status(200).send('Erro:' + erro)
    }
    else{
      res.status(200).send('OK')
    }
  }
  )
});

//api

router.get('/api',function(req,res){
  db.query('SELECT * FROM produtos',[],function(erro,resultado){
    if(erro){
      res.status(200).send(erro)
    }
    res.status(200).send(resultado)
  })
  
})

module.exports = router;
