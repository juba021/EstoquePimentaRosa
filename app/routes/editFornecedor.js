module.exports = function(app) {
    app.get('/fornecedores/edit', function(req, res) {
        res.render("fornecedores/editFornecedor");
    });    
}