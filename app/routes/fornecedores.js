var Fornecedor = require('../models/fornecedor.js');
var access = require('../access.js');

module.exports = function(app) {

    //// Lista fornecedores
    app.get('/fornecedores', function(req, res) {
        Fornecedor.find({deletado: { $ne: true }}, function (err, fornecedores) {
            if (err) {
                access.redirect(req, res, true, 'error', null);
            } else {
                res.render('fornecedores/fornecedores', { fornecedores: fornecedores});
            }
        })
    });    
    
    //// página de cadastro de fornecedores.
    app.get('/fornecedores/new', function(req, res) {
        res.render("fornecedores/addFornecedor");
    }); 

    //// Página editar fornecedor.
    app.get('/fornecedores/edit/:_id', function(req, res) {
        Fornecedor.findById({_id: req.params._id}, function(err, fornecedor) {
            if (err) {
                access.redirect(req, res, true, 'error', null);
            } else {               
                res.render("fornecedores/editFornecedor", { fornecedor: fornecedor });
            }
        })
    });  

    //// Função de cadastrar fornecedor.
    app.post('/fornecedor/create', function(req, res) {
        if (req.body.CNPJ !== undefined && req.body.CNPJ !== "" &&
            req.body.nome !== undefined && req.body.nome !== "" &&
            req.body.nomeFantasia !== undefined && req.body.nomeFantasia !== "" &&
            req.body.cidade !== undefined && req.body.cidade !== "" &&
            req.body.uf !== undefined && req.body.uf !== "" &&
            req.body.telefone !== undefined && req.body.telefone !== "" &&
            req.body.email !== undefined && req.body.email !== "" &&
            req.body.descricao !== undefined && req.body.descricao !== "") {
                  
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


    app.put('/fornecedor/update/:_id', function(req, res) {
        if (req.body.CNPJ !== undefined && req.body.CNPJ !== "" &&
            req.body.nome !== undefined && req.body.nome !== "" &&
            req.body.nomeFantasia !== undefined && req.body.nomeFantasia !== "" &&
            req.body.cidade !== undefined && req.body.cidade !== "" &&
            req.body.uf !== undefined && req.body.uf !== "" &&
            req.body.telefone !== undefined && req.body.telefone !== "" &&
            req.body.email !== undefined && req.body.email !== "" &&
            req.body.descricao !== undefined && req.body.descricao !== "") {
                console.log(req.params._id);
                
            Fornecedor.findById({_id: req.params._id}, function(err, fornecedor) {

                
                if (err) {
                    access.redirect(req, res, true, 'error', null);
                } else {
                    fornecedor.nome = req.body.nome;
                    fornecedor.nomeFantasia = req.body.nomeFantasia;
                    fornecedor.CNPJ = req.body.CNPJ;
                    fornecedor.endereco.cidade = req.body.cidade;
                    fornecedor.endereco.uf = req.body.uf;
                    fornecedor.telefone = req.body.telefone;
                    fornecedor.email = req.body.email;
                    fornecedor.descricao = req.body.descricao;
                   
                
                    fornecedor.save( function(err, obj) {
                        if (err) {
                            access.redirect(req, res, true, 'error', null);
                        } else {
                            res.sendStatus(200);
                        }
                    })
                }
            })
        }
    });


    app.put('/fornecedor/delete/:_id', function(req, res) {
        Fornecedor.findById({_id: req.params._id}, function(err, fornecedor) {
            console.log("chegou");
        
            
            if (err || !fornecedor) {
                access.redirect(req, res, true, 'error', err);
            } else {
                fornecedor.deletado = true;
                
                fornecedor.save(function (err, obj) {
                    if (err) {
                        access.redirect(req, res, true, 'error', err);
                    } else {
                        Fornecedor.find({ deletado: { $ne: true } }, function(err, fornecedores) {
                            if (err) {
                                access.redirect(req, res, true, 'error', err);
                            } else {
                                console.log("fornecedores find");
                                console.log(fornecedores);
                                
                                res.json(fornecedores);
                            }

                        });
                    }
                })
            
            }
        })
    });
 

}