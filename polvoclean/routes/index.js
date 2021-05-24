const express = require('express');
const router = express.Router();
const db = require('../util/db')
const db2 = require('../util/db2')
const multer = require("multer")
const path = require("path")
//TAGS

router.get('/alltags', function(req,res){
  db2.query('SELECT * FROM tags',[], function(erro,tags){
    if(erro){
      res.status(200).send(erro)
    }
    res.render('lista2',{tag: tags})
  })
})

//add tag



router.get('/addtag', function(req, res) {
  res.render('form2',{tag:{}});
});




router.post('/addtag',function(req, res)  {
  db2.query('INSERT INTO tags(tag) VALUES(?)',
  [req.body.tag],
 
  function(erro){
    if(erro){
      res.status(200).send('Erro ao adicionar o produto')
    }
  

    res.redirect('alltags')
    

  }); 
  }
  

  )

  //editar tag
  router.get('/tagedit/:id', function(req,res){
    db2.query('SELECT * FROM tags WHERE id = ?',[req.params.id],
    function(erro,tags){
      if(erro){
        res.status(200).send('Erro:' + erro)
      }
      res.render('form2',{tag:tags[0]})
    })
  })



  router.get('/tagedit/:id', function(req, res) {
    res.render('form2',{tag:{}});
  });
  
  router.post('/tagedit/:id',function(req, res) {
    db2.query('UPDATE tags SET tag = ? WHERE id = ?',
    [req.body.tag,req.params.id],
  
    function(erro){
      if(erro){
        res.status(200).send('Erro ao atualizar a tag' + erro)
      }
      res.redirect('/alltags')
    }
    )
  })


  //deletar tag

  router.delete('/deletetag/:id', function(req, res) {
    db2.query('DELETE FROM tags WHERE id = ?',
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
  })
  //api
  router.get('/apitags',function(req,res){
    db2.query('SELECT * FROM tags',[],function(erro,resultado){
      if(erro){
        res.status(200).send(erro)
      }
      res.status(200).send(resultado)
    })
    
  })


// produtos
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
  db2.query('SELECT * FROM tags',[],function(erro,tags){
    if(erro){
      res.status(200).send(erro)
    }
    res.render('form',{tag: tags,produto:{}})

  
  })

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

   db2.query('SELECT * FROM tags',[],function(erro,tags){
      if(erro){
        res.status(200).send(erro)
      }
  
    
    
  db.query('SELECT * FROM produtos WHERE id = ?',[req.params.id],
  function(erro,resultado){
    if(erro){
      res.status(200).send('Erro:' + erro)
    }
    res.render('form',{produto:resultado[0],tag:tags})
  }) 
  
})
})

//rota ediçao post

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
