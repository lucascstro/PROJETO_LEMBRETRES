const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Lembretes = require('./models/lembretes');
const Logon = require('./models/logon');
const { reduceEachLeadingCommentRange } = require('typescript');

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
        if (lem) {
            res.status(200).json(lem);
        } else
            res.status(404).json({ mensagem: "Lembrete não encontrado" })
    })
});

app.post('/api/lembretes', (req, res, next) => {
    const lembretes = new Lembretes({
        titulo: req.body.titulo,
        data: req.body.data,
        descricao: req.body.descricao,
        dataC: req.body.dataC

    });

    lembretes.save().then(lembreteInserido => {
        res.status(201).json({
            mensagem: 'Lembrete Inserido',
            id: lembreteInserido._id
        })
    })
});

app.delete('/api/lembretes/:id', (req, res, next) => {
    Lembretes.deleteOne({ _id: req.params.id }).then((resultado) => {
        console.log(resultado);
        res.status(200).json({ mensagem: "Lembrete removido" })
    })
    console.log(req.params);
    res.status(200).end();
});

app.put("/api/lembretes/:id", (req, res, next) => {
    const lembretes = new Lembretes({
        _id: req.params.id,
        titulo: req.body.titulo,
        data: req.body.data,
        descricao: req.body.descricao
    });
    Lembretes.updateOne({ _id: req.params.id }, lembretes)
        .then((resultado) => {
            console.log(resultado)
        });
    res.status(200).json({ mensagem: 'Atualização realizada com sucesso' })
});

app.use('/api/lembretes', (req, res, next) => {
    res.status(200).json({
        mensagem: "Sucesso",
        lembretes: Lembretes
    });
});
module.exports = app;

//usuario
app.post('/api/novoUsuario', (req, res, next) => {
    const usuario = new Logon({
        usuario: req.body.usuario,
        senha: req.body.senha
    });

    usuario.save();

    console.log(usuario);
    res.status(201).json({ mensagem: 'Cadastro realizado' })
});
app.get('/api/novoUsuario', (req, res, next) => {
    Logon.find().then(
        lista => {
            console.log(lista);
            res.status(200).json({
                mensagem: "Tudo OK",
                logon: lista
            });
        })
});

app.post('/api/autenticacao', async(req, res) => {
        const data = new Logon({
            usuario: req.body.usuario,
            senha: req.body.senha
        });
        console.log("entrou na api")
        const { usuario, senha } = req.body;
        if (!await Logon.findOne({ usuario })) {
            console.log("usuario invalido")
            res.status(400).send({ erro: 'falha' })
        }
        const login = await Logon.findOne({ usuario }).select('+senha');

        if (usuario && senha == login.senha) {
            console.log("Logou")
            res.send(true);
        } else {
            console.log("usuario incorreto")
            res.status(400).send({ erro: 'falha' })
        }
    }

)
