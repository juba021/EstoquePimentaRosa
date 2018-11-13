module.exports = function(app) {
    app.get('/fornecedores/new', function(req, res) {
        res.render("fornecedores/addFornecedor");
    });    
}