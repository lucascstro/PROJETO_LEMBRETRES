//importando o pacote
const mongoose = require('mongoose');
//definindo o "schema"
//note a semelhança com recursos de bases relacionais
const lembreteSchema = mongoose.Schema({
    titulo: { type: String, required: true },
    data: { type: String, required: true },
    descricao: { type: String, required: true },
    dataC: { type: String, required: false }


});
//criamos o modelo associado ao nome Lembrete e exportamos
//tornando acessível para outros módulos da aplicação
module.exports = mongoose.model('Lembretes', lembreteSchema);
