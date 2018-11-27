var mongoose = require('mongoose');

var categoriaSchema = mongoose.Schema({
    codigo: String,
    nome: String,
    dateCreated: { type: Date, default: Date.now },
    deletado: { type: Boolean, default: false}
})

module.exports = mongoose.model('Categoria', categoriaSchema);