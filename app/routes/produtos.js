module.exports = function(app) {
    app.get('/produtos', function(req, res) {
        res.render("produtos/produtos");
    });    

    app.get('/produtos/new', function(req, res) {
        res.render("produtos/addProduto");
    }); 

    app.get('/produtos/edit', function(req, res) {
        res.render("produtos/editProduto");
    });    
}
