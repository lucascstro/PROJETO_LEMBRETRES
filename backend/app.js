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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.get('/api/lembretes', (req, res, next) => {
    Lembretes.find().then(
        Lista => {
            res.status(200).json({
                mensagem: "Tudo OK",
                lembretes: Lista
            });
        })
});

app.post('/api/lembretes', (req, res, next) => {
    const lembretes = new Livro({
        titulo: req.body.titulo,
        data: req.body.data,
        descricao: req.body.descricao
    })
    lembretes.save();
    console.log(lembretes);
    res.status(201).json({ mensagem: 'Lembrete inserido' })
});

app.use('/api/lembretes', (req, res, next) => {
    res.status(200).json({
        mensagem: "Sucesso",
        lembretes: Lembretes
    });
});
module.exports = app;
