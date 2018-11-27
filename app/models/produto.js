var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produtoSchema = mongoose.Schema({
    codigo: String,
    nome: String,
    fornecedor: {
        ref: 'Fornecedor',
        type: Schema.Types.ObjectId
    },
    categoria: {
        ref: 'Categoria',
        type: Schema.Types.ObjectId
    },
    tamanho: String,
    precoCompra: Number,
    precoVenda: Number,
    descricao: String,
    dateCreated: { type: Date, default: Date.now },
    deletado: { type: Boolean, default: false}
})

module.exports = mongoose.model('Produto', produtoSchema);