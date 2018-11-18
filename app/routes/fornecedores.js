module.exports = function(app) {
    app.get('/fornecedores', function(req, res) {
        res.render("fornecedores/fornecedores");
    });    

    app.get('/fornecedores/new', function(req, res) {
        res.render("fornecedores/addFornecedor");
    }); 

    app.get('/fornecedores/edit', function(req, res) {
        res.render("fornecedores/editFornecedor");
    });   

    ///delete isso
    app.get("/teste", function(req, res) {
        res.render("fornecedores/teste")
    })
}