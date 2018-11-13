module.exports = function(app) {
    app.get('/fornecedores', function(req, res) {
        res.render("fornecedores/fornecedores");
    });    
}