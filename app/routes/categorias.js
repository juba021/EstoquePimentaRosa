module.exports = function(app) {
    app.get('/categorias', function(req, res) {
        res.render("categorias/categorias");
    });   
    
    app.get('/categorias/new', function(req, res) {
        res.render("categorias/addCategoria");
    });  

    app.get('/categorias/edit', function(req, res) {
        res.render("categorias/editCategoria");
    });  
}