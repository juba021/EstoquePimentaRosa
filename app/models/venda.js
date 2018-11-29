var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vendaSchema = mongoose.Schema({
    produtos: [{
        ref: 'Produto',
        type: Schema.Types.ObjectId
    }],
    cliente: String,
    total: Number,
    dateCreated: { type: Date, default: Date.now },
    deletado: { type: Boolean, default: false}
})

module.exports = mongoose.model('Venda', vendaSchema);