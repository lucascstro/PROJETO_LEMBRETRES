//importando o pacote
const mongoose = require('mongoose');
//definindo o "schema"
//note a semelhança com recursos de bases relacionais
const livrosSchema = mongoose.Schema({
    titulo: { type: String, required: false, default: '00000000' },
    data: { type: String, required: true },
    descricao: { type: String, required: true },

});
//criamos o modelo associado ao nome Cliente e exportamos
//tornando acessível para outros módulos da aplicação
module.exports = mongoose.model('Livro', livrosSchema);
