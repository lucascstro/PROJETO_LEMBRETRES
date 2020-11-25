const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Lembretes = require('./models/lembretes');

mongoose.connect('mongodb+srv://lcastro:hudixo1525@cluster0.4sbfx.mongodb.net/app-mean?retryWrites=true&w=majority')
    .then(() => {
        console.log("Conexão OK")
    }).catch(() => {
        console.log("Conexão NOK")
    });

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept ');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.get('/api/lembretes', (req, res, next) => {
  Lembretes.find().then(
      documents => {
        console.log(documents)
          res.status(200).json({
              mensagem: "Tudo OK",
              lembretes: documents
          });
      })
});

app.get('/api/lembretes:id', (req, res, next) => {
  Lembretes.findById(req.params.id).then(lem => {
    if(lem){
      res.status(200).json(lem);
    }
    else
      res.status(404).json({mensagem:"Lembrete não encontrado"})
  })
});

app.post('/api/lembretes', (req, res, next) => {
    const lembretes = new Lembretes({
        titulo: req.body.titulo,
        data: req.body.data,
        descricao: req.body.descricao
    });

    lembretes.save().then(lembreteInserido => {
      res.status(201).json({
        mensagem:'Lembrete Inserido',
        id:lembreteInserido._id
      })
    })
});

app.delete ('/api/lembretes/:id', (req, res, next) => {
  Lembretes.deleteOne({_id:req.params.id}).then((resultado) =>{
   console.log(resultado);
  res.status(200).json({mensagem:"Lembrete removido"})
  })
  console.log (req.params);
  res.status(200).end();
  });

  app.put ("/api/lembretes/:id", (req, res, next) => {
    const lembretes = new Lembretes({
    _id: req.params.id,
    titulo: req.body.titulo,
    data: req.body.data,
    descricao: req.body.descricao
    });
    Lembretes.updateOne({_id: req.params.id}, lembretes)
    .then ((resultado) => {
    console.log (resultado)
    });
    res.status(200).json({mensagem: 'Atualização realizada com sucesso'})
    });

app.use('/api/lembretes', (req, res, next) => {
    res.status(200).json({
        mensagem: "Sucesso",
        lembretes: Lembretes
    });
});
module.exports = app;
