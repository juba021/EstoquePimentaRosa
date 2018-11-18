module.exports = function(app) {
    app.get('/vendas', function(req, res) {
        res.render("vendas/vendas");
    });   
    
    app.get('/vendas/new', function(req, res) {
        res.render("vendas/addVendas");
    });  

    app.get('/vendas/edit', function(req, res) {
        res.render("vendas/editVendas");
    });  
}