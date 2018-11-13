module.exports = function(app) {
    app.get('/produtos/edit', function(req, res) {
        res.render("produtos/editProduto");
    });    
}