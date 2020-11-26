//importando o pacote
const mongoose = require('mongoose');
//definindo o "schema"
//note a semelhança com recursos de bases relacionais
const logonSchema = mongoose.Schema({
    usuario: { type: String, required: true },
    senha: { type: String, required: true }
});
//criamos o modelo associado ao nome Lembrete e exportamos
//tornando acessível para outros módulos da aplicação
module.exports = mongoose.model('Logon', logonSchema);
