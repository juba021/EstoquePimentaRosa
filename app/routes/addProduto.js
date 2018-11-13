module.exports = function(app) {
    app.get('/produtos/new', function(req, res) {
        res.render("produtos/addProduto");
    });    
}