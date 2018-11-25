var mongoose = require('mongoose');

var fornecedorSchema = mongoose.Schema({
    CNPJ: String,
    nome: String,
    nomeFantasia: String,
    endereco: {
        cidade: String,
        uf: String
    },
    telefone: String,
    email: String,
    descricao: String,
    dateCreated: { type: Date, default: Date.now },
    deletado: { type: Boolean, default: false}
})

module.exports = mongoose.model('Fornecedor', fornecedorSchema);