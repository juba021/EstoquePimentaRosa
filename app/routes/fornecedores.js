var Fornecedor = require('../models/fornecedor.js');
var access = require('../access.js');

module.exports = function(app) {
    app.get('/fornecedores', function(req, res) {
        Fornecedor.find({}, function (err, fornecedores) {
            console.log(fornecedores);
            
            if (err) {
                access.redirect();
            } else {
                res.render('fornecedores/fornecedores', { fornecedores: fornecedores});
            }
        })
    });    

    app.get('/fornecedores/new', function(req, res) {
        res.render("fornecedores/addFornecedor");
    }); 

    app.post('/fornecedores/create', function(req, res) {
        console.log("chegou");
        if (req.body.CNPJ !== undefined && req.body.CNPJ !== "" &&
            req.body.nome !== undefined && req.body.nome !== "" &&
            req.body.nomeFantasia !== undefined && req.body.nomeFantasia !== "" &&
            req.body.cidade !== undefined && req.body.cidade !== "" &&
            req.body.uf !== undefined && req.body.uf !== "" &&
            req.body.telefone !== undefined && req.body.telefone !== "" &&
            req.body.email !== undefined && req.body.email !== "" &&
            req.body.description !== undefined && req.body.description !== "") {

            var fornecedor = new Fornecedor();
            fornecedor.nome = req.body.nome
            fornecedor.nomeFantasia = req.body.nomeFantasia
            fornecedor.CNPJ = req.body.CNPJ
            fornecedor.endereco.cidade = req.body.cidade;
            fornecedor.endereco.uf = req.body.uf
            fornecedor.telefone = req.body.telefone
            fornecedor.email = req.body.email
            fornecedor.descricao = req.body.descricao

            fornecedor.save( function(err, obj) {
                if (err) {
                    access.redirect(req, res, true, 'error', null);
                } else {
                    res.json(obj)
                }
            })
        }   
    }); 

    app.get('/fornecedores/view', function(req, res) {
        console.log(req.body.nome);
        Fornecedor.findById({_id: "5bf9c043fe63ca21c09ba3eb"}, function(err,obj ) {
            res.json(obj)
        })



    }); 

    

    app.get('/fornecedores/edit/:_id', function(req, res) {
        Fornecedor.findById({_id: req.params._id}, function(err, fornecedor) {
            if (err) {
                access.redirect(req, res, true, 'error', null);
            } else {

                res.render("fornecedores/editFornecedor", { fornecedor: fornecedor });
            }
        })
    });   

    ///delete isso
    app.get("/teste", function(req, res) {
        res.render("fornecedores/teste")
    });
}